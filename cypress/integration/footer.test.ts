import { config } from '../../test/fixtures';

const footerTestPages = ['/', '/my-favorite-soft-machine-records'];

footerTestPages.forEach((url) => {
	describe(`Footer on page ${url}`, () => {
		beforeEach(() => {
			cy.visit(url);
			cy.waitForRouteChange();

			cy.get('footer').as('footer');
		});

		it('has an author section', () => {
			cy.get('@footer').then(() => {
				cy.get('[aria-label="About the author"]').contains(config.user.about);
			});
		});

		it('has user links', () => {
			cy.get('@footer').then((container) => {
				cy.findByRole('link', { name: 'Twitter Profile', container })
					.closest('a')
					.should(
						'have.attr',
						'href',
						`https://twitter.com/${config.user.twitterHandle}`
					);

				cy.findByRole('link', { name: 'GitHub Profile', container })
					.closest('a')
					.should(
						'have.attr',
						'href',
						`https://github.com/${config.user.github}`
					);

				cy.findByRole('link', { name: 'LinkedIn Profile', container })
					.closest('a')
					.should(
						'have.attr',
						'href',
						`https://www.linkedin.com/in/${config.user.linkedIn}`
					);

				cy.findByRole('link', { name: 'E-Mail', container })
					.closest('a')
					.should('have.attr', 'href', `mailto:${config.user.email}`);
			});
		});

		it('has a link to the RSS feed', () => {
			cy.get('@footer').then((container) => {
				cy.findByRole('link', { name: 'RSS Feed', container })
					.closest('a')
					.should('have.attr', 'href', config.site.rss);
			});
		});

		it('has a copyright notice', () => {
			cy.get('@footer').then((container) => {
				cy.findByText(config.site.copyright, {
					container
				});
			});
		});
	});
});
