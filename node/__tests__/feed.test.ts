import { mocked } from 'jest-mock'
import memfs from 'memfs'

import {
  createFeed,
  createFeedMetadata,
  resolveFeedPath,
  setupFeedMetadataDir,
  persistFeedMetadata,
  constants,
} from '../'
import { post, config, postsList } from '../../test/fixtures'
import { GatsbyActionsMock } from '../../test/utils/gatsbyActions'

const longPostsList = [...postsList, ...postsList]

const FEED_METADATA_DIR = `${constants.baseMetaDirectory}/${constants.feedMetaDirectory}/`

// redirect all `fs` operations to a virtual fs
jest.mock('fs', () => ({ ...memfs.fs, rmSync: memfs.fs.rmdirSync }))

describe('build util `persistFeedMetadata`', () => {
  beforeEach(() => {
    memfs.vol.reset()
  })

  it('persists feed metadata', async () => {
    const testMeta = {
      current: 1,
      next: 2,
      nextCount: 5,
      prev: 0,
      prevCount: 5,
      posts: [post, post],
    }

    const stringifiedMeta = JSON.stringify(testMeta)

    memfs.vol.fromJSON({
      [FEED_METADATA_DIR]: null,
    })

    await persistFeedMetadata('test', 1, testMeta)
    await persistFeedMetadata('test', 1, testMeta, 'testId')

    expect(
      memfs.fs.readFileSync(`${FEED_METADATA_DIR}test-1.json`, {
        encoding: 'utf8',
      }),
    ).toStrictEqual(stringifiedMeta)

    expect(
      memfs.fs.readFileSync(`${FEED_METADATA_DIR}test-testId-1.json`, {
        encoding: 'utf8',
      }),
    ).toStrictEqual(stringifiedMeta)
  })
})

describe('build util `setupFeedMetadataDir`', () => {
  beforeEach(() => {
    memfs.vol.reset()
  })

  it('creates `FEED_METADATA_DIR` if not extant', () => {
    memfs.vol.fromJSON({ 'public/': null })

    setupFeedMetadataDir()

    expect(memfs.fs.existsSync(FEED_METADATA_DIR)).toBeTruthy()
  })

  it('recreates `FEED_METADATA_DIR` if not extant', () => {
    memfs.vol.fromJSON({
      [`${FEED_METADATA_DIR}random-file.json`]: 'random-text',
    })

    setupFeedMetadataDir()

    expect(memfs.fs.readdirSync(FEED_METADATA_DIR)).toHaveLength(0)
  })
})

describe('build util `resolveFeedPath`', () => {
  it('correctly calculates index feed path', () => {
    const route = resolveFeedPath(config, 'index')

    expect(route).toBe('/')
  })

  it('correctly calculates non-index feed paths', () => {
    const tagRoute = resolveFeedPath(config, 'tags', 'test')

    expect(tagRoute).toBe('/tags/test')

    const categoryRoute = resolveFeedPath(config, 'categories', 'test')

    expect(categoryRoute).toBe('/categories/test')

    const categoryRouteWithoutId = resolveFeedPath(config, 'categories')

    expect(categoryRouteWithoutId).toBe('/categories')
  })
})

describe('build util `createFeedMetadata`', () => {
  it('creates correct pages', () => {
    const page1 = createFeedMetadata(0, 4, longPostsList)

    expect(page1.next).toBe(1)
    expect(page1.nextCount).toBe(5)
    expect(page1.prev).toBeUndefined()
    expect(page1.prevCount).toBeUndefined()
    expect(page1.posts).toHaveLength(5)
    expect(page1.posts).toMatchSnapshot()

    const page2 = createFeedMetadata(1, 4, longPostsList)

    expect(page2.next).toBe(2)
    expect(page2.nextCount).toBe(5)
    expect(page2.prev).toBe(0)
    expect(page2.prevCount).toBe(5)
    expect(page2.posts).toHaveLength(5)
    expect(page2.posts).toMatchSnapshot()

    const page3 = createFeedMetadata(2, 4, longPostsList)

    expect(page3.next).toBe(3)
    expect(page3.nextCount).toBe(1)
    expect(page3.prev).toBe(1)
    expect(page3.prevCount).toBe(5)
    expect(page3.posts).toHaveLength(5)
    expect(page3.posts).toMatchSnapshot()

    const page4 = createFeedMetadata(3, 4, longPostsList)

    expect(page4.next).toBeUndefined()
    expect(page4.nextCount).toBeUndefined()
    expect(page4.prev).toBe(2)
    expect(page4.prevCount).toBe(5)
    expect(page4.posts).toHaveLength(1)
    expect(page4.posts).toMatchSnapshot()
  })
})

describe('build util `createFeed`', () => {
  beforeEach(() => {
    memfs.vol.reset()
  })

  it('correctly generates a feed', async () => {
    memfs.vol.fromJSON({
      [FEED_METADATA_DIR]: null,
    })

    const MockedGatsbyActions = mocked(GatsbyActionsMock, { shallow: true })

    await createFeed(config, GatsbyActionsMock, longPostsList, 'index')

    expect(
      memfs.fs.readFileSync(`${FEED_METADATA_DIR}index-0.json`, {
        encoding: 'utf8',
      }),
    ).toMatchSnapshot()

    expect(
      memfs.fs.readFileSync(`${FEED_METADATA_DIR}index-1.json`, {
        encoding: 'utf8',
      }),
    ).toMatchSnapshot()

    expect(
      memfs.fs.readFileSync(`${FEED_METADATA_DIR}index-2.json`, {
        encoding: 'utf8',
      }),
    ).toMatchSnapshot()

    expect(
      memfs.fs.readFileSync(`${FEED_METADATA_DIR}index-3.json`, {
        encoding: 'utf8',
      }),
    ).toMatchSnapshot()

    expect(MockedGatsbyActions.createPage).toHaveBeenCalledTimes(1)

    expect(MockedGatsbyActions.createPage).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/',
        component: expect.any(String),
        context: expect.objectContaining({
          pageCount: 4,
          pageIndex: 0,
          feedType: 'index',
          feedId: undefined,
        }),
      }),
    )
  })
})
