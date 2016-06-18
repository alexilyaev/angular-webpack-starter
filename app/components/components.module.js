// Complex components, can have child components and services
import homeModule from './home/home.module';

// Basic components
import { login }  from './login/login';

const modules = [
  homeModule.name
];

export default angular.module('app.components', modules)
  .component('login', login);
