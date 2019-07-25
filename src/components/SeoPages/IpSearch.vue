<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <table class="title_table" width="1200px">
        <tr>
          <td v-show="type==2">域名</td>
          <td>IP地址</td>
          <td>地区</td>
        </tr>
        <tr>
          <td v-show="type==2">
            <a rel="nofollow" target="_blank" :href="'http://'+content">{{content}}</a>
          </td>
          <td v-show="type==1">{{content}}</td>
          <td v-show="type==2">{{ip}}</td>
          <td>{{info}}</td>
        </tr>
      </table>
      <table class="ip_main_table" width="1200px" v-show="!nothing">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>标题</td>
          <td>BR</td>
          <td>PR</td>
        </tr>
        <tr v-for="(item,index) in urls">
          <td>{{index+1}}</td>
          <td>
            <a rel="nofollow" :href="'http://'+item.value" target="_blank">{{item.value}}</a>
          </td>
          <td :class="{loading:item.loading}">
            <span class="color_red" @click="selChange(item.value,index)">{{item.cx}}</span>
            {{item.cxjg}}
            <i></i>
          </td>
          <td :class="{loading1:item.loading1}">
            <span v-show="item.brResult">
              <img src="../../assets/bd_wt.png" alt />
              <b>{{item.br}}</b>
            </span>
            <span
              @click="getBaiduRank(item.value,index)"
              class="color_red"
              v-show="!item.brResult"
            >重试</span>
            <i></i>
          </td>
          <td>
            <img src="../../assets/gg_wt.png" alt />
            <b>{{item.pr}}</b>
          </td>
        </tr>
        <tr>
          <td colspan="5">
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
          <td>PR</td>
        </tr>
        <tr>
          <td colspan="5">
            <img src="../../assets/no_ipdata.png" alt />
          </td>
        </tr>
        <tr>
          <td colspan="5">
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
import { fail } from "assert";
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
      advpic: ["adv1", "adv3", "adv2"],
      type: "1",
      info: "",
      ip: "",
      urls: "",
      nothing: false,
      page: "1"
    };
  },
  methods: {
    getMsg(data) {
      this.$router.replace({
        name: "IpSearch",
        params: { domain: data }
      });
      this.content = data;
      this.page = "1";
      this.getIp();
    },
    searchHot(data) {
      this.$router.replace({
        name: "IpSearch",
        params: { domain: data }
      });
      this.content = data;
      this.getIp();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "IpSearch",
        params: { domain: msg }
      });
      this.content = msg;
      this.getIp();
      window.scrollTo(0, 0);
    },
    nextPage() {
      window.scrollTo(0, 0);
      this.page++;
      this.getIp();
    },
    prevPage() {
      window.scrollTo(0, 0);
      if (this.page > 1) {
        this.page--;
        this.getIp();
      }
    },
    getIp() {
      this.bus.$emit("loading", true);
      var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (re.test(this.content)) {
        this.type = "1";
      } else {
        this.type = "2";
      }
      this.$http
        .get("/Api/Pageinfo/getIpInfo", {
          params: {
            ip: this.content + "/" + this.page,
            type: this.type
          }
        })
        .then(res => {
          this.info = res.data.info ? res.data.info : "-";
          this.ip = res.data.ip ? res.data.ip : "-";
          let arr = res.data.urls;
          let newArr = arr.map(item => ({ value: item }));
          for (let i in newArr) {
            newArr[i].loading = true;
            newArr[i].loading1 = true;
            newArr[i].brResult = false;
            newArr[i].cxjg = "";
            newArr[i].cx = "查询";
            newArr[i].br = "0";
            newArr[i].pr = "0";
          }
          this.urls = newArr;
          if (res.data == null || res.data.urls == "" || res.data.urls == []) {
            this.nothing = true;
          } else {
            this.nothing = false;
          }
          this.bus.$emit("loading", false);
          return res;
        })
        .then(res => {
          let curIndex = res.data.urls.length ? res.data.urls.length : 0;
          this.getDetails2(curIndex, 0);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    },
    selChange(val, idx) {
      this.urls[idx].loading = true;
      this.getDetails(val, idx);
    },
    getDetails(val, idx) {
      this.$http
        .all([
          this.getPrGoogle(val, idx),
          this.getBaiduRank(val, idx),
          this.getWebpage(val, idx)
        ])
        .then(
          this.$http.spread((acct, perms) => {
            this.urls[idx].loading = false;
            let newUrls = JSON.parse(JSON.stringify(this.urls));
            this.urls = newUrls;
          })
        );
    },
    getDetails2(cur, i) {
      if (cur <= i) {
        return;
      }
      this.$http
        .all([
          this.getPrGoogle(this.urls[i].value, i),
          this.getBaiduRank(this.urls[i].value, i),
          this.getWebpage(this.urls[i].value, i)
        ])
        .then(
          this.$http.spread((acct, perms) => {
            this.urls[i].loading = false;
            let newUrls = JSON.parse(JSON.stringify(this.urls));
            this.urls = newUrls;
            i++;
            this.getDetails2(cur, i);
          })
        )
        .catch(res => {
          console.log(res.msg);
          i++;
          this.getDetails2(cur, i);
        });
    },
    getPrGoogle(domain, idx) {
      return this.$http
        .get("/Api/seo/pr_google", {
          params: {
            domain: domain
          }
        })
        .then(res => {
          this.urls[idx].pr = res.data.pr;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getBaiduRank(domain, idx) {
      this.urls[idx].loading1 = true;
      return this.$http
        .get("/Api/seo/baidurank", {
          params: {
            domain: domain
          }
        })
        .then(res => {
          if (res.data == null || res.data == [] || res.data == undefined) {
            this.urls[idx].brResult = false;
          } else {
            this.urls[idx].brResult = true;
            this.urls[idx].br = res.data.BR;
          }
          this.urls[idx].loading1 = false;
        })
        .catch(res => {
          console.log(res.msg);
          this.urls[idx].loading1 = false;
          this.urls[idx].brResult = false;
        });
    },
    getWebpage(domain, idx) {
      return this.$http
        .get("/Api/seo/webpage", {
          params: {
            domain: domain
          }
        })
        .then(res => {
          if (res.data == null || res.data.html == [] || !res.data.html.title) {
            this.urls[idx].cx = "重试";
          } else {
            this.urls[idx].cx = "";
            this.urls[idx].cxjg = res.data.html.title;
          }
        })
        .catch(res => {
          this.urls[idx].cx = "重试";
          console.log(res.msg);
        });
    }
  },

  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (this.$route.params.domain !== ".") {
      this.content = this.$route.params.domain;
      this.getIp();
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
.title_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  margin-top: 60px;
  tr {
    td {
      width: 33.33%;
      height: 40px;
      text-align: center;
      border-left: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      a {
        width: 100%;
        height: 100%;
        line-height: 40px;
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
  border: 1px solid #ebebeb;
  margin-top: 20px;
  border-bottom: none;
  .color_red {
    color: #f11;
    cursor: pointer;
  }
  i {
    display: none;
    width: 100%;
    height: 100%;
    background: url(../../assets/loading.gif) no-repeat center left;
  }
  tr {
    td {
      width: 220px;
      height: 40px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;
      a {
        width: 100%;
        height: 100%;
        line-height: 40px;
        color: #007bb7;
      }
      b {
        font-weight: normal;
        position: relative;
        top: -4px;
        left: -26px;
        color: #fff;
      }
    }
    .loading,
    .loading1 {
      i {
        display: block;
      }
      span {
        display: none;
      }
    }
    .loading1 {
      i {
        background: url(../../assets/loading.gif) no-repeat center center;
      }
    }
    td:first-child,
    td:last-child {
      width: 100px;
    }
    td:nth-child(3) {
      width: 540px;
      text-align: left;
      padding-left: 20px;
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
.ip_main_table2 {
  tr:last-child {
    td {
      padding: 0;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 50px 0;
}
</style>
