<template>
  <div @click="$emit('click')">
    <router-link :to="{ name: 'HomeCampaign', params: {id: campaign._id} }" class="title">{{campaign.name}}</router-link>
    <p>{{campaign.date | date}}</p>
    <a href="#" @click.prevent="deleteCampaign(campaign._id)" class="button sup">Supprimer</a>
    <router-link :to="{ name: 'EditCampaign', params: {id: campaign._id} }" class="button edi">Editer</router-link>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CardCampaign',
  props: {
    campaign: {
      type: Object,
      required: true
    }
  },
  methods: {
    //Emit deleteCampaign event to the parent
    deleteCampaign (id) {
      this.$emit('deleteCampaign', id);
    },
  },
  filters: {
    //Parse date to dd/mm/yyyy
    date: (data) => {
      return new Date(parseInt(data)).toLocaleDateString();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  border: 1px solid #ECECEC;
  padding: 1.2em 1.3em;
  background-color: #FFF;
  width: calc(200px + 3vw);
  border-radius: 3px;
}
a.title {
  color: #2C314E;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1em;
  padding: .1em .2em;
  /* border-bottom: .1em solid #2C314E; */
}
a.title:hover {
  text-decoration: underline;
}
p {
  margin-top: 20px;
  margin-bottom: 10px;
}
a.button {
  display: inline-block;
  background-color: #FFF;
  border: 1px solid #DCDCDC;
  min-width: 6em;
  width: 38%;
  text-decoration: none;
  text-align: center;
  padding: 3px 0;
  font-size: .9em;
  margin-top: 5px;
  color: #222;
}

a.button.sup {
  border-color: #F03B58;
  color: #F03B58;
}
a.button.edi {
  border-color: #2C314E;
  color: #2C314E;
}
a.button.sup:hover {
  border-color: #F03B58;
  background-color: #F03B58;
  color: #FFF;
}
a.button.edi:hover {
  border-color: #2C314E;
  background-color: #2C314E;
  color: #FFF;
}
</style>
