<template>
  <section>
    <form @submit.prevent>
      <div>
        <label for="type">Type</label>
        <div>
          <input v-validate="'required|in:jpo,salon'" type="radio" name="type" value="jpo" id="jpo" v-model="campaign.type">
          <label for="jpo" v-bind:class="{ selected: campaign.type == 'jpo' }">JPO</label>
          <input type="radio" name="type" value="salon" id="salon" v-model="campaign.type">
          <label for="salon" v-bind:class="{ selected: campaign.type == 'salon' }">Salon</label>
        </div>
      </div>
      <p v-show="errors.has('type')" :class="{'error': errors.has('type')}">{{ errors.first('type') }}</p>

      <div>
        <label for="name">Nom</label>
        <input v-validate="'required|alpha_spaces_dash'" type="text" name="name" v-model="campaign.name">
      </div>
      <p v-show="errors.has('name')" :class="{'error': errors.has('name')}">{{ errors.first('name') }}</p>

      <div>
        <label for="date">Date</label>
        <input v-validate="'required|date_format:YYYY-MM-DD'" type="date" name="date" v-model="campaign.date">
      </div>
      <p v-show="errors.has('date')" :class="{'error': errors.has('date')}">{{ errors.first('date') }}</p>

      <div>
        <label for="outro_text">Message de fin de formulaire</label>
        <textarea v-validate="'required|alpha_spaces_dash'" name="outro_text" v-model="campaign.outro_text"></textarea>
      </div>
      <p v-show="errors.has('outro_text')" :class="{'error': errors.has('outro_text')}">{{ errors.first('outro_text') }}</p>

      <div class="buttons">
        <button v-if="!isEdit" type="button" name="cancel" @click="cancelAddCampaign">Annuler</button>
        <button type="submit" name="validate" @click="onSubmit">Ajouter</button>
      </div>
    </form>
  </section>
</template>

<script>
import config from '../../config/config.json';
import moment from 'moment';

import french from 'vee-validate/dist/locale/fr'

export default {
  name: 'CampaignForm',
  props: {
    isEdit: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    campaign: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    //Emit cancel event
    cancelAddCampaign () {
      this.errors.clear();
      this.$emit('cancel');
    },
    onSubmit () {
      let self = this; //Save the context
      //Check if all the field are valid
      this.$validator.validateAll()
      .then( result => {
        if (result) return self.submitCampaign();
        return;
      })
    },
    //Emit submit event
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
  },
  created () {
    this.$validator.localize('fr', {
      messages: french.messages,
      attributes: {
        type: 'Le type ',
        name: 'Le nom ',
        date: 'La date ',
        outro_text: 'Le message de fin '
      }
    })
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
form {
  min-height: 130px;
  min-width: 260px;
  padding: 20px 35px;
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

.error{
  text-align: right;
  color: red;
}

</style>
