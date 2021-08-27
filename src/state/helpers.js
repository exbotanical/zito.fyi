export {
	dispatchRoot
};

/**
 * @summary Create an ipc to dispatch given a root-level action
 * @returns {function}
 */
function dispatchRoot (dispatch) {
	return async function (namespace, args) {
		await dispatch(namespace, args, { root: true });
	};
}
