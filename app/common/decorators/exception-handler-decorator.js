export function exceptionHandlerDecorator($delegate, $log) {
  'ngInject';

  $delegate = (exception, cause) => $log.error(exception, cause);
  
  return $delegate;
}
