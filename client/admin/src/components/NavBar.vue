<template>
  <nav>
    <div id="logo">
      <img :src="logo" alt="logo">
    </div>
    <ul>
      <li>
        <router-link :to="{ name: 'ListCampaign'}" class="link">Accueil</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'HomeCampaign', params: {id: id} }" class="link">Campagne</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'EditCampaign', params: {id: id} }" class="link">Editer</router-link>
      </li>
      <li>
        <button type="button" name="logout" @click="logout">Déconnexion</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import logo from '../assets/lecole-multimedia-logo.png';

export default {
  name: 'NavBar',
  props: {
    id: {
      required: true,
    }
  },
  data () {
    return{
      logo: logo
    }
  },
  methods: {
    logout () {
      sessionStorage.clear();
      this.$router.push({name: 'Login'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav{
    background-color: #FEFEFE;
    font-family: 'Avenir';
    margin-bottom: 25px;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #F03B58;
  }

  div#logo {
    max-width: 120px;
    height: 10px;
    margin: -6px 0 0 15px;
  }

  div#logo img {
    width: 110px;
  }

  ul{
    display: flex;
    justify-content: space-around;
  }

  li{
    width: calc(80px + 6vw);
    text-align: center;
    list-style: none;
    text-transform: uppercase;
    font-size: .78em;
    font-weight: 600;
  }

  .router-link-exact-active{
    color: #F03B58;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }

  li a{
    color: #2C314E;
    display: block;
    text-decoration: none;
    line-height: 1.78em;
  }

  li:hover a {
    color: #F03B58;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }

  button {
    font-family: 'Avenir', Arial, sans-serif;
    background-color: #FFF;
    border: 1px solid #F03B58;
    color: #F03B58;
    cursor: pointer;
    padding: 2px 6px;
  }
  button:hover {
    background-color: #F03B58;
    color: #FFF;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
  }

  @media (max-width: 640px) {
    div#logo img {
      width: 95px;
      transition:0.2s ease all;
      -moz-transition:0.2s ease all;
      -webkit-transition:0.2s ease all;
    }
  }

</style>
