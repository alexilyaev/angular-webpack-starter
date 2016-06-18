import {
  isNaN as _isNaN,
  isUndefined as _isUndefined
} from 'lodash';

/**
 * Changes a number in thousands into a comma separated number
 *
 * e.g.
 * 1000 -> 1,000
 * 1000000 -> 1,000,000
 */

export function thousandsSeparator () {
  return (number) => {
    if (_isUndefined(number)) {
      return '-';
    }

    number = Number(number);

    if (_isNaN(number)) {
      return '-';
    }

    return number.toLocaleString();
  };
}
