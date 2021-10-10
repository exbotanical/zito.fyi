describe('main navigation', () => {
	beforeEach(() => {
		cy.visit('/my-favorite-soft-machine-records');
		cy.waitForRouteChange();
	});

	it('has a clickable logo', () => {
		cy.get('header').findAllByText('Zito\'s Blog').click();

		cy.location('pathname').should('eq', '/');
	});
});
