import type { Rule } from 'axe-core';

const testUrls = ['/', '/my-favorite-soft-machine-records'];

describe('Accessibility evaluation', () => {
	testUrls.forEach((url) => {
		it(`Page ${url} has no detectable accessibility violations on load`, () => {
			cy.visit(url);
			cy.waitForRouteChange();
			cy.injectAxe();

			const disabledRules: Rule[] = [
				// see discussion https://github.com/dequelabs/axe-core/issues/795
				// my personal take is that this rule is in some cases contradictory
				// and such a case is applicable here, hence disabling it
				{ id: 'landmark-complementary-is-top-level', enabled: false }
			];

			const axeFalsePositives: Rule[] = [
				// { id: 'duplicate-id', enabled: false }
			];

			disabledRules.push(...axeFalsePositives);

			const devFalsePositives = [
				{ id: 'landmark-no-duplicate-contentinfo', enabled: false },
				{ id: 'landmark-unique', enabled: false }
			];

			if (Cypress.env('STAGE') === 'dev') {
				disabledRules.push(...devFalsePositives);
			}

			cy.configureAxe({
				rules: disabledRules
			});

			cy.checkA11y();
		});
	});
});
