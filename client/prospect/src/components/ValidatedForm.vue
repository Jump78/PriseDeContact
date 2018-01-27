<template>
  <section>
    <div v-if="message">
      <p>{{message}}</p>
    </div>
  </section>
</template>

<script>
import CampaignService from '../services/CampaignService';

export default {
  name: 'ValidatedForm',
  data () {
    return {
      campaignService: new CampaignService(),
      message: ''
    }
  },
  created () {
    this.campaignService.find(this.$route.params.id)
        .then(res => {
          this.message = res.content.outro_text;
        })
        .catch(err => console.log(err));
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
