// @see https://github.com/cypress-io/cypress/issues/877#issuecomment-490504922
Cypress.Commands.add('isInViewport', (element: string) => {
  cy.get(element).then($el => {
    cy.window().then(window => {
      const bottom = Cypress.$(window).height()!

      const rect = $el[0].getBoundingClientRect()

      expect(rect.top).not.to.be.greaterThan(bottom)
      expect(rect.bottom).not.to.be.greaterThan(bottom)
    })
  })
})

/**
 * Select a `data-testid` element by its exact key
 */
Cypress.Commands.add('getByTestId', (selector: string) => cy.get(`[data-testid=${selector}]`))

/**
 * Select a `data-testid` element by its approximate key
 */
Cypress.Commands.add('getByTestIdLike', (selector: string) => cy.get(`[data-testid*=${selector}]`))

/**
 * Assert element contains a given class
 */
Cypress.Commands.add(
  'containsClass',
  (selector: string, expectedClass: string) => cy
      .get(selector)
      .should('satisfy', ($el: { classList: string[] }[]) => {
        const classList = Array.from($el[0].classList)

        return classList.includes(expectedClass)
      })
)

/**
 * Assert element does not contain a given class
 */
Cypress.Commands.add(
  'omitsClass',
  (selector: string, expectedClass: string) => cy
      .get(selector)
      .should('satisfy', ($el: { classList: string[] }[]) => {
        const classList = Array.from($el[0].classList)

        return !classList.includes(expectedClass)
      })
)
