// Load sub modules
import loginModule from './login/login.module.js';
import homeModule  from './home/home.module';

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
