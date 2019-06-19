<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">备案信息</div>
      <table width="1200px" class="icptable">
        <tr>
          <td>主办单位名称</td>
          <td>{{company}}</td>
          <td>主办单位性质：</td>
          <td>{{qiye}}</td>
        </tr>
        <tr>
          <td>网站备案/许可证号：</td>
          <td>{{beian}}</td>
          <td>网站名称：</td>
          <td>{{name}}</td>
        </tr>
        <tr>
          <td>网站首页网址：</td>
          <td>
            <a :href="site|addHttp" target="_blank">{{site}}</a>
          </td>
          <td>网站域名：</td>
          <td>{{domain}}</td>
        </tr>
        <tr>
          <td>审核时间：</td>
          <td>{{create_time}}</td>
          <td></td>
          <td></td>
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
  name: "IcpAbout",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "ICP备案查询",
      name:"",
      content: "",
      qiye: "",
      site: "",
      domain: "",
      create_time: "",
      beian: "",
      company: "",
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getIcp();
      setTimeout(() => {
        this.bus.$emit("loading", false);
      }, 2000);
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
    getIcp() {
      this.bus.$emit("loading", true);
      return this.$http
        .get("/Api/seo/icp", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          console.log(res);
          this.company = res.data.company ? res.data.company : "-";
          this.qiye = res.data.type ? res.data.type : "-";
          this.beian = res.data.icp_main ? res.data.icp_main : "-";
          this.domain = res.data.domains ? res.data.domains : "-";
          this.site = res.data.homes ? res.data.homes : "-";
          this.name = res.data.name ? res.data.name : "-";
          if (res.data.icp_time) {
            var date = new Date(res.data.icp_time * 1000);
            this.create_time =
              date.getFullYear() +
              "-" +
              (date.getUTCMonth() + 1) +
              "-" +
              date.getUTCDate();
          } else {
            this.create_time = "-";
          }
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
        });
    }
  },
  filters: {
    addHttp(val) {
      return "http://" + val;
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getIcp();
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

.icptable {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;

  tr {
    td {
      border-top: 1px solid #ebebeb;
      vertical-align: middle;
      padding-left: 40px;
      width: 300px;
      height: 60px;
      font-size: 16px;

      a {
        width: 100%;
        height: 100%;
        line-height: 60px;
        color: #007bb7;
      }
    }

    td:first-child {
      background: #fafafa;
      width: 220px;
      color: #808080;
      border-left: 1px solid #ebebeb;
    }

    td:nth-child(3) {
      background: #fafafa;
      width: 220px;
      color: #808080;
    }
  }
}

.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 50px 0;
}
</style>
