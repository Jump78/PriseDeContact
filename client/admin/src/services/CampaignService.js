import ApiService from './apiService';

export default class extends ApiService{
  constructor () {
    super();
    this.ressource = 'campaign';
  }

  getAll () {
    return fetch(this.baseUrl+'/'+this.ressource, {
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      credentials: 'include',
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }

  find (id) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id, {
        headers: {
          Authorization: sessionStorage.getItem('token')
        },
        credentials: 'include',
      })
      .then( this.checkErrors )
      .then( res => res.json() )
      .catch( err => console.log(err) )
  }

  add (campaign) {
    return fetch(this.baseUrl+'/'+this.ressource,
    {
      headers: {
        'Authorization': sessionStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(campaign),
      credentials: 'include',
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }

  update (id, campaign) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id,
    {
      headers: {
        'Authorization': sessionStorage.getItem('token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(campaign),
      credentials: 'include',
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }

  delete (id) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id, {
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      credentials: 'include',
      method: "DELETE"
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }

  getProspects (id) {
    return fetch(this.baseUrl+'/'+this.ressource+'/'+id+'/prospect', {
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      credentials: 'include',
    })
    .then( this.checkErrors )
    .then( res => res.json() )
    .catch( err => console.log(err) )
  }
}
