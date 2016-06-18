import {
  forEach as _forEach,
  isObject as _isObject,
  isString as _isString,
  isFunction as _isFunction
} from 'lodash';

export class UrlUtils {

  constructor($rootScope, $location, $state, $timeout) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$location  = $location;
    this.$state     = $state;
    this.$timeout   = $timeout;

    this.urlChangeListeners   = [];
    this.queryChangeListeners = {};

    this.urlChangeFlag = false;
    this.evtPrefix     = 'url-utils.';
  }

  /**
   * Setup a listener on URL changes
   */
  _urlChangeHandler() {
    this.urlChangeFlag = true;

    // On URL changes, execute registered listeners
    this.$rootScope.$on('$locationChangeSuccess', (e, newUrl, oldUrl, newState, oldState) => {
      _forEach(this.urlChangeListeners, (listener) => {
        listener(e, newUrl, oldUrl, newState, oldState);
      });
    });
  }

  /**
   * Register a callback function to be called on URL changes
   *
   * @param  {Function} cb callback
   */
  onUrlChange(cb) {
    // Validate
    if (!_isFunction(cb)) {
      throw new TypeError('`onUrlChange`: `cb` must be a function');
    }

    this.urlChangeListeners.push(cb);

    if (!this.urlChangeFlag) {
      this._urlChangeHandler();
    }
  }

  /**
   * Register a callback function to be called on a specific query param value changes
   * The listeners themselves will be destroyed once the given scope is destroyed by default
   *
   * @param  {Object}   scope The Angular scope that initiated the listener
   * @param  {string}   param The query param key to listen for changes on
   * @param  {Function} cb    Callback to execute with the new param value
   */
  onQueryChange(scope, param, cb) {
    // Validate
    if (!_isObject(scope) || !_isString(param) || !_isFunction(cb)) {
      throw new TypeError('`onQueryChange`: Wrong arguments types');
    }

    // Subscribe to given param change events
    scope.$on(this.evtPrefix + param, (e, paramValue) => {
      cb(paramValue);
    });

    let listener = this.queryChangeListeners[param];

    // If the listener for this query param already exists, stop here
    if (listener) {
      return;
    }

    // Register a new listener for this query param
    this.queryChangeListeners[param] = listener = {};
    // Set initial value, to check later if it changed
    listener.currValue = this.getParamValue(param);

    // Listen to URL changes to check if the query param changed
    this.onUrlChange(() => {
      let paramValue = this.getParamValue(param);

      // Stop if the query param value didn't change
      if (listener.currValue === paramValue) {
        return;
      }

      listener.currValue = paramValue;

      // Notify all subscribers of the param change
      this.$rootScope.$broadcast(this.evtPrefix + param, paramValue);
    });
  }

  /**
   * Get the value of a specific query param
   *
   * @param  {string} param The query param to look for
   * @return {string}       The param value
   */
  getParamValue(param) {
    let queryParams = this.$location.search();
    
    return queryParams[param];
  }

  /**
   * Set the value of a specific query param
   *
   * @param  {string}  param    The query param to set/update
   * @param  {string}  value    The value of the param
   * @param  {boolean} noReload If `true`, disable reloading for this update (optional)
   */
  setParamValue(param, value, noReload) {
    let initialReloadOnSearch;
    let currentState;

    // Prevent state reload
    if (noReload) {
      currentState = this.$state.current;
      // Cache original `reloadOnSearch` of the current state
      initialReloadOnSearch = currentState.reloadOnSearch;
      // Prevent state reload on query params search
      currentState.reloadOnSearch = false;
    }

    this.$location.search(param, value);

    // Restore initial reload behavior
    if (noReload) {
      this.$timeout(() => {
        currentState.reloadOnSearch = initialReloadOnSearch;
      });
    }
  }

}
