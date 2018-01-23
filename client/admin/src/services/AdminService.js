import ApiService from './apiService';

export default class extends ApiService{
  constructor () {
    super();
    this.ressource = 'admin';
  }

  /**
   * Connect the user
   * @param  {object} data The credentials to test
   * @return {Promise}    Response of the request
   */
  login (data) {
    return fetch(this.baseUrl+'/'+this.ressource+'/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: "POST",
      body: JSON.stringify(data)
    })
    .then( this.checkErrors ) //Check http code
    .then( res => res.json() )
    .catch( err => console.log(err) );
  }
}
