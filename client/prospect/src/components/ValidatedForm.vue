<template>
  <section>
    <div v-if="message">
      <span class="red-tag"></span>
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

span.red-tag {
  background-color: #F03B58;
  display: block;
  height: 3px;
  width: calc(100px + 6vw);
}
div {
  display: block;
  background-color: #FFF;
  width: 33vw;
  min-width: 450px;
  max-width: 800px;
  padding: 2em 2em 1em 2em;
  margin: 10vw auto;
  text-align: justify;
  border: 1px solid #F0F0F0;
  border-radius: 2px;
}
div p {
  font-size: 1.1em;
}
@media (max-width: 640px) {
  span.red-tag {
    background-color: #F03B58;
    display: block;
    height: 2px;
    width: calc(80px + 6vw);
  }
  div {
    margin: calc(10vw + 2vh) auto !important;
    border: none;
    width: 70vw;
    max-width: 450px;
    min-width: 50px;
    margin: auto;
    border-radius: 4px;
  }
}
</style>
