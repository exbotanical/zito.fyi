import { createStore } from 'vuex';

import config from './modules/config';

export default createStore({
  modules: {
    /* UI State and Configurations */
    config
  },
  strict: process.env.NODE_ENV !== 'production'
});
