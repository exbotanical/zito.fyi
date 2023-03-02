---
title: 'A Complete Guide to Make'
cover: images/gnu-make.png
coverAlt: The GNU Make logo
description: 'A complete and thorough no-BS guide to using the GNU Make tool.'
datePublished: '03/2/2023'
category: 'programming'
tags:
  - build tools
  - software engineering
---

Make is a build automation tool originally created by Stuart Feldman at Bell Labs in 1976. It should really say something to you that a build tool created almost 50 years ago (at the time of writing this post, anyway) is still among the most widely-used tools for building large-scale C and C++ programs (this tends to be the case, though Make doesn't care what language your project uses). Projects such as the Linux kernel, the GNU Compiler Collection (gcc), Git, and the Python programming language use Make. Needless to say, knowing how to use Make is a valuable skill.

The only problem with this is Make is notoriously difficult to learn. There's no scarcity of criticism surrounding its complexity; many guides and tutorials only further confuse the eager learner. I was one of these eager learners, and I failed to learn Make several times. But lately, I feel like I've finally got the hang of it, and I'd like to pass along what I've learned to you so perhaps you won't endure the same frustrations I did.

> Note: This guide assumes you are using GNU Make. GNU Make was created by Richard Stallman and Roland McGrath in 1987 as part of the GNU Project. It's the standard implementation of Make these days and adds extensions over the original Make, many of which we'll learn about in this post.

## A Gentle Introduction

Make is a build automation tool that is commonly used to build software projects. It reads a file called a "Makefile" that specifies the rules for building the project, and then automatically builds the project by executing the necessary commands.

Here's a simple example of a Makefile:

```makefile
program: main.o utils.o
  gcc main.o utils.o -o program

main.o: main.c
  gcc -c main.c

utils.o: utils.c
  gcc -c utils.c
```

This Makefile specifies that the `program` executable should be built from the `main.o` and `utils.o` object files. It also specifies how to build each of these object files from their respective source files (`main.c` and `utils.c`). To execute it, you'd run `make` in the directory where the Makefile resides.

The syntax of a Makefile is based on rules that define how to build a target (usually a file or an executable) from its dependencies (usually other files or object files). Each rule consists of a target, its dependencies, and the commands needed to build the target from its dependencies.

Speaking of syntax, let's take a closer look at the syntax used in Makefiles.

## Makefile Syntax 101

As mentioned in the (hopefully) gentle introduction, a Makefile rule consists of a target, its dependencies, and the commands needed to build the target from said dependencies. Here's the typical structure of a Makefile rule:

```makefile
target: dependency1 dependency2
  command1
  command2
```

In this rule, `target` is the name of the file or executable that we want to build, and `dependency1` and `dependency2` are the files or object files that `target` depends on. The commands `command1` and `command2` are the shell commands that are executed to build `target` from its dependencies.

Note that the commands in a rule _must_ be indented with a tab character (not spaces), or execution will fail (with the mildly cryptic `Makefile:<line number>: *** missing separator. Stop`). If you're frustrated by this weird, seemingly arbitrary restriction, you're not the first. To quote the seminal [UNIX-HATERS Handbook](https://en.wikipedia.org/wiki/The_UNIX-HATERS_Handbook):

> The problem with Dennis’ Makefile is that when he added the comment line, he inadvertently inserted a space before the tab character at the beginning of line 2. The tab character is a very important part of the syntax of Makefiles. All command lines (the lines beginning with cc in our example) must start with tabs. After he made his change, line 2 didn’t, hence the error.

> "So what?"" you ask, "What’s wrong with that?"

> There is nothing wrong with it, by itself. It’s just that when you consider how other programming tools work in Unix, using tabs as part of the syntax is like one of those pungee stick traps in The Green Berets: the poor kid from Kansas is walking point in front of John Wayne and doesn’t see the trip wire. After all, there are no trip wires to watch out for in Kansas corn fields. WHAM!

So...yeah, gotta watch out for that.

Also, you can have multiple commands in a rule, each on a separate line.

Back to the earlier example of a Makefile:

```makefile
program: main.o utils.o
  gcc main.o utils.o -o program

main.o: main.c
  gcc -c main.c

utils.o: utils.c utils.h
  gcc -c utils.c
```

In this rule, `program` is the name of the executable that we want to build, and it depends on `main.o` and `utils.o`. The first command in the rule uses `gcc` to link the two object files together into the `program` executable. The other two rules specify how to build the `main.o` and `utils.o` object files from their respective source files.

The experienced developer at this point may notice we're repeating file names quite a bit here. One simple typo could bring your entire build to a screeching halt. Fortunately, Make allows us leverage variables and macros in Makefiles to make them more flexible.

## Variables and Macros

As aforementioned, Makefiles support the use of variables and macros, which can make them more flexible and easier to maintain. Here's an example of how to define a variable in a Makefile:

```makefile
CC = gcc
```

In this example, `CC` is a variable that is assigned the value `gcc`. We can then use this variable in a rule like this:

```makefile
program: main.o utils.o
  $(CC) main.o utils.o -o program
```

This rule uses the `$(CC)` macro to expand to the value `gcc`. This makes the Makefile more flexible, because we can easily change the value of `CC` to use a different compiler.

We can also define variables with more complex values. For example:

```makefile
CFLAGS = -Wall -Werror -O2
```

### Best Practices on = versus :=

By the way, in Make there are two main ways to set variables: with `=` and with `:=`. The difference between them is _when_ th.y are evaluated. `=`-assigned variables are evaluated when they are _used_, whereas `:=`-assigned variables are evaluated when they are _defined_ (i.e. immediately).

Here's an example to demonstrate the difference:

```makefile
FOO := $(BAR)
BAR := hello

all:
  @echo $(FOO)
```

In this example, `FOO` is set using `:=`, which means it is evaluated immediately. At the time it is evaluated, `BAR` has not yet been set, so `FOO` is set to an empty string. Therefore, the output of the `echo` command will be an empty string.

If we swap the two lines that set `FOO` and `BAR`:

```makefile
BAR := hello
FOO := $(BAR)

all:
  echo $(FOO)
```

Now `BAR` is set before `FOO`, so `FOO` will be set to `hello` and the output of the echo command will be `hello`.

As a best practice, it is generally recommended to use `:=` for variables that don't depend on other variables, and `=` for variables that do.

Also, we'll talk about that `@` before the `echo` command in just a few. But first, let's step up the complexity a tad and look at the more advanced features of Make.

### Optional Assignment

In Make, `?=` is a conditional variable assignment operator. It assigns the value to the variable if the variable is not already set, but if the variable is already set, then it keeps the existing value and does not override it.

The syntax for this is:

```makefile
VARIABLE ?= value
```

For example:

```makefile
SOME_VAR ?= default_value

target:
  @echo "SOME_VAR is $(SOME_VAR)"
```

Invoking `make target` here would yield `SOME_VAR is default_value`. However, if we set `SOME_VAR` _before_ invoking `make` e.g `SOME_VAR=custom_value make target`, `make` will instead output `SOME_VAR is custom_value`.

## Pattern-matching Rules

Pattern rules are used to define how to build a target from a set of source files that match a particular pattern. Here's an example:

```makefile
%.o: %.c
  $(CC) $(CFLAGS) -c $< -o $@
```

In this rule, the `%.o` pattern matches any object file, and the `%.c` pattern matches any C source file. The `$<` and `$@` variables are used to refer to the first dependency and the target, respectively. This rule specifies how to build any object file from its corresponding C source file.

Personally, I was a little confused by this at first, so here's a working example:

```
project/
├── Makefile
├── src/
│   ├── file1.c
│   ├── file2.c
│   └── file3.c
```

```makefile
CC := gcc
CFLAGS := -Wall -Wextra -pedantic -std=c17
TARGET := program

%.o: src/%.c
	$(CC) $(CFLAGS) -c $< -o $@

$(TARGET): file1.o file2.o file3.o
	ar rcs $@ $^
```

To build `TARGET`, we rely on three dependencies: `file1.o`, `file2.o`, and `file3.o`. These don't exist yet, so Make will look for a matching rule that tells it how to build those dependencies. It finds the matching rule in `%.o`, which relies on any files with a `.c` extension inside of the `src` directory. Since we do indeed have `.c` files in `src`, Make knows it can start at this `%.o` rule.

Make will invoke the `%.o` rule for _each_ `src/%.c` file. The output of running `make` here will be:

```bash
gcc -Wall -Wextra -pedantic -std=c17 -c src/file1.c -o file1.o
gcc -Wall -Wextra -pedantic -std=c17 -c src/file2.c -o file2.o
gcc -Wall -Wextra -pedantic -std=c17 -c src/file3.c -o file3.o
ar rcs program file1.o file2.o file3.o
```

In a subsequent section, we'll talk about Make built-ins, which will enable us to avoid writing out every object file in the dependencies for the `TARGET` rule.

## Phony

Phony targets were especially confusing to me when I first learned Make. I don't know why, but pretty much every guide or tutorial I've read makes this subject so much more confusing than it needs to be.

Phony targets are just used to define targets that are not associated with files, but rather with actions that need to be performed. Here's an example:

```makefile
.PHONY: clean

clean:
  rm -f *.o program
```

In this rule, `clean` is a _phony_ target that specifies how to remove all object files and the `program` executable. Note that we use the `.PHONY` directive to tell make that `clean` is not a file, but rather a phony target. If we didn't do this — and we happened to have a file in the root directory named `clean` — running `make clean` would yield `make: 'clean' is up to date.`.

By the way, you can specify your phony targets in a single line, like:

```makefile
.PHONY: clean test whatever
```

## Conditional Directives

Makefiles support conditional directives that allow us to specify different rules depending on the value of a variable or the existence of a file. You'll probably see this used most often for versioning and cross-platform compatibility support (where building for a different platform means using different source files).

Here's a simple, straight-forward example:

```makefile
ifdef DEBUG
  CFLAGS = -g -Wall
else
  CFLAGS = -O2 -Wall
endif
```

In this example, we use the `ifdef` directive to check if the `DEBUG` variable is defined. If it is defined, we set the `CFLAGS` variable to include debugging symbols (`-g`). Otherwise, we set it to optimize the code (`-O2`). To set the `DEBUG` variable, we could have explicitly defined it inside the Makefile, or we could have exported it in the shell's environment.

At this point, it'd be a good idea to look at other Make built-ins...

## Make Built-ins

Make has many built-in functions that can be used to manipulate strings, perform arithmetic, etc. Let's look at a few of the most common and useful ones. For a full accounting of these functions, one can learn about all of them in the [GNU Make documentation](https://www.gnu.org/software/make/manual/make.html).

### wildcard

The `wildcard` function can be used to search for files that match a certain pattern. For example:

```makefile
SOURCES := $(wildcard *.c)
```

This will set `SOURCES` to a space-separated list of all files in the current directory that end in `.c`.

### patsubst

The `patsubst` function can be used to perform pattern substitution on a string. For example:

```makefile
SOURCES := $(wildcard *.c)

OBJECTS := $(patsubst %.c, %.o, $(SOURCES))
```

This will set `OBJECTS` to a space-separated list of all files in `SOURCES`, but with the `.c` extension replaced with `.o`. Earlier I hinted could leverage `wildcard` and `patsubst` to make our working example more efficient. Here's the updated example:

```
project/
├── Makefile
├── src/
│   ├── file1.c
│   ├── file2.c
│   └── file3.c
```

```makefile
CC := gcc
CFLAGS := -Wall -Wextra -pedantic -std=c17
TARGET := program

SOURCES := $(wildcard src/*.c) # Grab all .c files in src/
OBJECTS := $(patsubst %.c, %.o, $(SOURCES)) # Make a list of all .c filenames from src/ but with .o

%.o: src/%.c # Run this rule for each source file
	$(CC) $(CFLAGS) -c $< -o $@

$(TARGET): $(OBJECTS) # TARGET depends on all of the object files - one for each .c file in src/
	ar rcs $@ $^

.PHONY: clean # Our phony rule for cleaning up the build artifacts
clean:
	rm program src/*.o
```

### foreach

The `foreach` function can be used to iterate over a list of values and perform an action on each one. For example:

```makefile
DIRECTORIES := src include lib

make-dirs:
  $(foreach dir, $(DIRECTORIES), mkdir -p $(dir);)
```

This will create the directories `src`, `include`, and `lib` if they do not already exist. The breakdown here is:

```makefile
target:
  $(foreach arg, args-list, command $(arg);)
```

### ifeq

The `ifeq` function can be used to conditionally execute a block of Makefile code. For example:

```makefile
ifeq ($(CC), gcc) # Are we using gcc?
  CFLAGS += -std=c99
endif
```

This will add the `-std=c99` flag to the `CFLAGS` variable if the `CC` variable is set to `gcc`. Pretty straight-forward.

## Running External Commands from Make

In an earlier example, we saw usage of the `echo` command inside of a rule. It's often useful to run external commands as part of a build process. We can do this for many simple commands by simply referencing the command. You'll typically want to prefix the command with `@` so Make knows to execute the command, and _not_ print the command itself to stdout:

```makefile
all:
  @echo "beginning build..."
```

But what if you need output from some external command _inside_ of the Makefile? For example, let's suppose we want to include the current date and time in the output of a build. We can use the `$(shell)` function to execute the date command and capture its output:

```makefile
BUILD_DATE := $(shell date)

all:
  @echo "Build completed on $(BUILD_DATE)"
```

Here, the `$(shell)` function is used to execute the `date` command and assign its output to the `BUILD_DATE` variable. The variable can then be used in a rule to include the date and time in the output.

Again, the `@` symbol before the echo command will prevent the command itself from being printed to the terminal. Only the output (Hello, world!) will be printed. This is useful for keeping the output of your Makefile clean and concise. If you have a lot of commands being run, you may not want to clutter the output with the commands themselves.

## Rules Can Be Fun?!

### The $(MAKE) Directive

Sometimes it's necessary for one rule in a Makefile to call another rule. This can be done using the `$(MAKE)` directive, which tells Make to invoke itself recursively with the specified rule. For example, let's say we have two rules, `build` and `deploy`, and we want the `deploy` rule to invoke the `build` rule before executing. Here's how we would do that:

```makefile
build:
  ./do_build

deploy:
  $(MAKE) build
  ./do_deploy
```

Here, the deploy rule calls the `$(MAKE)` directive with the build rule as its argument. Make will then recursively invoke itself with the `build` rule, and once that is complete it will continue with the `deploy` rule.

### Private Rules?

Now suppose we have some setup logic we need to perform before running several different targets:

```makefile
build:
  # build commands

test:
  # test commands

release:
  # packaging commands

setup_files:
  # commands to setup files needed by build, test, and release
```

Do we really need users running `setup_files` from the command-line via `make setup_files`? What if we want to have this rule because it's shared — and it's convenient to only write it once — but we don't necessarily want others to be able to invoke it through `make`?

Well, unfortunately, Make does not have private rules. However, there's a trick you can use to approximate the same behavior:

```makefile
build: --setup_files
  # build commands

test: --setup_files
  # test commands

release: --setup_files
  # packaging commands

# private rule
--setup_files:
  # commands to setup files needed by build, test, and release
```

By prefixing the "private" rule with `--`, we take advantage of the fact that command-line flags are passed with two hyphens — thus, invoking `make --setup_files` results in `make: unrecognized option '--setup_files'`. Not too shabby.

### Passing Arguments to Rules

It can be very useful to pass arguments from one rule to another rule in a Makefile. This can be done using inline variable declarations and the `$(var)` syntax to expand them. In the following example, the rule `foo` accepts an argument `arg`, which is set inline to the string `hello world` by the rule `bar`.

```makefile
foo:
  @echo "Foo argument: $(arg)"

bar:
  @$(MAKE) foo arg="hello world"
```

To pass arguments to a rule from _outside_ of the Makefile, simply reference a variable that you've set via the command-line:

```makefile
BIN_NAME ?= program # BIN_NAME defaults to "program"

all:
  gcc main.c -o $(BIN_NAME)
```

Invoking `make` would produce a binary called `program`, while invoking `BIN_NAME=app make` would produce a binary named `app`.

## Using Multiple Makefiles

In larger projects, it is common to split the Makefile into multiple files for better organization. This can be done using the `include` directive.

Let's assume we have the following directory structure:

```
project/
├── Makefile
├── src/
│   ├── file1.c
│   ├── file2.c
│   └── file3.c
└── include/
    ├── header1.h
    ├── header2.h
    └── header3.h

```

Now suppose we'd like to split the Makefile into multiple smaller Makefiles and include them in our main Makefile.

For example, we can create a `sources.mk` file that specifies the source files and a `headers.mk` file that specifies the header files. Then, we can include these files in the main Makefile using the `include` directive like so

```makefile
# Makefile

# Include the sources and headers Makefiles
include sources.mk
include headers.mk

# Compiler and linker flags
CC := gcc
CFLAGS := -Wall -Wextra -pedantic -std=c17
LDFLAGS := -L.

# Target executable
TARGET := program

# Object files
OBJS := $(SRCS:.c=.o)

# Rule to build the executable
$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) $(LDFLAGS) -o $@ $^ -lutil

# Rules to build object files from source files
%.o: %.c $(HEADERS)
	$(CC) $(CFLAGS) -c $< -o $@

.PHONY: clean

clean:
	rm -f $(OBJS) $(TARGET)
```

```makefile
# sources.mk

# Source files
SRCS := src/file1.c src/file2.c src/file3.c

```

```makefile
# headers.mk

# Header files
HEADERS := include/header1.h include/header2.h include/header3.h
```

In this example, the `sources.mk` file specifies the source files, and the `headers.mk` file specifies the header files. These files are then included in the main Makefile using the `include` directive. The main Makefile defines the compiler and linker flags, the target executable, and the object files. It also includes the rules to build the executable and the object files from the source files.

Using the `include` directive allows you to split your Makefile into smaller, more manageable pieces, which can make it easier to maintain and understand your build system.

Note that `include` more specifically tells Make to suspend reading the current Makefile and read one or more other Makefiles before continuing. This means if we were to place actual rules in `sources.mk` or `headers.mk`, they _could_ be run depending on what they are. Keep this in mind when composing Makefiles together.

## Conclusion

Well, that was a lot. This has been a distillation of things that took me several tries and many projects to grasp. Ultimately, the best way to learn any tool is to get your hands dirty, so I recommend applying the knowledge in this guide by using Make in your next project. Remember, while Make is most often used for C projects, it's language agnostic. Hell, you could even leverage Make to automate something that has nothing to do with code (sort of analogous to how various government agencies [use Git](https://government.github.com/community/#:~:text=Government%20agencies%20at%20the%20national,GitHub%20to%20share%20and%20collaborate.))!

And if you really want to step up to the current industry standard, I recommend looking at [CMake](https://cmake.org/), a build system _generator_ that is often used to _generate Makefiles_.
