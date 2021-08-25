/**
 * @type {boolean}
 * @summary Get the current nav drawer state
 */
export const isNavDrawerClosed = (state) => !state.isNavDrawerOpen;

/**
 * @type {array}
 * @summary Get all cached views
 */
export const getCachedViews = (state) => state.cachedViews;

/**
 * @type {string}
 * @summary Get app locale / system name
 */
export const appName = (state) => state.appName;

/**
 * @type {string}
 * @summary Get app author
 */
export const appAuthor = (state) => state.author;
