import { not } from 'js-heuristics';

import { SessionManager } from '@/services/sessions';
import { eventApi } from '@/services/api';

import { predicate } from '@/router/helpers';

export {
  guards
};

const session = new SessionManager();

/**
 * @summary Wrapper for all system navigation guards
 */
function guards () {
  this.beforeEach((to, from, next) => {
    const routeHas = predicate(to);

    if (not(session.tracking())) {
      session.track();
      eventApi.logInteraction();
    }

    if (routeHas('redirect')) {
      return next({ name: 'Landing' });
    }

    return next();
  });

  return this;
}
