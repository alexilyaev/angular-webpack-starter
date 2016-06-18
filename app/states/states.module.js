// Load sub modules
import loginModule from './login';
import homeModule  from './home';

function routesConfig($urlRouterProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/home');
}

const modules = [
  loginModule.name,
  homeModule.name
];

export default angular.module('app.states', modules)
  .config(routesConfig);
