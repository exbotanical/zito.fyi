import { not } from 'js-heuristics';
import { ref, watch } from 'vue';

export {
	useTooltip
};

/**
 * @summary Exposes bindings to enable toggleable tooltips on a given el
 */
function useTooltip () {
	const tooltipRef = ref(null);

	function initTooltip (state, text) {
		watch(
			() => state.value,
			function (next, prev) {
				if (not(next)) {
					tooltipRef.value.setAttribute('tooltip', text);
				} else {
					tooltipRef.value.removeAttribute('tooltip');
				}
			},
			{ immediate: true, flush: 'post' }
		);
	}

	return {
		initTooltip,
		tooltipRef
	};
}
