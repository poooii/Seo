<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="websiteValue_banner">
        <div class="websiteValue_banner_contain">
            <p class="websiteValue_banner_title2">{{title}}</p>
            <div class="websiteValue_banner_input">
                <form @submit.prevent>
                <input
                    @keyup.enter="getlist"
                    v-model="SeoContent"
                    type="text"
                    placeholder="输入想要查询价格的域名"
                    class="websiteValue_banner_input1"
                    name="yuming"
                >
                <input type="button">
                    <img  @click="getlist" src="../../assets/websiteValue-search.png" alt class="websiteValue-search">
                </input>
                </form>
            </div>
            <!-- 热门搜索 -->
            <div class="clearfix websiteValue_banner_ul1">
                <span class="websiteValue_banner_ul_title">多个域名请空格或换行，一次可查询10个域名</span>
            </div>
        </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>IP地址</td>
          <td>状态</td>
        </tr>
        <tr>
          <td>1</td>
          <td>192.168.1.1</td>
          <td class="normal">局域网</td>
        </tr>
        <tr>
          <td>2</td>
          <td>192.168.1.1</td>
          <td class="normal">局域网</td>
        </tr>
        <tr>
          <td>2</td>
          <td>192.168.1.1</td>
          <td class="sealed">格式错误</td>
        </tr>
      </table>
      <div class="adv_box">
        <a v-for="advs in advpic" target="_blank" href="http://www.baidu.com">
          <img :src="require(`../../assets/${advs}.png`)">
        </a>
      </div>
    </div>
    <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
  </div>
</template>

<script>
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
  name: "IpMultipleSearch",
  components: {
    NearlySearch
  },
  data() {
    return {
      title: "IP地址批量查询工具",
      content: "",
      SeoContent:"",
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.SeoContent = storage.searchContent;
      window.scrollTo(0, 0);
    },
    getlist() {
        this.content=this.SeoContent
        let storage = window.sessionStorage;
        storage.setItem("searchContent", this.content);
    }
  },
  mounted() {
    let storage = window.sessionStorage
    this.SeoContent = storage.searchContent
    this.content = storage.searchContent
    storage.setItem("navIndex", "4");
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="less" scoped>
.websiteValue_banner{background:#f5f6f9;height: 220px;width: 100%;}
.websiteValue_banner_contain{width: 840px;margin: 0 auto;text-align: center;color: #666;}
.websiteValue_banner_title{font-size: 48px;padding-top: 105px;}
.websiteValue_banner_title2{font-size: 26px;padding-top: 42px;color:#333;}
.websiteValue_banner_input1{width: 100%;height: 50px;border-radius: 4px;border: none;outline: none;text-indent: 20px;}
.websiteValue_banner_input{position: relative;margin-top: 28px;}
.websiteValue-search{position: absolute;right: 0;width: 30px;height: 30px;top: 0;margin: 10px 0;border-left: 1px solid #f5f5f5;padding: 0 20px;cursor: pointer;}
.websiteValue_banner_ul li{float: left;padding-left: 16px;}
.websiteValue_banner_ul li a{color: #666;font-size: 14px;}
.websiteValue_banner_ul_title{float: left;}
.websiteValue_banner_ul a:hover{
    color: #007bb7;
}
.websiteValue_banner_ul a{cursor: pointer;}
.main_content {
  width: 1200px;
  margin: 0 auto;
}
.content_title {
  font-size: 24px;
  margin: 60px 0 30px 0;
}
.link_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  tr {
    td {
      min-width: 100px;
      height: 60px;
      text-align: center;
      font-size: 16px;
      border-bottom: 1px solid #ebebeb;
      position: relative;
    }
    td:nth-child(2) {
      text-align: left;
      padding-left: 100px;
    }
    td:first-child {
      width: 100px;
    }
    .sealed {
      color: #ff3838;
    }
    .normal {
      color: #63c85e;
    }
    .retest {
      color: #028ecd;
      cursor: pointer;
    }
  }
  tr:first-child {
    background: #fafafa;
    color: #666;
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 80px 0 50px 0;
}
</style>
