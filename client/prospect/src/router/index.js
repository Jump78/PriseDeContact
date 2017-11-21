import Vue from 'vue'
import Router from 'vue-router'
import ProspectForm from '@/components/ProspectForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProspectForm',
      component: ProspectForm
    }
  ]
})
