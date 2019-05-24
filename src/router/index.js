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
import IpSearch from '../components/SeoPages/IpSearch'
import ThreeSixZeroWeight from '../components/SeoPages/ThreeSixZeroWeight'
import ThreeSixZeroSafe from '../components/SeoPages/ThreeSixZeroSafe'
import AleaxTrend from '../components/SeoPages/AleaxTrend'
import PingTest from '../components/SeoPages/PingTest'
import PrSearch from '../components/SeoPages/PrSearch'
import BdSevenSearch from '../components/SeoPages/BdSevenSearch'
import BdWhetherTake from '../components/SeoPages/BdWhetherTake'
import BdTake from '../components/SeoPages/BdTake'
import BdSafeTest from '../components/SeoPages/BdSafeTest'
import BdOneSearch from '../components/SeoPages/BdOneSearch'

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
          },
          {
            path:'ipsearch',
            name:'IpSearch',
            component:IpSearch,
          },
          {
            path:'threesixzeroweight',
            name:'ThreeSixZeroWeight',
            component:ThreeSixZeroWeight,
          },
          {
            path:'threesixzerosafe',
            name:'ThreeSixZeroSafe',
            component:ThreeSixZeroSafe,
          },
          {
            path:'aleaxtrend',
            name:'AleaxTrend',
            component:AleaxTrend,
          },
          {
            path:'pingtest',
            name:'PingTest',
            component:PingTest,
          },
          {
            path:'prsearch',
            name:'PrSearch',
            component:PrSearch,
          },
          {
            path:'bdseven',
            name:'BdSevenSearch',
            component:BdSevenSearch,
          },
          {
            path:'bdwhethertake',
            name:'BdWhetherTake',
            component:BdWhetherTake,
          },
          {
            path:'bdtake',
            name:'BdTake',
            component:BdTake,
          },
          {
            path:'bdsafetest',
            name:'BdSafeTest',
            component:BdSafeTest,
          },
          {
            path:'bdonesearch',
            name:'BdOneSearch',
            component:BdOneSearch,
          },
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
