import Vue from 'vue'
import App from './App'
import router from './router'
import Veevalidate from 'vee-validate'

Vue.config.productionTip = false

Veevalidate.Validator.extend('alpha_spaces_dash', (value, args) => {
  if (Array.isArray(value)) {
    return value.every(val => validate(val, args));
  }

  return (/^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ_-\s]*$/i).test(value);
})


Vue.use(Veevalidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
