<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <table class="title_table" width="1200px">
        <tr>
          <td>域名</td>
          <td>IP地址</td>
          <td>地区</td>
        </tr>
        <tr>
          <td>
            <a href="http://www.pc6.com" target="_blank">www.pc6.com</a>
          </td>
          <td>123.206.112.44</td>
          <td>北京市</td>
        </tr>
      </table>
      <table class="ip_main_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>标题</td>
          <td>BR</td>
          <td>PR</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a href="http://www.pc6.com" target="_blank">www.pc6.com</a>
          </td>
          <td>pc6下载站 _ 官方软件下载基地_安全的软件官方下载网站！</td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
          </td>
          <td>
            <img src="../../assets/zz_wt.png" alt>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a href="http://www.pc6.com" target="_blank">www.pc6.com</a>
          </td>
          <td>pc6下载站 _ 官方软件下载基地_安全的软件官方下载网站！</td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
          </td>
          <td>
            <img src="../../assets/zz_wt.png" alt>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <a href="http://www.pc6.com" target="_blank">www.pc6.com</a>
          </td>
          <td class="fail">查询失败</td>
          <td>
            <img src alt>
          </td>
          <td>
            <img src="../../assets/zz_wt.png" alt>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <a href="http://www.pc6.com" target="_blank">www.pc6.com</a>
          </td>
          <td>pc6下载站 _ 官方软件下载基地_安全的软件官方下载网站！</td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
          </td>
          <td>
            <img src="../../assets/zz_wt.png" alt>
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <a href="http://www.pc6.com" target="_blank">www.pc6.com</a>
          </td>
          <td>pc6下载站 _ 官方软件下载基地_安全的软件官方下载网站！</td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
          </td>
          <td>
            <img src="../../assets/zz_wt.png" alt>
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td>
            <a href="http://www.pc6.com" target="_blank">www.pc6.com</a>
          </td>
          <td>pc6下载站 _ 官方软件下载基地_安全的软件官方下载网站！</td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
          </td>
          <td>
            <img src="../../assets/zz_wt.png" alt>
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>
            <a href="http://www.pc6.com" target="_blank">www.pc6.com</a>
          </td>
          <td>pc6下载站 _ 官方软件下载基地_安全的软件官方下载网站！</td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
          </td>
          <td>
            <img src="../../assets/zz_wt.png" alt>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span><</span>
            <span v-for="num in 10">{{num}}</span>
            <span>...</span>
            <span class="color_blue">50</span>
            <span>></span>
          </td>
        </tr>
      </table>
      <table class="ip_main_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>标题</td>
          <td>BR</td>
          <td>PR</td>
        </tr>
        <tr>
          <td colspan="5">
            <img src="../../assets/no_ipdata.png" alt>
          </td>
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
  name: "IpSearch",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "IP反查域名",
      content: "",
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
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
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="less" scoped>
.main_content {
  width: 1200px;
  margin: 0 auto;
}
.title_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  margin-top: 60px;
  tr {
    td {
      width: 33.33%;
      height: 60px;
      text-align: center;
      border-left: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      a {
        width: 100%;
        height: 100%;
        line-height: 60px;
        color: #007bb7;
      }
    }
  }
  tr:first-child {
    td {
      background: #fafafa;
      color: #666;
    }
  }
}
.ip_main_table {
  font-size: 16px;
  border: 1px solid #ebebeb;
  margin-top: 20px;
  border-bottom: none;
  tr {
    td {
      width: 220px;
      height: 60px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;
      a {
        width: 100%;
        height: 100%;
        line-height: 60px;
        color: #007bb7;
      }
    }
    td:first-child,
    td:last-child {
      width: 100px;
    }
    td:nth-child(3) {
      width: 560px;
      text-align: left;
    }
    .fail {
      color: #ff3838;
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
      text-align: right;
    }
    span {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      margin-right: 24px;
      cursor: pointer;
      font-size: 16px;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 50px 0;
}
</style>
