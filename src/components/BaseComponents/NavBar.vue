<template>
  <div class="websiteValue_top">
    <div class="websiteValue_top_contain">
      <img src="../../assets/17chalogo.png" alt class="websiteValue_top_logo" @click="goToIndex">
      <ul class="websiteValue_top_ul">
        <li class="websiteValue_top_nostyle" @click="changeIndexZero">
          <router-link :class="{websiteValue_top_on:navIndex == '0'}" to="/">首页</router-link>
        </li>

        <li
          :class="{websiteValue_top_ul_up:true,websiteValue_top_on:navIndex == index+1,websiteValue_top_hover:navBgIndex ==index+1}"
          v-for="(menu,index) in menus"
          @click="changeNavBg(index)"
          @mouseenter="changeActive(index)"
          @mouseleave="removeActive(index)"
        >
          {{menu.name}}
          <ul class="websiteValue_top_ul_next" hidden>
            <li v-for="itmes in menu.details">
              <router-link tag="a" :to="{ name: itmes.links,params:{content:''} }">{{itmes.name}}</router-link>
            </li>
          </ul>
        </li>
        <li class="websiteValue_top_nostyle">
          <a href="javascript:void(0);">帮助中心</a>
        </li>
      </ul>
      <ul class="websiteValue_top_ul2 clearfix">
        <li>
          <a href="javascript:void(0);">站点导航</a>
        </li>
        <li class="websiteValue_top_ul21">
          <a href="javascript:void(0);">友情连接交换平台>></a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
  data() {
    return {
      navIndex: 0,
      navBgIndex: null,
      menus: [
        {
          name: "SEO常用工具",
          details: [
            { name: "SEO综合查询", links: "SeoSearch" },
            { name: "百度权重", links: "BaiduWeight" },
            { name: "历史数据", links: "HistoryData" },
            { name: "ICP备案查询", links: "IcpAbout" },
            { name: "IP反查域名", links: "IpSearch" },
            { name: "360权重", links: "ThreeSixZeroWeight" },
            { name: "360网站安全检测", links: "ThreeSixZeroSafe" },
            { name: "alexa趋势信息", links: "AleaxTrend" },
            { name: "PING检测", links: "PingTest" },
            { name: "PR查询", links: "PrSearch" },
            { name: "百度7天收录查询", links: "BdSevenSearch" },
            { name: "百度是否收录查询", links: "BdWhetherTake" },
            { name: "百度收录查询", links: "BdTake" },
            { name: "百度网站安全检测", links: "BdSafeTest" },
            { name: "百度1天收录查询", links: "BdOneSearch" },
            { name: "反链查询", links: "AntiChain" },
            { name: "关键词挖掘", links: "KeyWords" },
            { name: "建站时间查询", links: "BuildSearch" },
            { name: "网站标题查询", links: "WebTitleSearch" },
            { name: "网站导出链接数量查询", links: "WebOutLink" },
            { name: "友链检测", links: "FriendLink" },
          ]
        },
        {
          name: "搜索优化工具",
          details: [
            { name: "SEO综合查询", links: "SeoSearch" },
            { name: "百度权重", links: "BaiduWeight" },
            { name: "备案查询", links: "SeoSearch" },
            { name: "HTTP状态查询", links: "SeoSearch" },
            { name: "源代码查看", links: "SeoSearch" },
            { name: "关键词密度检测", links: "SeoSearch" },
            { name: "内页收录查询", links: "SeoSearch" },
            { name: "网站速度测试", links: "SeoSearch" }
          ]
        },
        {
          name: "域名/IP查询",
          details: [
            { name: "SEO综合查询", links: "SeoSearch" },
            { name: "百度权重", links: "BaiduWeight" },
            { name: "备案查询", links: "SeoSearch" },
            { name: "HTTP状态查询", links: "SeoSearch" },
            { name: "源代码查看", links: "SeoSearch" },
            { name: "关键词密度检测", links: "SeoSearch" },
            { name: "内页收录查询", links: "SeoSearch" },
            { name: "网站速度测试", links: "SeoSearch" }
          ]
        },
        {
          name: "其他工具",
          details: [
            { name: "SEO综合查询", links: "SeoSearch" },
            { name: "百度权重", links: "BaiduWeight" },
            { name: "备案查询", links: "SeoSearch" },
            { name: "HTTP状态查询", links: "SeoSearch" },
            { name: "源代码查看", links: "SeoSearch" },
            { name: "关键词密度检测", links: "SeoSearch" },
            { name: "内页收录查询", links: "SeoSearch" },
            { name: "网站速度测试", links: "SeoSearch" }
          ]
        }
      ]
    };
  },
  methods: {
    changeActive(index) {
      this.navBgIndex = index + 1;
    },
    removeActive(index) {
      this.navBgIndex = null;
    },
    changeNavBg(index) {
      this.navIndex = index + 1;
    },
    changeIndexZero() {
      this.navIndex = 0;
    },
    goToIndex() {
      this.$router.push({
        name: "Home",
        params: { navIndex: "0" }
      });
    }
  },
  watch: {
    $route(to, from) {
      this.navIndex = to.params.navIndex;
      if (to.path !== "/searchs/") {
        let storage = window.sessionStorage;
        storage.removeItem("searchContent");
      }
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.navIndex = storage.navIndex;
  }
};
</script>
<style scoped>
.websiteValue_top {
  background: #fff;
  width: 100%;
  line-height: 57px;
}
.websiteValue_top::after {
  content: "";
  display: block;
  clear: both;
}
.websiteValue_top_contain {
  width: 1200px;
  margin: 0 auto;
}
.websiteValue_top_logo {
  width: 200px;
  height: 57px;
  float: left;
  cursor: pointer;
}
.websiteValue_top_ul > li {
  float: left;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  position: relative;
  padding: 0 25px;
  border-top: 3px solid #fff;
}
.websiteValue_top_ul > li::after {
  content: "";
  background: url("../../assets/websiteValue-down.png") no-repeat center center;
  position: absolute;
  width: 10px;
  height: 10px;
  top: 25px;
  right: 5px;
}
.websiteValue_top_ul {
  float: left;
}
.websiteValue_top_ul2 > li {
  float: right;
  cursor: pointer;
  border-top: 3px solid #fff;
}
.websiteValue_top_ul > li:hover .websiteValue_top_ul_next {
  display: block;
}

.websiteValue_top_ul_next {
  position: absolute;
  z-index: 999;
  width: 280px;
  background: #fff;
  padding: 20px;
  border: 1px solid #ebebeb;
  left: 0;
}
.websiteValue_top_ul_next li {
  float: left;
  width: 50%;
  line-height: 28px;
}
.websiteValue_top_ul_next a {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.websiteValue_top_hover {
  color: #008abd !important;
  border-top: 3px solid #008abd !important;
  border-left: 1px solid #ebebeb;
  border-right: 1px solid #ebebeb;
}

.websiteValue_top_hover::after {
  background: url("../../assets/websiteValue-down3.png") no-repeat center center !important;
}

.websiteValue_top_on {
  color: #008abd !important;
}
.websiteValue_top_on::after {
  background: url("../../assets/websiteValue-down2.png") no-repeat center center !important;
}

.websiteValue_top_nostyle::after {
  background: none !important;
}
.websiteValue_top_ul21 a {
  font-size: 14px;
  color: #008abd;
  padding-right: 10px;
}
.websiteValue_top_ul .nav_active {
  color: #008abd;
}
</style>