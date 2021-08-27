import { EVENT_TYPES, ERROR_CAT } from './types';

/**
 * @summary Resolve arguments into a `createEvent` mutation
 */
const ERROR_EVENT = ({
	type = EVENT_TYPES.ERROR,
	category = ERROR_CAT.LOGGING,
	info = 'model mismatch'
} = {}) =>
	({
		type,
		category,
		info
	});

const INTERACTION_EVENT = ({
	type = EVENT_TYPES.INTERACTION,
	category = 'analytics'
} = {}) => {
	const info = JSON.stringify({
		referrer: document.referrer,
		location: window.location.href,
		ua: navigator.userAgent,
		platform: navigator.platform
	});

	return {
		type,
		category,
		info
	};
};

export {
	ERROR_EVENT,
	INTERACTION_EVENT
};
