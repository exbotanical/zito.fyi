---
title: 'The Java Ecosystem is Broken'
cover: images/kasamets.png
coverAlt: 'Udo Kasamets, Timepiece for a Solo Performer (1964)'
description: 'Java is a great language with a terrible ecosystem. Why is it so awful, and what can be done about it?'
datePublished: '10/27/2022'
category: 'programming'
tags:
  - java
  - software engineering
---

This last year, I added Java to the list of languages I've worked with in a professional capacity, having first learned it in preparation for my current job at AWS. I read several books on Java — two for which I couldn't offer a more sincere recommendation: _Java: Concurrency in Practice_ by Brian Goetz, and _Effective Java_ (Third Ed.) by Joshua Bloch. I'd also highly recommend Venkat Subramaniam's excellent live talks (which can be found on YouTube). I learn by doing, so for my first endeavor I wrote a Java [server framework](https://github.com/exbotanical/mug) — complete with its own trie-based multiplexer and spec-compliant CORS library — that leverages several distinct features unique to the language. At this point, I can tell whether I enjoy a language and I knew I really loved Java.

Java is a fascinating language, its history mired in woes of transactional enterprise interference and a stubborn commitment to backwards compatibility. Like most languages Java's history has shaped it, and I found it accessible and easy to learn in part due to JavaScript being its syntactic successor.

Java has a rich and diverse standard library and the APIs therein are for the most part intuitive and useful. Its rich support for meta-programming via reflection and annotations lends to one of the more unique programming paradigms I've seen in my tenure as an avid aficionado of language design. Its concurrency package `java.util.concurrent` provides ample facility to craft the most granular synchronization policies, and moreover includes plenty of utilities that can do this for you.

That said, unlike many Java programmers, I didn't learn Java at university, nor was it my first language. I came to Java with staunchly-held opinions I'd crafted over several thousand hours of programming across a spectrum of JavaScript, TypeScript, Python, C, and Go. Something you learn after some time with code is that all these ostensibly incredible feats of software engineering you once marveled at as a neophyte were made by idiosyncratic people just like you, with their own baggage of historical context, less-than-ideal workarounds, weird resource constraints, and sometimes outright mistakes.

I used to think, for example, that the Unix tradition was infallible. It is only several Linux distros later that I think yes, Unix is beautiful but it's also ludicrously over-complicated and burdened by its hierarchical processes system, sloppy permissions handling, and bizarre file descriptor management. This is to say when I learned Java, I brought with me a discriminating perspective from which I encountered the one aspect of Java that I must confess — _I completely despise_.

## The Java Ecosystem is Terrible

> Most Java programmers look at the engineering world from the vantage-point of Java, and thus do not realize just how awful the Java ecosystem is.

This is my most outstanding gripe about Java: the ecosystem is _fucking terrible_. Let's start with build systems. The vast majority of Java build systems (e.g. Ant, Maven) stubbornly continue to champion the bulky, antiquated XML, which is notoriously verbose and exceedingly difficult to read. Although Gradle graduated to leveraging JVM languages (i.e. DSL) for configuration files, the documentation (we'll get to Java documentation momentarily) is poor and the overall structure of the configurations it lends to is even worse (how about that convoluted tasks system?).

