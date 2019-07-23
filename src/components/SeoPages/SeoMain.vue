<template>
  <router-view></router-view>
</template>

<script>
export default {
  metaInfo: {
    title: "中介网-域名中介_网站中介_第三方中介交易平台-zhongjie.com",
    meta: [
      {
        name: "keywords",
        content: "中介,中介网,域名中介,网站中介,中介交易,网站交易,网站中介交易"
      },
      {
        name: "description",
        content:
          "中介网是国内靠谱的域名、网站中介交易平台,提供第三方中介交易,域名交易,网站中介,域名代购,域名停放,域名经纪等服务，专注互联网资产中介交易，Zhongjie.com！中介靠谱！"
      }
    ]
  },
  name: "SeoMain",
  beforeRouteLeave(to, from, next) {
    if (to.name !== "SeoSearch") {
      let storage = window.sessionStorage;
      storage.removeItem("searchContent");
      storage.removeItem("Keywords");
      storage.removeItem("S_SeoContent");
    }
    next();
  },
  data() {
    return {};
  }
};
</script>