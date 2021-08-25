import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';
import state from './state';

/* Dedicated Vuex Store for App Configurations and Settings */
export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
};
