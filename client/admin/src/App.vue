<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import io from 'socket.io-client';

var socket = io('http://192.168.20.254:8020');
socket.on('prospectAdd', (data) => {
  console.log(data);
})

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
