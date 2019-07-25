<template>
  <div @click="hideSearchBox">
    <!-- 头部搜索框 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">PING检测</p>
        <div class="websiteValue_banner_input">
          <form @submit.prevent>
            <div class="search_downlist" @click.stop>
              <ul>
                <li
                  :class="{show:searchIdx==idx||searchIdx==undefined}"
                  v-for="(item,idx) in downList"
                  @click="changeSearch(idx)"
                >{{item.name}}</li>
              </ul>
              <i></i>
            </div>
            <input
              @keyup.enter="getList"
              v-model="SeoContent"
              type="text"
              placeholder="请输入需要查询的内容"
              class="websiteValue_banner_input1"
              name="yuming"
            />
            <input type="button" />
            <img
              @click="getList"
              src="../../assets/websiteValue-search.png"
              alt
              class="websiteValue-search"
            />
          </form>
        </div>
        <!-- 热门搜索 -->
        <div class="clearfix websiteValue_banner_ul1">
          <span class="websiteValue_banner_ul_title">热门搜索：</span>
          <ul class="websiteValue_banner_ul clearfix">
            <li v-for="items in hotsearch">
              <a @click="searchHot(items)">{{items}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">
        查询结果
        <!-- <span>
          本功能由
          <a target="_blank" href="http://www.baidu.com">云智慧</a>
          <a target="_blank" href="http://www.baidu.com">监控宝</a> 赞助提供
        </span>-->
      </div>
      <table class="ping_table" width="1200px" v-if="showViews=='0'">
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
        <tr v-for="item in pingData">
          <td>{{item.monitor_name}}</td>
          <td>{{item.ip}}</td>
          <td>{{item.resp_status}}</td>
          <td class="run">{{item.resp_result_str}}</td>
          <td>{{item.min}}</td>
          <td>{{item.max}}</td>
          <td>{{item.avg}}</td>
          <td>联系QQ：3001263800 赞助提供广告位</td>
        </tr>
      </table>
      <table class="ping_table" width="1200px" v-if="showViews=='1'">
        <tr>
          <td>分布式监测点</td>
          <td>响应IP</td>
          <td>检测结果</td>
          <td>状态</td>
          <td>响应时间</td>
          <td>下载字节数</td>
          <td>赞助商</td>
        </tr>
        <tr v-for="item in httpData">
          <td>{{item.monitor_name}}</td>
          <td>{{item.ip}}</td>
          <td>{{item.resp_status}}</td>
          <td class="run">{{item.resp_result}}</td>
          <td>{{item.resp_time}}</td>
          <td>{{item.size_download}}</td>
          <td>联系QQ：3001263800 赞助提供广告位</td>
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
  name: "PingTest",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "超级PING检测",
      content: "",
      searchIdx: "0",
      downList: [
        {
          name: "超级PING",
          idx: "0"
        },
        {
          name: "网页HTTP",
          idx: "1"
        }
      ],
      SeoContent: "",
      showViews: "0",
      hotsearch: [
        "po188.com",
        "www.hj135.com",
        "jiaofu.cn",
        "riyiseo.com",
        "shuadan.cn",
        "caoping6s.cn",
        "014121.cn"
      ],
      advpic: ["adv1", "adv3", "adv2"],
      pingData: "",
      httpData: ""
    };
  },
  methods: {
    //搜索
    getList() {
      let netReg =
        "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$";
      let netRe = new RegExp(netReg);
      if (!netRe.test(this.SeoContent)) {
        alert("请输入正确域名,域名不包括(http://以及https://)");
        return false;
      }
      this.content = this.SeoContent;
      this.$router.replace({
        name: "PingTest",
        params: { domain: this.content }
      });
      this.showViews = this.downList[0].idx;
      this.getAll();
    },
    hideSearchBox() {
      if (this.searchIdx == undefined) {
        this.searchIdx = 0;
      }
    },
    changeSearch(index) {
      if (this.searchIdx == index) {
        this.searchIdx = undefined;
      } else {
        let str = this.downList.splice(index, 1);
        this.downList.unshift(str[0]);
        this.searchIdx = 0;
      }
    },
    searchHot(data) {
      this.$router.replace({
        name: "PingTest",
        params: { domain: data }
      });
      this.SeoContent = data
      this.content = data
      this.showViews = this.downList[0].idx;
      this.getAll();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "PingTest",
        params: { domain: msg }
      });
      this.content = msg
      this.SeoContent = msg
      this.showViews = this.downList[0].idx;
      this.getAll();
      window.scrollTo(0, 0);
    },
    getPing() {
      this.$http
        .get("/Api/Postcurl/getPing", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.pingData = res.data;
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    },
    getHttp() {
      this.$http
        .get("/Api/Postcurl/getHttp", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.httpData = res.data;
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    },
    getAll() {
      this.bus.$emit("loading", true);
      if (this.showViews == "0") this.getPing();
      if (this.showViews == "1") this.getHttp();
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (this.$route.params.domain !== ".") {
      this.content = this.$route.params.domain;
      this.SeoContent = this.$route.params.domain;
      this.getAll();
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
.websiteValue_banner {
  background: #f5f6f9;
  height: 220px;
  width: 100%;
}

.websiteValue_banner_contain {
  width: 840px;
  margin: 0 auto;
  text-align: center;
  color: #666;
}

.websiteValue_banner_title {
  font-size: 48px;
  padding-top: 105px;
}

.websiteValue_banner_title2 {
  font-size: 26px;
  padding-top: 42px;
  color: #333;
}

.websiteValue_banner_input1 {
  width: 80%;
  height: 50px;
  border-radius: 4px;
  border: none;
  outline: none;
  text-indent: 20px;
  margin-left: 150px;
}

.websiteValue_banner_input {
  position: relative;
  margin-top: 28px;
  height: 70px;
}

.websiteValue_banner_input form {
  border: 1px solid #ebebeb;
  background: #fff;
}

.websiteValue-search {
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  top: 0;
  margin: 10px 0;
  border-left: 1px solid #f5f5f5;
  padding: 0 20px;
  cursor: pointer;
}

.websiteValue_banner_ul li {
  float: left;
  padding-left: 16px;
}

.websiteValue_banner_ul li a {
  color: #666;
  font-size: 14px;
  cursor: pointer;
}

.websiteValue_banner_ul_title {
  float: left;
}

.websiteValue_banner_ul a:hover {
  color: #007bb7;
}
.search_downlist {
  width: 150px;
  height: 50px;
  background: #f3f3f3;
  position: absolute;

  i {
    background-image: url(../../assets/icon_arrowdown.png);
    position: absolute;
    width: 20px;
    height: 20px;
    top: 15px;
    right: 10px;
  }

  ul {
    li {
      color: #666;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      text-align: left;
      padding-left: 20px;
      background: #f3f3f3;
      border-bottom: 1px solid #ebebeb;
      display: none;
    }

    .show {
      display: block;
    }
  }
}
.main_content {
  width: 1200px;
  margin: 0 auto;
}
.content_title {
  font-size: 22px;
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
      height: 40px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;
      min-width: 110px;
    }
    .run {
      color: #3fc73c;
    }
  }
  tr:first-child {
    td {
      color: #666;
      background: #fafafa;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 50px 0;
}
</style>
