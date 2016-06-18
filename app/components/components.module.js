import { login } from './login/login';
import { home }  from './home/home';

const modules = [];

export default angular.module('app.components', modules)
  .component('login', login)
  .component('home', home);
