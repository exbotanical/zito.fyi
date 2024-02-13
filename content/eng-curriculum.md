---
title: 'Self-Taught Engineer Curriculum'
cover: images/gnu-make.png
coverAlt: TODO
description: 'My Personal Curriculum for Self-Taught Software Engineers'
datePublished: '4029-11-01T07:00:00.000Z'
category: TODO
tags:
  - TODO
---

# WIP

This document houses a curriculum I've ~~put together~~ been putting together for aspiring self-taught software engineers. It's a collection of learning resources I've used over the years to teach myself what I know today.

Why should you bother listening to me? Why should you bother with this curriculum over something else?

First, let's get credentials out of the way. I went from a homeless heroin addict with zero career prospects (I'll save that story for another day) to architecting and programming complex distributed systems at a massive scale for one of the largest software companies in the world. I don't have a college degree and I don't have a formal computer science background. I appreciate that in many ways I'm an outlier, but I truly believe that if you dedicate every ounce of your energy to this like I did, you can do this, too.

Second, let's get real: this will be _hard_. It should be. Computing has never been easy, and with the advent of new hardware, it only gets more difficult. Your first year, you should be spending at least 40 hours per week learning - whether that's reading, writing programs, talking about programming - any time you'd be spending doing something not productive you should instead spend doing this. That's how I did it. If you're not able to be obsessive about this, this probably isn't the curriculum for you.

Third, let's define some axioms around this.
i. Work the hardest on the things that are the hardest. This has been my personal mantra for a long while and it hasn't failed me. If you find a subject challenging, devote even more time to it. If you find a subject easy, you can set it aside for a while and focus on something that isn't easy.

ii. Prefer deep fundamentals. The biggest mistake new software engineers make is jump straight into a framework like React. Sure, this isn't going to be the death of your potential career, but if you want to stand out as a great engineer you're going to need to know how this stuff works under the hood. I started as a frontend engineer but I was learning C and OS design because I knew I needed to have a firm grasp on this stuff. You'll be much better at frontend engineering if you understand how browsers work, how JavaScript transpilation works and why it's needed, why GUIs tend to be "single-threaded", etc.

iii. Read the thing, then do it. Repeat.
I can't tell you how to learn (this is something everyone does differently), but I'm pretty confident you won't get anywhere if you're not _doing_. Software engineering is very much a doing sport. Learn about some subject, then put it into practice. I highly recommend erring on the side of project-based learning and not wasting time with things like Advent of Code or LeetCode. We'll get to algorithms and data structures later; you neither will appreciate nor understand these things well if you start with them.

iv. For courses, do all the homework assignments. You should get stuck, then un-stuck. This is the natural cycle of software engineering. Getting stuck is how you learn. Do it.

And now for the curriculum. This will start easy and get progressively more complex. You'll be amazed at how far you'll have come, trust me.

# Part 1 - Basic Computing

