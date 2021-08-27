import { not } from 'js-heuristics';
import { ref, shallowRef } from 'vue';

import { noop } from '@/utils';

export {
	useAsync
};

/**
 * Reactive async state for @/services/api
 * Syncs reactive state to promise resolution
 * @param executor The promise to be resolved
 * @param opts
 */
function useAsync (executor, { onError = noop, isGql = false } = {}) {
	const state = shallowRef({});
	const isLoading = ref(true);
	const error = ref(undefined);

	async function execute () {
		try {
			const { data, ok, error } = await executor();

			if (not(ok)) throw new Error(error);

			// if graphql query, assign the actual data so we don't need to endure
			// the pains of destructuring a reactive object that doesn't exist yet at the component level
			if (isGql) state.value = data.payload;
			else state.value = data;

		} catch (ex) {
			error.value = ex;
			onError(ex);
		} finally {
			isLoading.value = false;
		}
	}

	return {
		state,
		isLoading,
		error,
		execute
	};
}
