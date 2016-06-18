import { API_URLS } from './api-urls';
import { PATTERNS } from './patterns';
import { ENV }      from './env';

export default angular.module('app.constants', [])
  .constant('API_URLS', API_URLS)
  .constant('PATTERNS', PATTERNS)
  .constant('ENV', ENV);
