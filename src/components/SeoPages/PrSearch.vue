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
          <td>搜狗PR</td>
          <td>谷歌PR</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a rel="nofollow" target="_blank" :href="'http://'+content">{{content}}</a>
          </td>
          <td>
            <img src="../../assets/sg_wt.png" alt />
            <span>{{sg}}</span>
          </td>
          <td>
            <img src="../../assets/gg_wt.png" alt />
            <span>{{gg}}</span>
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
  name: "PrSearch",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "PR查询",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      sg: "",
      gg: ""
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getAll();
    },
    searchHot(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getAll();
    },
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.getAll();
      window.scrollTo(0, 0);
    },
    getPrGoogle() {
      return this.$http
        .get("/Api/seo/pr_google", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.gg = res.data.pr ? res.data.pr : 0;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getPrSogou() {
      return this.$http
        .get("/Api/seo/pr_sogou", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.sg = res.data.pr ? res.data.pr : 0;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getAll() {
      this.bus.$emit("loading", true);
      this.$http.all([this.getPrSogou(), this.getPrGoogle()]).then(
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
    } else {
      if (
        this.$route.params.shcontent !== undefined &&
        this.$route.params.shcontent !== ""
      ) {
        this.content = this.$route.params.shcontent;
        this.SeoContent = this.$route.params.shcontent;
        this.getAll();
      }
    }
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
      position: relative;
      a {
        width: 100%;
        height: 100%;
        line-height: 60px;
        color: #007bb7;
      }
      span {
        position: absolute;
        left: 166px;
        color: #fff;
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
