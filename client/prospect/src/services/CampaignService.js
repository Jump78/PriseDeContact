import ApiService from './apiService';

/**
 * Campaign service class
 * @type Class
 */
export default class extends ApiService{
  constructor () {
    super();
    this.ressource = 'campaign'; //Name of the ressource (in url)
  }

  /**
   * Get all campaign from server
   * @return {Promise}    Response of the request
   */
  getAll () {
    return fetch(this.baseUrl+'/'+this.ressource)
      .then( this.checkErrors ) //Check for http erros
      .then( res => res.json() ) //Return the json
      .catch( err => console.log(err) ) //Display the errors
  }

  /**
   * Find the campaign by his id
   * @param  {int}        id Campaign's id
   * @return {Promise}    Response of the request
   */
  find (id) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id)
      .then( this.checkErrors )
      .then( res => res.json() )
      .catch( err => console.log(err) )
  }

  /**
   * Find the campaign by his date
   * @param  {int}        Campaign's date
   * @return {Promise}    Response of the request
   */
  findByDate (date) {
    return fetch(this.baseUrl+'/'+this.ressource+'/date/'+date)
      .then( this.checkErrors )
      .then( res => res.json() )
      .catch( err => console.log(err) )
  }

  /**
   * Add a campaign
   * @param {object}      campaign The data of the new campaign
   * @return {Promise}    Response of the request
   */
  add (campaign) {
    return fetch(this.baseUrl+'/'+this.ressource,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(campaign)
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }

  /**
   * Update a campaign
   * @param  {int}    id        Campaign's id
   * @param  {object} campaign  The new data for the campaign
   * @return {Promise}          Response of the request
   */
  update (id, campaign) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(campaign)
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }

  /**
   * Delete the campaign by his id
   * @param  {int} id     Campaign's id
   * @return {Promise}    Response of the request
   */
  delete (id) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id,
    {
      method: "DELETE"
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }
}
