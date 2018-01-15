<template>
  <section>
    <!-- <div class="grid-5 bg-w global-bar-zone">
      <div class="col-1"></div>
      <div class="col-3">
        <div id="bar">
          <span id="progress"></span>
        </div>
      </div>
      <div class="col-1"></div>
    </div> -->

    <div class="title-box">
      <span class="red-tag"></span>
      <h2>L'Ecole Multimedia</h2>
    </div>

    <div class="flex global-questions-zone">
      <form class="form" action="#" method="post" @submit.prevent = "onSubmit">

        <!-- <question-group @send="updateParamValue" number="0" title="Qui êtes vous ?" :questions="nameQuestions" ></question-group>

        <question-group @send="updateParamValue" number="1" title="Votre formation" :questions="studyQuestions" ></question-group>

        <question-group @send="updateParamValue" number="2" title="Coordonnés" :questions="coordinateQuestions" ></question-group> -->

      <div class="block-input-text">
        <input v-model="prospect.email" type="email" name="email" required>
        <label for="email">Email</label>
      </div>

      <div class="block-input-radio">
        <p for="gender" class="radio-title" v-bind:class="{ ok: prospect.gender }">Sexe</p>
        <div class="flex-options">

          <div class="option" v-bind:class="{ chose: prospect.gender === 'm' }">
            <input v-model="prospect.gender" type="radio" name="gender" value="m" id="gender_m">
            <label for="gender_m" v-bind:class="{ chose: prospect.gender === 'm' }">
              Homme
            </label>
          </div>
          <div class="option" v-bind:class="{ chose: prospect.gender === 'f' }">
            <input v-model="prospect.gender" type="radio" name="gender" value="f" id="gender_f">
            <label for="gender_f" v-bind:class="{ chose: prospect.gender === 'f' }">
              Femme
            </label>
          </div>
        </div>
      </div>

      <div class="block-input-text">
        <input v-model="prospect.firstname" type="text" name="firstname" required>
        <label for="firstname">Prénom</label>
      </div>

      <div class="block-input-text">
        <input v-model="prospect.lastname" type="text" name="lastname" required>
        <label for="lastname">Nom</label>
      </div>

      <div class="block-input-text">
        <input v-model="prospect.adress" type="text" name="adress" required>
        <label for="adress">Adresse</label>
      </div>

      <div class="block-input-text">
        <input v-model="prospect.postcode" type="text" name="postcode" required>
        <label for="postcode">Code postal</label>
      </div>

      <div class="block-input-text">
        <input v-model="prospect.city" type="text" name="city" required>
        <label for="city">Ville</label>
      </div>

      <div class="block-select">
        <select class="select" name="study_level" v-model="prospect.study_level">
          <option value="" selected></option>
          <option value="bac">Bac</option>
          <option value="bac+1">Bac+1</option>
          <option value="bac+2">Bac+2</option>
          <option value="bac+3">Bac+3</option>
          <option value="bac+4">Bac+4</option>
          <option value="bac+5">Bac+5</option>
        </select>
        <label for="study_level" v-bind:class="{ ok: prospect.study_level }">Niveau d'études</label>
      </div>

      <div class="block-select">
        <select class="select" name="asked_class" v-model="prospect.asked_class">
          <option value="" selected></option>
          <!-- <option value="dev">Dev</option>
          <option value="designer">Designer</option> -->
          <option value="">Prépa</option>
          <option value="prepa-digitale">Prépa Digitale</option>
          <option value="">Communication digitale :</option>
          <option value="chef-de-projet-digital">Chef de projet digital</option>
          <option value="charge-de-communication-digitale">Chargé de communication digitale</option>
          <option value="community-manager">Community manager</option>
          <option value="marketeur-digital">Marketeur digital</option>
          <option value="ux-designer">UX designer</option>
          <option value="editeur-digital-secretaire-de-redaction">Editeur digital - Secrétaire de rédaction</option>
          <option value="responsable-strategie-et-innovation-de-la-communication">Responsable stratégie et innovation de la communication</option>
          <option value="">Création Digitale :</option>
          <option value="directeur-artistique-multimedia">Directeur artistique multimédia</option>
          <option value="graphiste-multimedia–ui-designer">Graphiste multimédia – UI designer</option>
          <option value="directeur-artistique-multimedia">Directeur artistique multimédia</option>
          <option value="graphiste-motion-designer">Graphiste motion designer</option>
          <option value="concepteur-realisateur-vr-et-realite-augmentee">Concepteur réalisateur VR et réalité augmentée</option>
          Responsable stratégie et innovation de la création
          <option value="">Développement web :</option>
          <option value="developpeur-multimedia">Développeur multimédia</option>
          <option value="developpeur-d-applications-mobiles">Développeur d’applications mobiles</option>
          <option value="developpeur-front-end">Développeur front-end</option>
          <option value="game-programmeur">Game programmeur</option>
          <option value="responsable-stratégie-et-innovation-digitales">Responsable stratégie et innovation digitales</option>
        </select>
        <label for="asked_class" v-bind:class="{ ok: prospect.asked_class }">Formation souhaitée</label>
      </div>

      <div class="block-select">
          <select class="select" name="current_class" v-model="prospect.current_class"required>
          <option value="bac">Bac</option>
          <option value="bacpro">Bac pro</option>
          <option value="bts">BTS</option>
          <option value="dut">DUT</option>
          <option value="license">License</option>
          <option value="master">Master</option>
          <option value="autre">Autre</option>
        </select>
        <label for="current_class" v-bind:class="{ ok: prospect.current_class }">Formation actuelle</label>
      </div>

      <div class="block-input-text other-class" v-bind:class="{ show: prospect.current_class == 'autre'}">
        <input type="text" name="current_class_text" v-model="current_class_text" :required = "prospect.current_class == 'autre'">
        <label for="current_class_text">Entrez votre formation</label>
      </div>

      <div class="block-input-text">
        <input type="text" name="phone" v-model="prospect.phone" required>
        <label for="phone">Téléphone</label>
      </div>

      <div class="block-input-submit">
        <input type="submit" name="submit" value="Envoyer">
      </div>
      </form>
    </div>
  </section>
