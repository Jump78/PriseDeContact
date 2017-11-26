<template>
  <div>
    <NavBar :id="this.$route.params.id"/>
    <div class="flex">
      <p>Nombre de prospects inscrit: {{ prospects.length }}</p>
      <doughnut-chart :chart-data="chartData" :options="options"></doughnut-chart>
      <div class="">

        <qrcode value="http://192.168.21.124:8081/"></qrcode>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../config/config';
import io from 'socket.io-client';

import CampaignService from '../services/CampaignService';

import Doughnut  from '../chart/Doughnut';
import VueQrcode from '@xkeshi/vue-qrcode';
import NavBar from './NavBar';

export default {
  components: {
    'doughnut-chart': Doughnut,
    'qrcode': VueQrcode,
    NavBar
  },
  name: 'HomeCampaign',
  data () {
    return {
      campaignService: new CampaignService(),
      campaign: {},
      prospects: [],
      chartData: null,
      options: {
        responsive: false, maintainAspectRatio: false
      }
    }
  },
  watch: {
    prospects: function () {
      this.fillData();
    }
  },
  methods: {
    fillData () {
      this.chartData = {
        labels: ['home', 'femme'],
        datasets: [{
            data: [
              this.prospects.filter( item => item.gender == 'm' ).length,
              this.prospects.filter( item => item.gender == 'f' ).length
            ],
            backgroundColor: [
              'rgb(0, 100, 150)',
              'rgb(150, 0, 75)',
            ],
            borderWidth: 1
        }]
      };
    }
  },
  created () {
    var socket = io(config.apiEndPoint+":"+config.apiPort);
    socket.on('prospectAdd', (data) => {
      this.prospects.push(data);
      this.fillData();
    })

    this.campaignService.find(this.$route.params.id)
      .then( res => this.campaign = res[0] )
      .catch( err => console.log(err) );

    fetch(config.apiEndPoint+":"+config.apiPort+'/prospect')
      .then( (res) =>{
        if (res.status>= '200' && res.status<'300') {
          return res.json()
        }
        return {
          error: 1,
          message: 'Error server'
        }
       })
      .then( (res) => {
        if (res.error) {
            throw "Http error";
        }
        this.prospects = res;
        this.fillData();
      })
      .catch( (err) => console.log(err));
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

.flex{
  display: flex;
  justify-content: space-around;
}
</style>
