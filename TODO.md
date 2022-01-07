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
- [x] add 404 page <!-- I'd rather redirect at the server -->
- [x] fix share icons' color loss
- [ ] replace console statements w/logger (f. custom Console)
- [ ] add self-hosted, variable font
  - [ ] add font properties
- [ ] implement gists (short prose, essays)
- [ ] resolve `validateDOMNesting` via `remark-unwrap-images`
- [ ] fix GraphQL date resolution
- [x] add avatar
- [ ] add site logo
- [ ] gatsby 4 caching and performance optimizations
- [ ] vendor icons
- [ ] add rel canonical
- [x] switch to pnpm

## Cypress

- [ ] test site logo, once added
- [ ] assert on share links formatting
- [ ] parallelize
- [ ] cron job to smoke test in different browsers

## Posts

- [ ] "People Who Write C"
- [ ] dev dependencies and JAMStack (everything is a dep because builds yada yada)
- [ ] Duff's Device
- [ ] How ESM Works Under the Hood
- [ ] XMLHttpRequest under the hood
- [ ] why prettier (lang server / vs code plugin) should have a mode that allows you to only auto-format code you've
just written (ignoring existing code in that file) to reduce producing convoluted git diffs that your coworkers have to deal with.
this makes sense anyway, because we can assume code that is being ignored was also formatted because this mode would have run the
formatter when it was written. this could all be much more efficient

- [ ] write a formatter with this mode ^

## Misc

- [ ] attempt to create reusable workflow for pnpm scripts (again)
