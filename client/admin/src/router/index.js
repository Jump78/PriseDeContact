import Vue from 'vue';
import Router from 'vue-router';
import HomeCampaign from '@/components/HomeCampaign';
import ListCampaign from '@/components/ListCampaign';
import EditCampaign from '@/components/EditCampaign';
import Login from '@/components/Login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/campaign/:id',
      name: 'HomeCampaign',
      component: HomeCampaign
    },{
      path: '/campaign/edit/:id',
      name: 'EditCampaign',
      component: EditCampaign
    },{
      path: '/home',
      name: 'ListCampaign',
      component: ListCampaign
    },
  ]
})
