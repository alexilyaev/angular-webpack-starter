import view from './home.html';
import './home.scss';

class HomeController {

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
  controller: HomeController,
  controllerAs: 'vm',
  template: view
};
