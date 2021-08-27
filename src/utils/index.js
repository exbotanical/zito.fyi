import store from '@/state';

const { dateFmt } = store.state.config;

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
 * @summary Convert date to readable string with app-specified format
 * @param {string|Date} raw
 * @returns {string}
 */
const dateConv = raw => Intl.DateTimeFormat('en-US', dateFmt)
	.format(new Date(raw));

/**
 * @summary Convert a date into a UNIX timestamp
 * @param {string|Date} raw
 * @returns {number}
 */
const toUnixTs = raw => new Date(raw)?.getTime() || 0;

/**
 * @summary Is the app running in a local development mode?
 */
const isDev = !!import.meta.env.VITE_LOCAL || import.meta.env.DEV;

/**
 * @summary The current app base URL
 * where local mode is set with a string literal and not an env var
 * because of Vercel CLI modesparadox theatrer
 */
const baseUrl = import.meta.env.VITE_LOCAL
	? 'http://localhost:3000'
	: import.meta.env.VITE_APP_URL_UI;

export {
	noop,
	pipe,
	blobify,
	dateConv,
	toUnixTs,
	isDev,
	baseUrl
};
