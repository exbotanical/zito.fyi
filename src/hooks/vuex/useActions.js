import {
	mapActions,
	useStore
} from 'vuex';

export {
	useActions
};

function useActions (namespace, ...actions) {
	return Object.fromEntries(
		Object.entries(mapActions(namespace, ...actions))
			.map(
				([key, value]) => [
					key,
					value.bind({
						$store: useStore()
					})
				]
			)
	);
}
