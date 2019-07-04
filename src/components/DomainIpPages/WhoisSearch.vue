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
          <td>-</td>
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
      </table>
      <div class="content_title">详细信息</div>
      <div class="details_box">
        <p v-for="items in showdetailList">
          <span>{{items.name}}</span>
          {{items.details}}
        </p>
        <p v-if="detailMsg.length > 6" @click="changeShowAll">
          <span class="show_all">{{show_all?'展开全部':'收起'}}</span>
        </p>
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
      detailMsg: [
        {
          name: "Domain Name:",
          details: "www.baidu.com"
        },
        {
          name: "Registry Domain ID:",
          details: "1181110_DOMAIN_COM-VRSN"
        },
        {
          name: "Registrar:",
          details: "2019-01-24T20:00:51-0800"
        },
        {
          name: "Domain Name:",
          details: "www.baidu.com"
        },
        {
          name: "Registry Domain ID:",
          details: "1181110_DOMAIN_COM-VRSN"
        },
        {
          name: "Registrar:",
          details:
            "1181110_DOMAIN_COM-1181110_DOMAIN_COM-VRSN1181110_DOMAIN_COM-VRSN1181110_DOMAIN_COM-VRSN1181110_DOMAIN_COM-VRSN1181110_DOMAIN_COM-VRSN1181110_DOMAIN_COM-VRSN1181110_DOMAIN_COM-VRSN1181110_DOMAIN_COM-V"
        },
        {
          name: "Domain Name:",
          details: "www.baidu.com"
        },
        {
          name: "Registry Domain ID:",
          details: "1181110_DOMAIN_COM-VRSN"
        }
      ]
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
        .get("/Api/seo/whois", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          console.log(res);
          this.registrant = res.data.registrant ? res.data.registrant : "-";
          this.created = res.data.created ? res.data.created : "-";
          this.changed = res.data.changed ? res.data.changed : "-";
          this.expires = res.data.expires ? res.data.expires : "-";
          this.emailCode = res.data.emailCode
            ? res.data.emailCode.slice(0, 20)+"..."
            : "-";
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
  computed: {
    showdetailList: {
      get() {
        if (this.show_all) {
          if (this.detailMsg.length < 7) {
            return this.detailMsg;
          }
          let newArr = [];
          for (var i = 0; i < 6; i++) {
            let item = this.detailMsg[i];
            newArr.push(item);
          }
          return newArr;
        }
        return this.detailMsg;
      }
    }
  },
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
  p {
    display: block;
    font-size: 14px;
    line-height: 28px;
    span {
      color: #333;
      font-weight: bold;
    }
  }
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
