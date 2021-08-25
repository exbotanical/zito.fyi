import { not } from 'js-heuristics';

import { baseUrl, blobify } from '@/utils';
import {
  ERROR_EVENT,
  INTERACTION_EVENT
} from '@/services/api/models';

export default {
  client: navigator,

  /**
   * @summary Attempt to log an error event via `sendBeacon`
   */
  logError (data) {
    // not supported
    if (not(this.client?.sendBeacon)) return;
    // we don't really care if these go through and especially do not want to force the users
    // to wait for something they did not ask for, and thus send the mutation manually via `sendBeacon`
    return this.client.sendBeacon(
      baseUrl + import.meta.env.VITE_APP_API_MAIN,
      blobify(ERROR_EVENT(data))
    );
  },

  /**
   * @summary Attempt to log an interaction event via `sendBeacon`
   */
  logInteraction (data) {
    if (not(this.client?.sendBeacon)) return;

    return this.client.sendBeacon(
      baseUrl + import.meta.env.VITE_APP_API_MAIN,
      blobify(INTERACTION_EVENT(data))
    );
  }
};
