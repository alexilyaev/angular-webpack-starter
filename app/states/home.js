function homeRoutes($stateProvider) {
  'ngInject';
  
  $stateProvider
    .state('home', {
      url: '/home',
      template: `<home></home>`
    })
    .state('home.sub1', {
      url: '/sub1',
      template: `<sub1></sub1>`
    })
    .state('home.sub2', {
      url: '/sub2',
      template: `<sub2></sub2>`
    });
}

export default angular.module('app.states.home', [])
  .config(homeRoutes);
