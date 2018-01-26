<template>
  <section>
    <div class="title-box">
      <span class="red-tag"></span>
      <h2>L'Ecole Multimedia</h2>
    </div>

    <!-- BEGIN global-questions-zone -->
    <div class="flex global-questions-zone">
      <form class="form" action="#" method="post" @submit.prevent = "onSubmit">

        <!-- Question 1: email -->
        <div class="block-input-text">
          <input v-model="prospect.email" type="email" name="email" required>
          <label for="email">Email</label>
        </div>
        <!-- !!END Question 1 -->

        <!-- Question 2: gender (radio) -->
        <div class="block-input-radio">
          <p for="gender" class="radio-title" v-bind:class="{ ok: prospect.gender }">Sexe</p>
          <div class="flex-options">

            <div class="option" v-bind:class="{ choose: prospect.gender === 'm' }">
              <input v-model="prospect.gender" type="radio" name="gender" value="m" id="gender_m">
              <label for="gender_m" v-bind:class="{ choose: prospect.gender === 'm' }">
                Homme
              </label>
            </div>
            <div class="option" v-bind:class="{ choose: prospect.gender === 'f' }">
              <input v-model="prospect.gender" type="radio" name="gender" value="f" id="gender_f">
              <label for="gender_f" v-bind:class="{ choose: prospect.gender === 'f' }">
                Femme
              </label>
            </div>
          </div>
        </div>
        <!-- !!END Question 2 -->

        <!-- Question 3: firstname (text) -->
        <div class="block-input-text">
          <input v-model="prospect.firstname" type="text" name="firstname" required>
          <label for="firstname">Prénom</label>
        </div>
        <!-- !!END Question 3 -->

        <!-- Question 4: lastname (text) -->
        <div class="block-input-text">
          <input v-model="prospect.lastname" type="text" name="lastname" required>
          <label for="lastname">Nom</label>
        </div>
        <!-- !!END lastname -->

        <!-- Question 5: address (text) -->
        <div class="block-input-text">
          <input v-model="prospect.adress" type="text" name="adress" required>
          <label for="adress">Adresse</label>
        </div>
        <!-- !!END Question 5 -->

        <!-- Question 6: postcode (text) -->
        <div class="block-input-text">
          <input v-model="prospect.postcode" type="text" name="postcode" required>
          <label for="postcode">Code postal</label>
        </div>
        <!-- !!END Question 6 -->

        <!-- Question 7: city (text) -->
        <div class="block-input-text">
          <input v-model="prospect.city" type="text" name="city" required>
          <label for="city">Ville</label>
        </div>
        <!-- !!END Question 7 -->

        <!-- Question 8: study level (select or optional text) -->
        <div class="block-select">
          <select class="select" name="study_level" v-model="prospect.study_level">
            <option value="bac">Bac</option>
            <option value="bac+1">Bac+1</option>
            <option value="bac+2">Bac+2</option>
            <option value="bac+3">Bac+3</option>
            <option value="bac+4">Bac+4</option>
            <option value="bac+5">Bac+5</option>
          </select>
          <label for="study_level" v-bind:class="{ ok: prospect.study_level }">Niveau d'études</label>
        </div>
        <!-- !!END Question 8 -->

        <!-- Question 9: asked class (select + radio) -->
        <!-- Question 9: asked class (select) -->
        <div class="block-select">
          <select class="select" name="asked_class_categorie" v-model="prospect.asked_class_categorie">
            <option value="prepa" >Prépa</option>
            <option value="communication-digitale" >Communication digitale</option>
            <option value="creation-digitale" >Création Digitale</option>
            <option value="developpement-web" >Développement web</option>
          </select>
          <label for="asked_class" v-bind:class="{ up: prospect.asked_class_categorie, ok: prospect.asked_class }">Formation souhaitée</label>
        </div>
        <!-- !!END Question 9: asked class (select) -->
        <!-- Question 9: asked class (radio) -->
        <div class="block-input-radio">
          <!-- prepa answer -->
          <div class="flex-options" id="pre" v-if="prospect.asked_class_categorie == 'prepa'">
            <radio-option @send="updateParamValue" name="asked_class" value="prepa-digitale" label="Prépa Digitale" v-bind:class="{ choose: prospect.asked_class === 'prepa-digitale' }"></radio-option>
          </div>
          <!-- Communication digitale answers -->
          <div class="flex-options" id="com-dig" v-if="prospect.asked_class_categorie == 'communication-digitale'">
            <radio-option @send="updateParamValue" name="asked_class" value="chef-de-projet-digital" label="Chef de projet digitale" v-bind:class="{ choose: prospect.asked_class === 'chef-de-projet-digital' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="charge-de-communication-digitale" label="Chargé de communication digitale" v-bind:class="{ choose: prospect.asked_class === 'charge-de-communication-digitale' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="community-manager" label="Community manager" v-bind:class="{ choose: prospect.asked_class === 'community-manager' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="marketeur-digital" label="Marketeur digital" v-bind:class="{ choose: prospect.asked_class === 'marketeur-digital' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="ux-designer" label="UX designer" v-bind:class="{ choose: prospect.asked_class === 'ux-designer' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="editeur-digital-secretaire-de-redaction" label="Editeur digital - Secrétaire de rédaction" v-bind:class="{ choose: prospect.asked_class === 'editeur-digital-secretaire-de-redaction' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="responsable-strategie-et-innovation-de-la-communication" label="Responsable stratégie et innovation de la communication" v-bind:class="{ choose: prospect.asked_class === 'responsable-strategie-et-innovation-de-la-communication' }"></radio-option>
          </div>

          <div class="flex-options" id="com-dig" v-if="prospect.asked_class_categorie == 'creation-digitale'">
            <radio-option @send="updateParamValue" name="asked_class" value="directeur-artistique-multimedia" label="Directeur artistique multimédia" v-bind:class="{ choose: prospect.asked_class === 'directeur-artistique-multimedia' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="graphiste-multimedia–ui-designer" label="Graphiste multimédia – UI designer" v-bind:class="{ choose: prospect.asked_class === 'graphiste-multimedia–ui-designer' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="graphiste-motion-designer" label="Graphiste motion designer" v-bind:class="{ choose: prospect.asked_class === 'graphiste-motion-designer' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="concepteur-realisateur-vr-et-realite-augmentee" label="Concepteur réalisateur VR et réalité augmentée" v-bind:class="{ choose: prospect.asked_class === 'concepteur-realisateur-vr-et-realite-augmentee' }"></radio-option>
          </div>

          <div class="flex-options" id="dev-web" v-if="prospect.asked_class_categorie == 'developpement-web'">
            <radio-option @send="updateParamValue" name="asked_class" value="developpeur-multimedia" label="Développeur multimédia" v-bind:class="{ choose: prospect.asked_class === 'developpeur-multimedia' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="developpeur-d-applications-mobiles" label="Développeur d’applications mobiles" v-bind:class="{ choose: prospect.asked_class === 'developpeur-d-applications-mobiles' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="developpeur-front-end" label="Développeur front-end" v-bind:class="{ choose: prospect.asked_class === 'developpeur-front-end' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="game-programmeur" label="Game programmeur" v-bind:class="{ choose: prospect.asked_class === 'game-programmeur' }"></radio-option>
            <radio-option @send="updateParamValue" name="asked_class" value="responsable-stratégie-et-innovation-digitales" label="Responsable stratégie et innovation digitales" v-bind:class="{ choose: prospect.asked_class === 'responsable-stratégie-et-innovation-digitales' }"></radio-option>
          </div>
        </div>
        <!-- !!END Question 9: asked class (radio) -->
        <!-- !!END Question 9: asked class (select + radio) -->

        <!-- Question 10: current class (select + optional input) -->
        <!-- Question 10: current class (select) -->
        <div class="block-select">
          <select class="select" name="current_class" v-model="prospect.current_class"required>
            <option value="bac">Bac</option>
            <option value="bacpro">Bac pro</option>
            <option value="bts">BTS</option>
            <option value="dut">DUT</option>
            <option value="license">License</option>
            <option value="master">Master</option>
            <option value="other">Autre</option>
          </select>
          <label for="current_class" v-bind:class="{ ok: prospect.current_class }">Formation actuelle</label>
        </div>
        <!-- !!END Question 10: current class (select) -->
        <!-- Question 10: current class (optional text) -->
        <div class="block-input-text other-class" v-bind:class="{ show: prospect.current_class == 'autre'}">
          <input type="text" name="current_class_text" v-model="current_class_text" :required = "prospect.current_class == 'autre'">
          <label for="current_class_text">Entrez votre formation</label>
        </div>
        <!-- !!END Question 10: current class (optional text) -->
        <!-- !!END Question 10: current class (select + facultatif text) -->

        <!-- Question 11: phone (texte) -->
        <div class="block-input-text">
          <input type="text" name="phone" v-model="prospect.phone" required>
          <label for="phone">Téléphone</label>
        </div>
        <!-- !!END Question 11 -->

        <!-- Question 12: wanna newsletter (checkbox) -->
        <div class="block-input-checkbox">
          <input type="checkbox" id="wanna_newsletter" name="wanna_newsletter" value="true" v-model="prospect.wanna_newsletter"> <label for="wanna_newsletter">je veux reçevoir les dernières actus de l'école multimédia</label>
        </div>
        <!-- !!END Question 12 -->

        <!-- submit -->
        <div class="block-input-submit">
          <input type="submit" name="submit" value="Envoyer">
        </div>
        <!-- !!END submit -->

      </form>
    </div>
    <!-- !!END global-questions-zone -->
  </section>
</template>

<script>
import RadioOption from './RadioOption';
import idbKeyval from 'idb-keyval';
import ProspectService from '../services/ProspectService';

export default {
  name: 'ProspectForm',
  data () {
    return {
      prospectService: new ProspectService(),
      current_class_text: '',
      prospect: {
        firstname: '',
        lastname: '',
        adress: '',
        postcode: '',
        city: '',
        email: '',
        study_level: '',
        asked_class_categorie: '',
        asked_class: '',
        current_class: '',
        phone: '',
        wanna_newsletter: false,
        campaign_id: this.$route.params.id
      },
    }
  },
  components: {
    RadioOption
  },
  methods: {
    onSubmit () {
      //Check if the prospect has selected the "other" option of "current_class" select
      if (this.current_class_text != '' && this.prospect.current_class == 'autre') {
        this.prospect.current_class = this.current_class_text //Set the current_class class value to the value write by the prospect
      }

      let self = this; //Save the context
      if ('serviceWorker' in navigator && 'SyncManager' in window) { //Check if serviceWorker and Sync is supported
        navigator.serviceWorker.ready.then(function(reg) {
          idbKeyval.get('prospects') //Get prospects from the cach
            .then(prospects => {
              if (prospects) { //We already have some prospect
                prospects.push(self.prospect) //We push the new one
                idbKeyval.set('prospects', prospects); //And save the array
              } else { //We haven't prospect
                idbKeyval.set('prospects', [self.prospect]); //We save a array with the prospect inside
              }
              return reg.sync.register('send-data'); //Register the send-data event in service worker
            });
        }).catch(function() {
          // system was unable to register for a sync,
          // this could be an OS-level restriction
          this.prospectService.add(self.prospect)
        });
      } else {
        // serviceworker/sync not supported
        this.prospectService.add(self.prospect)
      }

      //Redirection to end screen
      this.$router.push({name:'ValidatedForm', params:{id: this.$route.params.id}})
    },

    // Update a prospect's props
    updateParamValue( param ) {
      this.prospect[param.name] = param.val
    }
  },
  watch: {
    'prospect.asked_class_categorie': function() {
      this.prospect.asked_class = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  font-size: 1.25em;
}
label {
  user-select: none;
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
  .global-questions-zone .block-select label.up {
    bottom: 2em;
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
      div.flex-options .choose label,
      div.flex-options .choose:hover label{
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
