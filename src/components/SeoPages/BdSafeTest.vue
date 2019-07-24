<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table width="1200px" class="tsz_table">
        <tr>
          <td>序号</td>
          <td>网址</td>
          <td>检测状态</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a rel="nofollow" target="_blank" :href="'http://'+content">{{content}}</a>
          </td>
          <td :class="safe==1?'safe':'danger'">
            {{is_safe}}
            <i v-show="loading"></i>
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
  name: "BdSafeTest",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "百度网站安全检测",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      safe: "0",
      is_safe: "",
      loading: false
    };
  },
  methods: {
    getMsg(data) {
      this.$router.replace({
        name: "BdSafeTest",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getSafe();
    },
    searchHot(data) {
      this.$router.replace({
        name: "BdSafeTest",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getSafe();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "BdSafeTest",
        params: { domain: msg }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.getSafe();
      window.scrollTo(0, 0);
    },
    getSafe() {
      this.bus.$emit("loading", true);
      setTimeout(() => {
        this.bus.$emit("loading", false);
      }, 1000);
      this.loading = true;
      this.is_safe = "";
      this.$http
        .get("/Api/baidupost/getsafe", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.safe = res.data.is_safe;
          if (res.data.is_safe == "0") {
            this.is_safe = "不安全";
          }
          if (res.data.is_safe == "1") {
            this.is_safe = "安全";
          }
          this.loading = false;
        })
        .catch(res => {
          console.log(res.msg);
          this.loading = false;
        });
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getSafe();
    }
  },
  activated() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "1");
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
}
.tsz_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  tr {
    td {
      border-top: 1px solid #ebebeb;
      vertical-align: middle;
      width: 250px;
      height: 60px;
      font-size: 16px;
      text-align: center;
      a {
        width: 100%;
        height: 100%;
        line-height: 60px;
        color: #007bb7;
      }
      i {
        display: block;
        width: 100%;
        height: 100%;
        background: url(../../assets/loading.gif) no-repeat center center;
      }
    }
    td:first-child {
      border-left: 1px solid #ebebeb;
      width: 100px;
    }
    td:nth-child(2) {
      width: 350px;
    }
  }
  tr:first-child {
    td {
      background: #fafafa;
      color: #666;
    }
  }
  .safe {
    color: #00b35d;
  }
  .danger {
    color: #f11;
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 240px 0 50px 0;
}
</style>
