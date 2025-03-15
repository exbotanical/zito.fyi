import { generateSitemapData } from '..'
import { config } from '../../test/fixtures'

const testData = {
  allMdx: {
    edges: [
      {
        node: {
          frontmatter: {
            title: 'A Complete Guide to Make',
            category: 'programming',
            tags: ['build tools', 'software engineering'],
            datePublished: '2023-03-04T08:00:00.000Z',
          },
          fields: {
            slug: '/a-complete-guide-to-make',
            route: '/a-complete-guide-to-make',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title: 'Choreographic Programming',
            category: 'programming',
            tags: [
              'programming paradigms',
              'concurrency',
              'software engineering',
            ],
            datePublished: '2023-10-17T07:00:00.000Z',
          },
          fields: {
            slug: '/choreographic-programming',
            route: '/choreographic-programming',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title:
              'Rules to Die on a Hill By: A Decisive JavaScript Style Guide',
            category: 'programming',
            tags: [
              'frontend',
              'javascript',
              'software engineering',
              'static analysis',
            ],
            datePublished: '2022-04-19T07:00:00.000Z',
          },
          fields: {
            slug: '/rules-to-die-on-a-hill-by-a-decisive-java-script-style-guide',
            route:
              '/rules-to-die-on-a-hill-by-a-decisive-java-script-style-guide',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title: 'Chromophores',
            category: 'record collecting',
            tags: ['vinyl records', 'wasm', 'fluxus'],
            datePublished: '2023-07-02T07:00:00.000Z',
          },
          fields: {
            slug: '/chromophores',
            route: '/chromophores',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title: 'Corundum and the Dromedary',
            category: 'programming',
            tags: ['programming languages', 'ocaml', 'kotlin'],
            datePublished: '2024-04-22T08:00:00.000Z',
          },
          fields: {
            slug: '/corundum-and-the-dromedary',
            route: '/corundum-and-the-dromedary',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title: 'In Progress',
            category: 'programming',
            tags: ['programming languages', 'ocaml', 'kotlin'],
            datePublished: '2024-04-22T08:00:00.000Z',
          },
          fields: {
            slug: '/in-progress',
            route: '/in-progress',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title: 'Internet Archives I',
            category: 'culture',
            tags: ['internet'],
            datePublished: '2024-01-13T00:00:00.000Z',
          },
          fields: {
            slug: '/internet-archives-i',
            route: '/internet-archives-i',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title: 'ucontext and coroutines',
            category: 'programming',
            tags: ['source code review', 'coroutines'],
            datePublished: '2024-02-12T00:00:00.000Z',
          },
          fields: {
            slug: '/ucontext-and-coroutines',
            route: '/ucontext-and-coroutines',
          },
        },
      },
    ],
  },
  allCategories: {
    distinct: ['culture', 'programming', 'record collecting'],
  },
  allTags: {
    distinct: [
      'build tools',
      'concurrency',
      'coroutines',
      'fluxus',
      'frontend',
      'internet',
      'javascript',
      'kotlin',
      'ocaml',
      'programming languages',
      'programming paradigms',
      'software engineering',
      'source code review',
      'static analysis',
      'vinyl records',
      'wasm',
    ],
  },
}

describe('sitemap build util `generateSitemapData`', () => {
  beforeAll(() => {
    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockReturnValue('2025-01-01T12:00:00.000Z')
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('generates the sitemap config', () => {
    const serialize = generateSitemapData(config)

    const serializedData = serialize(testData)
    expect(serializedData).toMatchSnapshot()
  })
})
