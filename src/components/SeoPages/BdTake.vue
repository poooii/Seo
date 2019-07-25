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
          <td>百度收录量</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a rel="nofollow" target="_blank" :href="'http://'+content">{{content}}</a>
          </td>
          <td>
            百度收录：{{baiduindex}} 首页第
            <span>{{baiduposition}}</span>
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
  name: "BdTake",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "百度收录查询",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      baiduindex: "-",
      baiduposition: "-"
    };
  },
  methods: {
    getMsg(data) {
      this.$router.replace({
        name: "BdTake",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getShoulu1();
    },
    searchHot(data) {
      this.$router.replace({
        name: "BdTake",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getShoulu1();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "BdTake",
        params: { domain: msg }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.getShoulu1();
      window.scrollTo(0, 0);
    },
    getShoulu1() {
      this.baiduindex = "";
      this.baiduposition = "";
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/seo/shoulu1", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.bus.$emit("loading", false);
          this.baiduindex = res.data.baiduindex ? res.data.baiduindex : "-";
          this.baiduposition = res.data.baiduposition
            ? res.data.baiduposition
            : "-";
        })
        .catch(res => {
          console.log(res.msg);
          this.baiduindex = "-";
          this.baiduposition = "-";
          this.bus.$emit("loading", false);
        });
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getShoulu1();
    }
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
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
  font-size: 22px;
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
      height: 40px;
      text-align: center;
      a {
        width: 100%;
        height: 100%;
        line-height: 40px;
        color: #007bb7;
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
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 240px 0 50px 0;
}
</style>
