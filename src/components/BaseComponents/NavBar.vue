<template>
  <div class="websiteValue_top">
    <div class="websiteValue_top_contain">
      <img src="../../assets/17chalogo.png" alt class="websiteValue_top_logo">
      <ul class="websiteValue_top_ul">
        <li class="websiteValue_top_nostyle">
          <router-link to="/">首页</router-link>
        </li>

        <li class="websiteValue_top_ul_up" v-for="menu in menus" @mouseenter="changeActive($event)" @mouseleave="removeActive($event)">
          {{menu.name}}
          <ul class="websiteValue_top_ul_next" hidden>
            <li v-for="itmes in menu.details">
              <router-link :to="{ name: itmes.links,params:{content:''} }">{{itmes.name}}</router-link>
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
      "menus":[
        {
          name:'SEO常用工具',
          details:[
            {name:'SEO综合查询',links:'SeoSearch'},
            {name:'百度权重',links:'BaiduWeight'},
            {name:'备案查询',links:'SeoSearch'},
            {name:'HTTP状态查询',links:'SeoSearch'},
            {name:'源代码查看',links:'SeoSearch'},
            {name:'关键词密度检测',links:'SeoSearch'},
            {name:'内页收录查询',links:'SeoSearch'},
            {name:'网站速度测试',links:'SeoSearch'},
          ]
        },
        {
          name:'搜索优化工具',
          details:[
              {name:'SEO综合查询',links:'SeoSearch'},
              {name:'百度权重',links:'BaiduWeight'},
              {name:'备案查询',links:'SeoSearch'},
              {name:'HTTP状态查询',links:'SeoSearch'},
              {name:'源代码查看',links:'SeoSearch'},
              {name:'关键词密度检测',links:'SeoSearch'},
              {name:'内页收录查询',links:'SeoSearch'},
              {name:'网站速度测试',links:'SeoSearch'},
          ]
        },
        {
          name:'域名/IP查询',
          details:[
            {name:'SEO综合查询',links:'SeoSearch'},
            {name:'百度权重',links:'BaiduWeight'},
            {name:'备案查询',links:'SeoSearch'},
            {name:'HTTP状态查询',links:'SeoSearch'},
            {name:'源代码查看',links:'SeoSearch'},
            {name:'关键词密度检测',links:'SeoSearch'},
            {name:'内页收录查询',links:'SeoSearch'},
            {name:'网站速度测试',links:'SeoSearch'},
          ]
        },
        {
          name:'其他工具',
          details:[
            {name:'SEO综合查询',links:'SeoSearch'},
            {name:'百度权重',links:'BaiduWeight'},
            {name:'备案查询',links:'SeoSearch'},
            {name:'HTTP状态查询',links:'SeoSearch'},
            {name:'源代码查看',links:'SeoSearch'},
            {name:'关键词密度检测',links:'SeoSearch'},
            {name:'内页收录查询',links:'SeoSearch'},
            {name:'网站速度测试',links:'SeoSearch'},
          ]
        }
      ]
    };
  },
  methods:{
    changeActive($event){
        $event.currentTarget.className = 'websiteValue_top_ul_up websiteValue_top_hover';
    },
    removeActive($event){
        $event.currentTarget.className = 'websiteValue_top_ul_up';
    }
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
.websiteValue_top_ul>li:hover .websiteValue_top_ul_next{display: block;}

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
</style>