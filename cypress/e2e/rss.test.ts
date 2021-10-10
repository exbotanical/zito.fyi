import type { IResponseData } from '../types';

if (Cypress.env('STAGE') !== 'dev') {
	describe('RSS Feed evaluation', () => {
		it('contains valid post links', () => {
			cy.request('/rss.xml').as('rssFeed');

			cy.get('@rssFeed').then((response) => {
				const data = response as unknown as IResponseData;

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
