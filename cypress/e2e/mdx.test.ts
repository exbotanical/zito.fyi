const POST_PATH = '/my-favorite-soft-machine-records/'

describe('mdx rendering', () => {
  before(() => {
    cy.visit(POST_PATH).waitForRouteChange()
  })

  beforeEach(() => {
    cy.get('article').as('post')
  })

  it('renders heading elements', () => {
    cy.get('@post')
      .find('h1[id="h-1"]')
      .find(`a[href="${POST_PATH}#h-1"]`)
      .contains('H1')

      .get('@post')
      .find('h2[id="h-2"]')
      .find(`a[href="${POST_PATH}#h-2"]`)
      .contains('H2')

      .get('@post')
      .find('h3[id="h-3"]')
      .find(`a[href="${POST_PATH}#h-3"]`)
      .contains('H3')

      .get('@post')
      .find('h4[id="h-4"]')
      .find(`a[href="${POST_PATH}#h-4"]`)
      .contains('H4')

      .get('@post')
      .find('h5[id="h-5"]')
      .find(`a[href="${POST_PATH}#h-5"]`)
      .contains('H5')

      .get('@post')
      .find('h6[id="h-6"]')
      .find(`a[href="${POST_PATH}#h-6"]`)
      .contains('H6')
  })

  it('has a table of contents', () => {
    const testHeaderAnchor = (headerName: string, headerId: string) => {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.get(`p > a[href="#${headerId}"]`)
        .contains(headerName)
        .click()
        .wait(100) // Sometimes cypress borks on DOM rerender
        .isInViewport(`#${headerId}`)
    }

    testHeaderAnchor('Headers', 'headers')
    testHeaderAnchor('Emphasis', 'emphasis')
    testHeaderAnchor('Lists', 'lists')
    testHeaderAnchor('Links', 'links')
    testHeaderAnchor('Images', 'images')
    testHeaderAnchor(
      'Code and Syntax Highlighting',
      'code-and-syntax-highlighting',
    )
    testHeaderAnchor('Blockquotes', 'blockquotes')
    testHeaderAnchor('Inline HTML', 'inline-html')
    testHeaderAnchor('Horizontal Rule', 'horizontal-rule')
    testHeaderAnchor('Line Breaks', 'line-breaks')
    testHeaderAnchor('YouTube Videos', 'you-tube-videos')
  })

  it('renders emphasis elements', () => {
    cy.get('@post')
      .find('em')
      .contains(/^asterisks$/)
      .get('@post')
      .find('em')
      .contains(/^underscores$/)

      .get('@post')
      .find('strong')
      .contains(/^asterisks$/)
      .get('@post')
      .find('strong')
      .contains(/^underscores$/)

      .get('@post')
      .find('strong')
      .contains('asterisks and ')
      .find('em')
      .contains(/^underscores$/)

      .get('@post')
      .find('del')
      .contains(/^Scratch this\.$/)
  })

  it('renders list elements', () => {
    cy.get('@post')
      .find('div > ol > li > p')
      .contains(/^First ordered list item$/)

      .get('@post')
      .find('div > ol > li > div > ul > li')
      .contains(/^Unordered sub-list\.$/)

      .get('@post')
      .find('div > ol > li > div > ol > li')
      .contains(/^Ordered sub-list$/)

      .get('@post')
      .find('div > ol > li:last-child() > p')
      .should('have.length', 2)

      .get('@post')
      .find('div > ul > li')
      .contains(/^Unordered list can use asterisks$/)

      .get('@post')
      .find('div > ul > li')
      .contains(/^Or minuses$/)

      .get('@post')
      .find('div > ul > li')
      .contains(/^Or pluses$/)
  })

  it('renders links', () => {
    cy.get('@post')

      .find('a[href="https://www.google.com"]')
      .contains(/^I'm an inline-style link$/)

      .get('@post')
      .find('a[href="http://www.example.com"]')
      .contains(/^http:\/\/www\.example\.com$/)
  })

  it('renders images', () => {
    cy.get('@post')
      .findByAltText('local picture')
      .should('have.class', 'gatsby-resp-image-image')

      .get('@post')
      .findByAltText('nature photo of crashing waves')
      .should(
        'have.attr',
        'src',
        'https://source.unsplash.com/1600x900/?nature,water',
      )
  })

  it('renders code blocks', () => {
    cy.get('@post')
      .find('span > code[class*="language-text"]')
      .contains(/back-ticks around/)

      .get('@post')
      .find(
        'pre[class*="language-javascript"] > code[class*="language-javascript"]',
      )
      .contains('JavaScript syntax highlighting')

      .get('@post')
      .find('pre[class*="language-python"] > code[class*="language-python"]')
      .contains('Python syntax highlighting')

      .get('@post')
      .find('pre[class*="language-go"] > code[class*="language-go"]')
      .contains('Go syntax highlighting')

      .get('@post')
      .find(
        'pre[class*="language-no-highlight"] > code[class*="language-no-highlight"]',
      )
      .contains('No language indicated, so no syntax highlighting')
  })

  it('renders tables', () => {
    cy.get('@post')
      .find('div > table  > thead > tr > th')
      .contains(/^Tables$/)

      .get('@post')
      .find('div > table  > thead > tr > th')
      .contains(/^Are$/)
      .should('have.css', 'text-align', 'center')

      .get('@post')
      .find('div > table  > thead > tr > th')
      .contains(/^Cool$/)
      .should('have.css', 'text-align', 'right')

      .get('@post')
      .find('div > table  > tbody > tr > td')
      .contains(/^col 3 is$/)

      .get('@post')
      .find('div > table  > tbody > tr > td')
      .contains(/^right-aligned$/)
      .should('have.css', 'text-align', 'center')

      .get('@post')
      .find('div > table  > tbody > tr > td')
      .contains(/^\$1600$/)
      .should('have.css', 'text-align', 'right')

      .get('@post')
      .find('div > table > tbody > tr > td > em')
      .contains(/^Still$/)

      .get('@post')
      .find(
        'div > table > tbody > tr > td > span > code[class*="language-text"]',
      )
      .contains(/^renders$/)

      .get('@post')
      .find('div > table > tbody > tr > td > strong')
      .contains(/^nicely$/)
  })

  it('renders blockquotes', () => {
    cy.get('@post')
      .find('blockquote  > p')
      .contains(/^Blockquotes are very handy/)

      .get('@post')
      .find('blockquote  > p')
      .contains(
        /^This is a very long line that will still be quoted properly when it wraps./,
      )
      .find('strong')
      .contains(/^Markdown$/)
  })

  it('renders inline HTML', () => {
    cy.get('@post')
      .find('dl  > dt')
      .contains(/^Definition list$/)

      .get('@post')
      .find('dl  > dd')
      .contains(/^Is something people use sometimes\.$/)
  })

  it('renders horizontal rules', () => {
    cy.get('div > hr')
      .parent()
      .next()
      .contains(/^Hyphens$/)

      .get('div > hr')
      .parent()
      .next()
      .contains(/^Asterisks$/)

      .get('div > hr')
      .parent()
      .next()
      .contains(/^Underscores$/)
  })

  it('renders videos', () => {
    cy.get('@post').find(
      'p > span > div.gatsby-resp-iframe-wrapper > div.embedVideo-container > iframe[src="https://www.youtube.com/embed/8AkLfYOgIrE?rel=0"]',
    )
  })
})
