<template>
  <section>
    <div class="grid-5 bg-w global-bar-zone">
      <div class="col-1"></div>
      <div class="col-3">
        <div id="bar">
          <span id="progress"></span>
        </div>
      </div>
      <div class="col-1"></div>
    </div>

    <div class="flex global-questions-zone">
      <form class="form" action="#" method="post" @submit.prevent = "onSubmit">
        
        <question-group @send="addParam" title="Qui êtes vous ?" :questions="nameQuestions"></question-group>

        <question-group @send="addParam" title="Votre formation" :questions="studyQuestions"></question-group>

        <question-group @send="addParam" title="Coordonnés" :questions="coordinateQuestions"></question-group>

      <!-- <div class="block-input-text">
        <label for="email">Email</label>
        <input v-model="prospect.email" type="email" name="email">
      </div>
        
      <div class="block-input-text">
        <label for="gender">Sexe</label>
        <input v-model="prospect.gender" type="radio" name="gender" value="m">Homme
        <input v-model="prospect.gender" type="radio" name="gender" value="f">Femme
      </div>
      
      <div class="block-input-text">
        <label for="firstname">Prénom</label>
        <input v-model="prospect.firstname" type="text" name="firstname">
      </div>
      
      <div class="block-input-text">
        <label for="lastname">Nom</label>
        <input v-model="prospect.lastname" type="text" name="lastname">
      </div>
      
      <div class="block-input-text">
        <label for="adress">Adresse</label>
        <input v-model="prospect.adress" type="text" name="adress">
      </div>
      
      <div class="block-input-text">
        <label for="postcode">Code postal</label>
        <input v-model="prospect.postcode" type="text" name="postcode">
      </div>
      
      <div class="block-input-text">
        <label for="city">Ville</label>
        <input v-model="prospect.city" type="text" name="city">
      </div>
      
      <div class="block-select">
        <label for="study_level">Niveau d'études</label>
        <select class="select" name="study_level" v-model="prospect.study_level">
          <option value="" selected>Selectionner un niveau</option>
          <option value="bac">Bac</option>
          <option value="bac+1">Bac+1</option>
          <option value="bac+2">Bac+2</option>
        </select>
      </div>
      
      <div class="block-select">
        <label for="asked_class">Formation souhaitée</label>
        <select class="select" name="asked_class" v-model="prospect.asked_class">
          <option value="" selected>Selectionner une formation</option>
          <option value="dev">Dev</option>
          <option value="designer">Designer</option>
        </select>
      </div>
      
      <div class="block-input-text">
        <label for="current_class">Formation actuelle</label>
        <input type="text" name="current_class" v-model="prospect.current_class">
      </div>
      
      <div class="block-input-text">
        <label for="phone">Téléphone</label>
        <input type="text" name="phone" v-model="prospect.phone">
      </div>
      
      <div class="block-input-submit">
        <input type="submit" name="submit" value="Envoyer">
      </div> -->
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
      .then((res) => res.json)
      .catch(function(res){ console.log(res) })
    },
    addParam( param ) {
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

section {
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
/* 
input, select {
  outline: none;
  border: none;
  border-bottom: 1px solid #6f6f6f;
  background-color: transparent;
  padding-top: 10px;
  padding-bottom: 5px;
}

input[type="submit"]{
  outline: none;
  border: none;
  padding: 10px 25px;
  background-color: lightblue;
  border-radius: 5px;
  margin-top: 25px;
}

input:focus, select:focus{
  border-color: blue;

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
}
*/

</style>
