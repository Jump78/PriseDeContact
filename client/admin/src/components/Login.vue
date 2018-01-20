<template>
  <div class = "container">
    <h1>Connection</h1>
    <p v-if="message" class="message">{{message}}</p>
    <form @submit.prevent="login">
      <div class="group-input">
        <input type="email" name="email" v-model="data.login" v-bind:class="{ ok: data.login }" required>
        <label for="email">Email</label>
      </div>

      <div class="group-input">
        <input type="password" name="password" v-model="data.password" required>
        <label for="password">Mot de passe</label>
      </div>

      <div class="group-input ">
        <input type="submit" value="Se connecter">
      </div>
    </form>
  </div>
</template>

<script>
import config from '../../config/config';

export default {
  name: 'Login',
  data () {
    return {
      message: '',
      data:{
        login:'',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      await fetch(config.apiEndPoint+'/admin/login',{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(this.data)
      })
      .then( res => {
        if (!res.ok) {
          this.message = "Erreur serveur"
          return false;
        }

        let json = res.json().then(json => {
          if (json.error) {
            this.message = json.message;
            return false;
          } else {
            sessionStorage.setItem('token', json.content)
            this.$router.push({name:'ListCampaign'})
          }
        });
      })
      .catch( err => console.log(err))
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

h1{
  margin: 0.7em 0;
}

.message{
  margin-bottom: 0.7em;
  color: #F03B58;
}

.container {
  border: 1px solid #EDEDED;
  border-radius: 3px;
  width: 25vw;
  min-width: 350px;
  margin: 21vh auto;
  padding: calc(5px + 1.5vw) calc(20px + 5vw);
  background-color: #FFF;
}

form{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.group-input{
  position: relative;
  margin-bottom: 25px;
}

label{
  position: relative;
  bottom: .2em;
  left: 5px;
  color: #999;
  pointer-events: none;
  transition:0.15s ease all;
  -moz-transition:0.15s ease all;
  -webkit-transition:0.15s ease all;
}

input:focus + label,
input:valid + label,
input.ok + label {
  position: relative;
  bottom: 2.2em;
  left: 1px;
  color: #2C314E;
  transition:0.15s ease all;
  -moz-transition:0.15s ease all;
  -webkit-transition:0.15s ease all;
}

input:autofill{
  border: 1px solid green;
  -webkit-text-fill-color: green;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
}

input {
  width: 100%;
  position: relative;
  bottom: -0.9em;
  outline: none;
  border: none;
  border-bottom: 1px solid #bfbfbf;
  background-color: transparent;
  padding: 10px 0 5px 3px;
  font-size: 1.3em;
  color: #333;
}

input:focus{
  outline: none;
}

input:not([type = submit]){
  background-color: transparent;
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

@media (max-width: 640px) {
  .container {
  	font-size: 1em;
  	width: 62vw;
  	min-width: 200px;
  	padding: 30px 18vw;
  }
}
@media (max-width: 439px) {
  .container {
  	font-size: 1em;
  	border-radius: 0;
  	width: 90vw;
  	padding: 30px 5vw;
  }
}

</style>
