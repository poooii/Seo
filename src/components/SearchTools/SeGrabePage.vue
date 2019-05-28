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
            看足球比分，首选亚博体育！体育足球比分频道提供最快最准最全的足球即时比分，体育足球比分频道提供最快最准最全，
            比分直播、足球比分直播与比赛现场同步，更有赛事数据统计、现场分析等。亚博更有赛事数据统计、现场分析等。亚博
            体育官网为您提供更全面的足球资讯-看足球来这里就对了。。
          </td>
        </tr>
      </table>
      <div class="content_title">页面信息</div>
      <table class="web_table" width="1200px">
        <tr>
          <td>网站标题：</td>
          <td>足球比分预测足球在线交流-亚博体育官方论坛 - POWERED BY DISCUZ!0</td>
          <td>
            <i>30</i> 个字符（一般不超过80）
          </td>
        </tr>
        <tr>
          <td>网站关键字：</td>
          <td>亚博体育 足球交流 足球比分</td>
          <td>
            <i>9</i> 个字符（一般不超过80）
          </td>
        </tr>
        <tr>
          <td>网站简介：</td>
          <td>
            看足球比分，首选亚博体育！体育足球比分频道提供最快最准最全的足球即时比分，
            比分直播、足球比分直播与比赛现场同步，更有赛事数据统计、现场分析等。亚博
            体育官网为您提供更全面的足球资讯-看足球来这里就对了。。
          </td>
          <td>
            <i>180</i> 个字符（一般不超过80）
          </td>
        </tr>
      </table>
      <div class="content_title">服务器信息</div>
      <table class="server_table" width="1200px">
        <tr>
          <td>IP：</td>
          <td>220.181.56.216</td>
          <td>经度：</td>
          <td>116.3883</td>
        </tr>
        <tr>
          <td>纬度：</td>
          <td>39.9289</td>
          <td>托管地址：</td>
          <td>China Beijing</td>
        </tr>
        <tr>
          <td>所在地址：</td>
          <td>北京市电信</td>
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
  name: "SeGrabePage",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "搜索引擎模拟抓取页面",
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
    storage.setItem("navIndex", "2");
    window.scrollTo(0, 0);
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
