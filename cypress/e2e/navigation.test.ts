const testPages = ['/', '/my-favorite-soft-machine-records']

for (const url of testPages) {
  describe(`main navigation on page ${url}`, () => {
    beforeEach(() => {
      cy.visit(url).waitForRouteChange()
    })

    it('has a clickable logo', () => {
      cy.get('header').getByTestId('site_logo').click()
      cy.get('header').location('pathname').should('eq', '/')
    })
  })
}
