import Vue from 'vue'
import App from './App'
import router from './router'

import VeeValidate from 'vee-validate'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'

// Register the serviceWorker if he's supported by the navigator
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

Vue.config.productionTip = false

Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
