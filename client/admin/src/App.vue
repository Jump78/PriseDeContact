<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
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

*{
  margin: 0;
  padding: 0;
}

body {
	margin: 0;
	background-color: #FAFAFA; 
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

@media (max-width: 640px) {
  body {
  	font-size: 13px;
  }
}

</style>
