import { darkTheme, lightTheme } from '@/styles/Theme'

import type { Rule } from 'axe-core'

const testUrls = ['/', '/my-favorite-soft-machine-records']

function configure() {
  const isDev = Cypress.env('STAGE') === 'dev'
  const disabledRules: Rule[] = [
    { id: 'duplicate-id', enabled: isDev },
    { id: 'color-contrast', enabled: isDev }
  ]

  cy.configureAxe({
    rules: disabledRules,
    checks: [
      {
        id: 'color-contrast',
        options: {
          contrastRatio: {
            normal: {
              expected: 4.5
            },
            large: {
              expected: 3
            }
          }
        }
      }
    ]
  })
}

function checkA11y() {
  cy.injectAxe()
  configure()
  cy.checkA11y()
}

testUrls.forEach(url => {
  describe('accessibility', () => {
    beforeEach(() => {
      cy.visit(url).waitForRouteChange()
    })

    it(`Page ${url} has no detectable accessibility violations on load [dark mode]`, () => {
      // sanity check
      cy.get('body')
        .should('have.css', 'background-color', darkTheme.colors.bg.primary)

        .title()
        .should('not.be.empty')

      checkA11y()
    })

    it(`Page ${url} has no detectable accessibility violations on load [light mode]`, () => {
      cy.getByTestId('theme_btn')
        .click()
        .get('body')
        .should('have.css', 'background-color', lightTheme.colors.bg.primary)

        .title()
        .should('not.be.empty')

      checkA11y()
    })
  })
})
