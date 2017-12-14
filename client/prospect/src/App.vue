<template>

  <div id="app">
    <link rel="stylesheet" href="src/assets/kna.css">

    <router-view/>

    <footer class="global-footer-zone">
      <p>EcoleM</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

body {
	margin: 0;
  overflow: hidden;
}


div.header-bg-box {
  background-color: #FFF;
  min-width: 100vw;
}

footer {
  display: block;
  background-color: #FFF;
}

.global-bar-zone,
.global-questions-zone,
.global-t-zone {
  overflow-y: hidden;
}

.global-bar-zone { height: 2.8vh; }
.global-questions-zone { height: 90vh; }
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

@media (max-width: 640px) {
  body {
    font-size: 12px;
  }
}

</style>
