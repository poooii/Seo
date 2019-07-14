<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">{{title}}</p>
        <div class="websiteValue_banner_input">
          <form @submit.prevent>
            <input
              v-model="Keywords"
              type="text"
              placeholder="请输入关键词"
              class="websiteValue_banner_input1"
              name="yuming"
            />
            <input
              @keyup.enter="getList"
              v-model="SeoContent"
              type="text"
              placeholder="请输入网址"
              class="websiteValue_banner_input1"
              name="yuming"
            />
            <input type="button" />
            <img
              @click="getList"
              src="../../assets/websiteValue-search.png"
              alt
              class="websiteValue-search"
            />
          </form>
        </div>
      </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果：</div>
      <table width="1200px" class="tsz_table">
        <tr>
          <td>页面文本总长度：</td>
          <td>0字符</td>
        </tr>
        <tr>
          <td>关键字符串长度：</td>
          <td>2字符</td>
        </tr>
        <tr>
          <td>关键字出现频率：</td>
          <td>0次</td>
        </tr>
        <tr>
          <td>关键字符总长度：</td>
          <td>0字符</td>
        </tr>
        <tr>
          <td>密度结果计算：</td>
          <td>0%</td>
        </tr>
        <tr>
          <td>密度建议值：</td>
          <td>2%≦密度≦8%</td>
        </tr>
      </table>
      <div class="adv_box">
        <a v-for="advs in advpic" target="_blank" href="http://www.baidu.com">
          <img :src="require(`../../assets/${advs}.png`)" />
        </a>
      </div>
    </div>
    <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
  </div>
</template>

<script>
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
  name: "KeywordsDensity",
  components: {
    NearlySearch
  },
  data() {
    return {
      title: "关键词密度查询",
      content: "",
      SeoContent: "",
      Keywords: "",
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      window.scrollTo(0, 0);
    },
    getList() {
      let netReg =
        "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$";
      let netRe = new RegExp(netReg);
      if (!netRe.test(this.SeoContent)) {
        alert("请输入正确域名,域名不包括(http://以及https://)");
        return false;
      }
      this.content = this.SeoContent;
      let storage = window.sessionStorage;
      storage.setItem("searchContent", this.content);
      storage.setItem("Keywords", this.Keywords);
      this.getWDensity();
    },
    getWDensity() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/pageinfo/getWDensity", {
          params: {}
        })
        .then(res => {
          console.log(res);
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    this.Keywords = storage.Keywords;
    storage.setItem("navIndex", "2");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getWDensity();
    }
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
.websiteValue_banner {
  background: #f5f6f9;
  height: 220px;
  width: 100%;
}
.websiteValue_banner_contain {
  width: 840px;
  margin: 0 auto;
  text-align: center;
  color: #666;
}
.websiteValue_banner_title {
  font-size: 48px;
  padding-top: 105px;
}
.websiteValue_banner_title2 {
  font-size: 26px;
  padding-top: 42px;
  color: #333;
}
.websiteValue_banner_input1 {
  width: 49%;
  height: 50px;
  border-radius: 4px;
  border: none;
  outline: none;
  text-indent: 20px;
}
.websiteValue_banner_input {
  position: relative;
  margin-top: 28px;
}
.websiteValue-search {
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  top: 0;
  margin: 10px 0;
  border-left: 1px solid #f5f5f5;
  padding: 0 20px;
  cursor: pointer;
}
.websiteValue_banner_ul li {
  float: left;
  padding-left: 16px;
}
.websiteValue_banner_ul li a {
  color: #666;
  font-size: 14px;
}
.websiteValue_banner_ul_title {
  float: left;
}
.websiteValue_banner_ul a:hover {
  color: #007bb7;
}
.websiteValue_banner_ul a {
  cursor: pointer;
}
.main_content {
  width: 1200px;
  margin: 0 auto;
}
.content_title {
  font-size: 24px;
  margin: 60px 0 30px 0;
}
.tsz_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  tr {
    td {
      border-top: 1px solid #ebebeb;
      height: 60px;
      font-size: 16px;
      padding-left: 35px;
    }
    td:first-child {
      border-left: 1px solid #ebebeb;
      color: #808080;
      background: #fafafa;
      width: 260px;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 100px 0 50px 0;
}
</style>
