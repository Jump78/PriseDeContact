<template>
  <div>
    <p v-if="message" >{{message}}</p>
    <form @submit.prevent="login">
      <label for="email">Identifiant</label>
      <input type="email" name="email" v-model="data.login">
      <label for="password">Mot de passe</label>
      <input type="password" name="password" v-model="data.password">

      <input type="submit" value="connect">
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
          this.message = "Non"
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
</style>
