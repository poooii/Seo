<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">
        查询结果
        <span>
          本功能由
          <a target="_blank" href="http://www.baidu.com">云智慧</a>
          <a target="_blank" href="http://www.baidu.com">监控宝</a> 赞助提供
        </span>
      </div>
      <table class="ping_table" width="1200px">
        <tr>
          <td>分布式监测点</td>
          <td>响应IP</td>
          <td>检测结果</td>
          <td>状态</td>
          <td>最小响应时间</td>
          <td>最大响应时间</td>
          <td>平均响应时间</td>
          <td>赞助商</td>
        </tr>
        <tr>
          <td>陕西西安电信</td>
          <td>117.34.8.50</td>
          <td>PING OK</td>
          <td class="run">可用</td>
          <td>0.517MS</td>
          <td>0.517MS</td>
          <td>0.84MS</td>
          <td>联系QQ：12250028 赞助提供广告位</td>
        </tr>
        <tr>
          <td>陕西西安电信</td>
          <td>117.34.8.50</td>
          <td>PING OK</td>
          <td class="run">可用</td>
          <td>0.517MS</td>
          <td>0.517MS</td>
          <td>0.84MS</td>
          <td>联系QQ：12250028 赞助提供广告位</td>
        </tr>
        <tr>
          <td>陕西西安电信</td>
          <td>117.34.8.50</td>
          <td>PING OK</td>
          <td class="run">可用</td>
          <td>0.517MS</td>
          <td>0.517MS</td>
          <td>0.84MS</td>
          <td>联系QQ：12250028 赞助提供广告位</td>
        </tr>
        <tr>
          <td>陕西西安电信</td>
          <td>117.34.8.50</td>
          <td>PING OK</td>
          <td class="run">可用</td>
          <td>0.517MS</td>
          <td>0.517MS</td>
          <td>0.84MS</td>
          <td>联系QQ：12250028 赞助提供广告位</td>
        </tr>
        <tr>
          <td>陕西西安电信</td>
          <td>117.34.8.50</td>
          <td>PING OK</td>
          <td class="run">可用</td>
          <td>0.517MS</td>
          <td>0.517MS</td>
          <td>0.84MS</td>
          <td>联系QQ：12250028 赞助提供广告位</td>
        </tr>
        <tr>
          <td>陕西西安电信</td>
          <td>117.34.8.50</td>
          <td>PING OK</td>
          <td class="run">可用</td>
          <td>0.517MS</td>
          <td>0.517MS</td>
          <td>0.84MS</td>
          <td>联系QQ：12250028 赞助提供广告位</td>
        </tr>
        <tr>
          <td colspan="8">
            <span><</span>
            <span v-for="num in 10">{{num}}</span>
            <span>...</span>
            <span class="color_blue">50</span>
            <span>></span>
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
  name: "PingTest",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "超级PING检测",
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
.content_title {
  font-size: 24px;
  margin: 60px 0 30px 0;
  span {
    font-size: 18px;
    color: #999;
    float: right;
    a {
      color: #008abd;
    }
  }
}
.ping_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  tr {
    td {
      height: 60px;
      font-size: 16px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;
      min-width: 110px;
    }
    .run{
      color: #3fc73c;
    }
  }
  tr:first-child {
    td {
      color: #666;
      background: #fafafa;
    }
  }
  tr:last-child {
    td {
      text-align: right;
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
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 50px 0;
}
</style>
