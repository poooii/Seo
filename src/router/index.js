import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Searchs from '../components/Searchs'
import NotFound from '../components/BaseComponents/NotFound'
import SeoSearch from '../components/SearchPages/SeoSearch'
import BaiduWeight from '../components/SearchPages/BaiduWeight'
import WeightDetail from '../components/SearchPages/WeightDetail'
import HistoryData from '../components/SearchPages/HistoryData'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
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
          },
          {
            path:'baiduweight',
            name:'BaiduWeight',
            component:BaiduWeight,
          },
          {
            path:'weightdetail',
            name:'WeightDetail',
            component:WeightDetail,
          },
          {
            path:'historydata',
            name:'HistoryData',
            component:HistoryData,
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
