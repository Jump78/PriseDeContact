<template>
  <section>
    <div v-if="message">
      <p>{{message}}</p>
    </div>
  </section>
</template>

<script>
import idbKeyval from 'idb-keyval';

export default {
  name: 'ValidatedForm',
  data () {
    return {
      message: ''
    }
  },
  created () {
    idbKeyval.get('campaigns')
    .then( campaigns =>  {
      let selectedCampaign = campaigns.filter( item => item._id === this.$route.params.id);
      this.message = selectedCampaign[0].outro_text;
    })
    .catch( err => console.log('No campaigns in cache'));
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
div {
  display: block;
  width: 33vw;
  min-width: 450px;
  margin: 0 auto;
  text-align: justify;
}
@media (max-width: 640px) {
  div {
    /*border: none;
    background: none;*/
    width: 98vw;
    min-width: 200px;
  }
}
</style>
