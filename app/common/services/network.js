import { defaults as _defaults } from 'lodash';

export class Network {

  constructor($http, API_URLS) {
    'ngInject';

    this.$http    = $http;
    this.API_URLS = API_URLS;

    // Default config options for all requests
    this._defaultOptions = {
      // Fail the request after 30 seconds of no response
      timeout: 30000
    };

    this._promisesCache = {
      get: {},
      post: {},
      put: {},
      delete: {}
    };
  }

  _getUrl(path) {
    // if the path start with http it's probably for external service
    if (/https?:\/\//.test(path)) {
      return path;
    }

    return this.API_URLS.API + path;
  }

  _getOptions(options) {
    return _defaults(options, this._defaultOptions);
  }

  /**
   * Promises cache factory
   * Returns a cached promise for a specific request or fetches a new one
   *
   * @param  {string}   method  Cache scope (e.g. `get`, `post`)
   * @param  {string}   path    Cache identifier
   * @param  {Function} fetchFn The function to run when not in cache, must return a promise
   * @return {Object}           Cached or new promise
   */
  _getCachedOrFetch(method, path, fetchFn) {
    const cacheObj = this._promisesCache[method];

    if (!cacheObj[path]) {
      cacheObj[path] = fetchFn();
      // Remove from cache once it's resolved
      cacheObj[path].finally(() => cacheObj[path] = null);
    }

    return cacheObj[path];
  }

  /**
   * Handle GET requests
   *
   * @param  {string} path    The partial path after the API URL
   * @param  {Object} options Configuration to pass to $http
   *                          `_usePendingPromise` - Internal option to use the promises cache
   * @return {Object}         Promise
   */
  get(path, options = {}) {
    const url    = this._getUrl(path);
    const config = this._getOptions(options);

    const fetchFn = () => {
      return this.$http.get(url, config).then((res) => res.data);
    };

    if (options._usePendingPromise) {
      return this._getCachedOrFetch('get', path, fetchFn);
    }

    return fetchFn();
  }

  /**
   * Handle POST requests
   *
   * @param  {string} path    The partial path after the API URL
   * @param  {*}      data    The request payload
   * @param  {Object} options Configuration to pass to $http
   *                          `_usePendingPromise` - Internal option to use the promises cache
   * @return {Object}         Promise
   */
  post(path, data, options = {}) {
    const url    = this._getUrl(path);
    const config = this._getOptions(options);

    const fetchFn = () => {
      return this.$http.post(url, data, config).then((res) => res.data);
    };

    if (options._usePendingPromise) {
      return this._getCachedOrFetch('post', path, fetchFn);
    }

    return fetchFn();
  }

  put(path, data, options = {}) {
    const url    = this._getUrl(path);
    const config = this._getOptions(options);

    const fetchFn = () => {
      return this.$http.put(url, data, config).then((res) => res.data);
    };

    if (options._usePendingPromise) {
      return this._getCachedOrFetch('put', path, fetchFn);
    }

    return fetchFn();
  }

  delete(path, options = {}) {
    const url            = this._getUrl(path);
    const config         = this._getOptions(options);

    const fetchFn = () => {
      return this.$http.delete(url, config).then((res) => res.data);
    };

    if (options._usePendingPromise) {
      return this._getCachedOrFetch('delete', path, fetchFn);
    }

    return fetchFn();
  }

  jsonp(path, options = {}) {
    const url    = this._getUrl(path);
    const config = this._getOptions(options);

    return this.$http.jsonp(url, config).then((res) => res.data);
  }

}
