const PAGE_POST_COUNT = 5;

const feedUrls = ['/', '/category/technology', '/tag/programming']; //, '/category/technology',

feedUrls.forEach((url) => {
	describe(`Feed evaluation (${url})`, () => {
		beforeEach(() => {
			cy.visit(url);
			cy.waitForRouteChange();

			cy.get('main > div > div').as('feed');
		});

		it('loads the initial posts properly', () => {
			cy.get('@feed').children().should('have.length', PAGE_POST_COUNT);

			if (url === feedUrls[0]) {
				cy.findByText('Lorem Ipsum 3001');
				cy.findByText('Lorem Ipsum 3000');
				cy.findByText('Andrea Zittel 2');
				cy.findByText('Andrea Zittel');
				cy.findByText('Lorem Ipsum 33');
			} else if (url === feedUrls[1]) {
				cy.findByText('Lorem Ipsum 3000');
				cy.findByText('Andrea Zittel');
				cy.findByText('Lorem Ipsum 33');
				cy.findByText('Toulouse Lautrec');
				cy.findByText('Exmagma');
			} else {
				cy.findByText('Lorem Ipsum 3000');
				cy.findByText('Andrea Zittel');
				cy.findByText('Lorem Ipsum 33');
				cy.findByText('Toulouse Lautrec');
				cy.findByText('Francis Bacon');
			}
		});

		it('navigates to a post via its title', () => {
			cy.findByText('Andrea Zittel').click();
			cy.waitForRouteChange();

			cy.url().should('contain', '/andrea-zittel');
		});

		it('navigates to a post via its cover image', () => {
			cy.findByAltText('a painting by HR Giger').click();
			cy.waitForRouteChange();

			cy.url().should('contain', '/lorem-ipsum-3000');
		});

		it('contains a post excerpt', () => {
			cy.findByText(
				'This is a TEST post excerpt, used for testing with Cypress. We\'ll grab the text by searching for it on the DOM. This should be the final…'
			);
		});

		it('supports infinite scrolling', () => {
			cy.get('@feed').children().should('have.length', PAGE_POST_COUNT);

			cy.scrollTo('bottom');

			cy.get('@feed')
				.children()
				.should('have.length', PAGE_POST_COUNT * 2);
		});

		it('caches fetched infinite scroll pages across page navigations', () => {
			cy.on('uncaught:exception', () => false);

			cy.scrollTo('bottom');
			cy.get('@feed')
				.children()
				.should('have.length', PAGE_POST_COUNT * 2);

			cy.findByText('Lorem Ipsum 3000').click();
			cy.waitForRouteChange();

			cy.go('back');
			cy.waitForRouteChange();

			cy.get('@feed')
				.children()
				.should('have.length', PAGE_POST_COUNT * 2);
		});
	});
});
