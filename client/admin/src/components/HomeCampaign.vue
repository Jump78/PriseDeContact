<template>
  <div>
    <NavBar :id="this.$route.params.id"/>
    <div v-if="selectedProspect" class="prospectDetails">
      <p @click="selectedProspect = null">X</p>
      <p v-for="(value, index) in selectedProspect">
        {{index}} : {{value}}
      </p>
    </div>
    <div class="flex">
      <div class="prospectList">
        <ul>
          <li v-for="prospect in prospects" @click="selectedProspect = objectToDOM(prospect)">{{prospect.firstname}} {{prospect.lastname}}</li>
        </ul>
        <button type="button" name="export" @click="exportCSV">Export</button>
        <div class="clear"></div>
      </div>

      <div>
        <p class="prospectNumber">{{ prospects.length }} prospects</p>
        <div class="access">
          <p>Acces au formulaire</p>
          <button class="clipboard" type="button" name="copyLink" data-clipboard-target="#linkValue">Copier le lien</button>
          <input type="hidden" id="linkValue" name="linkValue" :value="formUrl">

          <button type="button" name="copyQrcode" @click="printCanvas('qrcode')">Imprimer le QRCode</button>
          <qrcode id="qrcode" :value="formUrl" hidden></qrcode>
        </div>
      </div>

      <div class="chart">
        <button type="button" name="gender" @click="charDataShow = 'gender'; fillData()">Sexe</button>
        <button type="button" name="asked_class" @click="charDataShow = 'asked_class'; fillData()">Formation</button>
        <button type="button" name="postcode" @click="charDataShow = 'postcode'; fillData()">Region</button>
        <doughnut-chart :chart-data="chartData" :options="options"></doughnut-chart>
        <barchart :chart-data="chartData" :options="options"></barchart>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../config/config';
import io from 'socket.io-client';
import {JSONToCSVConvertor} from '../helper/exportToCSV';

import CampaignService from '../services/CampaignService';

import Doughnut  from '../chart/Doughnut';
import Barchart  from '../chart/Barchart';
import VueQrcode from '@xkeshi/vue-qrcode';
import NavBar from './NavBar';
import Clipboard from 'clipboard';

export default {
  components: {
    'doughnut-chart': Doughnut,
    'barchart': Barchart,
    'qrcode': VueQrcode,
    NavBar
  },
  name: 'HomeCampaign',
  data () {
    return {
      formUrl : config.formUrl + ':' + config.formPort,
      selectedProspect: null,
      charDataShow : 'asked_class',
      campaignService: new CampaignService(),
      campaign: {},
      prospects: [],
      chartData: null,
      options: {
        responsive: true,
        maintainAspectRatio: true
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
      let data = {};
      const self = this;

      this.prospects.forEach((item) => {
        let key = item[self.charDataShow].toString();

        if (self.charDataShow == 'postcode') {
          key = key.substring(0,2);
        }

        if (!data.hasOwnProperty(key)) {
          data[key] = 1;
        } else {
          data[key]++;
        }
      });

      this.chartData = {
        labels: Object.keys(data),
        datasets: [{
            data: Object.values(data),
            backgroundColor: [
              'rgb(0, 100, 150)',
              'rgb(150, 0, 75)',
            ],
            borderWidth: 1
        }]
      };
    },
    exportCSV () {
      let prompt = window.prompt('Nom du fichier');
      if (prompt) {
        let data = this.prospects.map( item => {
          let a = this.objectToDOM(item);
          return a;
        });
        JSONToCSVConvertor(JSON.stringify(data), prompt, true);
      }
    },
    objectToDOM( item ) {
      return  {
        'email' : item.email,
        'prénom' : item.firstname,
        'nom' : item.lastname,
        'sexe' : (item.gender === 'm')? 'homme' :'femme',
        'adresse' : item.adress,
        'code postal' : item.postcode,
        'ville' : item.city,
        'tel' : item.phone,
        'niveau d\'étude' : item.study_level,
        'formation souhaitée' : item.asked_class,
        'formation actuelle' : item.current_class,
        'campagne visitée' : item.campaigns.length
      }
    },
    printCanvas(target){
      const dataUrl = document.getElementById(target).toDataURL();

      let windowContent = '<!DOCTYPE html>';
      windowContent += '<html>';
      windowContent += '<body>';
      windowContent += '<img src="' + dataUrl + '" style="width: 100%">';
      windowContent += '</body>';
      windowContent += '</html>';

      const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
      printWin.document.write(windowContent);

      printWin.document.addEventListener('load', function() {
          printWin.focus();
          printWin.print();
          printWin.document.close();
          printWin.close();
      }, true);
    }
  },
  created () {
    let clipboard = new Clipboard('.clipboard',{
      text: function() {
          return document.querySelector('input[type=hidden]').value;
      }
    });

    var socket = io(config.apiEndPoint+":"+config.apiPort, {query: 'roomId='+this.$route.params.id});
    socket.on('prospectAdd', (data) => {
      this.prospects.push(data);
      this.fillData();
    })

    this.campaignService.find(this.$route.params.id)
      .then( res => this.campaign = res.content )
      .catch( err => console.log(err) );

    this.campaignService.getProspects(this.$route.params.id)
      .then( res => {
        this.prospects = res.content
        this.fillData();
      } )
      .catch( err => console.log(err) );

    // fetch(config.apiEndPoint+":"+config.apiPort+'/prospect')
    //   .then( (res) =>{
    //     if (res.status>= '200' && res.status<'300') {
    //       return res.json()
    //     }
    //     return {
    //       error: 1,
    //       message: 'Error server'
    //     }
    //    })
    //   .then( (res) => {
    //     if (res.error) {
    //         throw "Http error";
    //     }
    //     this.prospects = res.content;
    //     this.fillData();
    //   })
    //   .catch( (err) => console.log(err));
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul{
  overflow: auto;
  max-height: 75vh;
}

li{
  list-style: none;
  margin-bottom: 2vh;
}

button[name=export]{
  float: right;
  margin-top: 3vh;
}

.flex{
  display: flex;
  justify-content: space-around;
}

.prospectNumber{
  margin-top: 10vh;
}

.access{
  border: 1px solid black;
  margin-top: 30vh;
  padding: 1em;
}

.access > * {
  margin: 1em 0;
}

.access button{
  display: block;
}

.chart{
  max-width: 17vw;
}

.chart > div:first-child{
  margin-bottom: 5vh;
}

.prospectDetails{
  position: absolute;
  top: 16vh;
  left: 23vh;
  border: 1px solid black;
  background-color: #FFFFFFFF;
  padding: 0.5em;
}
</style>
