import store from '@/state';
import { computed } from 'vue';

export {
	useGetters
};

/**
 * @summary Akin to `mapGetters`; reference n getters of x namespace
 */
function useGetters (namespace, getters) {
	return getters.reduce((getters, getter) => {
		getters[getter] = computed(() => store.getters[`${namespace}/${getter}`]);
		return getters;
	}, {});
}
