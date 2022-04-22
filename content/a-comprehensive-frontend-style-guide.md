---
title: 'Rules to Die on a Hill By: A Decisive JavaScript Style Guide'
cover: images/cardew.jpg
coverAlt: Chaos and order. An excerpt from Cornelius Cardew's "Treatise"
description: 'I recently made the biggest change of my career – switching from tabs to spaces. But why stop there? Today, I rationalize my code style decisions over the years.'
datePublished: '04/19/2022'
category: 'programming'
tags:
  - frontend
  - javascript
  - software engineering
  - static analysis
---

I recently made one of the most significant changes of my career[^1] — switching from tabs to spaces. But why stop there? Today, I rationalize my code style decisions over the years. These rationalizations aren't going to work for everyone (hence _A_ Comprehensive Guide, not _The_ Comprehensive Guide), but my hope is this guide gives you an starting point for thinking about these ostensibly mundane concerns.

[^1]: No, not really.

> It doesn't matter as long as you're consistent.
>
> – _Everyone ever_

Across the frontend ecosystem, we so often hear that _"It doesn't matter which one you choose — just be consistent"_, but for me this is and always has been _not good enough_. The reality is, when you are working on a highly-collaborative project at scale, it _does_ matter.

Yes, your style decisions _matter_. Whether you use tabs or spaces, semicolons or not — these things affect your projects and the people who work on them. My take is your code style should be driven by concerted and deliberate decision-making that is equally utilitarian and appropriate for the technologies being used, and the people using them. That is, it's not the chosen style itself that matters, but the process by which you arrived at that decision.

Let's begin!

> Disclaimer: Some programming languages such as Go have style codified into the language.
> Other languages such as C necessitate style by virtue of the compiler (e.g. semicolons). ECMAScript, however, notoriously has not codified code style into its language specification, thus this guide is concerned only with JavaScript and TypeScript codebases.

## Tabs versus Spaces

Tabs have canonically been used for indentation and are the default indent character across UNIX systems. This tradition hails from terminals and teletypes wherein the character meant 'move to the right 8 columns'. The resulting ASCII tab character is here used as a compression mechanism — 8 space characters, on the contrary, take up more space in a file.

Tabs also support visual configurability. For instance, I can adjust my IDE or text editor such that tabs have the appearance of 2 spaces. Meanwhile, another developer on my team might prefer 4 spaces and adjust their local environment in-kind. In source-control, the indentations are encoded as a tab character (decimal character code of `9`), ensuring a source-of-truth in bytes but not necessarily appearance.

If tabs are arguably _designed for indentation_, why should we prefer spaces?

Well, that visual configurability turns out to be as much a bane as it is a boon. Tabs might appear as 2 spaces in one environment and 8 in another. Meanwhile 2 spaces is always just...2 spaces.

In JavaScript, we're less concerned with the tab character as an entity that affects the interpreter. What's more important is _how_ the character appears. The implied problem here is different programs have different settings for tabs. In my editor, the character appears to be expressed over 2 columns. Meanwhile, in source-control it's 4. Furthermore, in my _other_ text editor, tabs are 8 columns. Unlike Python, tabs are meaningless when interpreted by a JavaScript engine.

**The Verdict**

Prefer two spaces as it is:

- a deliberate indicator of indentation
- visually consistent across editors and source control
- compact (nobody enjoys scrolling a mile to the right when reading nested control-flow)

**Supporting Tools**

