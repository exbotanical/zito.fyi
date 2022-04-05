const testPages = ['/', '/my-favorite-soft-machine-records'];

testPages.forEach((url) => {
	describe(`main navigation on page ${url}`, () => {
		beforeEach(() => {
			cy.visit(url).waitForRouteChange();
		});

		it('has a clickable logo', () => {
			cy.get('header')
				.getByTestId('site_logo')
				.click()

				.location('pathname')
				.should('eq', '/');
		});
	});
});
