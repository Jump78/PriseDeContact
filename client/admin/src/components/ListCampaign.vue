<template>
  <section class="all-campaigns">
    <p v-if="message != ''">{{message}}</p>
    <div v-if="allCampaigns">
      <div class="campaignBlock">
        <h2>Campagnes planifiées</h2>
        <ul>
          <li v-for="item in futurCampaigns">
            <CardCampaign :campaign="item" @deleteCampaign="deleteCampaign(item._id)"/>
          </li>
          <li class="cardAddCampaign">
            <div @click="openAddCampain" v-if="!deployed" id="open-add-campain">
              <p>+</p>
            </div>
            <div class="box-campaign-form" :class="{open : deployed}">
              <CampaignForm class="transition" :campaign="campaignToAdd"  @submit="addCampaign" @cancel="deployed = false; campaignToAdd = {}" />
            </div>
          </li>
        </ul>
      </div>

      <div class="campaignBlock">
        <h2>Campagnes du jour</h2>
        <ul>
          <li v-for="item in todayCampaigns">
            <CardCampaign :campaign="item" @deleteCampaign="deleteCampaign(item._id)"/>
          </li>
        </ul>
      </div>

      <div class="campaignBlock">
        <h2>Campagnes passées</h2>
        <ul>
          <li v-for="item in passedCampaigns">
            <CardCampaign :campaign="item" @deleteCampaign="deleteCampaign(item._id)"/>
          </li>
        </ul>
      </div>
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
      message: '',
      deployed: false,
      allCampaigns: [],
      futurCampaigns: [],
      todayCampaigns: [],
      passedCampaigns: [],
      campaignToAdd: {}
    }
  },
  watch: {
    allCampaigns: function (val) { //Watch this array to refill the array of each kind of campaigns
      this.futurCampaigns = [];
      this.todayCampaigns = [];
      this.passedCampaigns = [];
      val.map( (item) => this.populateCampaignTypeArray(item) )
    }
  },
  methods: {
    openAddCampain () {
      this.deployed = true
    },
    goToDetail (id) {
      this.$router.push({name: 'HomeCampaign', params:{id:id}});
    },
    deleteCampaign (id) {
      console.log(id);
      this.allCampaigns = this.allCampaigns.filter( item => item._id !== id );
      this.campaignService.delete(id);
     },
    addCampaign (campaign) {
      this.campaignToAdd = {};
      this.deployed = false;
      this.campaignService
          .add(campaign)
          .then( res => this.allCampaigns = this.allCampaigns.concat(res.content) )
          .catch( err => this.message = 'Erreur server');
    },
    populateCampaignTypeArray (item){
      if (moment(parseInt(item.date)).isAfter(Date.now(), 'day')) {
        this.futurCampaigns.push(item);
      } else if (moment(parseInt(item.date)).isBefore(Date.now(), 'day')) {
        this.passedCampaigns.push(item);
      } else if (moment(parseInt(item.date)).isSame(Date.now(), 'day')){
        this.todayCampaigns.push(item);
      }
    }
  },
  created () {
    this.campaignService.getAll().then( res =>{
      this.allCampaigns = res.content;
      if (Array.isArray(this.allCampaigns)) {
        this.allCampaigns.forEach( (item) => this.populateCampaignTypeArray(item))
      }
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section.all-campaigns {
  margin-left: calc(10px + 2vw);
}
.campaignBlock{
  margin: 2em 0;
}
.campaignBlock > h2{
  margin-left: 0.5em;
  margin-bottom: 1em;
  font-weight: 200;
  font-size: 2em;
}
.campaignBlock > ul {
  display: flex;
}

ul{
  display: flex;
  width: 90vw;
  flex-wrap: wrap;
}

li{
  list-style: none;
  margin-left: 0.7em;
  margin-bottom: 0.75em;
}

div#open-add-campain {
  color: #777;
  height: 60px;
  width: 72px;
  text-align: center;
  cursor: pointer;
  background-color: #FFF;
  overflow: hidden;
  border: 1px solid #ECECEC;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}
div#open-add-campain p {
  font-size: 3em;
  margin: 0;
}
div#open-add-campain:hover {
  color: #333;
  width: 76px;
  cursor: pointer;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}
.box-campaign-form {
  opacity: 0;
  overflow: hidden;
  max-width: 300px;
  max-height: 40px;
}
.box-campaign-form.open {
  opacity: 1;
  max-width: 700px;
  max-height: 380px;
  transition: .6s ease all;
  -moz-transition: .6s ease all;
  -webkit-transition: .6s ease all;
}

.transition{
  transition:0.2s ease all;
}
</style>