</template>

<script>
import config from '../../config/config.json';
import QuestionGroup from './QuestionGroup';

export default {
  name: 'ProspectForm',
  data () {
    return {
      current_class_text: '',
      prospect: {
        firstname: '',
        lastname: '',
        adress: '',
        postcode: '',
        city: '',
        email: '',
        study_level: '',
        asked_class: '',
        current_class: '',
        phone:'',
        campaign_id: this.$route.params.id
      },
      nameQuestions: [
        {
          type: 'text',
          content: {
            type: 'text',
            name: 'firstname',
            title: 'Prénom',
            placeholder: 'Doe'
          }
        },
        {
          type: 'text',
          content: {
            type: 'text',
            name: 'lastname',
            title: 'Nom',
            placeholder: 'John'
          }
        }
      ],
      studyQuestions: [
        {
          type: 'radio',
          content: {
            name: 'study_level',
            title: 'Niveau d\'études',
            options: [
              { label: 'Bac+1', value: 'bac+1' },
              { label: 'Bac+2', value: 'bac+2' },
              { label: 'Bac+3', value: 'bac+3' }
            ]
          }
        },
        {
          type: 'text',
          content: {
            type: 'text',
            name: 'current_class',
            title: 'Formation actuelle',
            placeholder: 'DUT, bac scientifique...'
          }
        },
        {
          type: 'radio',
          content: {
            name: 'asked_class',
            title: 'Formation souhaitée',
            options: [
              { label: 'Ba1', value: 'ba1' },
              { label: 'Ba2', value: 'ba2' },
              { label: 'Ba3', value: 'ba3' }
            ]
          }
        }
      ],
      coordinateQuestions: [
        {
          type: 'radio',
          content: {
            name: 'panana',
            title: 'Niveau d\'études',
            options: [
              { label: 'Bac+1', value: 'bac+1' },
              { label: 'Bac+2', value: 'bac+2' },
              { label: 'Bac+3', value: 'bac+3' }
            ]
          }
        },
        {
          type: 'text',
          content: {
            type: 'text',
            name: 'current_class',
            title: 'Formation actuelle',
            placeholder: 'DUT, bac scientifique...'
          }
        }
      ]
    }
  },
  components: {
    QuestionGroup
  },
/*  props: {
    prospect: {
      firstname: '',
      lastname: '',
      adress: '',
      postcode: '',
      city: '',
      email: '',
      study_level: '',
      asked_class: '',
      current_class: '',
      phone:'',
      campaign_id: this.$route.params.id
    }
  },*/
  methods: {
    onSubmit () {
      if (this.current_class_text != '' && this.prospect.current_class == 'autre') {
        this.prospect.current_class = this.current_class_text
      }

      fetch(config.apiEndPoint+":"+config.apiPort+"/prospect",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(this.prospect)
      })
      .then(checkErrors)
      .then((res) => this.$router.push({name:'ValidatedForm', params:{id: this.$route.params.id}}))
      .catch(function(res){ console.log(res) })
    },
    updateParamValue( param ) {
      this.prospect[param.name] = param.val
    }
  }
}

