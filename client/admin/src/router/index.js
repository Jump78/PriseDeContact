import Vue from 'vue';
import Router from 'vue-router';
import HomeCampaign from '@/components/HomeCampaign';
import ListCampaign from '@/components/ListCampaign';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListCampaign',
      component: ListCampaign
    },{
      path: '/home-campaign/:id',
      name: 'HomeCampaign',
      component: HomeCampaign
    },
  ]
})
