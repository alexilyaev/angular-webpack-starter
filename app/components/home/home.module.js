import { home }  from './home';
import { sub1 }  from './components/sub1/sub1';
import { sub2 }  from './components/sub2/sub2';

export default angular.module('app.components.home', [])
  .component('home', home)
  .component('sub1', sub1)
  .component('sub2', sub2);
