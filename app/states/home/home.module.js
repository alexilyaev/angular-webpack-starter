function homeRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/home',
      template: `<home></home>`
    });
}

export default angular.module('app.states.home', [])
  .config(homeRoutes);
