import view from './sub2.html';

class Sub2Controller {

  constructor() {
    'ngInject';


  }

}

/**
 * @ngdoc directive
 * @name sub2
 * @scope
 * @restrict E
 */
export const sub2 = {
  bindings: {},
  controller: Sub2Controller,
  controllerAs: 'vm',
  template: view
};
