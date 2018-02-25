<template>

  <div id="app">
    <router-view/>

    <footer class="global-footer-zone">
      <img :src="logo" alt="">
    </footer>
  </div>
</template>

<script>
import logo from './assets/lecole-multimedia-logo.png';

export default {
  name: 'app',
  data () {
    return {
      logo: logo
    }
  }
}
</script>

<style>

@font-face {
  font-family: Avenir;
  src: url(assets/font/avenir/AvenirNextLTPro-Regular.otf);
  font-weight: normal;
}
@font-face {
  font-family: Avenir;
  src: url(assets/font/avenir/AvenirNextLTPro-Demi.otf);
  font-weight: bold;
}
@font-face {
  font-family: Avenir;
  src: url(assets/font/avenir/AvenirNextLTPro-Bold.otf);
  font-weight: 900;
}
@font-face {
  font-family: Avenir;
  src: url(assets/font/avenir/AvenirNextLTPro-It.otf);
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: Avenir;
  src: url(assets/font/avenir/AvenirNextLTPro-DemiIt.otf);
  font-weight: bold;
  font-style: italic;
}

body {
	margin: 0;
  background-color: #FAFAFA;
  /* overflow-x: hidden; */
}


div.header-bg-box {
  background-color: #FFF;
  min-width: 100vw;
}

footer {
  display: block;
  background-color: #FFFFFF;
  position: fixed;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid #ECECEC;
}

/* .global-bar-zone,
.global-questions-zone,
.global-t-zone {
  overflow-y: hidden;
} */

.global-bar-zone { height: 2.8vh; }
/*.global-questions-zone { height: 90vh; }*/
.global-questions-zone .global-t-zone { height: 15vh; }
.global-questions-zone .global-q-zone { height: 75vh; }
.global-footer-zone { height: 7.2vh }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.bg-w{ background-color: #FFF }
.b{ background-color: #65E; }
.r{ background-color: #E56; }

footer img {
  display: block;
  width: 92px;
  margin: 14px auto;
}

@media (max-width: 640px) {
  body {
    font-size: 12px;
    transition:0.3s ease all;
    -moz-transition:0.3s ease all;
    -webkit-transition:0.3s ease all;
  }
  footer img {
    display: block;
    width: 85px;
    margin: 16px auto;
  }
}

</style>
