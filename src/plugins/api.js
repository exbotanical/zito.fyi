import {
  eventApi as event
} from '@/services/api';

export default {
  install (app, opts) {
    const api = {
      event
    };

    app.config.globalProperties.$api = api;
    app.provide('$api', api);
  }
};
