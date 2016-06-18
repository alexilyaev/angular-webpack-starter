export class Auth {

  constructor($q, $localStorage, Network, API_URLS, jwtHelper) {
    'ngInject';

    this.$q            = $q;
    this.$localStorage = $localStorage;
    this.Network       = Network;
    this.API_URLS      = API_URLS;
    this.jwtHelper     = jwtHelper;
  }

  register(credentials) {
    const newCredentials = {
      email: credentials.email,
      passcode: credentials.passcode,
      password: credentials.password
    };

    return this.Network.post('register', newCredentials, { showLoader: true })
      .then((authData) => {
        if (!authData.token) {
          return this.$q.reject('Missing Token');
        }

        return this.setAuthData(authData);
      });
  }

  login(credentials) {
    const userCredentials = {
      email: credentials.email,
      passcode: credentials.passcode,
      password: credentials.password
    };

    return this.Network.post('login', userCredentials, { showLoader: true })
      .then((authData) => {
        if (!authData.token) {
          return this.$q.reject('Missing Token');
        }

        return this.setAuthData(authData);
      });
  }

  /**
   * Only relevant during the prototype phase, should be removed afterwards
   */
  adminLogin(credentials) {
    const adminCredentials = {
      email: credentials.email,
      password: credentials.password
    };

    return this.Network.post('admin/login', adminCredentials, { showLoader: true })
      .then((authData) => {
        if (!authData.token) {
          return this.$q.reject('Missing Token');
        }

        this.$localStorage.authAdminData = {
          token: authData.token
        };

        return authData;
      });
  }

  logout() {
    this.deleteLocalStorage();
  }

  setAuthData(authData) {
    this.$localStorage.authData       = {};
    this.$localStorage.authData.token = authData.token;

    return authData;
  }

  getAuthData() {
    return this.$localStorage.authData || null;
  }

  getDecodedToken() {
    const authData = this.getAuthData();

    return authData && this.jwtHelper.decodeToken(authData.token);
  }

  /**
   * Only relevant during the prototype phase, should be removed afterwards
   */
  getAuthAdminData() {
    return this.$localStorage.authAdminData || null;
  }

  deleteLocalStorage() {
    delete this.$localStorage.authData;
    delete this.$localStorage.appState;
  }
}
