<template>
  <div>
    <NavBar :id="this.$route.params.id"/>
    <div v-if="selectedProspect" class="prospect-details">
      <p @click="selectedProspect = null" class="quit">X</p>
      <p v-for="(value, index) in selectedProspect">
        <span class="underline">{{index}}</span> : {{value}}
      </p>
    </div>
    <div class="flex">
      <div class="prospect-list">
        <ul>
          <li v-for="prospect in prospects" @click="selectedProspect = objectToDOM(prospect)">{{prospect.firstname}} {{prospect.lastname}}</li>
        </ul>
        <button type="button" name="export" @click="exportCSV" alt="Exporter les prospects dans un tableur">Exporter</button>
        <div class="clear"></div>
      </div>

      <div class="center">
        <p class="prospect-number"><span class="nb">{{ prospects.length }}</span> prospects</p>
        <div class="access">
          <p>Acces au formulaire</p>
          <button class="clipboard" type="button" name="copyLink" data-clipboard-target="#linkValue">Copier le lien</button>
          <input type="hidden" id="linkValue" name="linkValue" :value="formUrl">

          <button type="button" name="copyQrcode" @click="printFromCanvas('qrcode')">Imprimer le QRCode</button>
          <qrcode id="qrcode" :value="formUrl" hidden></qrcode>
        </div>
      </div>

      <div class="chart">
        <div class="buttons">
          <button type="button" name="gender" @click="charDataShow = 'study_level'; fillData()">Niveau actuel</button>
          <button type="button" name="asked_class" @click="charDataShow = 'asked_class'; fillData()">Formation démandée</button>
          <button type="button" name="asked_class" @click="charDataShow = 'current_class'; fillData()">Formation actuelle</button>
          <button type="button" name="postcode" @click="charDataShow = 'postcode'; fillData()">Region</button>
        </div>
        <doughnut-chart :chart-data="chartData" :options="options"></doughnut-chart>
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
      formUrl : config.formUrl,
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
    prospects: function () { //Refill chart's data each time "prospects" is change
      this.fillData();
    }
  },
  methods: {
    fillData () { //Method to fill chart's data
      let data = {};
      const self = this;

      this.prospects.forEach((item) => {
        //Replace '-' by ' ' and stock it
        let key = item[self.charDataShow].toString().replace(/-/g,' ');

        if (self.charDataShow == 'postcode') {
          key = key.substring(0,2);//Get the 2 first number of the post code
        }

        if (!data.hasOwnProperty(key)) { //Check if we already stock the data
          data[key] = 1; //We set it with a default value
        } else {
          data[key]++;//Increment the value
        }
      });

      this.chartData = {// The chart data
        labels: Object.keys(data), //Get each key of the object, and use them as label
        datasets: [{
            data: Object.values(data), //Get each values of the object, and use them as data
            backgroundColor: [
              'rgb(0, 100, 150)',
              'rgb(150, 0, 75)',
              'rgb(150, 50, 75)'
            ],
            borderWidth: 1
        }]
      };
    },
    exportCSV () { //Export all the prospect in a csv File
      let prompt = window.prompt('Nom du fichier'); //Ask for the file name
      if (prompt) {
        let data = this.prospects.map( item => {
          let a = this.objectToDOM(item);
          return a;
        });
        JSONToCSVConvertor(JSON.stringify(data), prompt, true); //Convert the file and download it
      }
    },
    objectToDOM( item ) { //Convert a prospect object to a prospect object to display
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
        'formation souhaitée' : item.asked_class.replace(/-/g,' '),
        'formation actuelle' : item.current_class,
        'campagne visitée' : item.campaigns.length,
        'newsletter' : (item.wanna_newsletter)? 'oui' :'non'
      }
    },
    printFromCanvas(target){ //Method to open the print screen
      const dataUrl = document.getElementById(target).toDataURL(); //Convert the canvas data to dataURl

      //Create the content of the new window
      let windowContent = '<!DOCTYPE html>';
      windowContent += '<html>';
      windowContent += '<body>';
      windowContent += '<img src="' + dataUrl + '" style="width: 100%">'; //Display the dataUrl in an img markup
      windowContent += '</body>';
      windowContent += '</html>';

      //Opent the window
      const printWin = window.open('', '', 'width=' + screen.availWidth + ',height=' + screen.availHeight);
      //Insert the content
      printWin.document.write(windowContent);

      printWin.document.addEventListener('load', function() {
          printWin.focus(); //Force the focus
          printWin.print(); //Open print windows of chrome
          //Close the 1st window
          printWin.document.close();
          printWin.close();
      }, true);
    }
  },
  created () {
    //Initialize clipboard
    let clipboard = new Clipboard('.clipboard',{
      text: function() {
          return document.querySelector('input[type=hidden]').value; //Set the input where choose the value to copy
      }
    });

    //Connect the client to socket
    var socket = io(config.apiEndPoint.replace('/api', ''),{
      //Prod param in ( https, and server in subDirectory)
      //secure: true,
      //reconnect: true,
      //rejectUnauthorized : false,
      //path: '/api/socket.io',
      query: 'roomId='+this.$route.params.id
    });

    socket.on('prospectAdd', (data) => {  //Listen the 'prospectAdd' event from socket
      this.prospects.push(data); //Push the new prospect
      this.fillData(); //Refill the chart
    })

    //Get the campaign info
    this.campaignService.find(this.$route.params.id)
      .then( res => this.campaign = res.content )
      .catch( err => console.log(err) );

      //Get all prospect of the campaign
    this.campaignService.getProspects(this.$route.params.id)
      .then( res => {
        this.prospects = res.content
        this.fillData();
      } )
      .catch( err => console.log(err) );
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
  margin-right: 30px;
}

