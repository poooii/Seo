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
import AntiChain from '../components/SeoPages/AntiChain'
import KeyWords from '../components/SeoPages/KeyWords'
import BuildSearch from '../components/SeoPages/BuildSearch'
import WebTitleSearch from '../components/SeoPages/WebTitleSearch'
import WebOutLink from '../components/SeoPages/WebOutLink'
import FriendLink from '../components/SeoPages/FriendLink'
import ToolsMain from '../components/SearchTools/ToolsMain'
import HttpState from '../components/SearchTools/HttpState'
import RobotsTest from '../components/SearchTools/RobotsTest'
import KeywordsDensity from '../components/SearchTools/KeywordsDensity'
import DeadLink from '../components/SearchTools/DeadLink'
import SeGrabePage from '../components/SearchTools/SeGrabePage'
import WebSimiler from '../components/SearchTools/WebSimiler'
import DomainIpMain from '../components/DomainIpPages/DomainIpMain'
import WhoisSearch from '../components/DomainIpPages/WhoisSearch'
import WhoisDeserve from '../components/DomainIpPages/WhoisDeserve'
import WebIpSearch from '../components/DomainIpPages/WebIpSearch'
import DomainNameSealed from '../components/DomainIpPages/DomainNameSealed'
import DomainNameWall from '../components/DomainIpPages/DomainNameWall'
import DomainNameHistory from '../components/DomainIpPages/DomainNameHistory'
import OtherToolsMain from '../components/OtherTools/OtherToolsMain'
import IpMultipleSearch from '../components/OtherTools/IpMultipleSearch'
import AutoSetType from '../components/OtherTools/AutoSetType'

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
      children: [
        {
          path: '/',
          name: 'SeoSearch',
          component: SeoSearch,
        },
        {
          path: 'baiduweight',
          name: 'BaiduWeight',
          component: BaiduWeight,
        },
        {
          path: 'weightdetail',
          name: 'WeightDetail',
          component: WeightDetail,
        },
        {
          path: 'historydata',
          name: 'HistoryData',
          component: HistoryData,
        },
        {
          path: 'icpabout',
          name: 'IcpAbout',
          component: IcpAbout,
        },
        {
          path: 'ipsearch',
          name: 'IpSearch',
          component: IpSearch,
        },
        {
          path: 'threesixzeroweight',
          name: 'ThreeSixZeroWeight',
          component: ThreeSixZeroWeight,
        },
        {
          path: 'threesixzerosafe',
          name: 'ThreeSixZeroSafe',
          component: ThreeSixZeroSafe,
        },
        {
          path: 'aleaxtrend',
          name: 'AleaxTrend',
          component: AleaxTrend,
        },
        {
          path: 'pingtest',
          name: 'PingTest',
          component: PingTest,
        },
        {
          path: 'prsearch',
          name: 'PrSearch',
          component: PrSearch,
        },
        {
          path: 'bdseven',
          name: 'BdSevenSearch',
          component: BdSevenSearch,
        },
        {
          path: 'bdwhethertake',
          name: 'BdWhetherTake',
          component: BdWhetherTake,
        },
        {
          path: 'bdtake',
          name: 'BdTake',
          component: BdTake,
        },
        {
          path: 'bdsafetest',
          name: 'BdSafeTest',
          component: BdSafeTest,
        },
        {
          path: 'bdonesearch',
          name: 'BdOneSearch',
          component: BdOneSearch,
        },
        {
          path: 'antichain',
          name: 'AntiChain',
          component: AntiChain,
        },
        {
          path: 'keywords',
          name: 'KeyWords',
          component: KeyWords,
        },
        {
          path: 'buildsearch',
          name: 'BuildSearch',
          component: BuildSearch,
        },
        {
          path: 'webtitlesearch',
          name: 'WebTitleSearch',
          component: WebTitleSearch,
        },
        {
          path: 'weboutlink',
          name: 'WebOutLink',
          component: WebOutLink,
        },
        {
          path: 'friendlink',
          name: 'FriendLink',
          component: FriendLink,
        }
      ]
    },
    {
      path: '/searchtools',
      component: ToolsMain,
      children: [
        {
          path: 'httpstate',
          name: 'HttpState',
          component: HttpState,
        },
        {
          path: 'robotstest',
          name: 'RobotsTest',
          component: RobotsTest,
        },
        {
          path: 'keywordsdensity',
          name: 'KeywordsDensity',
          component: KeywordsDensity,
        },
        {
          path: 'deadlink',
          name: 'DeadLink',
          component: DeadLink,
        },
        {
          path: 'segrabepage',
          name: 'SeGrabePage',
          component: SeGrabePage,
        },
        {
          path: 'websimiler',
          name: 'WebSimiler',
          component: WebSimiler,
        },
      ]
    },
    {
      path: '/domainsearchs',
      component: DomainIpMain,
      children: [
        {
          path: 'whoisSearch',
          name: 'WhoisSearch',
          component: WhoisSearch,
        },
        {
          path: 'whoisdeserve',
          name: 'WhoisDeserve',
          component: WhoisDeserve,
        },
        {
          path: 'webipsearch',
          name: 'WebIpSearch',
          component: WebIpSearch,
        },
        {
          path: 'domainnamesealed',
          name: 'DomainNameSealed',
          component: DomainNameSealed,
        },
        {
          path: 'domainnamewall',
          name: 'DomainNameWall',
          component: DomainNameWall,
        },
        {
          path: 'domainnamehistory',
          name: 'DomainNameHistory',
          component: DomainNameHistory,
        }
      ]
    },
    {
      path: '/othertools',
      component: OtherToolsMain,
      children: [
        {
          path: 'ipmultiplesearch',
          name: 'IpMultipleSearch',
          component: IpMultipleSearch,
        },
        {
          path: 'autosettype',
          name: 'AutoSetType',
          component: AutoSetType,
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
