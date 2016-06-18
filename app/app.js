// Vendor libraries
import 'normalize.css/normalize.css';

// Application assets
import 'assets/styles/main.scss';

// Angular and 3rd party modules
import angular        from 'angular';
import ngAnimate      from 'angular-animate';
import uiRouter       from 'angular-ui-router';
import ngMessages     from 'angular-messages';

// Application modules
import Common         from 'common/common.module';
import Models         from 'models/models.module';
import Components     from 'components/components.module';
import States         from 'states/states.module';

let modules = [
  ngAnimate,
  uiRouter,
  ngMessages,
  Common.name,
  Models.name,
  Components.name,
  States.name
];

export default angular.module('app', modules);

// Bootstrap in strictDI mode
angular.bootstrap(document, ['app'], {
  strictDi: true
});
