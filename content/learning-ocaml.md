---
title: 'Corundum and the Dromedary'
cover: images/mythologies.jpg
coverAlt: The cover of Roland Barthes' Mythologies
description: 'Thoughts on learning Ocaml; Kotlin, v8, and other affairs'
datePublished: '2024-04-22T08:00:00.000Z'
category: 'programming'
tags:
  - programming languages
  - ocaml
  - kotlin
---

## Of Ocaml

Well, it's already April and I've allowed far too much time to pass since my last post. Recently, in equal part due to watching too many Primeagen videos and wanting to learn a more traditionally functional programming language, I decided to learn Ocaml. Ocaml was created in 1996 by a squad of French computer scientists as an extension of the Caml ML dialect with object-oriented features. While there's certainly some aspects of Ocaml I've come to really quite appreciate, I don't anticipate I'll be incorporating it into my usual repertoire. Also, learning Ocaml solidified for me a notion that Kotlin has perhaps the most superior grammar I've ever seen in a programming language. Thus, I'd like to take a few moments to talk a bit about Ocaml (and what gripes I've thus far accumulated for it), laud Kotlin, and share about my burgeoning forays into the v8 JavaScript engine.

The first thing that threw me off about Ocaml was its `let` assignments. There's no statements in Ocaml - everything is an expression. Variables and functions are declared with `let`, which I suppose is an FP thing where everything is a first-class expression that can be passed around.
As someone who typically defaults to function declarations (for example, I _don't_ prefer function expressions in JavaScript unless absolutely necessary - and such necessity is something for which I cannot at this moment conjure up any examples), this aspect of Ocaml felt strange. Almost everything in Ocaml uses type inference, because Ocaml is a truly strongly-typed language (unlike TypeScript where you can wantonly lie to `tsc` and do bizarre things that fall outside the confines of traditional Set theory). So here's an Ocaml function:

```ocaml
let fn arg =
  let local_var = 1 in
  arg + 1
```

Ocaml will infer the argument `arg` to be of type `int`. In many cases, however, the Ocaml compiler is unable to infer the argument type, so you'll use a type declaration syntax. By the way, all Ocaml functions are curried, so here's a multi-argument function:

```ocaml
let (arg1: string) (arg2: int) =
  blablabla...
```

Currying isn't anything new, but I like that Ocaml builds this in by default. Partial function application is trivial and it makes every multi-argument function far more versatile.

If you've never written (or read) Ocaml code, you're probably wondering what the `in` is all about. Understanding this bit of syntax was really confusing, and to be honest, the docs weren't all that helpful in this regard either. After some trial and error and online reading, I eventually figured it out. Essentially, the syntax is saying `let some_value = expr1 in expr2`, where the conspicuous lack of `expr2` in the first example is supplanted with the current scope. As [this](https://stackoverflow.com/a/73319917) SO comment quite succinctly explains, Ocaml binds the result of `expr1` to the pattern (here `some_value`), then evaluates `expr2` with the new bindings present. In practice, that looks like

```ocaml
let x = 2 in x + 1
(* x is 3 *)
```

Yes, it's weird. Ocaml's grammar is very odd. Ocaml's semicolon treatment is also very odd, and kind of stupid; it almost feels arbitrary because of the sheer complexity of the rules around which you'll need an explicit semicolon to terminate an expression. In Ocaml, semicolons are not optional - they're necessary, but only when the Ocaml compiler can't figure out where an expression ends. The situations in which this can arise are surprisingly numerous, and if you use a semicolon outside one of these situations, you'll run into a compiler error.

```ocaml
let found_top_level =
  try Hashtbl.find top_level name
  with Not_found ->
    notfound := true;
    let item = { version = satisfied_v; url = satisfied.dist.tarball } in
    Hashtbl.add top_level name item;
    item
in
```

You'll also need semicolons to delimit list elements

```ocaml
dependencies =
  [
    ("@magister_zito/eslint-config-vue", "^0.15.0");
    ("@typescript-eslint/eslint-plugin", "^5.48.1");
    ("@typescript-eslint/parser", "^5.48.1");
    ("jsonc-eslint-parser", "^2.1.0");
    ("yaml-eslint-parser", "^1.1.0");
  ];
```

And record fields:

```ocaml
Lock.upsert
  (name ^ "@" ^ v_constraint)
  {
    version = satisfied_v;
    url = satisfied.dist.tarball;
    shasum = satisfied.dist.shasum;
    dependencies = satisfied.dependencies;
  };
```

As a new Ocaml user, your workflow will involve a feedback loop of guessing where the semicolon needs to go whenever your LSP starts bitching at you. In some languages, by contrast, the semicolon as a syntactical terminator is extremely rare (e.g. Python, where it _can_ be used to terminate statements but canonically is not). In others, like C, they're required at the end of every statement. In languages like JavaScript, where you have ASI (automatic semicolon insertion), you very seldom _must_ use a semicolon (like when writing an array literal, or an immediately-invoked function expression aka IIFE). It's optional - you can choose to use them a la C, or only when absolutely necessary (which, again, is rare).

But Ocaml...honestly, I would go so far as to say this aspect of Ocaml is outright stupid. The language requires semicolons enough that it would behoove the Ocaml developer experience to just require them everywhere. But alas, in Ocaml, we need the lack of semicolon for the implicit `in <current expression>` and for implicit returns (think Rust), et al. The language just owes itself to a very precarious balancing act of semicolons and a lack thereof.

Another unexpected aspect of Ocaml is that `let` "assignment" is actually a pattern matching affair. This is accentuated by the ubiquitous entry-point `let () = ...` (effectively the `main` function of an Ocaml program). In Ocaml, `()` is the `Unit` type, and thus `let () = ...` matches on everything and always executes. Ocaml also has a `match` statement that I won't delve into because it's essentially the same thing as what you have in Rust, or Kotlin's `when` but with more powerful pattern-matching semantics. It's quite awesome.

What got me thinking about Kotlin was the inability to do explicit returns in Ocaml. Most of the time in Ocaml, if you need to early-exit from a function, you're fucked. That's not a thing in the FP paradigm; you either use exhaustive pattern-matching or you must use `if...else` branching - all branches must return the same type. I ran into this when learning Ocaml and ended up with a nasty combination of `if...else` and `match` and all the nesting bullshit that comes with it. Kotlin, however, elegantly blends the power of FP canon with the liberal expressiveness afforded by the OOP lineage in the form of labeled return statements:

```kotlin
listOf(1, 2, 3).forEach {
  if (it == 3) return@forEach
  println(it)
}
```

## Of Kotlin

It was in this moment that I realized how much I've come to appreciate Kotlin's grammar. I say _grammar_ specifically here because I am largely not too fond of JVM languages. I find Java to be rather clunky and the surrounding ecosystem, build systems, and package managers moreover are an utter catastrophe. But for whatever reason, the language designers of Kotlin nailed the grammar on almost every account. Writing Kotlin is an absolute pleasure. Sometime last year, Kotlin swept across teams at AWS and mine adopted it for a new greenfield system we were building. I learned Java during the month between my hire and start dates at Amazon, then began using it daily therein. One year later, I was able to learn Kotlin such that I was writing code proficiently within one day. It took perhaps a couple weeks to master the more complex aspects i.e. coroutines, generics, etc. Kotlin offers an incredibly efficient adoption process, mostly because its grammar is simple.

Before I proceed any further, I've a digression I must make. A few years prior to my arrival at Amazon, my team had taken a similar albeit short-lived excursion into Scala. A small portion of one of our legacy codebases was written in Scala, and one day I had to understand that portion in order to debug a Sev2 issue I had encountered while on-call. It was utterly baffling: cute, esoteric syntax. Myriad strange keywords with no analogous counterparts in any popular language. Weird lexical bindings that seem to appear out of nowhere. And worst of all, a complex grammar that would make the likes of Noam Chomsky explode. My personal Litmus test for a programming language is as follows:

> Can I understand _generally_ what this code is doing, just by reading it?

If yes, then the language's grammar is very likely sound, or at least sensible. If no, the language's grammar is very likely obscenely esoteric and over-complicated. The likelihood that it's a shitty language is also, incidentally, much higher. I've not written Scala, but from my brief encounters with it, I'm not particularly impressed. Ostensibly - at least - it's a bad idea.

Anyway, Kotlin isn't like Scala. The grammar is simple and legible. Most of my team at AWS picked it up very quickly, which I believe is a testament to the language itself. Nowadays, I often find myself wishing for Kotlin's syntactical graces when writing code in other languages. Just the other day I was writing some infrastructure code in TypeScript and while writing a `switch` statement, I thought _"Isn't it so unfortunate that JavaScript doesn't have a `switch` **expression**?"_" In Kotlin you can do:

```kotlin
val x = when {
  expr1 -> "a"
  expr2 -> "b"
  else -> "c"
}
```

But in dumpy old JavaScript, we're stuck with this:

```ts
let val: string

switch (expr) {
  case 1:
    val = 'a'
    break
  case 2:
    val = 'b'
    break
  default:
    val = 'c'
    break
}
```

Boo!

Kotlin also improves upon Java in myriad ways. While I'll confess that quickly bootstrapping from nothing to a runnable program in _any_ JVM language is a pain, when solely considering programming, Kotlin is a remarkable improvement over Java. There's so much ceremony and boilerplate involved with Java code, and this is further compounded by inane ideas like the Spring framework, which is essentially a collection of "magical" abstractions which are almost always more complex than is necessary for the scope of the consuming project. But with Kotlin, classes and functions can be terse and minute. Look at how dumb simple this is:

```kotlin
interface D
class X : D

class Y(val x: String) : D  {
  fun main() {
    println(x)
  }
}

fun main () {
 	val y = Y("gello")
    y.main()
}
```

Versus the 4 files required in Java:

```java
// D.java
public interface D {}

// X.java
public class X implements D {}

// Y.java
public class Y implements D {
  private String x;
  Y(String x) {
    this.x = x;
  }

  public void main() {
    System.out.println(this.x);
  }
}

// Main.java
public class Main {
  public static void main(String[] args) {
    Y y = new Y("gello");
    y.main();
  }
}
```

## Of Ruby

Another thing I love is that Kotlin did away with checked exceptions. I've long since loathed the idea of checked exceptions for several reasons, among them that it forces you to reckon with exceptions using `try/catch` blocks which inevitably and almost invariably encourage bad programming practices. The Kotlin docs have a [section](https://kotlinlang.org/docs/exceptions.html#checked-exceptions) dedicated to this. Kotlin also fixes Java's type system, controlling null references, eliminating array variance, implementing proper function types (not that SAM interface bullshit Java does), demarcating read-only versus mutable collections, etc.

But things haven't always been lovely like this at Amazon (this is my segue into Ruby). I'll share a little story. Once upon a time, AWS realized that writing infrastructure by hand was exceedingly difficult. Handwritten Cloudformation templates are challenging if not impossible to test; they can be verbose and repetitive and it's easy to make mistakes. The not-at-all-new notion of writing infrastructure with code (see: [Infrastructure as Code](https://aws.amazon.com/what-is/iac/) aka IaC) seemed the obvious solution. So AWS engineers decided to write a framework for doing IaC, one that could be used by the entirety of Amazon Web Services - by this I mean the Lambda, DynamoDB, ECS, SQS, SNS, CloudWatch, IAM, et al teams would be writing their software infrastructure using this library.

So what do the guys in the AWS build tools team decide to use for this framework that will be used by thousands of engineers to build the infrastructure on which a considerable chunk of the internet runs on? Fucking Ruby.

In a moment of brilliant clarity, the AWS build tools team concocted the bane of every AWS SDE's existence: LPT, or Live Pipeline Templates. I can't delve into the inner-workings (because it's an internal library), but this is what preceded the AWS CDK. You heard that right: before AWS CDK, every AWS team had to write all of their infra using Ruby.

I'd never used Ruby prior to my tenure at Amazon, and I will certainly never use it again thereafter. It's the absolute most disgusting, awful language. It's dynamically typed, uses esoteric syntax, has a gazillion keywords; it's impossible to tell what is part of the standard library versus just part of the grammar (which is a glaring sign of feature bloat); the build system is a nightmare and is almost never reproducible from machine to machine; it's painfully slow; it's burdened with seemingly endless "cute" syntactic sugar. It's horrible to work with and I also learned that IDE/LSP support for Ruby is completely in the gutter. I absolute despise Ruby; I hate it, I hate it, I hate it.

It is absolutely baffling to me that AWS engineers thought this was a good idea. In my dazed confusion, I went spelunking on Amazon's internal search and found a discussion thread where several SDEs wrote to the build tools team to inquire about the mystifying reasoning that led to their thinking that Ruby was a good choice, and after a few lengthy exchanges, they simply confessed that they regretted doing so.

## v8

Language rants aside, I've been delving into the v8 source code as of late because I want to see for myself how JavaScript can be implemented. I've read many articles and watched a few lectures on the underlying implementations of, say, Promises and the micro-task queue, but I've come to terms that I won't be satisfied until I've read the source code myself. Most reading materials focus quite heavily on the v8 compilers and the optimizations for which v8 is well known. This is understandable, but I would like to read about the JavaScript implementation itself: how does the prototype chain really work in practice (beyond some cursory musings about linked list lookups)? Promises (beyond abstract notions of queues and state machines)? What about the translation layer? I remember reading Ryan Dahl's original implementation of Node and finding it remarkable that much of the standard library was, in fact, implemented as a thin JavaScript API in front of the underlying C++ machinations we all know about.

![v8 engine logo](images/v8.png)

As far as I can tell, v8 is a marvel of software engineering; an incredible feat and the cumulative product of some 2 or 3 decades of Lars Bak's work on Self. It's impressive - albeit intimidating - but I will nevertheless be back soon with some source code reviews of v8's JavaScript implementation. See you next time.
