import view from './sub1.html';

class Sub1Controller {

  constructor() {
    'ngInject';


  }

}

/**
 * @ngdoc directive
 * @name sub1
 * @scope
 * @restrict E
 */
export const sub1 = {
  bindings: {},
  controller: Sub1Controller,
  controllerAs: 'vm',
  template: view
};
