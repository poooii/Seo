import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SeoMain from '../components/SeoPages/SeoMain'
import NotFound from '../components/BaseComponents/NotFound'
import SeoSearch from '../components/SeoPages/SeoSearch'
import BaiduWeight from '../components/SeoPages/BaiduWeight'
import WeightDetail from '../components/SeoPages/WeightDetail'
import HistoryData from '../components/SeoPages/HistoryData'
import IcpAbout from '../components/SeoPages/IcpAbout'

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
      component: SeoMain,
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
          },
          {
            path:'icpabout',
            name:'IcpAbout',
            component:IcpAbout,
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
