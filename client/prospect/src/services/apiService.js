/**
 * Base class of service
 * @type class
 */
export default class {

  constructor () {
    this.baseUrl= process.env.apiEndPoint;
  }

  //Check for http errors
  async checkErrors(res) {
    if(res.ok) return res;

    let errorMsg = `ERROR ${res.status} (${res.statusText})`; //Create the error message
    let serverText = await res.text(); //Wait for the response's text
    if(serverText) errorMsg = `${errorMsg}: ${serverText}`; //If we have texte, add it to the error message

    var error = new Error(errorMsg); //Create the error
    error.response = res; //Set the response into the error
    throw error;
  }
}
