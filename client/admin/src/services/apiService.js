import config from '../../config/config';

export default {
  baseUrl: config.apiEndPoint+':'+config.apiPort,

  async checkErrors(res) {
    if(res.ok) return resp;

    let errorMsg = `ERROR ${res.status} (${res.statusText})`;
    let serverText = await res.text();
    if(serverText) errorMsg = `${errorMsg}: ${serverText}`;

    var error = new Error(errorMsg);
    error.response = resp;
    throw error;
  }
}
