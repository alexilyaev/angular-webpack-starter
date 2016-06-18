import { appConfig, appRun } from './app';

export default angular.module('app.config', [])
  .config(appConfig)
  .run(appRun);
