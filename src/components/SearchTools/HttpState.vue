<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table class="http_table" width="1200px" v-if="content!=='nores'">
        <tr>
          <td>返回状态码：</td>
          <td class="found">{{Protocol}}</td>
        </tr>
        <tr>
          <td>网页返回HEAD信息：</td>
          <td>
            Connection: keep-alive
            <br />Content-Type:
            <span>{{ContentType}}</span>
            <br />Date:
            <span>{{Dates}}</span>
            <br />Location:
            <span>{{site}}</span>
            <br />
            <span>{{Protocol}}</span>
            <br />Server:
            <span>{{Server}}</span>
            <br />
          </td>
        </tr>
      </table>
      <div class="no_res" v-if="content=='nores'">
        <img src="../../assets/no_res.png" alt />
      </div>
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
  name: "HttpState",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "HTTP状态查询",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      ContentType: "",
      Protocol: "",
      Dates: "",
      site: "",
      Server: ""
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getWebpage();
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
    getWebpage() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/seo/webpage", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.Protocol = res.data.header.Protocol
            ? res.data.header.Protocol
            : "-";
          this.ContentType = res.data.header.ContentType
            ? res.data.header.ContentType
            : "-";
          this.Dates = res.data.header.Date ? res.data.header.Date : "-";
          this.site = res.data.html.site ? res.data.html.site : "-";
          this.Server = res.data.header.Server ? res.data.header.Server : "-";
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
      this.getWebpage();
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
.http_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  font-size: 16px;
  tr {
    td {
      height: 60px;
      border-bottom: 1px solid #ebebeb;
      padding-left: 30px;
    }
    td:first-child {
      background: #fafafa;
      color: #808080;
    }
    .found {
      color: #5aad54;
    }
  }
  tr:last-child {
    td {
      padding: 20px 0 20px 30px;
      line-height: 36px;
    }
    td:first-child {
      vertical-align: top;
    }
  }
}
.no_res {
  width: 1200px;
  height: 360px;
  border: 1px solid #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 80px 0 50px 0;
}
</style>
