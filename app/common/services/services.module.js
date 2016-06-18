import { Analytics }     from './analytics';
import { AppState }      from './app-state';
import { Network }       from './network';
import { Auth }          from './auth';
import { UrlUtils }      from './url-utils';
import { Interpolation } from './interpolation';
import { TimeUtils }     from './time-utils';
import { Rates }         from './rates';

// Factories
import { translationLoader } from './translation-loader';

export default angular.module('app.services', [])
  .service('Analytics', Analytics)
  .service('AppState', AppState)
  .service('Network', Network)
  .service('Auth', Auth)
  .service('UrlUtils', UrlUtils)
  .service('TimeUtils', TimeUtils)
  .service('Interpolation', Interpolation)
  .service('Rates', Rates)

  // Factories
  .factory('translationLoader', translationLoader);
