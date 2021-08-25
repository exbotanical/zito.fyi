export {
  predicate
};

/* Routing Helpers */

/**
 * @type {function(): boolean}
 * @summary Generate a predicate contingent on the destination route def's metadata
 * @param {object} to destination route definition
 */
function predicate (to) {
  return function (test) {
    return to.matched.some(record => record.meta[test]);
  };
}
