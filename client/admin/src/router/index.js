import Vue from 'vue';
import Router from 'vue-router';
import HomeCampaign from '@/components/HomeCampaign';
import ListCampaign from '@/components/ListCampaign';
import EditCampaign from '@/components/EditCampaign';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListCampaign',
      component: ListCampaign
    },{
      path: '/campaign/:id',
      name: 'HomeCampaign',
      component: HomeCampaign
    },{
      path: '/campaign/edit/:id',
      name: 'EditCampaign',
      component: EditCampaign
    },
  ]
})
