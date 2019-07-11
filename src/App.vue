

<template>
  <div id="app">
    <navbar v-show="!this.$route.meta.showpublic"></navbar>
    <router-view></router-view>
    <Loading></Loading>
    <footerbar v-show="!this.$route.meta.showpublic"></footerbar>
  </div>
</template>

<script>
import NavBar from "./components/BaseComponents/NavBar";
import FooterBar from "./components/BaseComponents/FooterBar";
import Loading from "./components/Loading/Loading";
export default {
  name: "App",
  components: {
    navbar: NavBar,
    footerbar: FooterBar,
    Loading
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  font-family: "Microsoft Yahei", "微软雅黑", arial;
  font-size: 13px;
  color: #333;
}
input,
select {
  font-family: "微软雅黑";
}
select {
  box-sizing: content-box;
}
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
}
a,
button,
img,
fieldset {
  text-decoration: none;
  outline-style: none;
}
dl,
dt,
dd,
ul,
li,
p,
h1,
img,
form {
  list-style: none;
  border: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
a {
  color: #333;
} /* 未访问的链接 */
a:hover {
  color: #007bb7;
}
.color_blue {
  color: #008abd;
}
input,
select,
div:hover,
a:hover {
  text-decoration: none;
}
/* select{appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
	-ms-appearance: none;
} */

input[type="button"],
button {
  border: none;
}
.wrap {
  width: 1080px;
  margin: auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
i {
  font-style: normal;
}
.hide {
  display: none;
}
.rel {
  position: relative;
}
.clearfix:after {
  display: block;
  height: 0;
  content: "";
  clear: both;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

@media (max-width: 1366px) {
  .websiteValue_top_contain,
  .websiteValue_valuation_contain,
  .main_content,
  .websiteValue_aboutUs_contain,
  .websiteValue2_search_contain,
  .websiteValue2_basicInfo_contain,
  .websiteValue_recent_contain {
    width: 960px;
  }
  .websiteValue_top_ul > li {
    padding: 0 15px;
  }
  .websiteValue2_search2 {
    width: 720px;
  }
}
@media (max-width: 960px) {
  .websiteValue_banner {
    width: 960px;
  }
}
.cha_default {
  width: 1200px;
  margin: 0 auto;
  padding: 130px 0 130px;
  color: #d3d3d3;
  letter-spacing: 2px;
  font-size: 30px;
  text-align: center;
}
.ip_main_table td .key_highlight {
  color: #007bb7;
}
</style>
