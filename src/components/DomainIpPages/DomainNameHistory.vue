<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="cha_default" v-show="noResult">未查询到结果</div>
    <div class="main_content" v-if="!content==''" v-show="!noResult">
      <div class="content_title">查询结果</div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>注册者</td>
          <td>电话</td>
          <td>邮箱</td>
          <td>注册时间</td>
          <td>过期时间</td>
          <td>记录时间</td>
          <td>变更项</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td class="c_blue">{{item.holder}}</td>
          <td>{{item.phone}}</td>
          <td class="c_blue">{{item.email}}</td>
          <td>{{item.start_time}}</td>
          <td>{{item.end_time}}</td>
          <td>{{item.record_time}}</td>
          <td>{{item.change}}</td>
          <td>
            <span @click="toWhois">详情</span>
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
  name: "DomainNameHistory",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "域名历史",
      content: "",
      list: "",
      noResult: false,
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getMsg(data) {
      this.$router.replace({
        name: "DomainNameHistory",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getHistory();
    },
    searchHot(data) {
      this.$router.replace({
        name: "DomainNameHistory",
        params: { domain: data }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getHistory();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "DomainNameHistory",
        params: { domain: msg }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.getHistory();
      window.scrollTo(0, 0);
    },
    getHistory() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/Pageinfo/getHistoryInfo", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (res.data == null || res.data.length == 0) {
            this.noResult = true;
          } else {
            this.list = res.data;
            this.noResult = false;
          }
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    },
    toWhois() {
      this.$router.push({
        name: "WhoisSearch",
        params: { shcontent: this.content }
      });
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "3");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getHistory();
    }
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
  },
  activated() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "3");
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
.link_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  tr {
    td {
      height: 40px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;
      padding-right: 6px;
      max-width: 190px;
      overflow: hidden;
      a {
        color: #29b3ed;
      }
      span {
        width: 46px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #008abd;
        display: block;
        color: #008abd;
        border-radius: 4px;
        margin: 0 auto;
        cursor: pointer;
      }
    }
    .c_blue {
      color: #008abd;
    }
    td:first-child {
      padding-left: 6px;
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
  margin: 120px 0 50px 0;
}
</style>