There seems to be little consensus around package management in Java; sometimes you include a compiled jar file, other times you use the build system's repositories (for which the necessary configurations are inanely overcomplicated). I suspect most Java programmers don't really understand how their projects are actually being compiled — and who can blame them? A terrifying majority of Java build configuration involves copy-pasting with no explanation (again, we'll get to documentation soon enough) and hoping it works.

While we're on the subject of Maven, let's not forget the entire framework makes your build entirely network-dependent. One can't imagine maintaining a Maven-based build configuration is even tenable long-term. Even worse, the way Maven repositories work lends to some pretty ridiculous issues, like how GitHub's Maven service [requires](https://github.com/orgs/community/discussions/26634#discussioncomment-5023588) you place your private access token inside of the Maven build config (which is checked into source-control) in order to merely _read_ a package. To be fair, this is more of a GitHub issue, but it counts when talking about the Java ecosystem.

### It Gets Worse...

The Java ecosystem's tooling beyond build systems seems only to get worse. If you look at the standard fare for static analysis in the Java ecosystem, you'll be left disappointed — especially if you're coming from the JS ecosystem, rich with simple, idiomatic, and easily-configurable tools such as ESlint and Prettier.

Take Checkstyle, for example. If you don't want to be using the default _Sun Code Conventions_ config — perhaps you'd prefer _Google Java Style_ — you'll be annoyed to find doing so is complicated to an absurd degree. In order to swap out default configs, you'll have to scour several GitHub issues to find the answer: pulling down the config itself and placing it in an OS-specific directory that varies depending on which build system is managing your plugins. Most project maintainers seem to give up here, instead opting to vendor a local copy of the config inside their project, then referencing it via a relative path. I did this with the aforementioned [_mug_](https://github.com/exbotanical/mug), because I knew were anyone to contribute, they likely wouldn't have the same system configurations as I. This is all considering the fact that the Checkstyle docs lie and imply you can simply reference these configs as built-ins.

If you're up for excavating the Checkstyle documentation for a few hours, you might even learn how to write your own config. But then, when you run into a single line that needs to be ignored, you'll have to write yet another config (a `checkstyle-suppressions.xml`), where you'll need to tell the tool _precisely_ which line numbers to ignore. This isn't maintainable because line numbers are liable to change. You'd think Checkstyle would utilize magic comments like ESLint does seeing how it already must parse your code, but it doesn't. To emphasize the point, this is how you'd disable a line with ESLint:

```ts
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const result: T[keyof T] = Reflect.get(target, key, receiver)
```

Whereas with Checkstyle, in an external file:

```xml
<suppress
  checks="MethodParamPad"
  files="TestUtils.java"
  lines="32" />
```

It's not the verbosity that I'm frustrated with. Yes, XML is terrible and any system without a protocol-dependent use case for it should instead opt for one of the many more modern, palatable formats often used for configuration files (JSON, YAML, TOML, hell even the target language itself). It's that this methodology of disabling rules by specifying line numbers in a separate config is entirely unmaintainable and is inextricably tied to every single edit you make to the target file. Per the above example, add a single line to `TestUtils.java` and you'll need to go spelunking for line numbers so you can update your suppressions file in-kind.

But let's get to the Holy Grail of the Java ecosystem — the excruciating punishment we're apparently content on doling out to thousands of our peers: _documentation_.

## (Can't) Read the Friendly Manual

> Java documentation is the ecosystem's most laughable failure.

Let's begin what will surely amount to a diatribe by first acquiring some much-needed context: let's talk about _JSDoc_.

JSDoc is a markup language used to annotate JavaScript (and occasionally TypeScript — although by virtue of being typed, it tends to be relatively self-documenting) code. It's simple and intuitive and is typically used in the JS ecosystem to annotate public APIs such that IDE language servers pick up said annotations and make them visible to the programmer.

```ts
/**
 * Converts an MDX node containing Post metadata into a Post object
 * @param mdxNode The MDX node containing Post metadata
 * @returns A Post object
 */
export function mdxNodeToPost(mdxNode: MdxNode): Post {
  /* ... */
}
```

_A JSDoc comment_

What JSDoc is _not_ as often used for is generating documentation. Sure, you have tools like _API Extractor_, which supports a superset of JSDoc syntax for the purposes of generating documentation files, but I've only ever witnessed serious projects utilize this tool _in conjunction with_ actual handwritten documentation. See, generated documentation in the JS ecosystem is ancillary to handwritten docs, if used at all.

But then, we have _Javadoc_.

> JSDoc was inspired — in part — by Javadoc, the bane of the Java ecosystem.
> For whatever reason, the Java community thought generated documentation via Javadoc was sufficient to document literally everything, _if they documented at all_.

I'm not sure from which pocket of Hell this prevailing tradition of exclusively documenting packages with only generated documentation derived. While not exclusive to Java, there exists no ecosystem comparable in ubiquity that does this. Somewhere along the lines, somebody decided that documenting Java with programmatically generated comments hailing from sparse annotations was sufficient; that massive libraries could simply expect programmers to understand the intricate complexities of their APIs by reading emaciated code comments often written as after-thoughts to sate the whinings of an opinionated Checkstyle config.

Even when Java packages contain handwritten documentation, it appears the norm is to use context-specific examples bereft of any mention as to _why_ some API was used therein. Mockito and JUnit are keen on this, offering entire pages of examples in which explanations of the APIs being utilized are conspicuously absent. Surprisingly, Spring's maintainers seem to have recognized this, and thus host one of the few bastions of semi-decent documentation in the barren, auto-generated wasteland that is the Java ecosystem. Still, when I am trying to learn how to use a Java library, I most often just end up reading the source code.

Perhaps the most egregious offender here is the AWS SDK public documentation. AWS is a complex ecosystem of many, many services and yet, the documentation for wielding this ecosystem consists of anemic examples such as _"How to list DynamoDB tables"_. If you want to understand what the APIs being used in these examples actually do, you'll have to peruse the Javadoc and hope for the best. Trust me, you're better off just reading the source code.

Javadoc is a scourge because clearly, the entire Java community is content with using it as primary documentation. And that's completely unacceptable.

## Too Much "Magic"

Another significant problem with Java is the sheer amount of "magic" it enables — and the ecosystem seems to have no qualms about abusing it. Largely, this is encouraged by Reflection in conjunction with Annotations, as added in Java 8 — and Spring is the top offender here. In fact, nearly the entirety of Spring's public API is littered with this concept of decentralized, heavily distributed objects that are bound by an unseen container "god object".

Spring applications are almost impossible to reason about without having a keen understanding of Spring's most complex inner-workings (which, to be fair, already appears to be a common criticism among Java programmers); there's no apparent entrypoint to the program, and many features are configured for you internally. This is massively problematic. You've got a framework where just installing it means you've opted-in to a plethora of complex and often unnecessary features.

And configuring these aforementioned features is an exceedingly difficult task. For example, check out the Spring Security documentation and see if you can find _anything_ on configuring Cookies-based authentication without the use of static HTML pages served by Spring. In fact, scour Google, StackOverflow, YouTube, and public GitHub repos [^1]. You won't find anything. And you might say this isn't a problem, but _it is_, because Spring Security purports to be

> ...a powerful and highly customizable authentication and access-control framework [and] ... the de-facto standard for securing Spring-based applications.

with

> ...optional integration with Spring Web MVC

This is a lie. If you cannot configure the most basic authentication protocols without opting in to MVC, then MVC is not optional. The fact that it's near-impossible (and I only clarify _"near"_ here because I'm still wondering if someone out there has actually figured it out) to use Cookies-based authentication in any industry-standard manner with Spring Security is ridiculous. I suppose Spring Security is great if you seriously think configuring a full-stack application with a Spring-controlled client is ever going to work in a half-serious production environment. Even worse, the Spring "suite" in general is often configured with our old friend — XML files!

At this point, I have to acknowledge a few things because I'm not a jerk (at least, I'm not trying to be one). Spring is an incredible feat of software design. It's clever — brilliant, even — and I've no doubt the maintainers and team behind Spring are extremely talented programmers. It's a powerful, flexible framework that handles even the most complex tasks swiftly and _correctly_.

However, this is a thought-post about the Java _ecosystem_, and — in the context of the preceding section of my rant — the subsidiary Spring ecosystem. It's the ecosystem that's a problem, and the way that so many new programmers start their web development journey using Spring and never seem to leave it behind or fully grasp its expansive complexities.

Take `@Autowired`, for example. Most Spring-minded web developers I've met don't even understand what this annotation does beyond _"makes thing available here, somehow"_. They might know about Spring's IoC container, but they couldn't justify _why_ this design model is necessary, or when. They just know that if you use the annotation, _"thing works"_. And that's a terrible perspective to have as a programmer. The ecosystem encourages this.

In my opinion, Spring is useful when it's needed — and _when_ it's needed is only discernible if you've stepped outside of its large reach. Unfortunately, the community seems fixated on fetishizing heavy abstractions to accomplish even the most simple goals.

This _"using a sledgehammer to crack a nut"_ ethos seems to be pervasive throughout the Java ecosystem.

## What Do We Do About This?

So what do we do about this? How can we possibly take a decades-old tradition of insanity and provide the kind of ecosystem Java deserves? I'm not presumptuous enough to say I've the right prescription, but I do have a few ideas:

### 1. Stop using XML

Java programmers should opt to use JSON or a domain-specific language in lieu of XML, wherever possible. For new Spring projects (assuming you even _need_ Spring), for example, use Java-based Bean configurations — not only are they more dynamic and powerful, they're leagues more readable than their XML counterparts.

Consider adopting a more modern build system. I appreciate there's a considerable amount of complexity in systems such as Maven, and refactoring to consume JSON is likely untenable. Therefore, there is incentive for new build systems to emerge. I'd love to one day build one.

### 2. De-incentivize Javadoc

Reliance on solely Javadoc for documentation is — put simply — a bad practice. Repositories should incentivize some form of documentation other than just Javadoc. Tools such as [_Vitepress_](https://vitepress.vuejs.org/) have streamlined documentation in the frontend JS ecosystem; Java would benefit from something similar. Maintainers should take pride in their projects' usability by crafting documentation intended for humans.

### 3. Use and provide simple, idiomatic libraries for web development

Much like modern build systems, there's a giant opportunity for developers to create simple, idiomatic libraries for web development. Instead of a titanic all-in-one framework like Spring, I'd love to see more novel paradigms such as the composition-based server-building introduced by node's express library. Go has excellent little \*mux libraries for routing. Python's Flask is, in my opinion, at once perfectly useful and adequately hands-off for building servers. Surely, there are comparable Java libraries out there — we should be using them. And building them.

I appreciate the task I'm undertaking here by describing what can be done to fix an entire ecosystem, but I sincerely believe we should be talking about it. We've seen tools such as NPM emerge as an exemplar of great package management solutions by way of incessant critique and intense scrutiny from the consuming community. Java is still widely used, but the ecosystem is archaic. I'll do my part to try and contribute to what I hope will one day be a massive paradigm shift. I hope this post inspires you to do the same.

[^1]: Update 3/2023: Now that ChatGPT is a thing, I asked it how to configure Cookies-based authentication with Spring. First, it recommended using a static HTML page managed by Spring Security. I asked it to answer again, but NOT using a static HTML page managed by Spring. It gave me the same answer.
