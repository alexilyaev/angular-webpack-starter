export function appConfig($compileProvider, $logProvider, $httpProvider, ENV) {
  'ngInject';

  if (ENV.production) {
    $compileProvider.debugInfoEnabled(false);
    $logProvider.debugEnabled(false);
    $httpProvider.useApplyAsync(true);
  }

}

export function appRun($rootScope, ENV) {
  'ngInject';

  if (ENV.development) {
    // eslint-disable-next-line angular/on-watch, no-console
    $rootScope.$on('$stateChangeError', console.error.bind(console));
  }
}
