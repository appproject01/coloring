if (typeof require !== 'undefined') {
  // Case of Node JS
  EnvironmentVariablesService = require('../services/EnvironmentVariablesService');
} else {
  // Assume library is defined in the global scope in Google Apps Script 
}

class FinancialAPIDataService {
  /**
   * Constructor for FinancialAPIDataService class.
   */
  constructor() {
    this._financialApiBaseUrl = 'https://financialmodelingprep.com/api';
    this._financialApiKey = new EnvironmentVariablesService().getVariable("FinancialApiKey");
  }

  /**
   * Fetches data from the financial API.
   * @param {string} url The URL to fetch.
   * @returns {object} The parsed JSON data.
   */
  getData(url) {
    // const separator = url.includes('?') ? '&' : '?';
    // const fullUrl = `${this._financialApiBaseUrl}${url}${separator}apikey=${this._financialApiKey}`;

    // const response = UrlFetchApp.fetch(fullUrl);
    // const json = response.getContentText();
    // const dataObj = JSON.parse(json);
    // return dataObj;
    const separator = url.includes('?') ? '&' : '?';
    const fullUrl = `${this._financialApiBaseUrl}${url}${separator}apikey=${this._financialApiKey}`;

    if (typeof require !== 'undefined') {
      // Node.js environment
      const request = require('sync-request');
      try {
        const response = request('GET', fullUrl);
        const json = response.getBody('utf8');
        const dataObj = JSON.parse(json);
        return dataObj;
      } catch (e) {
        throw new Error(`API call failed: ${e.message}. URL: ${fullUrl}`);
      }
    } else {
      // Google Apps Script environment
      try {
        const response = UrlFetchApp.fetch(fullUrl);
        const json = response.getContentText();
        const dataObj = JSON.parse(json);
        return dataObj;
      } catch (e) {
        throw new Error(`API call failed: ${e.message}. URL: ${fullUrl}`);
      }
    }

  }

  /**
   * Gets the peers for a given ticker.
   * @param {string} ticker The ticker symbol.
   * @returns {array} The peers data.
   */
  getPeers(ticker) {
    const url = `/v4/stock_peers?symbol=${ticker}`;
    const data = this.getData(url);
    if (data && data[0] && data[0].peersList) {
      const peerListStr = data[0].peersList.join(",");
      const urlPeers = `/v3/quote/${peerListStr}`;
      return this.getData(urlPeers);

    } else {
      return [];
    }
  }

  /**
    * Pre-fetches financial data from multiple URLs and returns the result as an object.
    */
  preFetchData(ticker) {
    let data = {};

    const urls = [
      ['balanceSheet', `/v3/balance-sheet-statement/${ticker}?period=quarter`],
      ['enterpriseValues', `/v3/enterprise-values/${ticker}?period=quarter`],
      ['incomeStatement', `/v3/income-statement/${ticker}?period=quarter`],
      ['companyProfile', `/v3/profile/${ticker}`],
      ['analystEstimates', `/v3/analyst-estimates/${ticker}?period=annual`],
    ];

    urls.forEach(([propName, url]) => {
      data[propName] = this.getData(url);
    });

    return data;
  }

  /**
    * Pre-fetches financial data from multiple URLs and returns the result as an object.
    */
  preFetchDataExtra(ticker) {
    let data = {};

    const urls = [
      ['balanceSheet', `/v3/balance-sheet-statement/${ticker}?period=quarter`],
      ['balanceSheetY', `/v3/balance-sheet-statement/${ticker}?period=annual`],
      ['enterpriseValues', `/v3/enterprise-values/${ticker}?period=quarter`],
      ['incomeStatement', `/v3/income-statement/${ticker}?period=quarter`],
      ['incomeStatementY', `/v3/income-statement/${ticker}?period=annual`],
      ['cashFlowStatement', `/v3/cash-flow-statement/${ticker}?period=quarter`],
      ['cashFlowStatementY', `/v3/cash-flow-statement/${ticker}?period=annual`],
      ['ratiosY', `/v3/ratios/${ticker}?period=annual`],
      ['companyProfile', `/v3/profile/${ticker}`],
      ['analystEstimates', `/v3/analyst-estimates/${ticker}`],
    ];

    urls.forEach(([propName, url]) => {
      data[propName] = this.getData(url);
    });

    return data;
  }

}

if (typeof module !== 'undefined' && module.exports) { module.exports = FinancialAPIDataService; }