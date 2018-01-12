import Vue from 'vue'
import Router from 'vue-router'
import ProspectForm from '@/components/ProspectForm'
import ValidCampaignDate from '@/components/ValidCampaignDate'
import ValidatedForm from '@/components/ValidatedForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'ValidCampaignDate'
      }
    },
    {
      path: '/evenements-ecole-multimedia/:id',
      name: 'ProspectForm',
      component: ProspectForm
    },
    {
      path:'/evenements-ecole-multimedia',
      name: 'ValidCampaignDate',
      component: ValidCampaignDate
    },
    {
      path:'/ValidatedForm/:id',
      name: 'ValidatedForm',
      component: ValidatedForm
    }
  ]
})
