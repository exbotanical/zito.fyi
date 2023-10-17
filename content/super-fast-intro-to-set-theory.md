---
title: 'A Super Fast Intro to Set Theory (for Developers)'
cover: images/gnu-make.png
coverAlt: TODO
description: TODO
datePublished: '2029-10-01T07:00:00.000Z'
category: TODO
tags:
  - TODO
---

I've always wanted to learn set theory because it's so utterly foundational when learning about programming language design, type systems, and problem-solving with computing more generally. In my journey to be a perpetual comp-sci student, here's what I learned about set theory:

## What is a set?

A set is an unordered collection of distinct
objects, which may be anything (including
other sets).

```
{1, 2, 3}
{a, b, c}
```

> Set notation: curly braces with commas between the elements.

Typically, these objects inside of a set are called "elements", or "members".
Note that we ignore duplicate elements such that

```
{1, 1, 1}
```

is the same as

```
{1}
```

## The empty set

The empty set contains no elements. The set theory folks use Ø to denote the empty set.

```
Ø == {}
```

## Set equality

Two sets are equal when they have exactly the same contents, order notwithstanding.

```
{a, b, b, c} == {a, b, c}
{1, 2, 3} == {2, 1, 3}
{a, d, c} != {a, b, c}
```

It's the same for nested sets:

```
Ø != {Ø}
1 != {1}
{} == Ø
{Ø, 1, 2} == {2, 1, {}}
```

## Membership

Given a set S and an object x, we write x ∈ S if x is contained in S, and x ∉ S otherwise.

∈ here means "member of"
and ∉ means "not a member of"

If x ∈ S, we say that x is an element of S.
Given any object x and any set S, either x ∈ S or x ∉ S.

### Infinite Sets

Some sets contain infinitely many elements. We denote this with an ellipses ...

```
{..., 1, 2, 3, ...}
```

There's a few common sets that use this:

- The set ℕ = { 0, 1, 2, 3, …} is the set of all natural numbers.
- The set ℤ = { …, -2, -1, 0, 1, 2, … } is the set of all integers.
  - Z here comes from the German "Zahlen", approximately meaning count, or number
- The set ℝ is the set of all real numbers. So we can say that e ∈ ℝ, π ∈ ℝ, 4 ∈ ℝ, etc

## Set Builder Notation

To describe complex sets such as "the set of all real numbers less than 500" mathematically, we use something called _set-builder notation_.

X = { n | n ∈ ℝ and n < 500 }

The `|` here means "such that"

so `{ n | n ∈ ℝ and n < 500 }` can be translated to:

A set of `n` such that `n` is a real number and `n` is less than 500.

Another example:

```
A = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
B = { x | x ∈ A and x is even }
```

In the above example, `B` is equivalent to `{2, 4, 6, 8, 10}`.

## Unions

We can join sets together. This is called a union. We denote unions with `∪`.

So if I say `A ∪ B`, what I mean is a set that contains the members of A and B.

```
A = { 1, 2, 3 }
B = { 3, 4, 5 }
A ∪ B = { 1, 2, 3, 4, 5 }
```

As always, we can collapse duplicates such that

```
X = { a, b, c }
Y = { a, b, d, e, f }
X ∪ Y = { a, b, c, d, e, f }
```

Proof

```
A ∪ B = { x | x ∈ A or x ∈ B }
```

## Intersections

On the flip side of unions, we have intersections. An intersection is a way to describe the common elements between two sets. We denote intersections with `∩`.

```
A = { 1, 2, 3 }
B = { 3, 4, 5 }
A ∩ B = { 3 }
```

Proof:

```
A ∩ B = { x | x ∈ A and x ∈ B }
```

## Symmetric Difference A Δ B

A = { 1, 2, 3 }
B = { 3, 4, 5 }
{ 1, 2, 4, 5 }

## Subsets and Power Sets

Proper subset (subset but not equal to whole set)

Set equal if both sets are subsets of each other

disjoint -> no els in common

