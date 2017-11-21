<template>
  <section>
    <h1>Formulaire</h1>
    <div class="flex">
      <form class="form" action="#" method="post" @submit.prevent = "onSubmit">
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

      <div class="block-input-text">
        <label for="email">Email</label>
        <input v-model="prospect.email" type="email" name="email">
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
      </div>
    </form>
    </div>
  </section>
</template>

<script>
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
        phone:''
      }
    }
  },
  methods: {
    onSubmit () {
      fetch("http://192.168.20.254:8020/prospect",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(this.prospect)
      })
      .then(checkErrors)
      .then(res.json)
      .catch(function(res){ console.log(res) })
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
h1, h2 {
  font-weight: normal;
}

h1{
  text-align: center;
  margin-bottom: 3em;
}

form {
  font-size: 16px;
}

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
/*  opacity: 0.2;*/
  margin-top: 0.5em;
}

.focus{
  opacity: 1
}

.flex {
  display: flex;
  justify-content: center;
}

</style>
