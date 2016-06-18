import { exceptionHandlerDecorator } from './exception-handler-decorator';

export default angular.module('app.decorators', [])
  .decorator('$exceptionHandler', exceptionHandlerDecorator);