async function checkErrors(resp) {
  if(resp.ok) return resp;

  let errorMsg = `ERROR ${resp.status} (${resp.statusText})`;
  let serverText = await resp.text();
  if(serverText) errorMsg = `${errorMsg}: ${serverText}`;

  var error = new Error(errorMsg);
  error.response = resp;
  throw error;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* section {
  height: 92vh;
  max-height: 92vh;
}

form {
  font-size: 1.2em;
  display: flex;
}
form>question-group {
  width: 99.9vw;
}

input,
select,
button,
input:focus,
select:focus,
button:focus {
  outline: none;
  border: none;
}

.flex {
  display: flex;
  width: 100vw;
  overflow: hidden;
}

div#bar {
  display: block;
  background-color: #EEE;
  width: 100%;
  height: 1.2vh;
  margin: 1.5vh auto 0 auto;
}
span#progress {
  display: block;
  background-color: #AAA;
  width: 20%;
  height: 100%;
}

.block-input-text label, .block-select label{
  display: block;
  width: 150px;
  float: left;
}

.block-input-text, .block-select, .block-input-submit{
opacity: 0.2;
  margin-top: 0.5em;
}

.focus{
  opacity: 1
}*/

form {
  font-size: 1.25em;
}
.title-box,
.global-questions-zone {
  display: block;
  width: 33vw;
  min-width: 450px;
  margin: 0 auto;
}
.title-box {
  margin-top: calc(20px + 2vh);
}
  .title-box span.red-tag {
    background-color: #F03B58;
    display: block;
    height: 3px;
    width: calc(100px + 6vw);
  }
  .title-box h2 {
    font-size: 2.3em;
    font-weight: 100;
    color: #2C314E;
    margin-top: 15px;
  }
