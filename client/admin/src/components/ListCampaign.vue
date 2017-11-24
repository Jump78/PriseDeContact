<template>
  <section>
    <div v-if="allCampaigns" class="">
      <h2>Campagnes planifiées</h2>
      <div class="flex">
        <ul>
          <li v-for="item in futurCampaigns">
            <p>{{item.name}}</p>
            <p>{{item.date}}</p>
            <p @click="deleteCampaign(item._id)"> X </p>
          </li>
        </ul>
        <div class="cardAddCampaign">
          <form @submit.prevent>
            <div class="block-input input-radio">
              <label for="type">Type de la campagne</label>
              <input required type="radio" name="type" value="jpo" v-model="campaign.type">JPO
              <input required type="radio" name="type" value="salon" v-model="campaign.type">Salon
            </div>

            <div class="">
              <label for="name">Nom de la campagne</label>
              <input required type="text" name="name" v-model="campaign.name">
            </div>

            <div class="">
              <label for="date">Date de la campagne</label>
              <input required type="date" name="date" v-model="campaign.date">
            </div>

            <div class="">
              <label for="outro_text">Message de fin de formulaire</label>
              <textarea required name="outro_text" v-model="campaign.outro_text"></textarea>
            </div>

            <div class="">
              <button type="button" name="cancel" @click="cancelAddCampaign">Annuler</button>
              <button type="submit" name="validate" @click="addCampaign">Ajout</button>
            </div>
          </form>
        </div>
      </div>

      <h2>Campagnes du jour</h2>
      <ul>
        <li v-for="item in todayCampaigns">
          <p>{{item.name}}</p>
          <p>{{item.date}}</p>
          <p @click="deleteCampaign(item._id)"> X </p>
          <router-link :to="{ name: 'HomeCampaign', params: {id: item._id} }">Details</router-link>
        </li>
      </ul>

      <h2>Campagnes passées</h2>
      <ul>
        <li v-for="item in passedCampaigns">
          <p>{{item.name}}</p>
          <p>{{item.date}}</p>
          <p @click="deleteCampaign(item._id)"> X </p>
        </li>
      </ul>
    </div>

    <div v-else class="">
      <p>Pas de data</p>
    </div>
  </section>
</template>

<script>
import config from '../../config/config.json';
import moment from 'moment';

export default {
  name: 'ListCampaign',
  components: {
  },
  data () {
    return {
      allCampaigns: [],
      futurCampaigns: [],
      todayCampaigns: [],
      passedCampaigns: [],
      campaign:{
        name: '',
        type: '',
        date: '',
        outro_text: ''
      }
    }
  },
  methods: {
    deleteCampaign (id) {
      fetch(config.apiEndPoint+':'+config.apiPort+'/campaign/'+id,
      {
        method: "DELETE"
      })
      .then( res => res.json )
      .catch( err => console.error(err) )
    },
    cancelAddCampaign () {
      this.campaign = {
        name: '',
        type: '',
        date: '',
        outro_text: ''
      }
    },
    addCampaign () {
      let campaignToSend = {};
      // Copy the model in a new object
      Object.assign(campaignToSend, this.campaign);
      // Convert the date in a date instance
      let date = new Date(campaignToSend.date);
      // Get the timestamp
      campaignToSend.date = date.getTime();

      fetch(config.apiEndPoint+':'+config.apiPort+'/campaign',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(campaignToSend)
      })
      .then( res => res.json )
      .catch( err => console.error(err) )
    }
  },
  created () {
    fetch(config.apiEndPoint+':'+config.apiPort+'/campaign')
     .then( res => {
       if (res.status>=200 && res.status<300) {
         return res.json()
       }

       return {error: 1, message: 'Serv error'}
     })
     .then( res => {
       if (!res.error) {
         this.allCampaigns = res;

         this.allCampaigns.forEach( (item) => {
           if (moment(parseInt(item.date)).isAfter(Date.now(), 'day')) {
             console.log('futur');
             this.futurCampaigns.push(item);
           } else if (moment(parseInt(item.date)).isBefore(Date.now(), 'day')) {
             console.log('passer');
             this.passedCampaigns.push(item);
           } else if (moment(parseInt(item.date)).isSame(Date.now(), 'day')){
             console.log('auj');
             this.todayCampaigns.push(item);
           }
         })
       } else {
         this.allCampaigns = null;
       }
     })
     .catch( err => console.error(err));
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex{
  display: flex;
  justify-content: start;
}
.cardAddCampaign{
  border: 1px dashed black
}
</style>
