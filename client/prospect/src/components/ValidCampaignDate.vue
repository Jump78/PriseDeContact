<template>
  <section>
    <p v-if="errMessage">{{errMessage}}</p>
    <div v-if="campaigns.length > 1">
      <h1>A quel evenement êtes-vous présent ?</h1>
      <div v-for="campaign in campaigns">
        <router-link :to="{ name: 'ProspectForm', params: {id: campaign._id} }">{{campaign.name}}</router-link>
      </div>
    </div>

    <div v-if="!campaigns.length" class="no-campaign">
      <p>Aucun evenement aujourd'hui</p>
      <!-- <p>Pour découvrir les formations de l'Ecole Multimédia, rendez-vous sur <a href="https://www.ecole-multimedia.com/">www.ecole-multimédia.com</a></p> -->
    </div>
  </section>
</template>

<script>
import CampaignService from '../services/CampaignService';
import idbKeyval from 'idb-keyval';

import moment from 'moment';

export default {
  name: 'ValidCampaignDate',
  data () {
    return {
      campaignService: new CampaignService(),
      campaigns: [],
      errMessage: null
    }
  },
  methods: {
  },
  created () {
    // Timestamp of the day at 1 am
    let timestamp = moment(Date.now()).hours(1).minutes(0).seconds(0).milliseconds(0).valueOf();

    // Get today event
    this.campaignService.findByDate(timestamp)
    .then(res => {
      if (!res || (res.error && res.status != 404)) throw new Error( (res)? res.message : 'Request error');

      this.campaigns = res.content || [];

      idbKeyval.set('campaigns', this.campaigns); //Save the new campaigns in cache

      if (this.campaigns.length == 1) {
        this.$router.push({name: 'ProspectForm', params:{id: this.campaigns[0]._id}});
      }
    })
    .catch(err => {
      this.errMessage = 'Impossible d\'actualiser les données. Verifiez votre connection internet.'
      idbKeyval.get('campaigns')
      .then( campaigns =>  {
        this.campaigns = campaigns
        if (this.campaigns.length == 1) {
          this.$router.push({name: 'ProspectForm', params:{id: this.campaigns[0]._id}});
        }
      })
      .catch( err => console.log('No campaigns in cache'));
      console.log(err)
    });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
h1 {
  font-weight: 100;
  text-align: center;
  margin: 50px auto;
  font-size: 2em;
}
a {
  text-align: center;
  text-decoration: none;
  color: #333;
  font-size: 1.2em;

  margin: 10px auto;
  display: block;
  padding: 20px 0;
  border: 1px solid #CDCDCD;
  width: calc(220px + 4vw);
}
a:hover {
  background-color: #F03B58;
  color: #fff;
}

div.no-campaign {
  text-align: center;
  text-decoration: none;
  color: #333;
  font-size: 1.2em;

  margin: calc(20px + 2vh) auto;
  display: block;
  padding: calc(20px + 3vh) calc(30px + 3vw);
  border: 1px solid #CDCDCD;
  width: calc(220px + 4vw);
}

@media (max-width: 640px){
  div.no-campaign {
    border-right: none;
    border-left: none;
  }
}

</style>
