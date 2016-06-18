import {
  forEach as _forEach,
  sum     as _sum,
  flatMap as _flatMap
} from 'lodash';

export class TimeUtils {

  constructor(MONTHS_ARRAY, FREQUENCY_TYPES) {
    'ngInject';

    this.MONTHS_ARRAY    = MONTHS_ARRAY;
    this.FREQUENCY_TYPES = FREQUENCY_TYPES;
  }

  calcFirstMonth(firstMonthIn) {
    let firstMonth = firstMonthIn - this.skipped;

    if (this.skipped !== 0) {
      firstMonth = firstMonthIn;
    }

    if (firstMonth < 0) {
      firstMonth += this.months.length;
    }

    return firstMonth;
  }

  calcSum(exposure) {
    const items = _flatMap(exposure.cashflows);
    let sum     = 0;

    _forEach(items, (value) => {
      const numberOfMonths = this.MONTHS_ARRAY.length - this.calcFirstMonth(value.firstMonth);

      if (value.cashflow) {
        sum += _sum(value.cashflow);
      }
      else {
        sum += value.amount * Math.ceil(numberOfMonths / this.FREQUENCY_TYPES[value.frequency]);
      }
    });

    return sum;
  }

  addMonth(date) {
    if (date.getMonth() === 11) {
      date.setMonth(0);
      date.setFullYear(date.getFullYear() + 1);
    }

    else {
      date.setMonth(date.getMonth() + 1);
    }

    return date;
  }

  getSkippedMonths() {
    const today             = new Date();
    const thisMonth         = today.getMonth();
    const months            = angular.copy(this.MONTHS_ARRAY);
    const monthsBeforeStart = months.splice(0, thisMonth);

    return monthsBeforeStart.length || 0;
  }

  getMonthsFromCurrent(format) {
    const today             = new Date();
    const thisMonth         = today.getMonth();
    const months            = angular.copy(this.MONTHS_ARRAY);
    const monthsBeforeStart = months.splice(0, thisMonth);

    months.push(...monthsBeforeStart);

    if (format === 'MMM') {
      _forEach(months, (month, i) => {
        months[i] = month.slice(0, 3);
      });
    }

    return months;
  }

}
