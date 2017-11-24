<template>
  <section>
    <h1>Edit campaign</h1>
    <CampaignForm :campaign="campaign" @submit="submit"/>
  </section>
</template>

<script>
import config from '../../config/config.json';

import moment from 'moment';

import CampaignForm from './CampaignForm';

export default {
  name: 'EditCampaign',
  components: {
    CampaignForm
  },
  data () {
    return {
      campaign: {}
    }
  },
  methods: {
    submit (campaign) {
      fetch(config.apiEndPoint+':'+config.apiPort+'/campaign/'+this.campaign._id,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(campaign)
      })
      .then( res => res.json() )
      .catch( err => console.error(err) )
    }
  },
  created () {
    fetch(config.apiEndPoint+':'+config.apiPort+'/campaign/'+this.$route.params.id)
    .then( res => res.json() )
    .then( res => this.campaign = res[0] )
    .catch( err => console.error(err) )
  }
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
