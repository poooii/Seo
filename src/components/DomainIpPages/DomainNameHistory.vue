<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>注册商</td>
          <td>域名持有人</td>
          <td>域名持有邮箱</td>
          <td>创建时间</td>
          <td>更新时间</td>
          <td>操作</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a href="http://www.shgts.cn">shgts.cn</a>
          </td>
          <td>eName Technolo...</td>
          <td>马云</td>
          <td>
            <a href="javascript:void(0);">mayun@qq.com</a>
          </td>
          <td>2013-05-29</td>
          <td>2013-05-29</td>
          <td>
            <span>查看更多</span>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a href="http://www.shgts.cn">shgts.cn</a>
          </td>
          <td>eName Technolo...</td>
          <td>马云</td>
          <td>
            <a href="javascript:void(0);">mayun@qq.com</a>
          </td>
          <td>2013-05-29</td>
          <td>2013-05-29</td>
          <td>
            <span>查看更多</span>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <a href="http://www.shgts.cn">shgts.cn</a>
          </td>
          <td>eName Technolo...</td>
          <td>马云</td>
          <td>
            <a href="javascript:void(0);">mayun@qq.com</a>
          </td>
          <td>2013-05-29</td>
          <td>2013-05-29</td>
          <td>
            <span>查看更多</span>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <a href="http://www.shgts.cn">shgts.cn</a>
          </td>
          <td>eName Technolo...</td>
          <td>马云</td>
          <td>
            <a href="javascript:void(0);">mayun@qq.com</a>
          </td>
          <td>2013-05-29</td>
          <td>2013-05-29</td>
          <td>
            <span>查看更多</span>
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
  name: "DomainNameHistory",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "域名历史",
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
    storage.setItem("navIndex", "3");
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
.link_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  tr {
    td {
      height: 60px;
      text-align: center;
      font-size: 16px;
      border-bottom: 1px solid #ebebeb;
      a {
        color: #29b3ed;
      }
      span {
        width: 76px;
        height: 30px;
        line-height:30px;
        border: 1px solid #008abd;
        display: block;
        font-size:14px;
        color: #008abd;
        border-radius: 4px;
        margin: 0 auto;
        cursor: pointer;
      }
    }
    td:first-child {
      width: 100px;
    }
  }
  tr:first-child {
    background: #fafafa;
    color: #666;
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 120px 0 50px 0;
}
</style>
