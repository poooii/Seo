<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table class="ip_main_table" width="1200px" v-show="!nothing">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>标题</td>
          <td>BR</td>
          <td>反链数</td>
          <td>链接名称</td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td>
            <a rel="nofollow" :href="'http://'+item.site" target="_blank">{{item.site}}</a>
          </td>
          <td>{{item.title}}</td>
          <td>
            <img :src="item.br_img" alt />
          </td>
          <td>{{item.f_links}}</td>
          <td>{{item.link_title}}</td>
        </tr>
        <tr>
          <td colspan="6">
            <span class="fl" @click="prevPage"><上一页</span>
            <span class="fr" @click="nextPage">下一页></span>
          </td>
        </tr>
      </table>
      <table class="ip_main_table ip_main_table2" width="1200px" v-show="nothing">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>标题</td>
          <td>BR</td>
          <td>反链数</td>
          <td>链接名称</td>
        </tr>
        <tr>
          <td colspan="6">
            <img src="../../assets/no_ipdata.png" alt />
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <span @click="prevPage"><上一页</span>
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
  name: "AntiChain",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "反链查询-首页反链",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      nothing: false,
      page: 1,
      list: ""
    };
  },
  methods: {
    getMsg(data) {
      this.$router.replace({
        name: "AntiChain",
        params: { domain: data }
      });
      this.content = data;
      this.page = 1;
      this.getFlinkInfo();
    },
    searchHot(data) {
      this.$router.replace({
        name: "AntiChain",
        params: { domain: data }
      });
      this.content = data;
      this.page = 1;
      this.getFlinkInfo();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "AntiChain",
        params: { domain: msg }
      });
      this.content = msg;
      this.page = 1;
      this.getFlinkInfo();
      window.scrollTo(0, 0);
    },
    nextPage() {
      window.scrollTo(0, 0);
      this.page++;
      this.getFlinkInfo();
    },
    prevPage() {
      window.scrollTo(0, 0);
      if (this.page > 1) {
        this.page--;
        this.getFlinkInfo();
      } else {
        alert("已经是最前页");
      }
    },
    getFlinkInfo() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/pageinfo/getFlinkinfo", {
          params: {
            domain: this.content,
            page: this.page
          }
        })
        .then(res => {
          console.log(res);
          if (res.data == null || res.data.length == 0) {
            this.nothing = true;
          } else {
            this.nothing = false;
            this.list = res.data;
          }
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
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (this.$route.params.shcontent !== ".") {
      this.content = this.$route.params.domain;
      this.getFlinkInfo();
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
  font-size: 22px;
  margin: 60px 0 30px 0;
}
.ip_main_table {
  border: 1px solid #ebebeb;
  margin-top: 20px;
  border-bottom: none;
  tr {
    td {
      width: 180px;
      height: 40px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;
      a {
        width: 100%;
        height: 100%;
        line-height: 40px;
        color: #007bb7;
      }
    }
    td:first-child {
      width: 100px;
    }
    td:nth-child(3) {
      width: 560px;
      text-align: left;
    }
    .color_blue {
      color: #007bb7;
    }
  }
  tr:first-child {
    td {
      background: #fafafa;
      color: #666;
    }
  }
  tr:last-child {
    td {
      padding: 0 182px;
      span {
        cursor: pointer;
      }
      span:hover {
        color: #007bb7;
      }
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 50px 0;
}
</style>
