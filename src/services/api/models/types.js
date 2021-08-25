/**
 * @summary Common system events
 */
export const EVENT_TYPES = Object.freeze({
  ERROR: 'error',
  INTERACTION: 'interaction'
});

/**
 * @summary Common error categories
 */
export const ERROR_CAT = Object.freeze({
  HTTP: 'http',
  RUNTIME: 'runtime',
  VUE: 'vue_runtime',
  BOUND: 'error_boundary_invocation',
  LOGGING: 'logging'
});
