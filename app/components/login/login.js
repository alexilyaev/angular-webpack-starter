import view from './login.html';
import './login.scss';

class LoginController {

  constructor() {
    'ngInject';


  }

}

/**
 * @ngdoc directive
 * @name login
 * @scope
 * @restrict E
 */
export const login = {
  bindings: {},
  controller: LoginController,
  controllerAs: 'vm',
  template: view
};
