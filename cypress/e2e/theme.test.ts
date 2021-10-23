import { KEYS } from '../../src/theme/constants';

const themeTestPages = ['/', '/my-favorite-soft-machine-records'];

themeTestPages.forEach((url) => {
	describe(`Theme on page ${url}`, () => {
		beforeEach(() => {
			cy.visit(url);
			cy.waitForRouteChange();
		});

		it('defaults to light mode', () => {
			// should be defaulted by the initial `useEffect`
			cy.get('body').should(() => {
				expect(localStorage.getItem(KEYS.THEME_STORAGE_KEY)).to.eq('light');
			});
			cy.get('body').should('have.class', 'theme-light');
		});

		it('toggles the theme mode', () => {
			cy.get('[data-testid="theme_btn"]').click();

			cy.get('body').should('have.class', 'theme-dark');

			// cypress localStorage assertions need to happen inside of the `should` callback
			cy.get('body').should(() => {
				expect(localStorage.getItem(KEYS.THEME_STORAGE_KEY)).to.eq('dark');
			});

			cy.get('[data-testid="theme_btn"]').click();
			cy.get('body').should('have.class', 'theme-light');

			cy.get('body').should(() => {
				expect(localStorage.getItem(KEYS.THEME_STORAGE_KEY)).to.eq('light');
			});
		});
	});
});
