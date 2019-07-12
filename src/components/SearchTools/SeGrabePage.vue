<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">抓取信息</div>
      <table class="grabe_table" width="1200px">
        <tr>
          <td>信息内容：</td>
          <td>
            <div :class="show_all?'hide_detail':'show_detail'">{{msg}}</div>
            <p>
              <span class="show_all" @click="changeShowAll">{{show_all?'展开全部>':'收起>'}}</span>
            </p>
          </td>
        </tr>
      </table>
      <div class="content_title">页面信息</div>
      <table class="web_table" width="1200px">
        <tr>
          <td>网站标题：</td>
          <td>{{wtitle}}</td>
          <td>
            <i>{{title_len}}</i> 个字符（一般不超过80）
          </td>
        </tr>
        <tr>
          <td>网站关键字：</td>
          <td>{{keywords}}</td>
          <td>
            <i>{{keywords_len}}</i> 个字符（一般不超过80）
          </td>
        </tr>
        <tr>
          <td>网站简介：</td>
          <td>{{description}}</td>
          <td>
            <i>{{description_len}}</i> 个字符（一般不超过80）
          </td>
        </tr>
      </table>
      <div class="content_title">服务器信息</div>
      <table class="server_table" width="1200px">
        <tr>
          <td>IP：</td>
          <td>{{ip}}</td>
          <td>协议类型：</td>
          <td>{{Protocol}}</td>
        </tr>
        <tr>
          <td>服务器类型：</td>
          <td>{{Server}}</td>
          <td>页面类型：</td>
          <td>{{ContentType}}</td>
        </tr>
        <tr>
          <td>所在地址：</td>
          <td>{{address}}</td>
          <td></td>
          <td></td>
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
  name: "SeGrabePage",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "搜索引擎模拟抓取页面",
      content: "",
      ip: "",
      msg: "",
      ContentType: "",
      Protocol: "",
      Server: "",
      address: "",
      title_len: "",
      keywords_len: "",
      description_len: "",
      wtitle: "",
      keywords: "",
      description: "",
      show_all: true,
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
    changeShowAll() {
      this.show_all = !this.show_all;
    },
    encode_unicode_param(t) {
      for (var e = "", a = 0; a < t.length; a++) {
        var i = t.charCodeAt(a).toString(16);
        2 == i.length ? (e += "n" + i) : (e += i);
      }
      return e;
    },
    getWebpage() {
      return this.$http
        .get("/Api/seo/webpage", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.ContentType = res.data.header.ContentType
            ? res.data.header.ContentType
            : "-";
          this.Protocol = res.data.header.Protocol
            ? res.data.header.Protocol
            : "-";
          this.Server = res.data.header.Server ? res.data.header.Server : "-";
          this.title_len = res.data.html.title_len
            ? res.data.html.title_len
            : "-";
          this.keywords_len = res.data.html.keywords_len
            ? res.data.html.keywords_len
            : "-";
          this.description_len = res.data.html.description_len
            ? res.data.html.description_len
            : "-";
          this.wtitle = res.data.html.title ? res.data.html.title : "-";
          this.keywords = res.data.html.keywords ? res.data.html.keywords : "-";
          this.description = res.data.html.description
            ? res.data.html.description
            : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getPage() {
      return this.$http
        .get("/Api/pageinfo/getPageInfo", {
          params: {
            domain: this.encode_unicode_param(this.content)
          }
        })
        .then(res => {
          this.msg = res.data[0].content;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getIp() {
      return this.$http
        .get("/Api/seo/dns", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.ip = res.data.ip ? res.data.ip : "-";
          this.address = res.data.address ? res.data.address : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getAll() {
      this.bus.$emit("loading", true);
      this.$http.all([this.getPage(), this.getWebpage(), this.getIp()]).then(
        this.$http.spread((acct, perms) => {
          this.bus.$emit("loading", false);
        })
      );
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "2");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getAll();
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
  span {
    font-size: 18px;
    color: #666;
  }
}
.grabe_table {
  border: 1px solid #ebebeb;
  tr {
    td {
      height: 60px;
      padding: 20px 40px;
      text-align: left;
      font-size: 16px;
      line-height: 32px;
      .hide_detail {
        height: 320px;
        overflow: hidden;
      }
      .show_detail {
        height: auto;
      }
      .show_all {
        color: #007bb7;
        cursor: pointer;
        font-size: 15px;
      }
    }
    td:first-child {
      color: #808080;
      background: #fafafa;
      width: 190px;
      vertical-align: top;
    }
  }
}
.web_table {
  border-top: 1px solid #ebebeb;
  border-right: 1px solid #ebebeb;
  font-size: 16px;
  tr {
    td {
      border-left: 1px solid #ebebeb;
      border-bottom: 1px solid #ebebeb;
      height: 60px;
      min-width: 220px;
      text-align: left;
      padding-left: 40px;
    }
    td:nth-child(2) {
      border-left: none;
    }
    td:first-child {
      background: #fafafa;
      color: #808080;
    }
    td:last-child {
      color: #808080;
      i {
        color: #ec1f37;
      }
    }
  }
  tr:last-child {
    td {
      vertical-align: top;
      padding: 20px 40px;
      line-height: 32px;
    }
  }
}
.server_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  font-size: 16px;
  tr {
    td {
      border-bottom: 1px solid #ebebeb;
      height: 60px;
      text-align: left;
      padding-left: 40px;
      min-width: 220px;
    }
    td:first-child,
    td:nth-child(3) {
      color: #808080;
      background: #fafafa;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 40px 0 50px 0;
}
</style>