.global-questions-zone {
  background-color: #FFF;
  padding: 1vh 10vw 3vw 10vw;
  margin-bottom: 9vh;
  border-radius: 3px;
  border: 1px solid #ECECEC;
  /* box-shadow: 0px 0px 50px 4px rgba(0,0,0,.03) */
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px #FFF inset;
}
  .global-questions-zone .block-input-text input {
    width: 100%;
    position: relative;
    bottom: -0.9em;
  }
  .global-questions-zone .block-select select {
    width: 100%;
    position: relative;
    bottom: -0.9em;
  }

  .global-questions-zone .block-input-text label {
    position: relative;
    bottom: .2em;
    left: 5px;
    color: #999;
    pointer-events: none;
  }
  .global-questions-zone .block-input-radio p.radio-title {
    position: relative;
    left: 5px;
    color: #999;
    pointer-events: none;
  }
  .global-questions-zone .block-select label {
    position: relative;
    bottom: .2em;
    left: 5px;
    color: #999;
    pointer-events: none;
    transition:0.15s ease all;
    -moz-transition:0.15s ease all;
    -webkit-transition:0.15s ease all;
  }

  .global-questions-zone .block-input-radio p.radio-title.ok {
    left: 1px;
    color: #2C314E;
    transition:0.15s ease all;
    -moz-transition:0.15s ease all;
    -webkit-transition:0.15s ease all;
  }
  .global-questions-zone .block-select label.ok {
    left: 1px;
    bottom: 2em;
    color: #2C314E;
    transition:0.15s ease all;
    -moz-transition:0.15s ease all;
    -webkit-transition:0.15s ease all;
  }
  .global-questions-zone .block-input-text input:focus + label,
  .global-questions-zone .block-input-text input:valid + label {
    position: relative;
    bottom: 2em;
    left: 1px;
    color: #2C314E;
    transition:0.15s ease all;
    -moz-transition:0.15s ease all;
    -webkit-transition:0.15s ease all;
  }

  /* radio */
  input[type='radio'] {
    opacity: 0.2;
    display: none;
  }
  div.flex-options {
    display: flex;
    flex-wrap: wrap;
    margin: calc(1px + 1vh) auto;
  }
    div.flex-options .option {
      width: 33.333333%;
    }
      div.flex-options .option label {
        display: inline-block;
        width: calc(100% - 6px);
        text-align: center;
        background-color: #F9F9F9;
        border-radius: 1px;
        border: 1px solid #DEDEDE;
        margin: 3px 0;
        padding: 1px 0;
        cursor: pointer;
      }
      div.flex-options .option label:hover {
        border: 1px solid #B0B0B0;
        background-color: #FBFBFB;
      }
      div.flex-options .option .chose,
      div.flex-options .option .chose:hover {
        background-color: #2C314E; /* blue EcoleM */
        border-color: #2C314E; /* blue EcoleM */
        color: #FFFFFF;
      }

input,
select,
button,
input:focus,
select:focus,
button:focus {
  outline: none;
  border: none;
}


input, select {
  outline: none;
  border: none;
  border-bottom: 1px solid #bfbfbf;
  background-color: transparent;
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 1.3em;
}

input:focus {
  outline: none;
  border: none;
  border-bottom: 1px solid #bfbfbf;
}

input[type="submit"]{
  outline: none;
  border: 1px solid #DEDEDE;
  box-shadow: 0 0 20px 1px rgba(0,0,0,0.04);
  padding: 10px 25px;
  background-color: #FFF;
  border-radius: 3px;
  margin-top: 20px;
  font-size: 1.1em;
  color: #333;
  position: relative;
  right: 0;
  transition:0.15s ease all;
  -moz-transition:0.15s ease all;
  -webkit-transition:0.15s ease all;
}
input[type="submit"]:hover{
  border-color: #FFF;
  box-shadow: 0 0 20px 2px rgba(0,0,0,0.15);
  background-color: #F03B58;
  color: #fff;
  cursor: pointer;
  transition:0.15s ease all;
  -moz-transition:0.15s ease all;
  -webkit-transition:0.15s ease all;
}

input:focus, select:focus{
  border-color: #2C314E;
}

div[class^="block-"]{
  margin-top: 50px;
}

.other-class{
  display: none
}

.show{
  display: block
}

@media (max-width: 640px) {
  .title-box,
  .global-questions-zone {
    /*border: none;
    background: none;*/
    width: 75vw;
    min-width: 200px;
  }
  .title-box span.red-tag {
    height: 1.5px;
    transition:0.5s ease all;
    -moz-transition:0.5s ease all;
    -webkit-transition:0.5s ease all;
  }
  div.flex-options .option {
    width: 50%;
  }
  div.flex-options .option label {
    padding: 3px 0;
  }
}

</style>
