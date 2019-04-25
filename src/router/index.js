import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Searchs from '../components/Searchs'
import NotFound from '../components/BaseComponents/NotFound'
import SeoSearch from '../components/SearchPages/SeoSearch'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/searchs',
      // name: 'Searchs',
      component: Searchs,
      children:[
          {
            path:'/',
            name:'SeoSearch',
            component:SeoSearch,
          }
        ]
    },
    {
      path: '*', 
      component: NotFound,
      meta: {
        showpublic: true              
    }
    }
  ]
})
