import { prefersDark } from 'support/commands'

import { KEYS } from '@/styles/constants'
import { darkTheme, lightTheme } from '@/styles/Theme'

const themeTestPages = ['/', '/my-favorite-soft-machine-records']

function getTheme() {
  const theme = localStorage.getItem(KEYS.THEME_STORAGE_KEY)

  return theme ? JSON.parse(theme) : null
}

themeTestPages.forEach(url => {
  describe(`Theme on page ${url}`, () => {
    beforeEach(() => {
      // TODO: Use this when it actually works in the Cypress gh action
      // onBeforeLoad(aut) {
      //   cy.stub(aut, 'matchMedia')
      //     .withArgs('(prefers-color-scheme: dark)')
      //     .returns({
      //       matches: true,
      //     })
      // },
      cy.visit(url).waitForRouteChange()
      if (!prefersDark()) {
        cy.getByTestId('theme_btn').click()
      }
    })

    it("defaults to the user's prefers-color-scheme preference", () => {
      cy.get('body')
        .should(() => {
          expect(getTheme()).to.eq('dark')
        })

        .get('body')
        .should('have.css', 'background-color', darkTheme.colors.bg.primary)
    })

    it('toggles the theme mode', () => {
      cy.getByTestId('theme_btn')
        .as('theme_btn')

        .get('@theme_btn')
        .click()

        .get('body')
        .should('have.css', 'background-color', lightTheme.colors.bg.primary)
        .should(() => {
          expect(getTheme()).to.eq('light')
        })

        .get('@theme_btn')
        .click()

        .get('body')
        .should('have.css', 'background-color', darkTheme.colors.bg.primary)
        .should(() => {
          expect(getTheme()).to.eq('dark')
        })
    })

    it('persists the theme selection across refreshes', () => {
      cy.getByTestId('theme_btn')
        .as('theme_btn')

        .get('@theme_btn')
        .click()

        .get('body')
        .should('have.css', 'background-color', lightTheme.colors.bg.primary)
        .should(() => {
          expect(getTheme()).to.eq('light')
        })

        .reload()

        .get('body')
        .should('have.css', 'background-color', lightTheme.colors.bg.primary)
        .should(() => {
          expect(getTheme()).to.eq('light')
        })

        .get('@theme_btn')
        .click()

        .get('body')
        .should('have.css', 'background-color', darkTheme.colors.bg.primary)
        .should(() => {
          expect(getTheme()).to.eq('dark')
        })

        .reload()

        .get('body')
        .should('have.css', 'background-color', darkTheme.colors.bg.primary)
        .should(() => {
          expect(getTheme()).to.eq('dark')
        })
    })

    it('darkens images in dark mode', () => {
      cy.getByTestId('theme_btn')
        .as('theme_btn')

        .get('@theme_btn')
        .click()

        .get('img:not([src*=".svg"]')
        .first()
        .should('not.have.css', 'filter', 'brightness(0.75)')
        .should(() => {
          expect(getTheme()).to.eq('light')
        })

        .get('@theme_btn')
        .click()

        .get('img:not([src*=".svg"]')
        .first()
        .should('have.css', 'filter', 'brightness(0.75)')
    })
  })
})
