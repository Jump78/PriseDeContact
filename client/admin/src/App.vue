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
*{
  margin: 0;
  padding: 0;
}

body {
	margin: 0;
	background-color: #FCFCFC; 
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
