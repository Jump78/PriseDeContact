<template>
  <section>
    <div @click="openAddCampain" v-if="!deployed" id="open-add-campain">
      <p>+</p>
    </div>
    <form @submit.prevent :class="{closed : !deployed}">
      <div>
        <label for="type">Type</label>
        <div>
          <input required type="radio" name="type" value="jpo" id="jpo" v-model="campaign.type">
          <label for="jpo" v-bind:class="{ selected: campaign.type == 'jpo' }">JPO</label>
          <input required type="radio" name="type" value="salon" id="salon" v-model="campaign.type">
          <label for="salon" v-bind:class="{ selected: campaign.type == 'salon' }">Salon</label>
        </div>
      </div>

      <div>
        <label for="name">Nom</label>
        <input required type="text" name="name" v-model="campaign.name">
      </div>

      <div>
        <label for="date">Date</label>
        <input required type="date" name="date" v-model="campaign.date">
      </div>

      <div>
        <label for="outro_text">Message de fin de formulaire</label>
        <textarea required name="outro_text" v-model="campaign.outro_text"></textarea>
      </div>

      <div class="buttons">
        <button type="button" name="cancel" @click="cancelAddCampaign">Annuler</button>
        <button type="submit" name="validate" @click="submitCampaign">Ajouter</button>
      </div>
    </form>
  </section>
</template>

<script>
import config from '../../config/config.json';
import moment from 'moment';

export default {
  name: 'CampaignForm',
  props: {
    campaign: {
      type: Object,
      default: function() {
        return {}
      }
    },
    deployed: false
  },
  methods: {
    openAddCampain () {
      this.deployed = true
    },
    cancelAddCampaign () {
      this.deployed = false
      this.campaign = {
        name: '',
        type: '',
        date: '',
        outro_text: ''
      }
    },
    submitCampaign () {
      let campaignToSend = {};
      // Copy the model in a new object
      Object.assign(campaignToSend, this.campaign);
      // Convert the date in a date instance
      let date = new Date(campaignToSend.date);
      // Get the timestamp
      campaignToSend.date = date.getTime();

      this.$emit('submit', campaignToSend);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  background-color: #FFF;
  overflow: hidden;
  border: 1px solid #ECECEC;
}
div#open-add-campain {
  color: #777;
  height: 60px;
  width: 72px;
  text-align: center;
  cursor: pointer;
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
form {
  min-height: 130px;
  min-width: 260px;
  padding: 20px 35px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
form.closed{
  opacity: 0;
  padding: 0;
  height: 1px;
  width: 1px;
  min-height: 1px;
  min-width: 1px;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
form > div {
  display: flex;
  margin-bottom: 8px;
}
form > div > label {
  width: 30%;
  margin-right: 3%;
}
form > div > div,
form > div > input,
form > div > textarea {
  width: 66.9999%;
}

/* ligne "Type de campagne" */
form > div > div {
  display: flex;
  justify-content: space-between;
}
form > div > div > input {
  display: none;
}
form > div > div > label {
  text-align: center;
  width: 46%;
  border: 1px solid #ECECEC;
  cursor: pointer;
}
form > div > div > label.selected {
  width: 46%;
  border: 1px solid #ECECEC;
  background-color: #333350;
  color: #FFF;
  transition:0.12s all; 
  -moz-transition:0.12s all; 
  -webkit-transition:0.12s all;
}

/* lignes Nom Date et Message */
form > div > input,
form > div > textarea {
  border: 1px solid #ECECEC;
}
form > div > textarea {
  resize: vertical;
  max-height: 150px;
  min-height: 35px
}
form > div.buttons {
  justify-content: flex-end;
}
form > div.buttons > button {
  width: 30%;
  margin-left: 6px;
  float: right;
  background-color: #FFF;
  border: 1px solid #ECECEC;
  margin-bottom: -10px;
  margin-top: 10px;
  padding: 6px 0;
  cursor: pointer;
}
form > div.buttons > button:hover {
  background-color: #F03B58;
  color: #FFF;
  box-shadow: 0 0 10px 1px rgba(0,0,0,0.1)
}

</style>
