import ApiService from './apiService';

export default class extends ApiService{
  constructor () {
    super();
    this.ressource = 'prospect';
  }

  getAll () {
    return fetch(this.baseUrl+'/'+this.ressource)
      .then( this.checkErrors )
      .then( res => res.json() )
      .catch( err => console.log(err) )
  }

  find (id) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id)
      .then( this.checkErrors )
      .then( res => res.json() )
      .catch( err => console.log(err) )
  }

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