```
A, B are disjoint if A ∩ B = Ø
```

Subsets
A set S is called a subset of a set T
(denoted S ⊆ T) if all elements of S are
also elements of T.

Subsets != Elements
We say that S ∈ T if, among the elements of T, one
of them is exactly the object S.
● We say that S ⊆ T if S is a set and every element
of S is also an element of T. (S has to be a set for
the statement S ⊆ T to be meaningful.)

Vacuously true
● A statement of the form
“All objects of type P
are also of type Q”
is called vacuously true if there are no objects of
type P.
● Vacuously true statements are true by definition.
This is a convention used throughout mathematics.

Power Sets

The notation ( ℘ S) denotes the power
set of S (the set of all subsets of S).
Formally, ( ℘ S) = { T | T ⊆ S }
or
"The power set S = T where T is subset of S"

℘(Ø) = {Ø}

℘({1, 2}) = {Ø, {1},{2},{1,2}}

If A has N els, power set has 2^N els

## Cardinality

The cardinality of a set is the number of
elements it contains.
● If S is a set, we denote its cardinality by
writing |S|.

|{1,2,3,4,5}| = 5
|{{1,2},Ø,5} = 3
|{ n ∈ ℕ | n < 150}| = 150

What is |ℕ|?
● There are infinitely many natural numbers.
● |ℕ| can't be a natural number, since it's
infinitely large.
● We need to introduce a new term.
● Let's define ℵ₀ = |ℕ|.
● ℵ₀ is pronounced “aleph-zero,” “aleph-nought,” or “aleph-null.”

Comparing Cardinalities

By definition, two sets have the same size
if there is a way to pair their elements of
without leaving any elements uncovered.
|S| < | ( ℘ S)|

If |S| is infinite, what is the
relation between |S| and | ( ℘ S)|?
Does |S| = | ( ℘ S)|?

If |S| = | ( ℘ S)|, we can pair up the elements
of S and the elements of ( ℘ S) without
leaving anything out.
If |S| = | ( ℘ S)|, we can pair up the elements
of S and the subsets of S without
leaving anything out'

No matter how we pair up elements of S and
subsets of S, the complemented diagonal won't
appear in the table.
● In row n, the nth element must be wrong.
● No matter how we pair up elements of S and
subsets of S, there is always at least one subset
left over.
● This result is Cantor's theorem: Every set is
strictly smaller than its power set:
If S is a set, then |S| < | ( ℘ S)|

Not all infinite sets have the same size!
● There is no biggest infinity!
● There are infinitely many infinities!

Relation to computing

A string is a sequence of characters.
● We're going to prove the following results:
● There are at most as many programs as there
are strings.
● There are at least as many problems as there
are sets of strings

The source code of a computer program is just a
(long, structured, well-commented) string of text.
● All programs are strings, but not all strings are
necessarily programs
|Programs| ≤ |Strings|

There is a connection between the number
of sets of strings and the number of
problems to solve.
● Let S be any set of strings. This set S gives
rise to a problem to solve:
Given a string w, determine whether w ∈ S.

Every computer program is a string.
So, the number of programs is at most the
number of strings.
From Cantor's Theorem, we know that there are
more sets of strings than strings.
There are at least as many problems
as there are sets of strings.
|Programs| ≤|Strings|< |Sets of Strings| ≤ |Problems|

|Programs| < |Problems|
There are more problems to
solve than there are programs
to solve them

Using more advanced set theory, we can
show that there are infnitely more
problems than solutions
In fact, if you pick a totally random
problem, the probability that you can
solve it is zero.
● More troubling fact: We've just shown
that some problems are impossible to
solve with computers, but we don't know
which problems those are!

Next Time
● Mathematical Proof
● What is a mathematical proof?
● How can we prove things with certainty

https://web.stanford.edu/class/archive/cs/cs103/cs103.1184/lectures/00/Slides00.pdf

Universal Set: everything

Absolute Complement: everything not in some set
x | x !e A
