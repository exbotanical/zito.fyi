describe('post page', () => {
  before(() => {
    cy.visit('/my-favorite-soft-machine-records').waitForRouteChange()
  })

  it('renders a post intro', () => {
    // recall, Zito, we don't chain these assertions because we'd have to re-invoke `cy.get('body')` for each
    cy.findByText('My Favorite Soft Machine Records', {
      selector: 'h1',
    }).should('exist')

    cy.findByText(
      "This is another TEST post excerpt, used for testing with Cypress. We'll grab the text by searching for it on the DOM. This should be the…",
      { selector: 'p' },
    ).should('exist')

    cy.findByAltText('An image of musician Robert Wyatt').should('exist')

    cy.findByText('An image of musician Robert Wyatt', {
      selector: 'figcaption',
    }).should('exist')
  })

  it('renders post metadata (post info)', () => {
    cy.get('p')
      .contains(/⋅ Jan [0-9], 2021 ⋅ 3 min read/)

      .get('main')
      .then(container => {
        cy.findByRole('link', { name: 'music', container })
          .should('have.attr', 'href', '/category/music')

          .findByRole('link', { name: 'progrock', container })
          .should('have.attr', 'href', '/tag/progrock')

          .findByRole('link', { name: 'vinyl', container })
          .should('have.attr', 'href', '/tag/vinyl')
      })
  })

  it('renders the post / article', () => {
    cy.get('article > p').contains(
      "This is another TEST post excerpt, used for testing with Cypress. We'll grab the text by searching for it on the DOM. This should be the final sentence.",
    )
  })

  it('renders social links', () => {
    cy.findByRole('region', { name: 'Share on social media' })
      .as('shareSection')

      .get('@shareSection')
      .findByText('SHARE')

      .get('@shareSection')
      .get('button[aria-label="facebook"]')
      .get('@shareSection')
      .get('button[aria-label="twitter"]')
      .get('@shareSection')
      .get('button[aria-label="reddit"]')
      .get('@shareSection')
      .get('button[aria-label="linkedin"]')
  })

  it('renders related Posts', () => {
    /** @todo no text if no posts */
    cy.findByText('RELATED POSTS')
      .next()
      .children()
      .first()
      .children()
      .find('a[href="/andrea-zittel"]')
      .contains(/^Andrea Zittel$/)

    cy.findByText('RELATED POSTS')
      .next()
      .children()
      .first()
      .children()
      .find('a[href="/lorem-ipsum-3001"]')
      .contains(/^Lorem Ipsum 3001$/)
  })
})
