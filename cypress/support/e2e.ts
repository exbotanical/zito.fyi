import 'gatsby-cypress/commands'
import 'cypress-axe'
import '@testing-library/cypress/add-commands'

import './commands'

Cypress.on('uncaught:exception', err => {
  // See https://github.com/cypress-io/cypress/issues/27204
  if (
    /hydrat/i.test(err.message) ||
    err.message.includes('Minified React error #418') ||
    err.message.includes('Minified React error #423')
  ) {
    return false
  }
})
