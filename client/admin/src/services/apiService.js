/*** Import ***/
import config from '../../config/config';

/**
 * Base class for all service
 */
export default class {

  constructor () {
    this.baseUrl= config.apiEndPoint;
  }

  /**
   * Check the http error (300 && 400)
   * @param  Response  res request's response
   * @return {Promise}     Return res if no probleme, else throw the error
   */
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