1.1 What is the internet
1.2 How the internet works
1.3 What is an operating system
1.4 Intro to comp-sci (Harvard's CS50): https://pll.harvard.edu/course/cs50-introduction-computer-science
(can find on YT)

# Part 2 - Programming

## JavaScript (dynamic typing, interpreted languages) - Frontend Focus

- Do the FreeCodeCamp Curriculum
- Intro HTML
- Intro CSS
- ZeroToMastery's JavaScript Bootcamp
- ZeroToMastery's Advanced JavaScript Bootcamp
- JavaScript: The Weird Parts https://www.udemy.com/course/understand-javascript
- Accessibility and ADA/WCAG
- Advanced HTML
- Advanced CSS and mobile-first

## JavaScript - General/Backend Focus

- Intro Nodejs (node is super UNIXy - good to learn about UNIX stuff in parallel here to get the most out of it) - https://www.udemy.com/course/understand-nodejs
- Learn NPM (first package manager for u)
- Will Sentance's Promises Series
- Intro to databases (Relational)
- Intro to databases (Document)
- Learn Expressjs, Mongodb
- Intro to ORM (mongoose)

## Dynamic, interpreted (Python)

- Intro: https://www.udemy.com/course/complete-python-developer-zero-to-mastery
- Hacking w/Python - https://www.udemy.com/course/learn-python-and-ethical-hacking-from-scratch/

## TypeScript - Soft Intro to Typed Languages

- Intro to TypeScript - https://www.udemy.com/course/typescript-the-complete-developers-guide/
- Mike North's TypeScript Series

# Part 2a - Intro to Shell

- What is a shell?
- Pipes and files
- Filesystems
- Learn basic UNIX programs (cd,pwd,cat,ls,sed,awk,grep)
- Learn bash (basics for now)
- Linux and parts of Linux (start with Ubuntu, then you will graduate to Arch later)
  - https://www.udemy.com/course/linux-administration-bootcamp/
- Cmdline Challenge by Jon Jarvis
- Advanced: Bash Like a Developer (Ted Lilley)

# Part 2b - Dev Tools Part 1

- What is a VCS and why do we need it
- Intro to Git and GitHub (Colt Steele is good here) - https://www.udemy.com/course/git-and-github-bootcamp
- Once you learn NPM, learn about static analysis tools
  - Prettier
  - ESLint
  - Use VSCodium or Vim
- Read: Bash In Easy Steps
- Bash init system and dotfiles (use GNU Stow)
- Window managers and desktop environments - Sway (Wayland) or i3 (X) (choose one)
- Learn about Open Source, GNU, Free Software, Licenses
- Man pages
- Read: Sed and Awk
- MIT Potpourri: https://missing.csail.mit.edu/2020/potpourri/

# History

- GNU and RMS
- General History of Computing
- Learn about Kernighan
- Learn about Dennis Ritchie and Ken Thompson
- Watch: https://www.youtube.com/watch?v=tc4ROCJYbm0

# Algos and DS

- stacks
- heaps
- tries
- search algos
- learn about encoding and why it matters
- huffman encoding (for funsies)

## Algos Pt 2: Standards

- Familiarize with IEEE, RFC structure, HTTP spec
- Read: CORS In Action
- Read: A Tanenbaum's Computer Networks
- Learn about token algo for rate limiting/throttling
- Learn how load balancers work (build one)

## C - Intro to Static Typing and Memory Management

- Intro to C (ByteGarage is a good starting point)
- Learn about concurrency through C (basically EVERY abhishek sagar/CSEPracticals Udemy course - these are fucking amazing)
- Learn POSIX threads impl
- Advanced C: https://www.udemy.com/course/advanced-c-programming-course/
- Advanced C Pointers: https://www.udemy.com/course/c-programming-pointers-from-zero-to-hero
- Read: Beej's Guide to Socket Programming

## More

- Read HTTP RFC
- Learn about TLVs
- RPC
- gRPC and why it exists
- endian-ness

# Part 3 - Systems

- Read: Operating Systems in Three Easy Steps
- Nat Tuck's CS3650: https://www.youtube.com/playlist?list=PLtg_A_3rzLAtBuwQp6mA3WveYw9Q7GzIZ
  - Notes: https://web.archive.org/web/20210423030302/https://ntuck-neu.site/2020-09/cs3650/
- Read: Computer Systems: A Programmer's Perspective
-
- Write a toy OS (lots of tutorials for this)
- Learn about process management
- Build a cron daemon (reference M Dillon's dcron)
- Build a custom thread pool library
- Linux Kernel Notes by Andries Brouwer https://www.win.tue.nl/~aeb/linux/lk/lk.html (a bit outdated but excellent nonetheless)
- Read: Linux Kernel Development
  Read: "What Every Computer Scientist Should Know About Floating-Point Arithmetic
  ": https://docs.oracle.com/cd/E19957-01/806-3568/ncg_goldberg.html
-

## Advanced Databases

- Learn about memory mapping
- Learn about b-trees
- Learn about Redis and caching dbs
- build a toy database
- Learn SQL and learn about indexes
- GraphQL and middle-ends

## Advanced JS

- Intro: https://www.udemy.com/course/advanced-javascript-concepts/
- Steven what's-his-name on Udemy (microservices course is solid)
- Watch Ryan Dhal's original Node talk
- Build tools:
  - Webpack
  - Vite/ESBuild
  - Try diff package managers e.g. yarn, pnpm

## Mathematics

- Khan Academy: Algebra 1
- Khan Academy: Algebra 2
- Khan Academy: Calculus
- Khan Academy: Multivariable Calculus
- Khan Academy: Linear Algebra

## Advanced Tools

- Docker & Kubernetes - https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/

## C Evolved: Now it's time to learn Go

- Intro course: https://www.udemy.com/course/learn-go-the-complete-bootcamp-course-golang
- Learn about coroutines

## Web Dev

- Intro: https://www.udemy.com/course/the-complete-web-developer-zero-to-mastery/

## Security

- TODO: Hacking resources here

## OOP - Learn JVM Langs

- Course (Java Bootcamp): https://www.udemy.com/course/the-complete-java-development-bootcamp/
- Read Gang of Four's Design Patterns
- Read Effective Java
- Read Java: Concurrency in Practice
- Learn Maven and build some projects (I did a server framework)
- Now learn Kotlin and Gradle concurrently to get a small taste of some functional too
- Read Elements of Kotlin Coroutines
- Watch YT OOP is Bad: https://www.youtube.com/watch?v=QM1iUe6IofM

## Memory Revisited: Rust

- Learn Rust (read the Rust book)
- Read Rust Zero to Production

## Advanced Frontend aka Ok Now You're Allowed to Learn a Framework

- Learn React
- Learn Vue so you can see why React sucks
- End up using htmx instead
- WASM (read the WASM C book - need title)

## System Design

- Course: https://www.udemy.com/course/rocking-system-design
- Designing Data Intensive Applications
- CAP Theorem
- Read: 500 lines or less series (also by same publisher, read Designing Open Source Applications pt 1 and 2)

## Theory

- Read: SICP
- Read: SICP JS version
- Intro to theoretical comp-sci
- State machines and Automata
- Lambda Calculus https://www.youtube.com/watch?v=c_ReqkiyCXo&list=PLDAqk5znTEXeQwDstVk5uzsNmj3RTMlVg&index=6
- Intro to discrete mathematics, computability theory, and complexity theory (CS103): https://web.stanford.edu/class/archive/cs/cs103/cs103.1184/
- Programming Languages Theory (CS242): https://stanford-cs242.github.io/f18/

## ML (you should go through all above sections before you arrive here - will take _at least_ 2-4 years)

---

## TODO

- Learn Forth (stack-based languages)
- Read POSIX standard: https://pubs.opengroup.org/onlinepubs/007904975/toc.htm
- https://stanford-cs242.github.io/f18/lectures/01-1-intro.html
- 15-445 - Introduction to Database Systems, CMU: https://www.youtube.com/playlist?list=PLSE8ODhjZXjaKScG3l0nuOiDTTqpfnWFf
- CS 121 (relational dbs) - http://users.cms.caltech.edu/~donnie/cs121/
- CS 677 - Distributed Operating Systems, Spring 16 - Umass OS: https://www.youtube.com/playlist?list=PLacuG5pysFbC68w0PW3huMHDDRNsDCTjp
- CPCS 663 -- Real-Time Systems: https://people.engr.tamu.edu/bettati/Courses/663/Video/presentation.html
- CSE 473 - Introduction to Computer Networks: https://www.youtube.com/watch?v=C2XMBTUP8bQ&list=PLjGG94etKypLTHWMQgokB3GxzydxnrYAx
- CS124 OS: https://www.youtube.com/playlist?list=PL3swII2vlVoVbav6FV98pidq6BsTN4u56
- 6.S081: Operating System Engineering: https://pdos.csail.mit.edu/6.828/2020/schedule.html
- CS 194: Advanced Operating Systems Structures and Implementation: http://www.infocobuild.com/education/audio-video-courses/computer-science/cs194-spring2013-berkeley.html
- Advanced Programming in the UNIX Environment: https://stevens.netmeister.org/631/
- OOP and UML: https://www.youtube.com/playlist?list=PLJ9pm_Rc9HesnkwKlal_buSIHA-jTZMpO

## Notes

- Don't buy _anything_ on Udemy unless it's $15 or less. Everything goes on sale eventually (and very, very frequently). The sales used to drop everything to $9.99 but I've noticed the lowest price is now around $12.99. Just don't pay full price.
- Most comp-sci books can be found for free. Just query '#book name here# pdf' and you're bound to find something.

C techniques: https://github.com/gurugio/book_cprogramming/blob/master/long-if.md

---

Review: Computer Systems: A Programmer's Perspective, 3 Edition

This book is absolutely essential for understanding how computers store, interpret, and process information. Part 1 is incredibly tedious albeit necessary (deep dives into bit representations, 2's complement, how floating point numbers are implemented); I had a rough go of this and had to read it a couple times. This isn't really the authors' fault - it's just tedious subject matter. I do think they could have offered an appendix on the proofs they just assume you'll know, but this was a minor inconvenience and I was easily able to Google the things I didn't understand.

The remainder of the book, however, is just incredible. The book walks you through assembly language and assemblers, has a great section on optimizations (think things like loop unrolling), and is punctuated by the obligatory discussion on concurrency, multi-tasking, etc, where I actually learned a couple of new things despite being very familiar with this subject.

I particularly enjoyed the depth here. Be warned, the authors don't hand-hold you and this is not a book for someone wanting a general skim-through of systems-level programming (if there ever was such a thing). Instead of a cursory overview of any given subject, you'll acquire a thorough understanding of each layer of computing starting at (close to) the lowest level. As an aside, I highly recommend reading this alongside Operating Systems: Three Easy Pieces.

Note: The paperback listing is the "global", or "international" edition. These "international" editions are typically a big letdown for comp-sci books, but I was pleasantly surprised that my gamble paid off here. I didn't notice any outstanding errors or print screw-ups. Worth the cost-savings IMO.
