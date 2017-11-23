<template>
  <div class="flex">
    <p>Nombre de prospects inscrit: {{ prospects.length }}</p>
    <doughnut-chart :chart-data="chartData" :options="options"></doughnut-chart>
    <div class="">

      <qrcode value="http://192.168.21.124:8081/"></qrcode>
    </div>
  </div>
</template>

<script>
import Doughnut  from '../chart/Doughnut';
import io from 'socket.io-client';
import VueQrcode from '@xkeshi/vue-qrcode'

export default {
  components: {
    'doughnut-chart': Doughnut,
    'qrcode': VueQrcode
  },
  name: 'HelloWorld',
  data () {
    return {
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
    var socket = io('http://192.168.20.254:8020');
    socket.on('prospectAdd', (data) => {
      this.prospects.push(data);
      this.fillData();
    })

    fetch('http://192.168.20.254:8020/prospect')
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
