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
          <td>百度是否收录PC</td>
          <td>百度是否收录WAP</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a rel="nofollow" target="_blank" :href="'http://'+content">{{content}}</a>
          </td>
          <td>{{pcSl?'已经收录':'未收录'}}</td>
          <td>{{mSl?'已经收录':'未收录'}}</td>
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
  name: "BdWhetherTake",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "百度是否收录查询",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      pcSl: true,
      mSl: true
    };
  },
  methods: {
    getMsg(data) {
      this.$router.replace({
        name: "BdWhetherTake",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getAll();
    },
    searchHot(data) {
      this.$router.replace({
        name: "BdWhetherTake",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getAll();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "BdWhetherTake",
        params: { domain: msg }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.getAll();
      window.scrollTo(0, 0);
    },
    getBaidurankKeywords() {
      return this.$http
        .get("/Api/seo/baidurankKeywords", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (res.data.data.length !== 0 && res.data.data !== undefined) {
            this.pcSl = true;
          } else {
            this.pcSl = false;
          }
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getBaidurankKeywords_m() {
      return this.$http
        .get("/Api/seo/baidurankKeywords_m", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (res.data.data.length !== 0 && res.data.data !== undefined) {
            this.mSl = true;
          } else {
            this.mSl = false;
          }
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getAll() {
      this.bus.$emit("loading", true);
      this.$http
        .all([this.getBaidurankKeywords(), this.getBaidurankKeywords_m()])
        .then(
          this.$http.spread((acct, perms) => {
            this.bus.$emit("loading", false);
          })
        );
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getAll();
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
