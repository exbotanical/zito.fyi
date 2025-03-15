import { REL_CANONICAL } from '../../config'
import { SiteMapData } from '../../cypress.config'

import type { ResponseData } from '../types'

// skip dev given the dev server does not build RSS assets
if (Cypress.env('STAGE') !== 'dev') {
  describe('sitemap', () => {
    it('contains the main sitemap index', () => {
      cy.request('/sitemap-index.xml').then(response => {
        const data = response as unknown as ResponseData

        cy.task<SiteMapData>('parseSitemap', {
          sitemapString: data.body,
        }).then(({ sitemapindex: { sitemap } }) => {
          expect(sitemap[0].loc[0]).to.eq(`${REL_CANONICAL}/sitemap-0.xml`)
        })
      })
    })

    it('contains valid urls', () => {
      cy.request('/sitemap-0.xml').then(response => {
        const data = response as unknown as ResponseData

        cy.task<SiteMapData>('parseSitemap', {
          sitemapString: data.body,
        }).then(({ urlset: { url } }) => {
          const links = url.map(({ loc }) => loc[0])

          expect(links).to.include(
            `${REL_CANONICAL}/my-favorite-soft-machine-records`,
          )
          // TODO: Are these safely URL-encoded?
          // TODO: Snapshot

          links.forEach(link => {
            cy.visit(link.replace(REL_CANONICAL, Cypress.config('baseUrl')!))
          })
        })
      })
    })
  })
}
