# TODOs

- [x] replace string literals which can be set in site config
- [x] relocate mocks to JSON files
- [x] refactor site config
- [x] fix Category + Time to Read text-wrap
- [x] fix tags text-wrap
- [x] unlink images
- [x] fix color on share links
- [x] deduplicate related posts (see: Ida Applebroog example)
- [x] wrap text in post excerpts
- [x] test ability to navigate back from pages
- [x] test dark mode / theme toggle
- [x] fix accessibility violations
- [x] add 404 page or redirect
- [x] fix share icons' color loss
- [ ] replace console statements w/logger (f. custom Console)
- [ ] variable font (vendored)
- [ ] implement gists (short prose, essays)
- [ ] fix GraphQL date resolution
- [x] add avatar
- [x] add site logo
- [ ] vendor icons
- [x] add rel canonical
- [x] fix skeleton loader bg
- [x] add share cta
- [x] fix blockquote font
- [x] add full copyright
- [x] generate post description
- [x] ~~auto title~~
- [x] dark mode for images
- [x] fix footnotes alignment
- [x] fix tags alignment
- [x] ensure datePublished in future posts are not rendered (use query filter)
- [x] fix mobile responsivity
- [x] change SHARE section
- [x] add YT and remove Twitter
  - [ ] Add feature flags?
- [ ] Update Java post
- [ ] Fix colors (some don't update when toggling modes)
- [ ] Fix syntax highlighting in light mode (it's black and difficult to see)

## Dependencies

- [x] switch to pnpm
- [ ] resolve `validateDOMNesting` via `remark-unwrap-images`
- [ ] gatsby 4 caching and performance optimizations
- [ ] upgrade to React 18
- [ ] Upgrade to Gatsby 5

### Cypress

- [x] test site logo, once added
- [ ] assert on share links formatting
- [ ] parallelize
- [ ] cron job to smoke test in different browsers

## Misc

- [x] attempt to create reusable workflow for pnpm scripts (again)
- [ ] convert to true monorepo via pnpm workspaces
