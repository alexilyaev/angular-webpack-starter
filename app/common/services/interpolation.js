import {
  mapValues as _mapValues,
  isFunction as _isFunction
} from 'lodash';

export class Interpolation {

  constructor($interpolate, $parse) {
    'ngInject';

    this.$interpolate = $interpolate;
    this.$parse       = $parse;

    this._errMessageStart = 'Interpolation: ';
  }

  /**
   * Takes a template, string or object. Returns a stringified string,
   * or throws SyntaxError if object can not be stringified.
   *
   * @param {string|object} template
   * @returns {string}
   * @private
   */
  _convertTemplateToString(template) {
    if (angular.isString(template)) {
      return template;
    }

    try {
      return JSON.stringify(template);
    }
    catch (e) {
      const errMsg = `${this._errMessageStart} _convertTemplateToString:
        Had a problem stringifying the provided template.
        Value: ${template}
        Error: ${e.message}`;

      throw new SyntaxError(errMsg);
    }
  }

  /**
   * Takes a template string and tries to JSON.parse it into an object.
   * If JSON.parse fails, it throws a SyntaxError
   *
   * @param {string} templateString
   * @private
   */
  _convertStringToObject(templateString) {
    try {
      return JSON.parse(templateString);
    }
    catch (e) {
      const errMsg = `${this._errMessageStart} _convertStringToObject:
        templateString could not be parsed to object.
        Value: ${templateString}
        Error: ${e.message}`;

      throw new SyntaxError(errMsg);
    }
  }

  /**
   * Takes a template (string or object) and a state object, and interpolates the template
   * based on state. It returns an (post-interpolated) object.
   *
   * @param {string|object} template
   * @param {object}        state
   * @returns {Object}
   */
  interpolate(template, state) {
    if (angular.isString(template)) {
      return this.$interpolate(template)(state);
    }

    const templateString = this._convertTemplateToString(template);
    const interpolated   = this.$interpolate(templateString)(state);

    return this._convertStringToObject(interpolated);
  }

  /**
   * Parse values in the form `fromState(expression)`
   * which returns a function named `PARSE_ME`
   * which returns an Angular expression (without {{ }})
   *
   * @param {string|Function} value
   * @param {Object}          context
   * @returns {*}
   */
  parseValue(value, context) {
    if (_isFunction(value) && value.name === 'PARSE_ME') {
      const expression = value();

      if (_isFunction(expression)) {
        return expression(context);
      }

      return this.$parse(expression)(context);
    }

    return value;
  }

  parseValues(object, context) {
    return _mapValues(object, (value) => {
      return this.parseValue(value, context);
    });
  }
}
