<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">whois概况</div>
      <table width="1200px" class="whois_table">
        <tr>
          <td>域名：</td>
          <td>{{content}}</td>
          <td>注册商：</td>
          <td>{{name}}</td>
        </tr>
        <tr>
          <td>参照页：</td>
          <td>-</td>
          <td>域名持有人：</td>
          <td>{{registrant}}</td>
        </tr>
        <tr>
          <td>域名持有邮箱：</td>
          <td>{{emailCode}}</td>
          <td>创建时间：</td>
          <td>{{created}}</td>
        </tr>
        <tr>
          <td>更新时间：</td>
          <td>{{changed}}</td>
          <td>过期时间：</td>
          <td>{{expires}}</td>
        </tr>
        <tr v-for="item in servers">
          <td colspan="2">域名服务器：</td>
          <td colspan="2">{{item.server}}</td>
        </tr>
        <tr v-for="(item,key,index) in nserver">
          <td colspan="2">DNS务器：</td>
          <td colspan="2">
            {{key}}
            <span>-{{item}}</span>
          </td>
        </tr>
        <tr v-for="item in status">
          <td colspan="2">域名状态：</td>
          <td colspan="2">{{item}}</td>
        </tr>
      </table>
      <div class="content_title">详细信息</div>
      <div class="details_box" v-html="rawdataHtml">
        <!-- <p v-if="detailMsg.length > 6" @click="changeShowAll">
          <span class="show_all">{{show_all?'展开全部':'收起'}}</span>
        </p>-->
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
  name: "WhoisSearch",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "Whois查询",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      show_all: true,
      registrant: "",
      changed: "",
      created: "",
      expires: "",
      emailCode: "",
      detailMsg: "",
      rawdataHtml: "",
      name: "",
      servers: "",
      nserver: "",
      status: ""
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
    getWhois() {
      return this.$http
        .get("/Api/seo/whois_info", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          console.log(res);
          this.rawdataHtml = res.data.rawdataHtml ? res.data.rawdataHtml : "";
          this.registrant = res.data.regrinfo.name
            ? res.data.regrinfo.name
            : "-";
          this.name = res.data.regyinfo.registrar
            ? res.data.regyinfo.registrar
            : "-";
          this.created = res.data.regrinfo.domain.created
            ? res.data.regrinfo.domain.created
            : "-";
          this.changed = res.data.regrinfo.domain.changed
            ? res.data.regrinfo.domain.changed
            : "-";
          this.expires = res.data.regrinfo.domain.expires
            ? res.data.regrinfo.domain.expires
            : "-";
          this.emailCode = res.data.regrinfo.emailCode
            ? res.data.regrinfo.emailCode.slice(0, 20) + "..."
            : "-";
          this.servers = res.data.regyinfo.servers
            ? res.data.regyinfo.servers
            : "";
          this.nserver = res.data.regrinfo.domain.nserver
            ? res.data.regrinfo.domain.nserver
            : "";
          this.status = res.data.regrinfo.domain.status
            ? res.data.regrinfo.domain.status
            : "";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getAll() {
      this.bus.$emit("loading", true);
      this.$http.all([this.getWhois()]).then(
        this.$http.spread((acct, perms) => {
          this.bus.$emit("loading", false);
        })
      );
    }
  },
  // computed: {
  //   showdetailList: {
  //     get() {
  //       if (this.show_all) {
  //         if (this.detailMsg.length < 7) {
  //           return this.detailMsg;
  //         }
  //         let newArr = [];
  //         for (var i = 0; i < 6; i++) {
  //           let item = this.detailMsg[i];
  //           newArr.push(item);
  //         }
  //         return newArr;
  //       }
  //       return this.detailMsg;
  //     }
  //   }
  // },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "3");
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
}
.whois_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  font-size: 16px;
  tr {
    td {
      min-width: 220px;
      height: 60px;
      padding-left: 40px;
      border-bottom: 1px solid #ebebeb;
    }
    td:first-child,
    td:nth-child(3) {
      background: #fafafa;
      color: #808080;
    }
  }
}
.details_box {
  width: 1200px;
  background: #fafafa;
  border: 1px solid #ebebeb;
  padding: 40px 40px;
  font-size: 14px;
  line-height: 28px;
  .show_all {
    color: #007bb7;
    cursor: pointer;
    font-size: 15px;
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 180px 0 50px 0;
}
</style>
