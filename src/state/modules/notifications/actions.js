import { not, isString } from 'js-heuristics';

/* Enums & Config */

const notificationTypes = {
	error: {
		background: '#ff0000',
		color: 'white'
	},
	success: {
		background: '#29fa5d',
		color: 'black'
	},
	warning: {
		background: '#f1fa8c',
		color: 'black'
	}
};

let autoId = 0;

/**
 * @description The interval in ms after which the notification will automatically dismiss
 */
const autoDismissInterval = 3000;

/**
 * @description Dispatch a notification to be displayed to the user
 * @param {string} type
 * @param {string} message
 */
export const addNotification = ({ commit, getters, dispatch }, { message, type }) => {
	if (not(isString(message)) || not(isString(type))) return;

	if (not(notificationTypes[type].background)) return;

	// if we are currently showing a notif, recurse this action to debounce
	if (getters.hasPendingNotifications) {
		setTimeout(() => dispatch('addNotification', { message, type }), autoDismissInterval - 2000);
		return;
	}

	const { background, color } = notificationTypes[type];
	const id = ++autoId;

	const payload = {
		time: new Date(),
		id,
		background,
		color,
		message
	};

	commit('enqueueNotification', payload);

	setTimeout(() => commit('dequeueNotification', id), autoDismissInterval);
};

/**
 * @description Remove a notification from the queue
 * @param {number} id The id of the notification to be removed
 */
export const resolveNotification = ({ commit }, id) => {
	commit('dequeueNotification', id);
};
