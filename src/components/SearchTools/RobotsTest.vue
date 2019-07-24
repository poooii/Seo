<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="cha_default" v-show="noResult">未查询到结果</div>
    <div class="main_content" v-if="!content==''" v-show="!noResult">
      <div class="content_title">
        查询结果：
        <span>文件状态良好，请查看下面具体报告</span>
      </div>
      <table width="1200px" class="tsz_table">
        <tr>
          <td>规则</td>
          <td>解释</td>
          <td>有效</td>
        </tr>
        <tr v-for="item in list">
          <td>{{item.rule}}</td>
          <td v-html="item.content"></td>
          <td :class="item.status">有效</td>
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
  name: "RobotsTest",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "Robots检测",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      list: "",
      noResult: false
    };
  },
  methods: {
    getMsg(data) {
      this.$router.replace({
        name: "RobotsTest",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getRobotsInfo();
    },
    searchHot(data) {
      this.$router.replace({
        name: "RobotsTest",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getRobotsInfo();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "RobotsTest",
        params: { domain: msg }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.getRobotsInfo();
      window.scrollTo(0, 0);
    },
    getRobotsInfo() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/pageinfo/getRobotsInfo", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (
            res.data == null ||
            res.data == undefined ||
            res.data.length == 0
          ) {
            this.noResult = true;
          } else {
            this.noResult = false;
            this.list = res.data;
          }
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
    storage.setItem("navIndex", "2");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getRobotsInfo();
    }
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
  },
  activated() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "2");
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
      padding-left: 35px;
    }
    td:first-child {
      border-left: 1px solid #ebebeb;
      color: #999;
    }
    .ico-correct {
      color: #00b35d;
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
