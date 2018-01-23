import ApiService from './apiService';

/**
 * Prospect service class
 * @type {Class}
 */
export default class extends ApiService{
  constructor () {
    super();
    this.ressource = 'prospect';
  }

  /**
   * Get all prospect from the server
   * @return {Promise} JSON's Request response
   */
  getAll () {
    return fetch(this.baseUrl+'/'+this.ressource)
      .then( this.checkErrors )
      .then( res => res.json() )
      .catch( err => console.log(err) )
  }

  /**
   * Get the prospect with this id
   * @param  {int} id Prospect's id
   * @return {Promise} JSON's Request response
   */
  find (id) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id)
      .then( this.checkErrors )
      .then( res => res.json() )
      .catch( err => console.log(err) )
  }

  /**
   * Add one prospect
   * @param {[type]} prospect The prospect's data
   * @return {Promise} JSON's Request response
   */
  add (prospect) {
    return fetch(this.baseUrl+'/'+this.ressource,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(prospect)
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }

  /**
   * Update the prospect
   * @param  {int} id       Prospect's id
   * @param  {obj} prospect The new data
   * @return {Promise} JSON's Request response
   */
  update (id, prospect) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(prospect)
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }

  /**
   * Delete the prospect
   * @param  {int} id   The prospect's id
   * @return {Promise} JSON's Request response
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