- [eslint no-mixed-spaces-and-tabs](https://eslint.org/docs/rules/no-mixed-spaces-and-tabs#no-mixed-spaces-and-tabs)
- [eslint no-tabs](https://eslint.org/docs/rules/no-tabs#no-tabs)
- [prettier tabs](https://prettier.io/docs/en/options.html#tabs)
- [editorconfig indent_style, indent_size](https://editorconfig.org/)

## Semicolons

Why do we have semicolons in the first place? Well, requiring them makes compilers easier to write! But why do we use them _in JavaScript_?

> Because C uses them.

Ha. Yeah, okay.

You're probably familiar with ASI (Automatic Semicolon Insertion), but in case you aren't, ASI is a compile-time convenience whereby the compiler or interpreter automatically inserts semicolons. Because ASI ensures JavaScript statements contain semicolons where necessary, their use by the programmer is largely optional.

Here's a few other languages for which semicolons are optional:

- python
- go
- ruby
- groovy
- scala

As far as ASI in JavaScript is concerned, here's the gist of it:

_Insert when..._

_a. The parser encounters a token disallowed by the formal grammar, **and** encounters a line break or closing brace._

```js
x = 1 y = 2
// Uncaught SyntaxError: Unexpected identifier
```

_b. A line break is found after one of the following tokens._

- postfix `++` / `--`
- `continue`
- `break`
- `return`
- `yield`, `yield*`
- `module`

The preceding list enumerates what are known as _restricted productions_. You see, part of JavaScript's ASI algorithm is syntactical forms (so-called _restricted productions_) which forbid a newline character from occurring at a certain point. Note this passage from the [ECMAScript 2015 spec](https://262.ecma-international.org/7.0/#sec-rules-of-automatic-semicolon-insertion):

> If the phrase “[no LineTerminator here]” appears in the right-hand side of a production of the syntactic grammar, it indicates that the production is a restricted production: it may not be used if a LineTerminator occurs in the input stream at the indicated position.

Restricted productions is why the following returns `undefined`.

```js
;(() => {
  return

  {
    x: 'y'
  }
})()
```

Whereas this next example returns `{ x: 'y' }`.

```js
;(() => {
  return {
    x: 'y',
  }
})()
```

For further reading, see the [full three rules](https://tc39.es/ecma262/#sec-rules-of-automatic-semicolon-insertion) for ASI in the spec.

> "Programs are meant to be read by humans and only incidentally for computers to execute."
>
> – _Donald Knuth_

Today's compilers are smart enough to handle multi-line statements, and today's programmers are more than capable of recognizing EOLs via consistent whitespace formatting (which you should be using).

Let's omit semicolons for the sake of brevity, only including them where necessary.

Ah, and here's a simple heuristic for the _where necessary_ part:

> Use a _leading_ semicolon when the line begins with one of the following characters: `+=[(/`

For example, here's some code where we'll need to use a semicolon no matter what.

```js
let fn = function () {
  /* ... */
}[(1, 2, 3)].forEach() // TypeError: undefined is not a function
```

The restricted productions will bite you in the ass regardless of whether you use semicolons, so you'll still have to remember this rule.

**The Verdict**

Semicolons in JavaScript are superfluous, except when they're not. In those situations, ASI can still bite you either way. Let's instead be deliberate with our use of semicolons, employing them only when necessary.

**Supporting Tools**

- [eslint semi](https://eslint.org/docs/rules/semi)
- [typescript-eslint semi](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/semi.md)
- [prettier semicolons](https://prettier.io/docs/en/options.html#semicolons)

## Double vs Single Quotes

Always a fan of concision, you can probably guess I prefer single quotes in my JavaScript.

On your standard fare [QWERTY keyboard](https://en.wikipedia.org/wiki/QWERTY), double-quotes require a keypress combination of `Shift`+`'`. Contrast that with single quotes, which require a single keypress. A common argument in favor of double-quotes is the need to escape quote characters within a string literal. However, the number of extra keystrokes needed to accommodate escaping a quote character is negligible when considering the number of keystrokes you'll conserve by using single-quotes.

My rule here is to simply use double-quotes when I'm typing a string literal containing a single-quote.

```js
const str1 = 'this is a string that required less keystrokes to type'

const str2 =
  "this is a string that contains a ' character. instead of using \\ to escape it, I use double quotes."
```

Using double-quotes only when escaping `'` characters also has the added benefit of conveying intention. The rare occasion of a double-quoted string in your codebase will stand out immediately as a string literal that contains quote characters.

As an aside, prefer back-ticks for interpolated or multi-line strings.

**The Verdict**

Prefer single quotes, unless typing a string literal that contains single quote characters, then use double quotes. Use back-ticks for string interpolations, multi-line strings, and the occasional [tagged template function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates).

JSX properties should use double quotes, however — both to maintain parity with common HTML conventions and to demarcate JSX templates from JavaScript business logic.

**Supporting Tools**

- [eslint quotes](https://eslint.org/docs/rules/quotes.html)
- [typescript-eslint quotes](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/quotes.md)
- [prettier quotes](https://prettier.io/docs/en/options.html#quotes)

eslint:

```json
rules: {
  "quotes": ["error", "single"]
},
overrides: [
  {
    "files": ["**/*.{ts,tsx}"],
    "rules": {
      "@typescript-eslint/quotes": ["error", "single"],
      "quotes": "off"
    }
  }
]
```

prettier:

```json
{
  "singleQuote": true
}
```

## Line Length

Line length, in this context not to be confused with exact characters per line, describes the approximate width in columns before a line should begin to wrap. I believe this is a rather important rule to die on a hill by as it dramatically affects code readability. A line of code should not endure so long that, on your average monitor, the reader must scroll horizontally.

As for actual width, here's a [great article](https://javinpaul.medium.com/does-column-width-of-80-make-sense-in-2018-50c161fbdcf6) that points out the [archaic 80-column rule](https://en.wikipedia.org/wiki/Punched_card) is especially anachronistic and not exactly grounded in today's technologies.

That said, I still stick with 80 characters. As you may have noticed, I just said _average monitor_ moments ago without clarifying an exact or even approximate monitor size or resolution. I kept it vague because statistics aside, I'm not going to presume what monitor size prevails across my team at work or peers online.

You should discuss this rule with your peers to decide what works best. So long as your decided width accommodates the majority of monitors without the need for tons of scrolling, you're compliant with this guide.

**The Verdict**

80 columns for me, but this number should be derived from whatever for you and your team accommodates using visual real estate effectively without causing horizontal overflow.

**Supporting Tools**

- [eslint max-len](https://eslint.org/docs/rules/max-len#max-len)
- [prettier printWidth](https://prettier.io/docs/en/options.html#print-width)

eslint:

```json
{
  "max-len": ["error", { "code": 80 }]
}
```

prettier:

```json
{
  "printWidth": 80
}
```

> Note the eslint and prettier rules mentioned above are not equivalent, as noted in prettier's `printWidth` documentation.

## Bracket Spacing

How often do you see this in modern JavaScript codebases?

```js
const obj = { a: 1, b: 2 }

function x() {
  console.log({ obj })
}
```

Yeah, I don't see it much either. There's a reason for that: _minification_.

Compact bracket spacing is a remnant of a JavaScript ecosystem where whitespace mattered when sending files over the wire. Fortunately, almost every framework and build tool has minification integrated into it. Whether you're building a full-fledged React app or minifying your vanilla JS with Terser, you're stripping whitespace around brackets by the time your code is in production. Minification is an easy opt-in across most modern JavaScript toolchains.

What we're left with is a style that is generally less readable.

**The Verdict**

Yes, download size matters. Unless you're not using minification, prefer whitespace between brackets.

**Supporting Tools**

- [eslint object-curly-spacing](https://eslint.org/docs/rules/object-curly-spacing)
- [typescript-eslint object-curly-spacing](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/object-curly-spacing.md)
- [prettier bracketSpacing](https://prettier.io/docs/en/options.html#bracket-spacing)

eslint:

```json
rules: {
  "object-curly-spacing": ["error", "always"]
},
overrides: [
  {
    "files": ["**/*.{ts,tsx}"],
    "rules": {
      "@typescript-eslint/object-curly-spacing": ["error", "always"],
      "object-curly-spacing": "off"
    }
  }
]
```

prettier:

```json
{
  "bracketSpacing": true
}
```

## Trailing Comma

This is yet another one on which I've completely flipped in recent years. In my estimation, the following is rather awkward.

```js
const points = {
  x: 12,
  y: 13,
  z: 14,
}
```

Previously, my argument for the utility of omitting trailing commas has been that the omission more plainly conveys that a given property is the last in an object.

Looking back, I think _Wow, what an absurd argument_ — as though we can't perceive that by the fact that _the last property is the last property_. We don't need an additional visual aid to convey that. And so, I've changed my tune.

Sure, the trailing comma looks a bit awkward, but my inner John Stuart Mill says the utility of the trailing comma far supersedes the cleanliness (rather, lack thereof).

That is, there's a utilitarian argument to be made for the trailing comma.

First, ease of access. This has personally bit me innumerable times while writing and updating code.

Consider this theme object from this blog's code back when I was still anti-trailing comma. It changed very often.

```js
const darkTheme = {
  colors: {
    font: {
      primary: 'rgb(206, 166, 186)',
      secondary: 'rgb(206, 166, 186)',
      hover: 'rgb(47, 43, 69)',
    },
    bg: {
      primary: 'rgb(25, 23, 37)',
      secondary: 'rgb(47, 43, 69)',
      tertiary: 'rgb(214, 102, 149)',
    },
    border: {
      primary: 'rgb(100, 102, 140)',
    },
    link: 'rgb(75, 187, 172)',
    scroll: {
      fg: 'rgb(214, 102, 149)',
      bg: 'rgb(100, 102, 140)',
    },
  },
}
```

I can't tell you how many times I tried to add or amend a property here and I've had to backtrack with my keyboard to include a missing comma. I can attest to the convenience of trailing commas from anecdotal experience, for sure.

Not convinced? Let's look at the second and more important reason to favor the trailing comma: _Git diffs_.

If you're contributing to an open source or enterprise codebase, you're undoubtedly using a version control tool such as git. If you're not...uh, I'd love to [hear from you](mailto:exbotanical@gmail.com).

Let's see what happens in a Git diff when you add a single line to a no-trailing-commas codebase:

```diff
const darkTheme = {
  colors: {
    font: {
      primary: 'rgb(206, 166, 186)',
      secondary: 'rgb(206, 166, 186)',
      hover: 'rgb(47, 43, 69)'
    },
    bg: {
      primary: 'rgb(25, 23, 37)',
      secondary: 'rgb(47, 43, 69)',
      tertiary: 'rgb(214, 102, 149)'
    },
    border: {
      primary: 'rgb(100, 102, 140)'
    },
    link: 'rgb(75, 187, 172)',
    scroll: {
-     fg: 'rgb(214, 102, 149)'
+     fg: 'rgb(214, 102, 149)',
+     bg: 'rgb(100, 102, 140)'
    }
  }
}
```

I don't know about you, but seeing a line of code that was already there pop out _twice_ while reviewing a PR is just obnoxious. I can't immediately discern whether the penultimate line was actually an addition.

Duplicate this several times over across a single PR and you've got a mess on your hands that is difficult to read at best and greedy for cognitive overhead at worst.

Meanwhile, the diff for a trailing comma version of this codebase would look like this:

```diff
const darkTheme = {
  colors: {
    font: {
      primary: 'rgb(206, 166, 186)',
      secondary: 'rgb(206, 166, 186)',
      hover: 'rgb(47, 43, 69)',
    },
    bg: {
      primary: 'rgb(25, 23, 37)',
      secondary: 'rgb(47, 43, 69)',
      tertiary: 'rgb(214, 102, 149)',
    },
    border: {
      primary: 'rgb(100, 102, 140)',
    },
    link: 'rgb(75, 187, 172)',
    scroll: {
      fg: 'rgb(214, 102, 149)',
+     bg: 'rgb(100, 102, 140)',
    },
  },
}
```

That's better. I know immediately that `scroll.bg` was the addition here.

Much like the aforementioned legacy bracket spacing argument, you may recall that trailing commas in object literals was once not valid JavaScript. Beginning with ECMAScript 5, however, trailing commas in object literals [are legal](https://tc39.es/ecma262/multipage/ecmascript-language-expressions.html#prod-ObjectLiteral).

Near-ubiquitous transpilers like [Babel](https://babeljs.io/) will remove the trailing comma in transpiled code, so you don't need to worry about this one in legacy browsers.

I also prefer this rule for arrays:

```js
const arr = [1, 2, 3]
```

And function parameters:

```js
function x(first, middle, last) {
  /* ... */
}
```

Though, a comma must not appear after a 'rest' element:

```js
function x(first, middle, last, ...all) {
  /* ... */
}
```

**The Verdict**

Prefer trailing commas in object literals, arrays, and function parameters. It makes it easier to add properties and results in cleaner, more readable diffs. If targeting legacy browsers, use a transpiler such as Babel to ensure trailing commas are stripped from transpiled code.

**Supporting Tools**

- [eslint comma-dangle](https://eslint.org/docs/rules/comma-dangle)
- [eslint comma-spacing](https://eslint.org/docs/rules/comma-spacing)
- [eslint comma-style](https://eslint.org/docs/rules/comma-style#comma-style)
- [prettier trailing-commas](https://prettier.io/docs/en/options.html#trailing-commas)

eslint:

```json
{
  "comma-dangle": ["error", "always"],
  "comma-spacing": ["error", { "after": true, "before": false }],
  "comma-style": ["error", "last"]
}
```

prettier:

```json
{
  "trailingComma": "all"
}
```

## Conclusion

There you have it, my rules to die on a hill by. I actually have many, many more, but this article is already long enough. Even if you disagree with my takes on these contentious issues, my hope is you'll draw inspiration to adopt a more decisive approach to code style when maintaining a JavaScript or TypeScript codebase.

As a frontend lead, it's my job to think about these things so my team doesn't have to. Of course, the final decision should always be a collective one, or at least your team should feel comfortable suggesting a change. I'm a big believer in static analysis tools and I can confidently say that proper tooling can make or break a collaborative codebase. Despite my sardonic perspective on the _just be consistent_ adage, I should clarify that, yes, whatever you decide to do what ultimately matters is that you do it consistently.

### Shared Configurations

I've codified the above rules plus many more sensible defaults into shared configurations for eslint and prettier. They're installable via NPM, and you're welcome to use them in your projects (or copy mine and amend them to your liking). If using prettier in conjunction with eslint, please remember to use [eslint-config-prettier](https://prettier.io/docs/en/integrating-with-linters.html) to mitigate conflicts between the two tools.

To use my [eslint configurations](https://github.com/MatthewZito/eslint-config):

JavaScript:

```bash
npm i -D eslint @magister_zito/eslint-config-javascript
```

```json
// .eslintrc
{
  "extends": ["@magister_zito/javascript"]
}
```

TypeScript:

```bash
npm i -D eslint @magister_zito/eslint-config-typescript
```

```json
// .eslintrc
{
  "extends": ["@magister_zito/typescript"]
}
```

React:

```bash
npm i -D eslint @magister_zito/eslint-config-react
```

```json
// .eslintrc
{
  "extends": ["@magister_zito/react"]
}
```

Vue:

```bash
npm i -D eslint @magister_zito/eslint-config-vue
```

```json
// .eslintrc
{
  "extends": ["@magister_zito/vue"]
}
```

To use my [prettier configurations](https://github.com/MatthewZito/prettier-config):

```bash
npm i -D prettier @magister_zito/prettier-config
```

```json
// .prettierrc
"@magister_zito/prettier-config"
```

To integrate prettier with eslint:

```bash
npm i -D eslint-config-prettier
```

And amend `.eslintrc`

```diff
{
  "extends": [
-    "@magister_zito/typescript"
+    "@magister_zito/typescript",
+    "prettier"
  ]
}
```

Perhaps I'll write a post about writing your own extensible eslint configurations. Interested? Drop me a note and [let me know](mailto:exbotanical@gmail.com). See you next time.
