---
title: 'ucontext and coroutines'
cover: images/chris_burden.jpg
coverAlt: Chris Burden's Urban Light
description: 'A source code review of a coroutine implementation and excursion into ucontext'
datePublished: '2024-02-12T00:00:00.000Z'
category: 'programming'
tags:
  - source code review
  - coroutines
---

Recommended listening: [Gétatchèw Mèkurya - Ethiopian Urban Modern Music Vol. 5 (1972)](https://www.youtube.com/watch?v=6ihmscLSb6A)

Here's my source code review of the `coroutine` C library by an author called cloudwu. Figuring out this code was a great exercise in understanding cooperative scheduling, coroutines/fibers, and handling stacks in user-space. We'll focus on these concepts during the review. There's some clever bits that I absolutely loved as well, and about which I'm excited to share.

`coroutine` is built atop the `ucontext` library. I've dedicated the immediately subsequent section to a brief foray into `ucontext` and its most commonly used APIs. Thereafter, we'll take what we know about `ucontext` and review the coroutine source code.

## ucontext

`ucontext` handles much of the heavy lifting needed to implement something like threads i.e. saving registers, context switching, etc.
The core API is very simple and focused around the `ucontext_t` struct:

```c
typedef struct ucontext_t {
  struct ucontext_t *uc_link;
  stack_t uc_stack;
  mcontext_t uc_mcontext;
  // signals to block in the context
  sigset_t uc_sigmask;
  // ...
} ucontext_t;
```

It'll be helpful to first see some examples to understand what purpose each of these fields serves. We'll look at a few example programs.

```c
#include <stdio.h>
#include <stdlib.h>
#include <ucontext.h>

static ucontext_t ctx1;

int main(void)
{
  int x = 0;
  getcontext(&ctx1);

  int y = 0;
  printf("x=%d, y=%d\n", ++x, ++y);

  setcontext(&ctx1);

  return EXIT_SUCCESS;
}
```

First, we have `getcontext`. It accepts as input a `ucontext_t` and will take whatever registers - including the program counter - we have in the current execution context and save them in this `ctx1` context.

Next, we have `setcontext`. This will cause the program to resume execution right after the `getcontext` call. We'll therefore infinitely loop between the two calls.

Quite illustrative here is the `x` and `y` variables. The value of `x` continues to increase while `y` forever remains 1. This happens because `setcontext` restores the registers and stack to that of the last `getcontext` call, including the program counter (hence resuming execution back at the most recent `getcontext` call). So when we jump back to the `getcontext` line in the execution flow, `y` - which is allocated on the stack - no longer exists. We're constantly re-declaring it and pushing it onto the stack.

Next, we have `makecontext` and `swapcontext`, which will be fundamental in cloudwu's coroutines implementation.

```c
#include <stdio.h>
#include <stdlib.h>
#include <ucontext.h>

static ucontext_t context;

void handler(int arg1, int arg2) {
  printf("Function called with arguments: %d, %d\n", arg1, arg2);
}

int main(void) {
  char stack[2048];

  getcontext(&context);

  context.uc_stack.ss_sp = stack;
  context.uc_stack.ss_size = sizeof(stack);

  makecontext(&context, (void (*)())handler, 2, 10, 20);

  printf("pre-swap\n");
  setcontext(&context);
  printf("Back to main function - will never run\n");

  return EXIT_SUCCESS;
}
```

In `main`, we leverage `makecontext`, which allows us to create a new context with its own stack. Notice we'll also have to allocate a stack for the context. Using this context allows us to reset the program counter to a different function (`handler` in the demo program). If you've ever written assembly, this is very analogous to a `jmp` instruction. The third argument to `makecontext` is an integer indicating the number of arguments we want to pass to the context handler, and any subsequent `makecontext` arguments are the handler's arguments - the quantity of which, obviously, should align with however many arguments we pass.

Know that the handler arguments must be integers, which isn't particularly useful in practice. The `coroutine` library handles this in a unique way that we'll see later.

In this example, we call `setcontext` on this new context to immediately invoke `handler` with 2 integer arguments. The default behavior after `handler` finishes executing is to end the process. Thus, the string `"Back to the main function - will never run\n"` will never be written to stdout.

We can control this behavior by leveraging the `uc_link` field in the `ucontext` struct. Setting this field tells the program to `setcontext` to the context stored in `uc_link` as soon as it finishes executing.

In the following example we set `uc_link` to `main_context`. As soon as `handler` finishes running, execution will resume at `getcontext(&main_context)`, causing an infinite loop.

```c
#include <stdio.h>
#include <stdlib.h>
#include <ucontext.h>

static ucontext_t main_context;
static ucontext_t context;

void handler(int arg1, int arg2) {
  printf("Function called with arguments: %d, %d\n", arg1, arg2);
}

int main() {
  char stack[2048];

  getcontext(&main_context);
  getcontext(&context);

  context.uc_stack.ss_sp = stack;
  context.uc_stack.ss_size = sizeof(stack);
  context.uc_link = &main_context;

  makecontext(&context, (void (*)())handler, 2, 10, 20);

  printf("pre-swap\n");
  setcontext(&context);
  printf("Back to main function\n");

  return EXIT_SUCCESS;
}
```

This is really quite akin to what threads do, and I've heard that a lot of university courses teach `ucontext` for toy thread scheduler implementations.
One can certainly see why - much of this is almost perfectly analogous to `pthread_create` and `pthread_join` superficially.

There's one more function we should look at: `swapcontext`.

```c
#include <stdio.h>
#include <stdlib.h>
#include <ucontext.h>

static ucontext_t main_context;
static ucontext_t context;

void handler(int arg1, int arg2) {
  printf("Function called with arguments: %d, %d\n", arg1, arg2);

  swapcontext(&context, &main_context);
}

int main() {
  char stack[2048];

  getcontext(&context);
  context.uc_stack.ss_sp = stack;
  context.uc_stack.ss_size = sizeof(stack);

  makecontext(&context, (void (*)())handler, 2, 10, 20);

  printf("pre-swap\n");
  swapcontext(&main_context, &context);
  printf("Back to main function\n");

  return EXIT_SUCCESS;
}
```

In this program, we made a slight modification in that we're now calling `swapcontext`. `swapcontext` effectively calls `getcontext` on the first argument, then `setcontext` on the second. That is, we create a checkpoint of sorts at `swapcontext`, then immediately begin executing `handler`. Notice we don't need `getcontext` to initialize `main_context`, as the swap call does this for us.

After the `printf` statement in `handler`, we call `swapcontext` again and resume execution just after the initial `swapcontext` call in `main`. So the program output looks like this:

```
pre-swap
Function called with arguments: 10, 20
Back to main function
```

This should be sufficient knowledge of `ucontext` such that we can appreciate `coroutine`.

# Source Code Review: coroutine

A while back I found an implementation of coroutines written in C by someone called cloudwu. I bookmarked the library because it looked like a very concise and well-written implementation of coroutines that would be easy to digest. Coroutines are a flavor of cooperative multi-tasking centered around suspending and resuming execution flow. You might be familiar with the concept because of Go's stdlib implementation, _Goroutines_, or Kotlin's `kotlinx.coroutines` library.

You can find the source code for `coroutine` [here](https://github.com/cloudwu/coroutine/tree/a6263031e6ee3d3e10e613f0c0c3af886465170e) (this is the exact revision I'll be reviewing). All code samples henceforth are authored by cloudwu, with occasional albeit slight modifications I've made to improve readability for the sake of code review (predominantly spacing), or to add annotations. I'll prefix all of my annotations with `Z:`.

We begin with the example program, main.c, found in the root level directory.

```c
#include "coroutine.h"
#include <stdio.h>

struct args {
	int n;
};

static void
foo(struct schedule * S, void *ud) {
	struct args * arg = ud;
	int start = arg->n;
	int i;
	for (i=0;i<5;i++) {
		printf("coroutine %d : %d\n",coroutine_running(S) , start + i);
		coroutine_yield(S);
	}
}

static void
test(struct schedule *S) {
	struct args arg1 = { 0 };
	struct args arg2 = { 100 };

	int co1 = coroutine_new(S, foo, &arg1);
	int co2 = coroutine_new(S, foo, &arg2);
	printf("main start\n");
	while (coroutine_status(S,co1) && coroutine_status(S,co2)) {
		coroutine_resume(S,co1);
		coroutine_resume(S,co2);
	}
	printf("main end\n");
}

int
main() {
	struct schedule * S = coroutine_open();
	test(S);
	coroutine_close(S);

	return 0;
}
```

In `main`, we create a struct called `schedule`, then pass it into a `test` function where we initialize two coroutines and continually call `coroutine_resume` on them until they are no longer active. If you run this program, you'll see that the coroutines take turns executing the `foo` function each with their own local state. The output is as follows:

```
main start
coroutine 0 : 0
coroutine 1 : 100
coroutine 0 : 1
coroutine 1 : 101
coroutine 0 : 2
coroutine 1 : 102
coroutine 0 : 3
coroutine 1 : 103
coroutine 0 : 4
coroutine 1 : 104
main end
```

I was really quite interested to see how this logic is implemented. I decided to read the source code in order of execution. We'll therefore begin in `main`, with the `schedule` struct and `coroutine_open`.

```c
struct schedule {
	char stack[STACK_SIZE];
	ucontext_t main;
	int nco;
	int cap;
	int running;
	struct coroutine **co;
};
```

In `coroutine`, a `schedule` is an opaque struct that represents the runtime environment in which all of the coroutines execute and context switch. Despite being logically well-written, `coroutine` uses unnecessarily terse names that make it difficult to understand. I've therefore summarized each field below to elucidate its purpose:

- `stack` is the stack for the current coroutine execution environment
- `main` is effectively a checkpoint context for the coroutine. This is where we'll resume execution when a coroutine yields control back to the scheduler.
- `nco` tracks the number of coroutines that have been added to an array thereof
- `co` is said array
- `cap` is the capacity of the coroutines array, `co`, which will be pre-initialized and realloc'd when `nco` reaches `cap`
- `running` is the index of the currently executing coroutine qua the `co` array

`coroutine_open` is a very simple initializer function for a `schedule`. The initial coroutine capacity is 16 and the `co` array's elements are initialized to 0 via `memset`. The author does this because we will later need to perform `NULL` checks against any one of these slots when inserting new coroutines.

```c

struct schedule *
coroutine_open(void) {
	struct schedule *S = malloc(sizeof(*S));
	S->nco = 0;
	S->cap = DEFAULT_COROUTINE;
	S->running = -1;
	S->co = malloc(sizeof(struct coroutine *) * S->cap);
	memset(S->co, 0, sizeof(struct coroutine *) * S->cap);
	return S;
}
```

Now we have our `schedule` in `main` and we pass it down through `test`. We'll call `coroutine_new` twice, initializing two coroutines. We will first look at the `coroutine` struct, then the function:

```c
struct coroutine {
	coroutine_func func;
	void *ud;
	ucontext_t ctx;
	struct schedule * sch;
	ptrdiff_t cap;
	ptrdiff_t size;
	int status;
	char *stack;
};
```

- `func` is the coroutine handler. This is the "work" performed by the coroutine.
- `ud` is the coroutine handler arg. Later on, we will see how the library manages to pass this in.
- `ctx` is the context.
- `sch` is a pointer to the `schedule` that manages this coroutine. As far as I can tell, it's not used in the library.
- `cap` is the coroutine's stack capacity
- `size` is the coroutine's stack size
- `stack` is where we persist the coroutine's stack prior to yielding
- `status` indicates the coroutine's state - `COROUTINE_DEAD`, `COROUTINE_READY`, `COROUTINE_RUNNING`, or `COROUTINE_SUSPEND`

> ptrdiff_t was a type I had not encountered before. The signed integer type of the result of subtracting two pointers, it exists primarily for pointer arithmetic. Interesting!

Here's the function `coroutine_new`, annotated:

```c
int
coroutine_new(struct schedule *S, coroutine_func func, void *ud) {
    // Z: Just mallocs and sets all fields to defaults
	struct coroutine *co = _co_new(S, func , ud);

    // Z: If the num coroutines in the schedule is at or above capacity...
	if (S->nco >= S->cap) {
        // Z: Reallocate to have double the capacity and memset the memory.
		int id = S->cap;
		S->co = realloc(S->co, S->cap * 2 * sizeof(struct coroutine *));
		memset(S->co + S->cap , 0 , sizeof(struct coroutine *) * S->cap);
        // Z: Assign the new coroutine at the next available index (the old capacity)
		S->co[S->cap] = co;
        // Z: Now update the capacity
		S->cap *= 2;
		++S->nco;
		return id;
	} else {
        // Z: We have enough capacity. Find the next available index
		int i;
		for (i = 0; i < S->cap; i++) {
            // Z: Calculating this way always gives us the next available index
            // and always cycles to the beginning if we run out of cap (shouldnt
            // happen because of the realloc cond above)
			int id = (i + S->nco) % S->cap;
			if (S->co[id] == NULL) {~~~~
				S->co[id] = co;
				++S->nco;
				return id;
			}
		}
	}
    // Z: Trigger a failure (this will be compiled out in release builds)
	assert(0);
	return -1;
}
```

Not much of interest in `_co_new`, just a struct initializer. The coroutine is initialized with a status of `COROUTINE_READY`. `coroutine_new` is super basic, but I've annotated it nonetheless. The author has a very terse style that I'm not particularly fond of and it makes everything harder to understand than it should be. Really, this is your standard fare initialization logic with a few interesting clever bits.

One such clever bit that I like is the `assert` towards the end. When targeting release builds in most C compilers, this will get stripped out but it serves its purpose during development as a safeguard against invariant violations that should never happen.

Okay, so back in main.c we've initialized two coroutines. Now we enter a while loop that won't break until either `coroutine_status` handler returns a falsy value.

```c
int co1 = coroutine_new(S, foo, &arg1);
int co2 = coroutine_new(S, foo, &arg2);
printf("main start\n");

while (coroutine_status(S, co1) && coroutine_status(S, co2)) {
  coroutine_resume(S, co1);
  coroutine_resume(S, co2);
}
```

`coroutine_status` is very simple, but again, I have annotated it:

```c
int
coroutine_status(struct schedule * S, int id) {
    // Z: Maintain invariant: should be a positive index and below the capacity
	assert(id>=0 && id < S->cap);
    // Z: if the slot contains NULL, the coroutine is no longer active
	if (S->co[id] == NULL) {
		return COROUTINE_DEAD;
	}
	return S->co[id]->status;
}
```

Assuming neither coroutine has a status of `COROUTINE_DEAD`, this loop will keep going. Inside the loop body, the program calls `coroutine_resume` on both coroutines. `coroutine_resume` is where things get interesting:

```c
void
coroutine_resume(struct schedule * S, int id) {
	assert(S->running == -1);
	assert(id >=0 && id < S->cap);
	struct coroutine *C = S->co[id];
	if (C == NULL)
		return;
	int status = C->status;
	switch(status) {
	case COROUTINE_READY:
		getcontext(&C->ctx);
		C->ctx.uc_stack.ss_sp = S->stack;
		C->ctx.uc_stack.ss_size = STACK_SIZE;
		C->ctx.uc_link = &S->main;
		S->running = id;
		C->status = COROUTINE_RUNNING;
		uintptr_t ptr = (uintptr_t)S;
		makecontext(&C->ctx, (void (*)(void)) mainfunc, 2, (uint32_t)ptr, (uint32_t)(ptr>>32));
		swapcontext(&S->main, &C->ctx);
		break;
	case COROUTINE_SUSPEND:
		memcpy(S->stack + STACK_SIZE - C->size, C->stack, C->size);
		S->running = id;
		C->status = COROUTINE_RUNNING;
		swapcontext(&S->main, &C->ctx);
		break;
	default:
		assert(0);
	}
}
```

It's difficult to read in its as-is state, so I'll break it down into three parts: the setup, the `COROUTINE_READY` code path, and the `COROUTINE_SUSPEND` code path.

Every call to `coroutine_resume` begins with this preliminary logic, which I've annotated.

```c
// Z: We shouldn't call resume while the schedule is in a running state.
// Should be set back to -1 after every run, so it shouldn't be possible
// for user code to violate this invariant. Hence why it's an `assert`.
assert(S->running == -1);
// Z: Ditto - we do a size and capacity check.
assert(id >=0 && id < S->cap);
// Z: Last, if the coroutine at the given index is NULL, we exit.
struct coroutine *C = S->co[id];
if (C == NULL)
  return;
```

At this point in our systematic breakdown of main.c, we have just invoked `coroutine_resume` for the first time, so we'll hit the `COROUTINE_READY` case of the switch statement.

```c
// Z: If the coroutine is COROUTINE_READY, create the context and prepare to
// run the coroutine
case COROUTINE_READY:
  // Z: Setup the coroutine's context...
  getcontext(&C->ctx);
  // Z: ...and its stack
  C->ctx.uc_stack.ss_sp = S->stack;
  C->ctx.uc_stack.ss_size = STACK_SIZE;
  // Z: S->main is where we will return after switching to ctx.
  // Literally the swapcontext line below.
  C->ctx.uc_link = &S->main;

  S->running = id;
  C->status = COROUTINE_RUNNING;

  uintptr_t ptr = (uintptr_t)S;

  // Z: Now, this looks interesting...
  // makecontext expects two ints and on some architectures this means 32 bit
  // values so we pass in the low 32 bits, and the high 32 bits of the
  // schedule struct, then reconcile it in the context handler.
  makecontext(&C->ctx, (void (*)(void)) mainfunc, 2, (uint32_t)ptr, (uint32_t)(ptr>>32));

  // Z:
  Run the coroutine. We'll swap the stack and reset the program counter to C->ctx, which is `mainfunc`.
  // Calls getcontext on main and initializes it such that it resumes on the
  // line after this swapcontext call.
  swapcontext(&S->main, &C->ctx);

  break;
```

You'll notice the pointers being passed in (and used in the next code sample) as arguments to the context handler. The [manpage](https://man7.org/linux/man-pages/man3/swapcontext.3.html) for `swapcontext` explains this a bit.

> On architectures where int and pointer types are the same size
> (e.g., x86-32, where both types are 32 bits), you may be able to
> get away with passing pointers as arguments to makecontext()
> following argc. However, doing this is not guaranteed to be
> portable, is undefined according to the standards, and won't work
> on architectures where pointers are larger than ints.

We'll look at `mainfunc` next, as this is where the flow of execution is about to proceed. `mainfunc` is brief, and as usual, I've annotated it liberally:

```c
static void
mainfunc(uint32_t low32, uint32_t hi32) {
    // Z: Reconcile the schedule pointer from the high and low 32 bits
	uintptr_t ptr = (uintptr_t)low32 | ((uintptr_t)hi32 << 32);
	struct schedule *S = (struct schedule *)ptr;

    // Z: Grab the id of the running coroutine from the schedule
	int id = S->running;
    // Z: ...and grab the coroutine
	struct coroutine *C = S->co[id];

    // Z: Run the coroutine's handler function, passing along the coroutine handler argument.
    // We'll want to peek back at main.c to remember what happens next.
	C->func(S,C->ud);

    // Z: If the program calls coroutine_yield, we'll context switch out of this function immediately
    // and never hit this line. Thus, if the coroutine does not yield, it is effectively done and gets
    // destroyed. This does not happen at this point in main.c.
	_co_delete(C);
	S->co[id] = NULL;
	--S->nco;
	S->running = -1;
}
```

We've hit the `C->func` line and we are now in `foo` - the coroutine handler - in main.c. Let's pick up there:

```c
static void foo(struct schedule *S, void *ud) {
  struct args *arg = ud;
  int start = arg->n;
  int i;
  for (i = 0; i < 5; i++) {
    printf("coroutine %d : %d\n", coroutine_running(S), start + i);
    coroutine_yield(S);
  }
}
```

After some work, we call `coroutine_yield`, which will save the stack, call `swapcontext` to context switch back to `coroutine_resume`, right before the `COROUTINE_READY` case's `break` statement. This ultimately lands us back in main.c, about to call the `coroutine_resume` on the second coroutine.

This is the "cooperative" multi-tasking characteristic of coroutines. At some point during a coroutine's execution, we simply save the stack, and context switch to some other coroutine, picking up where we left off.

Here's `coroutine_yield`, where we suspend the running coroutine:

```c
void
coroutine_yield(struct schedule * S) {
    // Z: Another quick check - self explanatory
	int id = S->running;
	assert(id >= 0);

	struct coroutine *C = S->co[id];
    // Z: This one is interesting - we assert that the pointer address is equal to the stack address
    // to prove we persisted the stack properly
    assert((char *)&C > S->stack);
    // Z: Persist the stack state
	_save_stack(C, S->stack + STACK_SIZE);
	C->status = COROUTINE_SUSPEND;
	S->running = -1;
	swapcontext(&C->ctx , &S->main);
}
```

Again, this `swapcontext` call will jump back to the `swapcontext` checkpoint at the end of the `COROUTINE_READY` case statement. Now the first coroutine has suspended and the second coroutine does everything we just looked at.

After the second coroutine has run through all of these calls, we won't hit `mainfunc` again until the end of the coroutine's lifetime. Back in main.c, `coroutine_resume` is called with `co1` for a second time.

This time, however, the coroutine's state is `COROUTINE_SUSPEND`, so we hit the other case statement:

```c
case COROUTINE_SUSPEND:
  memcpy(S->stack + STACK_SIZE - C->size, C->stack, C->size);
  S->running = id;
  C->status = COROUTINE_RUNNING;
  swapcontext(&S->main, &C->ctx);
  break;
```

Here, we restore the coroutine's stack and `swapcontext` again. This is where the code gets very interesting: because we've saved the stack, `swapcontext` now context switches to the end of the `coroutine_yield` stack frame. We immediately exit `coroutine_yield` _into_ the `foo` handler function. The stack state is exactly as it was before, so we make another iteration of the loop and call `coroutine_yield`, save the stack again, and return to the end of the `COROUTINE_SUSPEND` block.

By the way, we should take a peek at `_save_stack`. I've annotated it as usual

```c
static void _save_stack(struct coroutine *C, char *top) {
  // Z: Grab a reference of where we're at in memory
  // This will be stored on the stack, so we'll use its address to figure out the size of the stack.
  char dummy = 0;

  // Z: top of the stack minus addr HERE should be less than the stack size
  assert(top - &dummy <= STACK_SIZE);

  // Z: update capacity and realloc if not enough
  if (C->capacity < top - &dummy) {
    free(C->stack);
    C->capacity = top - &dummy;
    C->stack = malloc(C->capacity);
  }

  C->size = top - &dummy;
  // Z: starting at the address of dummy (the last thing pushed onto the stack),
  // copy memory all the way up to size
  memcpy(C->stack, &dummy, C->size);
}
```

Maybe this sort of trickery is typical among C programmers, but I thought it was rather clever; using a stack-allocated value's address to verifiably determine the current stack size.

This is the crux of the context switching logic. Both coroutines will continue to suspend and yield, context switching into the other. Each time we make a context switch, we restore the stack of the running coroutine, do a little work, save the stack again, and continue the cycle ad infinitum (or until we stop calling `coroutine_resume` and `coroutine_yield`).

And I really found this quite clever: the first time we finish executing `foo` without calling `coroutine_yield`, we're suddenly in the same stack frame where `mainfunc` was initially invoked. Execution picks up after the `C->func` call and the coroutine is deleted:

```c
static void
mainfunc(uint32_t low32, uint32_t hi32) {
	uintptr_t ptr = (uintptr_t)low32 | ((uintptr_t)hi32 << 32);
	struct schedule *S = (struct schedule *)ptr;
	int id = S->running;
	struct coroutine *C = S->co[id];

    C->func(S,C->ud);
    // Z: After the final coroutine_yield, the outermost handler func
    // stack frame exits and we continue execution here
	_co_delete(C);
	S->co[id] = NULL;
	--S->nco;
	S->running = -1;
}
```

There's a few utility functions that for the sake of brevity I have not included in the review. I had the most trouble comprehending the stack persistence logic because I only have a cursory level of experience with pointer arithmetic, but once I started to get it I gained an even more acute appreciation of the code.

My favorite part of this library was the stack frame manipulation around `coroutine_yield` and `mainfunc` - it's a completely bonkers stroke of genius that sent chills down my spine the moment it all clicked for me. The fact that we just fall out of the stack frame and into the other coroutine...totally baller. I've seen this same kind of "fallthrough" trick before (in a manner), specifically in the reactivity library Evan You implemented for the Vue frontend framework. Evan does this thing where you call a function, trigger a proxy trap inside of that function, then push the function itself onto a stack so you can start invoking it any time the proxy traps are triggered subsequently. Yes, it's nuts. In fact, the `@vue/reactivity` library is so cool, I'll have to do a separate source code review for it on this blog (stay tuned for that). Anyway, I hope you enjoyed `coroutine`; drop me a note and let me know what you thought!
