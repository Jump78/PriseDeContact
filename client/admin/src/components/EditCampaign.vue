<template>
  <section>
    <NavBar :id="this.$route.params.id"/>
    <h1>Edit campaign</h1>
    <div class="campaign-form-box">
      <CampaignForm :campaign="campaign" :isEdit="true" @submit="submit"/>
    </div>
  </section>
</template>

<script>
import moment from 'moment';

import CampaignService from '../services/CampaignService';

import CampaignForm from './CampaignForm';
import NavBar from './NavBar';

export default {
  name: 'EditCampaign',
  components: {
    CampaignForm,
    NavBar
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
      .then( res => {
        this.campaign = res.content;
        let date = moment(parseInt(this.campaign.date));
        console.log(date.format('YYYY-MM-DD'));
        this.campaign.date = date.format('YYYY-MM-DD');
      } )
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
div.campaign-form-box {
  width: 50vw;
  margin: 10px auto;
}
</style>
