<template>
  <div class = "container">
    <h1>Connection</h1>
    <p v-if="message" class="message">{{message}}</p>
    <form @submit.prevent="login">
      <div class="group-input">
        <input type="email" name="email" v-model="data.login">
        <label for="email">Email</label>
      </div>

      <div class="group-input">
        <input type="password" name="password" v-model="data.password" >
        <label for="password">Mot de passe</label>
      </div>

      <div class="group-input ">
        <input type="submit" value="connect">
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
      await fetch(config.apiEndPoint+':'+config.apiPort+'/admin/login',{
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
}

.container {
  border: 1px solid black;
  width: 25vw;
  margin: 40vh auto;
  padding: 0 1em;
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
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

input:focus ~ label{
  transform: translateY(-20px);
}

input{
    width: 100%;
}

input:autofill{
  border: 1px solid green;
  -webkit-text-fill-color: green;
  -webkit-box-shadow: 0 0 0px 1000px #000 inset;
  transition: background-color 5000s ease-in-out 0s;
}


input:focus{
  outline: none;
}

input:not([type = submit]){
  background-color: transparent;
  border: none;
  border-bottom: 1px solid red;
}
</style>
