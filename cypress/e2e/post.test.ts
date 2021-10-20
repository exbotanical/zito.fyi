describe('Post page evaluation', () => {
	before(() => {
		cy.visit('/my-favorite-soft-machine-records');
		cy.waitForRouteChange();
	});

	// else this step is presumed skipped and certain assertions erroneously fail
	beforeEach(() => {});

	it('renders a post intro', () => {
		cy.findByText('My Favorite Soft Machine Records', { selector: 'h1' });

		cy.findByText(
			'This is another TEST post excerpt, used for testing with Cypress. We\'ll grab the text by searching for it on the DOM. This should be the…'
		);

		cy.findByAltText('An image of musician Robert Wyatt');
		cy.findByText('An image of musician Robert Wyatt', {
			selector: 'figcaption'
		});
	});

	it('renders post metadata (post info)', () => {
		cy.get('p').contains('⋅ Jan 6, 2021 ⋅ 3 min read');

		cy.get('main').then((container) => {
			cy.findByRole('link', { name: 'music', container }).should(
				'have.attr',
				'href',
				'/category/music'
			);

			cy.findByRole('link', { name: 'progrock', container }).should(
				'have.attr',
				'href',
				'/tag/progrock'
			);

			cy.findByRole('link', { name: 'vinyl', container }).should(
				'have.attr',
				'href',
				'/tag/vinyl'
			);
		});
	});

	it('renders the post / article', () => {
		cy.get('article > p').contains(
			'This is another TEST post excerpt, used for testing with Cypress. We\'ll grab the text by searching for it on the DOM. This should be the final sentence.'
		);
	});

	it('renders social links', () => {
		cy.findByRole('region', { name: 'Share on social media' }).as(
			'shareSection'
		);

		cy.get('@shareSection').findByText('SHARE');

		cy.get('@shareSection').get('button[aria-label="facebook"]');
		cy.get('@shareSection').get('button[aria-label="twitter"]');
		cy.get('@shareSection').get('button[aria-label="reddit"]');
		cy.get('@shareSection').get('button[aria-label="linkedin"]');
	});

	it('renders related Posts', () => {
		cy.findByText('RELATED POSTS')
			.next()
			.children()
			.first()
			.children()
			.find('a[href="/andrea-zittel"]')
			.contains(/^Andrea Zittel$/);

		cy.findByText('RELATED POSTS')
			.next()
			.children()
			.first()
			.children()
			.find('a[href="/lorem-ipsum-3001"]')
			.contains(/^Lorem Ipsum 3001$/);
	});
});
