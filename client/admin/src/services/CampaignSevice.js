import ApiService from './apiService';

export default class extends ApiService{
  this.ressource: 'campaign',

  getAll () {
    fetch(this.baseUrl+'/'+this.ressource)
      .then( res => res.json() )
      .then( this.checkErrors )
      .catch( err => console.log(err) )
  },

  find (id) {
    fetch(this.baseUrl+'/'+this.ressource+'/'+id)
      .then( res => res.json() )
      .then( this.checkErrors )
      .catch( err => console.log(err) )
  },

  add (campaign) {
    fetch(this.baseUrl+'/'+this.ressource,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(campaign)
    })
    .then( res => res.json() )
    .then( this.checkErrors )
    .catch( err => console.log(err) )
  },

  update (id, campaign) {
    fetch(this.baseUrl+'/'+this.ressource+'/'+id,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(campaign)
    })
    .then( res => res.json() )
    .then( this.checkErrors )
    .catch( err => console.log(err) )
  },

  delete (id) {
    fetch(this.baseUrl+'/'+this.ressource+'/'+id,
    {
      method: "DELETE"
    })
    .then( res => res.json() )
    .then( this.checkErrors )
    .catch( err => console.log(err) )
  }
}
