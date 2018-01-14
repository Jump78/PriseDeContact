import config from '../../config/config';

export default class {

  constructor () {
    this.baseUrl= config.apiEndPoint+'/api';
  }

  async checkErrors(res) {
    if(res.ok) return res;

    let errorMsg = `ERROR ${res.status} (${res.statusText})`;
    let serverText = await res.text();
    if(serverText) errorMsg = `${errorMsg}: ${serverText}`;

    var error = new Error(errorMsg);
    error.response = res;
    throw error;
  }
}
