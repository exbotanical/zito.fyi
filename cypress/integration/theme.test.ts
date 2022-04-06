import { KEYS } from '@/styles/constants';
import { darkTheme, lightTheme } from '@/styles/Theme';

const themeTestPages = ['/', '/my-favorite-soft-machine-records'];

function getTheme() {
	const theme = localStorage.getItem(KEYS.THEME_STORAGE_KEY);

	return theme ? JSON.parse(theme) : null;
}

function prefersDark() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

themeTestPages.forEach((url) => {
	describe(`Theme on page ${url}`, () => {
		beforeEach(() => {
			cy.visit(url, {
				// @todo breaks when `useMediaQuery` invoked; open an issue on gh
				// onBeforeLoad(aut) {
				// cy.stub(aut, 'matchMedia')
				// 	.withArgs('(prefers-color-scheme: dark)')
				// 	.returns({
				// 		matches: true
				// 	});
				// }
			}).waitForRouteChange();
		});

		it("defaults to the user's prefers-color-scheme preference", () => {
			expect(prefersDark()).to.equal(true);

			cy.get('body')
				.should(() => {
					expect(getTheme()).to.eq('dark');
				})

				.get('body')
				.should('have.css', 'background-color', darkTheme.colors.bg.primary);
		});

		it('toggles the theme mode', () => {
			expect(prefersDark()).to.equal(true);

			cy.getByTestId('theme_btn')
				.as('theme_btn')

				.get('@theme_btn')
				.click()

				.get('body')
				.should('have.css', 'background-color', lightTheme.colors.bg.primary)
				.should(() => {
					expect(getTheme()).to.eq('light');
				})

				.get('@theme_btn')
				.click()

				.get('body')
				.should('have.css', 'background-color', darkTheme.colors.bg.primary)
				.should(() => {
					expect(getTheme()).to.eq('dark');
				});
		});

		it('persists the theme selection across refreshes', () => {
			expect(prefersDark()).to.equal(true);

			cy.getByTestId('theme_btn')
				.as('theme_btn')

				.get('@theme_btn')
				.click()

				.get('body')
				.should('have.css', 'background-color', lightTheme.colors.bg.primary)
				.should(() => {
					expect(getTheme()).to.eq('light');
				})

				.reload()

				.get('body')
				.should('have.css', 'background-color', lightTheme.colors.bg.primary)
				.should(() => {
					expect(getTheme()).to.eq('light');
				})

				.get('@theme_btn')
				.click()

				.get('body')
				.should('have.css', 'background-color', darkTheme.colors.bg.primary)
				.should(() => {
					expect(getTheme()).to.eq('dark');
				})

				.reload()

				.get('body')
				.should('have.css', 'background-color', darkTheme.colors.bg.primary)
				.should(() => {
					expect(getTheme()).to.eq('dark');
				});
		});
	});
});
