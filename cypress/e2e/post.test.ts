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
      'An exploration of the Canterbury Scene, as heard through the sound of the Soft Machine',
      { selector: 'p' },
    ).should('exist')

    cy.findByAltText('An image of musician Robert Wyatt').should('exist')

    cy.findByText('An image of musician Robert Wyatt', {
      selector: 'figcaption',
    }).should('exist')
  })

  it('renders post metadata (post info)', () => {
    cy.get('p')
      .contains(/⋅ Jan [0-9], 2021 ⋅ 2 min read/)

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
    cy.get('article > p').contains('Some test text')
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
    const expected: [string, RegExp][] = [
      ['a[href="/andrea-zittel"]', /^Andrea Zittel$/],
      ['a[href="/lorem-ipsum-3001"]', /^Lorem Ipsum 3001$/],
    ]
    cy.get('[data-testid=related-posts] > div > div')
      .children()

      .each(($el, idx) => {
        cy.wrap($el).find(expected[idx][0]).contains(expected[idx][1])
      })
  })
})
