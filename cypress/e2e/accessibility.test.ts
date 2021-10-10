import type { Rule } from 'axe-core';

const testUrls = ['/', '/my-favorite-soft-machine-records'];

describe('Accessibility evaluation', () => {
	testUrls.forEach((url) => {
		it(`Page ${url} has no detectable accessibility violations on load`, () => {
			cy.visit(url);
			cy.waitForRouteChange();
			cy.injectAxe();

			const axeFalsePositives: Rule[] = [
				{ id: 'duplicate-id', enabled: false }
			];

			const devFalsePositives = [
				{ id: 'landmark-no-duplicate-contentinfo', enabled: false },
				{ id: 'landmark-unique', enabled: false }
			];

			if (Cypress.env('STAGE') === 'dev') {
				axeFalsePositives.push(...devFalsePositives);
			}

			cy.configureAxe({
				rules: axeFalsePositives
			});

			cy.checkA11y();
		});
	});
});
