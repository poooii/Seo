<template>
  <div class="websiteValue_aboutUs">
    <div class="websiteValue_aboutUs_contain">
      <!--  -->
      <div class="websiteValue_aboutUs_ul clearfix">
        <ul class="clearfix websiteValue_aboutUs_ul1">
          <li v-for="menu in menus">
            <ul class="clearfix websiteValue_aboutUs_ul2">
              <li v-for="(items,index) in menu.details" :class="{'websiteValue_aboutUs_title':!index}">{{items}}</li>
            </ul>
          </li>
          <li>
            <p class="websiteValue_aboutUs_title">一起查手机</p>
            <img src="../../assets/websiteValue-erweima.png" alt class="websiteValue_aboutUs_erweima">
          </li>
          <li>
            <p class="websiteValue_aboutUs_title">联系我们</p>
            <p class="websiteValue_aboutUs_workTime">工作时间：9：00-18:00</p>
            <a href="javascript:void(0);">
              <img src="../../assets/websiteValue-qq.png" alt="联系我们">
            </a>
          </li>
        </ul>
      </div>
      <!--  -->
      <div class="websiteValue_aboutUs_bot">
        <p>17cha.cn提供网站友情链接检测，同IP网站查询以及网站价值估算等站长根据 友链广告业务：1924299@qq.com</p>
        <p>Copyright 2010-2013, 17cha.cn All rights reserved. 苏ICP备13028660号 站长统计</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"FooterBar",
    data() {
      return {
        "menus":[
        {
          name:'关于我们',
          details:['关于我们','关于本站','广告合作','版权声明','网站地图']
        },
        {
          name:'服务支持',
          details:['服务支持','SEO常用工具','搜索优化工具','域名/IP查询','加密解密工具',
          '编码转换工具','HTML相关工具','其他工具']
        },
        {
          name:'服务支持',
          details:['服务支持','SEO常用工具','搜索优化工具','域名/IP查询','加密解密工具',
          '编码转换工具','HTML相关工具','其他工具']
        },
        {
          name:'服务支持',
          details:['服务支持','SEO常用工具','搜索优化工具','域名/IP查询','加密解密工具',
          '编码转换工具','HTML相关工具','其他工具']
        }
      ]
      }
    }
}
</script>

<style scoped>
    .websiteValue_aboutUs{width: 100%;overflow: hidden;background: #2e2f33;}
    .websiteValue_aboutUs_contain{width: 1080px;margin: 0 auto;overflow: hidden;color: #e6e6e6;padding-top: 40px;padding-bottom: 20px;}
    .websiteValue_aboutUs_ul1>li{float: left;width: 16.66%;}
    .websiteValue_aboutUs_ul2 li{line-height: 32px;}
    .websiteValue_aboutUs_ul2 li a{color: #e6e6e6;font-size: 12px;box-sizing: border-box;}
    .websiteValue_aboutUs_ul2 li a:hover{border-bottom: 1px solid #e6e6e6;}
    .websiteValue_aboutUs_title{font-size: 16px;line-height: 32px;}
    .websiteValue_aboutUs_erweima{width: 110px;height: 130px;padding-top: 10px;}
    .websiteValue_aboutUs_workTime{padding: 10px 0;}
    .websiteValue_aboutUs_ul {padding-bottom: 40px;border-bottom: 1px solid #545558;}
    .websiteValue_aboutUs_bot{text-align: center;padding-top: 20px;}
    .websiteValue_aboutUs_bot p{line-height: 26px;font-size: 12px;}
</style>
