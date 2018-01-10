<template>
  <div @click="$emit('click')">
    <!-- <p>{{campaign.name}}</p> -->
    <router-link :to="{ name: 'HomeCampaign', params: {id: campaign._id} }">{{campaign.name}}</router-link>
    <p>{{campaign.date}}</p>
    <a href="#" @click.prevent="deleteCampaign(campaign._id)">X</a>
    <router-link :to="{ name: 'EditCampaign', params: {id: campaign._id} }">Edit</router-link>
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
    deleteCampaign (id) {
      this.$emit('deleteCampaign', id);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  border: 1px solid black;
  padding: 0.75em 0.5em;
}
</style>
