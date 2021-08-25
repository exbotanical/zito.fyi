import { createStore } from 'vuex';

import config from './modules/config';
import notifications from './modules/notifications';

export default createStore({
  modules: {
    /* UI State and Configurations */
    config,
    /* Notifications Dispatch Service*/
    notifications
  },
  strict: process.env.NODE_ENV !== 'production'
});
