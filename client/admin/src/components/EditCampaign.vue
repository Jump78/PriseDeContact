<template>
  <section>
    <h1>Edit campaign</h1>
    <CampaignForm :campaign="campaign" @submit="submit"/>
  </section>
</template>

<script>
import CampaignService from '../services/CampaignService';

import moment from 'moment';

import CampaignForm from './CampaignForm';

export default {
  name: 'EditCampaign',
  components: {
    CampaignForm
  },
  data () {
    return {
      campaignService: new CampaignService(),
      campaign: {}
    }
  },
  methods: {
    submit (campaign) {
      this.campaignService.update(this.$route.params.id, campaign)
        .then( res => console.log(res) )
        .catch( err => console.log(err) )
    },
  },
  created () {
    this.campaignService.find(this.$route.params.id)
      .then( res => this.campaign = res[0] )
      .catch( err => console.log(err) );
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
