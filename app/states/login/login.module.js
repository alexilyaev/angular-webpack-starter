function loginRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('login', {
      url: '/login',
      template: `<login></login>`
    });
}

export default angular.module('app.states.login', [])
  .config(loginRoutes);
