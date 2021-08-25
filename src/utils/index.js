/**
 * @summary Standard no-op function
 */
const noop = () => {};

/**
 * @summary Pipe input through N functions
 * @param {function} fn
 * @param  {...function} fns
 * @returns {function} base reducer
 */
const pipe = (fn, ...fns) =>
  (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args));

/**
 * @summary Convert data to blob
 * @param {any} data
 * @returns {Blob}
 */
const blobify = data => new Blob([JSON.stringify(data)],
  { type : 'application/json; charset=UTF-8' });

/**
 * @summary Convert UTC date to readable string with format `Day Mon dd yyyy`
 * @param {string|Date} ts
 * @returns {string}
 */
const dateConv = ts => new Date(ts).toDateString();

/**
 * @summary Is the app running in a local development mode?
 */
const isDev = !!import.meta.env.VITE_LOCAL || import.meta.env.DEV;

/**
 * @summary The current app base URL
 * where local mode is set with a string literal and not an env var
 * because of Vercel CLI modes
 */
const baseUrl = import.meta.env.VITE_LOCAL
  ? 'http://localhost:3000'
  : import.meta.env.VITE_APP_URL_UI;

export {
  noop,
  pipe,
  blobify,
  dateConv,
  isDev,
  baseUrl
};
