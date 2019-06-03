<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">
        查询结果：
        <span>文件状态良好，请查看下面具体报告</span>
      </div>
      <table width="1200px" class="tsz_table">
        <tr>
          <td>序号</td>
          <td>网站</td>
          <td>网站IP</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a target="_blank" href="http://www.souhu.com">www.sohu.com</a>
          </td>
          <td>101.227.172.11 上海市 北京搜狐互联网信息服务有限公司电信节点</td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a target="_blank" href="http://www.souhu.com">www.sohu.com</a>
          </td>
          <td>101.227.172.11 上海市 北京搜狐互联网信息服务有限公司电信节点</td>
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
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getAll();
    },
    getAll() {
      this.bus.$emit("loading", true);
      this.$http.all([this.getBd1(), this.getBd2()]).then(
        this.$http.spread((acct, perms) => {
          this.bus.$emit("loading", false)
        })
      );
    },
    getBd1() {
      return this.$http
        .get("/Api/OnlineZhongJi", {
          params: {
            cc: 1,
            rn: 1
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBd2() {
      return this.$http
        .get("/Api/OnlineZhongJie")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
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
    if (storage.searchContent !== "" || storage.searchContent !== undefined) {
      this.content = storage.searchContent;
      this.getAll();
    }

    storage.setItem("navIndex", "3");
    window.scrollTo(0, 0);
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
