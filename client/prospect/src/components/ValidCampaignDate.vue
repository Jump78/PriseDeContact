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
h1, h2 {
  font-weight: normal;
}
</style>
