<template>
  <nav>
    <ul>
      <li>
        <img src="/logo" alt="logo">
      </li>
      <li>
        <router-link :to="{ name: 'ListCampaign'}" class="link">Accueil</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'HomeCampaign', params: {id: id} }" class="link">Event selectionné</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'EditCampaign', params: {id: id} }" class="link">Editer</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    id: {
      required: true,
    }
  },
  data () {
    return{}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav{
    margin-bottom: 25px;
  }

  ul{
    display: flex;
    justify-content: space-around;
  }

  li{
    width: 100%;
    text-align: center;
    list-style: none;
  }

  li:hover, .router-link-exact-active{
    background-color: lightblue;

  }

  a, li:first-child{
    padding: 30px 0;
  }

  a{
    display: block;
    text-decoration: none;
  }
</style>
