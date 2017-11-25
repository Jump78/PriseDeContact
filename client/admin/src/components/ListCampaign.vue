<template>
  <section>
    <div v-if="allCampaigns" class="">
      <h2>Campagnes planifiées</h2>
      <div class="flex">
        <ul>
          <li v-for="item in futurCampaigns">
              <CardCampaign :campaign="item" @deleteCampaign="deleteCampaign(item._id)"/>
          </li>
        </ul>
        <div class="cardAddCampaign">
          <CampaignForm @submit="addCampaign"/>
        </div>
      </div>

      <h2>Campagnes du jour</h2>
      <ul>
        <li v-for="item in todayCampaigns">
            <CardCampaign :campaign="item" @deleteCampaign="deleteCampaign(item._id)"/>
        </li>
      </ul>

      <h2>Campagnes passées</h2>
      <ul>
        <li v-for="item in passedCampaigns">
            <CardCampaign :campaign="item" @deleteCampaign="deleteCampaign(item._id)"/>
        </li>
      </ul>
    </div>

    <div v-else class="">
      <p>Pas de data</p>
    </div>
  </section>
</template>

<script>
import CampaignService from '../services/CampaignService';

import moment from 'moment';

import CampaignForm from './CampaignForm';
import CardCampaign from './CardCampaign';

export default {
  name: 'ListCampaign',
  components: {
    CampaignForm,
    CardCampaign
  },
  data () {
    return {
      campaignService: new CampaignService(),

      allCampaigns: [],
      futurCampaigns: [],
      todayCampaigns: [],
      passedCampaigns: [],
    }
  },
  methods: {
    goToDetail (id) {
      this.$router.push({name: 'HomeCampaign', params:{id:id}});
    },
    deleteCampaign (id) {
      fetch(config.apiEndPoint+':'+config.apiPort+'/campaign/'+id,
      {
        method: "DELETE"
      })
      .then( res => res.json() )
      .catch( err => console.error(err) )
    },
    addCampaign (campaign) {
      fetch(config.apiEndPoint+':'+config.apiPort+'/campaign',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(campaign)
      })
      .then( res => res.json() )
      .catch( err => console.error(err) )
    }
  },
  created () {
    this.campaignService.getAll().then( res =>{
      this.allCampaigns = res;

      this.allCampaigns.forEach( (item) => {
        if (moment(parseInt(item.date)).isAfter(Date.now(), 'day')) {
          this.futurCampaigns.push(item);
        } else if (moment(parseInt(item.date)).isBefore(Date.now(), 'day')) {
          this.passedCampaigns.push(item);
        } else if (moment(parseInt(item.date)).isSame(Date.now(), 'day')){
          this.todayCampaigns.push(item);
        }
      })
    })
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
