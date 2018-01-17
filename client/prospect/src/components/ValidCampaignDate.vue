<template>
  <section>
    <div v-if="campaigns.length > 1">
      <h1>A quel evenement êtes-vous présent ?</h1>
      <div v-for="campaign in campaigns">
        <router-link :to="{ name: 'ProspectForm', params: {id: campaign._id} }">{{campaign.name}}</router-link>
      </div>
    </div>

    <div v-if="!campaigns.length">
      <p>Aucun evenement aujourd'hui</p>
    </div>
  </section>
</template>

<script>
import CampaignService from '../services/CampaignService';

import moment from 'moment';

export default {
  name: 'ValidCampaignDate',
  data () {
    return {
      campaignService: new CampaignService(),
      campaigns: []
    }
  },
  methods: {
  },
  created () {
    this.campaignService.getAll()
        .then(res => {
          this.campaigns = res.content.filter((item) => moment(parseInt(item.date)).isSame(Date.now(), 'day'));

          if (this.campaigns.length == 1) {
            this.$router.push({name: 'ProspectForm', params:{id: this.campaigns[0]._id}})
          }

        })
        .catch(err => console.log(err));
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

</style>
