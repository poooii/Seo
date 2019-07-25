import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SeoMain from '../components/SeoPages/SeoMain'
import NotFound from '../components/BaseComponents/NotFound'
import SeoSearch from '../components/SeoPages/SeoSearch'

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
      path: '/aboutus',
      name: 'AboutUs',
      component: resolve => require(['../components/BaseComponents/AboutUs'], resolve),
    },
    {
      path: '/searchs/',
      component: SeoMain,
      children: [
        {
          path: '/searchs/:domain',
          name: 'SeoSearch',
          component: SeoSearch,
        },
        {
          path: 'baiduweight/:domain',
          name: 'BaiduWeight',
          component: resolve => require(['../components/SeoPages/BaiduWeight'], resolve),
        },
        {
          path: 'weightdetail',
          name: 'WeightDetail',
          component: resolve => require(['../components/SeoPages/WeightDetail'], resolve),
        },
        {
          path: 'historydata/:domain',
          name: 'HistoryData',
          component: resolve => require(['../components/SeoPages/HistoryData'], resolve),
        },
        {
          path: 'icpabout/:domain',
          name: 'IcpAbout',
          component: resolve => require(['../components/SeoPages/IcpAbout'], resolve),
        },
        {
          path: 'ipsearch/:domain',
          name: 'IpSearch',
          component: resolve => require(['../components/SeoPages/IpSearch'], resolve),
        },
        {
          path: 'threesixzeroweight/:domain',
          name: 'ThreeSixZeroWeight',
          component: resolve => require(['../components/SeoPages/ThreeSixZeroWeight'], resolve),
        },
        {
          path: 'threesixzerosafe/:domain',
          name: 'ThreeSixZeroSafe',
          component: resolve => require(['../components/SeoPages/ThreeSixZeroSafe'], resolve),
        },
        {
          path: 'aleaxtrend/:domain',
          name: 'AleaxTrend',
          component: resolve => require(['../components/SeoPages/AleaxTrend'], resolve),
        },
        {
          path: 'pingtest/:domain',
          name: 'PingTest',
          component: resolve => require(['../components/SeoPages/PingTest'], resolve),
        },
        {
          path: 'prsearch/:domain',
          name: 'PrSearch',
          component: resolve => require(['../components/SeoPages/PrSearch'], resolve),
        },
        {
          path: 'bdseven/:domain',
          name: 'BdSevenSearch',
          component: resolve => require(['../components/SeoPages/BdSevenSearch'], resolve),
        },
        {
          path: 'bdwhethertake/:domain',
          name: 'BdWhetherTake',
          component: resolve => require(['../components/SeoPages/BdWhetherTake'], resolve),
        },
        {
          path: 'bdtake/:domain',
          name: 'BdTake',
          component: resolve => require(['../components/SeoPages/BdTake'], resolve),
        },
        {
          path: 'bdsafetest/:domain',
          name: 'BdSafeTest',
          component: resolve => require(['../components/SeoPages/BdSafeTest'], resolve),
        },
        {
          path: 'bdonesearch/:domain',
          name: 'BdOneSearch',
          component: resolve => require(['../components/SeoPages/BdOneSearch'], resolve),
        },
        {
          path: 'antichain/:domain',
          name: 'AntiChain',
          component: resolve => require(['../components/SeoPages/AntiChain'], resolve),
        },
        {
          path: 'keywords/:domain',
          name: 'KeyWords',
          component: resolve => require(['../components/SeoPages/KeyWords'], resolve),
        },
        {
          path: 'buildsearch/:domain',
          name: 'BuildSearch',
          component: resolve => require(['../components/SeoPages/BuildSearch'], resolve),
        },
        {
          path: 'webtitlesearch/:domain',
          name: 'WebTitleSearch',
          component: resolve => require(['../components/SeoPages/WebTitleSearch'], resolve),
        },
        {
          path: 'weboutlink/:domain',
          name: 'WebOutLink',
          component: resolve => require(['../components/SeoPages/WebOutLink'], resolve),
        },
        {
          path: 'friendlink/:domain',
          name: 'FriendLink',
          component: resolve => require(['../components/SeoPages/FriendLink'], resolve),
        }
      ]
    },
    {
      path: '/searchtools/',
      component: resolve => require(['../components/SearchTools/ToolsMain'], resolve),
      children: [
        {
          path: '/searchtools/:domain',
          name: 'HttpState',
          component: resolve => require(['../components/SearchTools/HttpState'], resolve),
        },
        {
          path: 'robotstest/:domain',
          name: 'RobotsTest',
          component: resolve => require(['../components/SearchTools/RobotsTest'], resolve),
        },
        {
          path: 'keywordsdensity/:domain',
          name: 'KeywordsDensity',
          component: resolve => require(['../components/SearchTools/KeywordsDensity'], resolve),
        },
        {
          path: 'deadlink/:domain',
          name: 'DeadLink',
          component: resolve => require(['../components/SearchTools/DeadLink'], resolve),
        },
        {
          path: 'segrabepage/:domain',
          name: 'SeGrabePage',
          component: resolve => require(['../components/SearchTools/SeGrabePage'], resolve),
        },
        {
          path: 'websimiler/:domain',
          name: 'WebSimiler',
          component: resolve => require(['../components/SearchTools/WebSimiler'], resolve),
        },
      ]
    },
    {
      path: '/domainsearchs/',
      component: resolve => require(['../components/DomainIpPages/DomainIpMain'], resolve),
      children: [
        {
          path: '/domainsearchs/:domain',
          name: 'WhoisSearch',
          component: resolve => require(['../components/DomainIpPages/WhoisSearch'], resolve),
        },
        {
          path: 'whoisdeserve/:domain',
          name: 'WhoisDeserve',
          component: resolve => require(['../components/DomainIpPages/WhoisDeserve'], resolve),
        },
        {
          path: 'webipsearch/:domain',
          name: 'WebIpSearch',
          component: resolve => require(['../components/DomainIpPages/WebIpSearch'], resolve),
        },
        {
          path: 'domainnamesealed/:domain',
          name: 'DomainNameSealed',
          component: resolve => require(['../components/DomainIpPages/DomainNameSealed'], resolve),
        },
        {
          path: 'domainnamewall/:domain',
          name: 'DomainNameWall',
          component: resolve => require(['../components/DomainIpPages/DomainNameWall'], resolve),
        },
        {
          path: 'domainnamehistory/:domain',
          name: 'DomainNameHistory',
          component: resolve => require(['../components/DomainIpPages/DomainNameHistory'], resolve),
        }
      ]
    },
    {
      path: '/othertools',
      component: resolve => require(['../components/OtherTools/OtherToolsMain'], resolve),
      children: [
        {
          path: 'ipmultiplesearch/:domain',
          name: 'IpMultipleSearch',
          component: resolve => require(['../components/OtherTools/IpMultipleSearch'], resolve),
        },
        {
          path: 'autosettype/:domain',
          name: 'AutoSetType',
          component: resolve => require(['../components/OtherTools/AutoSetType'], resolve),
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
