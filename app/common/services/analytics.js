import { pick as _pick } from 'lodash';

export class Analytics {

  constructor($window, $timeout, ANALYTICS) {
    'ngInject';

    this.$window   = $window;
    this.$timeout  = $timeout;
    this.ANALYTICS = ANALYTICS;
  }

  trackUser(userData) {
    if (!this.ANALYTICS.TRACK_ID) {
      return;
    }

    let userObj = _pick(userData, ['id', 'name', 'email']);

    this.$window.__insp = this.$window.__insp || [];
    this.$window.__insp.push(['wid', this.ANALYTICS.TRACK_ID]);
    this.$window.__insp.push(['identify', userObj.email]);
    this.$window.__insp.push(['tagSession', userObj]);

    this.$timeout(this.ldinsp.bind(this), 500);

    if (document.readyState !== 'complete') {
      this.$window.addEventListener('load', this.ldinsp.bind(this), false);
    }
    else {
      this.ldinsp();
    }
  }

  ldinsp() {
    if (!this || typeof this.$window.__inspld !== 'undefined') {
      return;
    }

    this.$window.__inspld = 1;

    const newScriptTag   = document.createElement('script');
    const firstScriptTag = document.querySelector('script');

    newScriptTag.type  = 'text/javascript';
    newScriptTag.async = true;
    newScriptTag.id    = 'inspsync';
    newScriptTag.src   = '//cdn.inspectlet.com/inspectlet.js';

    firstScriptTag.parentNode.insertBefore(newScriptTag, firstScriptTag);
  }

}
