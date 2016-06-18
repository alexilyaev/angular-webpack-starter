import constants  from './constants/constants.module';
import directives from './directives/directives.module';
import services   from './services/services.module';
import filters    from './filters/filters.module';
import decorators from './decorators/decorators.module';
import config     from './config/config.module';

export default angular.module('app.common', [
  constants.name,
  directives.name,
  services.name,
  filters.name,
  decorators.name,
  config.name
]);
