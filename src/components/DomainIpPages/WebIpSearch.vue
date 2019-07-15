<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="cha_default" v-show="noAnswer">未查询到该网站IP</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果：</div>
      <table width="1200px" class="tsz_table">
        <tr>
          <td>序号</td>
          <td>网站</td>
          <td>网站IP</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a target="_blank" :href="'http://'+content">{{content}}</a>
          </td>
          <td>
            {{ip}}
            <span>{{info}}</span>
          </td>
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
import SearchBox from "../BaseComponents/SearchBox";
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
  name: "WebIpSearch",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "网站IP查询",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      ip: "",
      info: "",
      noAnswer: false
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getIpInfo();
    },
    getIpInfo() {
      this.bus.$emit("loading", true);
      return this.$http
        .get("/Api/Pageinfo/getIpInfo", {
          params: {
            ip: this.content,
            type: 2
          }
        })
        .then(res => {
          this.ip = res.data.ip;
          this.info = res.data.info;
          this.bus.$emit("loading", false);
          if (res.data == null || !res.data.ip) {
            this.noAnswer = true;
          }
        })
        .catch(err => {
          console.log(err);
          this.bus.$emit("loading", false);
          this.noAnswer = true;
        });
    },
    searchHot(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
    },
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.content = storage.searchContent;
      this.getIpInfo();
    }
    storage.setItem("navIndex", "3");
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
.main_content {
  width: 1200px;
  margin: 0 auto;
}
.content_title {
  font-size: 24px;
  margin: 60px 0 30px 0;
  span {
    font-size: 18px;
    color: #666;
  }
}
.tsz_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  tr {
    td {
      border-top: 1px solid #ebebeb;
      vertical-align: middle;
      height: 60px;
      font-size: 16px;
      padding-left: 90px;
      a {
        color: #0589ce;
      }
    }
    td:first-child {
      border-left: 1px solid #ebebeb;
      color: #999;
      padding-left: 35px;
    }
  }
  tr:first-child {
    td {
      background: #fafafa;
      color: #666;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 180px 0 50px 0;
}
</style>
