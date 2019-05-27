<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">
      <img src="../../assets/no_data.png" alt>
      <p>请输入查询的网站</p>
      <div class="bottom_tips">
        <p class="title">
          <span></span> 历史数据
        </p>
        <p>
          历史数据功能可以通过用户输入域名后，查询该域名的百度SEO历史、Aleax排行历史、收录/反链历史。
          <br>根据该功能可以自定义日期查询网站历史，自定义查询最大支持的范围为半年。
        </p>
      </div>
      <div class="adv_box_before">
        <a v-for="advs in advpic" target="_blank" href="http://www.baidu.com">
          <img :src="require(`../../assets/${advs}.png`)">
        </a>
      </div>
    </div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table width="1200px" class="tsz_table">
        <tr>
          <td>序号</td>
          <td>网址</td>
          <td>建站时间</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a href="http://www.baidu.com">www.baidu.com</a>
          </td>
          <td>建站：7345天</td>
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
  name: "WebTitleSearch",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "网站标题批量查询",
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
}
.bottom_tips {
  height: 110px;
  background: #f7f9ff;
  position: relative;
  margin-top: 100px;
  padding-left: 26px;
  padding-top: 20px;
  p {
    text-align: left;
    font-size: 16px;
    line-height: 28px;
    color: #666;
    span {
      display: inline-block;
      width: 5px;
      height: 24px;
      background: #0589ce;
      vertical-align: -4px;
    }
  }
  .title {
    font-size: 22px;
    color: #333;
    margin-bottom: 10px;
  }
}
.tsz_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  tr {
    td {
      border-top: 1px solid #ebebeb;
      vertical-align: middle;
      width: 250px;
      height: 60px;
      font-size: 16px;
      text-align: center;
      a {
        width: 100%;
        height: 100%;
        line-height: 60px;
        color: #007bb7;
      }
    }
    td:first-child {
      border-left: 1px solid #ebebeb;
      width: 100px;
    }
    td:nth-child(2) {
      width: 350px;
    }
  }
  tr:first-child {
    td {
      background: #fafafa;
      color: #666;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 240px 0 50px 0;
}
.adv_box_before {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 66px;
}
</style>
