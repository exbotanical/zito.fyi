import type { ResponseData } from '../types';

if (Cypress.env('STAGE') !== 'dev') {
	describe('rss feed', () => {
		it('contains valid post links', () => {
			cy.request('/rss.xml')
				.as('rssFeed')

				.get('@rssFeed')
				.then((response) => {
					const data = response as unknown as ResponseData;

					cy.task('parseRss', data.body).then((rssLinks) => {
						expect(rssLinks).to.include('my-favorite-soft-machine-records');

						const links = rssLinks as string[];

						links.forEach((link) => {
							cy.visit(link);
						});
					});
				});
		});
	});
}
