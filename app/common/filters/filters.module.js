import { thousandsSeparator } from './thousands-separator';

export default angular.module('app.filters', [])
  .filter('thousandsSeparator', thousandsSeparator);
