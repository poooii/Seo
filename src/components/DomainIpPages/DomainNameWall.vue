<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>状态</td>
        </tr>
        <tr>
          <td>1</td>
          <td>{{content}}</td>
          <td
            v-show="disgfw.indexOf(content)<0"
            :class="nogfw.indexOf(content)>=0?'normal':'sealed'"
          >{{nogfw.indexOf(content)>=0?'正常':'被墙'}}</td>
          <td v-show="disgfw.indexOf(content)>=0">重测</td>
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
  name: "DomainNameWall",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "域名被墙",
      content: "",
      nogfw: "",
      disgfw: "",
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.checkWallInfo();
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
    },
    checkWallInfo() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/Pageinfo/checkWallInfo", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          console.log(res);
          this.nogfw = res.data.data.nogfw;
          this.disgfw = res.data.data.disgfw;
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
    storage.setItem("navIndex", "3");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.checkWallInfo();
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
  margin: 120px 0 50px 0;
}
</style>
