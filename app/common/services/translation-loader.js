/**
 * This Factory handles async loading of translation objects
 *
 * Reference:
 * https://github.com/angular-translate/angular-translate/wiki/Asynchronous-loading
 */

export function translationLoader() {
  'ngInject';

  /**
   * Fetch the translations object for a specific language (or the default one)
   *
   * @param  {string} lang Language code (e.g. 'en-US')
   * @return {Object}      Promise
   */
  function loadTranslations(lang) {
    // Call a Model to get this lang translations, return a Promise
    return lang;
  }

  /**
   * Translations handler, called when using `$translate.use`
   *
   * @param  {Object} options `$translate.use` options (e.g. { key: 'en-US' })
   * @return {Object}         Promise
   */
  return function (options) {
    return loadTranslations(options.key);
  };
}