.flex{
  display: flex;
  justify-content: space-between;
}

div.prospect-list {
  padding: 20px 0;
  border-right: 1px solid #DEDEDE;
  width: 18vw;
}
div.prospect-list li {
  margin-left: calc(15px + 1.5vw);
  margin-right: calc(15px + 1.5vw);
  cursor: pointer;
}

div.center {
  width: 23vw;
}
.prospect-number{
  margin-top: 10vh;
  font-size: 2em;
}
.prospect-number span.nb{
  font-size: 3.2em;
}
.access{
  border: 1px solid #DEDEDE;
  margin-top: calc(120px + 8vh);
  padding: 1em 2em;
  background-color: #FFF;
}

.access > * {
  margin: 1em 0;
}

.access button{
  font-family: 'Avenir', Arial, sans-serif;
  display: block;
  width: 100%;
  border: 1px solid #DEDEDE;
  background-color: #FFF;
  padding: 5px 0;
}

.chart{
  max-width: 45vw;
  margin-right: calc(20px + 2vw);
}

.chart > div:first-child{
  margin-bottom: 5vh;
}
.chart .buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chart .buttons button {
  background-color: rgba(255,255,255,.1);
  color: #2C314E;
  border: 1px solid #2C314E;
  border-radius: 3px;
  padding: 4px 12px;
  margin: 0 2px;
  cursor: pointer;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}
.chart .buttons button:hover,
.chart .buttons button:focus {
  outline: none;
  background-color: #2C314E;
  color: #FFF;
}

.prospect-details{
  position: absolute;
  top: 16vh;
  left: 23vh;
  border: 1px solid #CDCDCD;
  background-color: #FFFFFFFF;
  box-shadow: 0 0 15px 1px rgba(0,0,0,0.1);
  padding: 1.2em 2em;
}
.prospect-details .quit {
  display: block;
  width: 25px;
  padding: 3px 0;
  text-align: center;
}
.prospect-details .quit:hover {
  cursor: pointer;
  color: #F03B58;
}

button[name="export"] {
  background-color: #FFF;
  border: 1px solid #2C314E;
  padding: 4px 0;
  width: 110px;
  color: #2C314E;
  cursor: pointer;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}

button[name="export"]:hover {
  background-color: #2C314E;
  color: #FFF;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
}

</style>
