export class Rates {

  constructor(Network) {
    'ngInject';

    this.Network = Network;
  }

  get(base, symbol) {
    const url = `http://api.fixer.io/latest?callback=JSON_CALLBACK&base=${base}&symbols=${symbol}`;

    return this.Network.jsonp(url)
      .then((currencies) => {
        return currencies.rates[symbol];
      });
  }

}
