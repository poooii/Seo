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
          <td class="found">{{contentType}}</td>
        </tr>
        <tr>
          <td>网页返回HEAD信息：</td>
          <td v-html="mainContent"></td>
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
      contentType: "",
      mainContent: ""
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getHttpInfo();
    },
    searchHot(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getHttpInfo();
    },
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.getHttpInfo();
      window.scrollTo(0, 0);
    },
    encode_unicode_param(t) {
      for (var e = "", a = 0; a < t.length; a++) {
        var i = t.charCodeAt(a).toString(16);
        2 == i.length ? (e += "n" + i) : (e += i);
      }
      return e;
    },
    getHttpInfo() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/pageinfo/getHttpInfo", {
          params: {
            domain: this.encode_unicode_param(this.content)
          }
        })
        .then(res => {
          this.contentType = res.data[0].thead ? res.data[0].thead : "-";
          this.mainContent = res.data[0].content ? res.data[0].content : "";
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
      this.getHttpInfo();
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
      line-height: 32px;
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
