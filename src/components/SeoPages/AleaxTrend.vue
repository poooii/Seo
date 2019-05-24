<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入要查询的站点</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <div class="aleax_trend_container">
        <table width="1198px">
          <tr>
            <td>综合排名</td>
            <td>当日排名</td>
            <td>一周排名</td>
            <td>一月排名</td>
            <td>三月排名</td>
          </tr>
          <tr>
            <td>2387</td>
            <td>
              2,387
              <span class="lower">
                <i></i>37
              </span>
            </td>
            <td>
              2,387
              <span class="lower">
                <i></i>37
              </span>
            </td>
            <td>
              2,387
              <span class="lower">
                <i></i>37
              </span>
            </td>
            <td>
              2,387
              <span class="upper">
                <i></i>37
              </span>
            </td>
          </tr>
        </table>
        <div class="aleax_pic_box clearfix">
            <div class="fl">
                <p>ALEXA排名走势图</p>
                <img src="https://traffic.alexa.com/graph?w=700&h=280&r=6m&y=t&u=www.wowchina.com" alt="">
            </div>
            <div class="fr">
                <p>ALEXA搜索流量占比</p>
                <img src="https://traffic.alexa.com/graph?w=700&h=280&r=6m&y=t&u=www.wowchina.com" alt="">
            </div>
        </div>
      </div>
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
  name: "AleaxTrend",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "alexa趋势信息",
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

.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 40px 0 50px 0;
}
.aleax_trend_container {
  border: 1px solid #ebebeb;
  table {
    font-size: 16px;
    tr {
      td {
        border-bottom: 1px solid #ebebeb;
        border-right: 1px solid #ebebeb;
        height: 60px;
        text-align: center;
        .lower {
          color: #00b35d;
          i {
            width: 0;
            height: 0;
            top: 15px;
            border-width: 5px 5px 0;
            border-style: solid;
            border-color: #00b35d transparent transparent;
            position: relative;
            margin-right: 5px;
          }
        }
        .upper {
          color: #ec1f37;
          i {
            width: 0;
            height: 0;
            border-width: 0 5px 5px;
            border-style: solid;
            border-color: transparent transparent #ec1f37;
            position: relative;
            margin-right: 5px;
            bottom: 12px;
          }
        }
      }
      td:last-child {
        border-right: none;
      }
    }
    tr:first-child {
      background: #fafafa;
      color: #666;
    }
  }
  .aleax_pic_box{
      padding: 40px 5%;
      p{
        margin-bottom: 30px;
      }
      div{
          width: 40%;
          img{
              width: 100%;
              height: auto;
          }
      }
  }
}
</style>
