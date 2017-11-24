<template>
  <section>
    <form @submit.prevent>
      <div>
        <label for="type">Type de la campagne</label>
        <input required type="radio" name="type" value="jpo" v-model="campaign.type">JPO
        <input required type="radio" name="type" value="salon" v-model="campaign.type">Salon
      </div>

      <div>
        <label for="name">Nom de la campagne</label>
        <input required type="text" name="name" v-model="campaign.name">
      </div>

      <div>
        <label for="date">Date de la campagne</label>
        <input required type="date" name="date" v-model="campaign.date">
      </div>

      <div>
        <label for="outro_text">Message de fin de formulaire</label>
        <textarea required name="outro_text" v-model="campaign.outro_text"></textarea>
      </div>

      <div>
        <button type="button" name="cancel" @click="cancelAddCampaign">Annuler</button>
        <button type="submit" name="validate" @click="submitCampaign">Ajout</button>
      </div>
    </form>
  </section>
</template>

<script>
import config from '../../config/config.json';
import moment from 'moment';

export default {
  name: 'CampaignForm',
  components: {
  },
  data () {
    return {
      campaign:{
        name: '',
        type: '',
        date: '',
        outro_text: ''
      }
    }
  },
  methods: {
    cancelAddCampaign () {
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
</style>
