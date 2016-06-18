import view from './home.html';
import './home.scss';

class LoginController {

  constructor() {
    'ngInject';


  }

}

/**
 * @ngdoc directive
 * @name home
 * @scope
 * @restrict E
 */
export const home = {
  bindings: {},
  controller: LoginController,
  controllerAs: 'vm',
  template: view
};
