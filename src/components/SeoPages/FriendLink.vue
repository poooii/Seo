<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">手机游戏_手机软件 - PC6手机站</div>
      <table class="title_table" width="1200px">
        <tr>
          <td>百度收录：</td>
          <td class="color_red">{{baiduSl}}</td>
          <td>百度索引</td>
          <td class="color_red">{{baiduSy}}</td>
        </tr>
        <tr>
          <td>首页位置：</td>
          <td>{{baiduposition}}</td>
          <td>PR输出值：</td>
          <td>{{prValue}}</td>
        </tr>
        <tr>
          <td>百度权重</td>
          <td>
            <img src="../../assets/bd_wt.png" alt />
            <span>{{baiduRank}}</span>
          </td>
          <td>PR：</td>
          <td>
            <img src="../../assets/gg_wt.png" alt />
            <span>{{ggPr}}</span>
          </td>
        </tr>
      </table>
      <table class="link_table" width="1200px">
        <tr>
          <td>出站/反向链接</td>
          <td>图片链接</td>
          <td>文字链接</td>
          <td>带nofollow链接</td>
        </tr>
        <tr>
          <td>出站链接：20</td>
          <td>8</td>
          <td>12</td>
          <td>1</td>
        </tr>
        <tr>
          <td>反向链接：3</td>
          <td>1</td>
          <td>2</td>
          <td>0</td>
        </tr>
      </table>
      <div class="content_title">
        检测结果：
        <span>
          出站链接中有
          <i>17个</i> 没有本站链接
        </span>
      </div>
      <table class="ip_main_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>站点</td>
          <td>
            百度收录
            <i></i>
          </td>
          <td>
            百度预计流量/权重
            <i class="blue_down"></i>
          </td>
          <td>
            PR/输出值
            <i class="red_up"></i>
          </td>
          <td>
            对方友链情况
            <i></i>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <p>信用中国</p>
            <p>www.creditchina.gov.cn</p>
          </td>
          <td>40,500</td>
          <td>9285 / 5</td>
          <td>0 / 0.15</td>
          <td>
            <b>首页无本站链接!</b> 外链数：123
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <p>信用中国</p>
            <p>www.creditchina.gov.cn</p>
          </td>
          <td>40,500</td>
          <td>9285 / 5</td>
          <td>0 / 0.15</td>
          <td>
            <span>
              链接：
              <a target="_blank" href="http://www.baidu.com">图片链接</a>
            </span> 位置/外链数： 9/34
          </td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td>
            <p>{{item.title}}</p>
            <p>{{item.domain}}</p>
          </td>
          <td :class="{loading1:item.loading1}">
            <span @click="getSuoyinDetail(item.domain,index)">{{item.cx1}}</span>
            {{item.cxjg1}}
            <i></i>
          </td>
          <td :class="{loading2:item.loading2}">
            <span @click="getBaiduRankDetail(item.domain,index)">{{item.cx2}}</span>
            {{item.cxjg2}}
            <b>{{item.cxjgN2}}</b>
            <i></i>
          </td>
          <td :class="{loading3:item.loading3}">
            <span @click="getPrGoogleDetail(item.domain,index)">{{item.cx3}}</span>
            {{item.cxjg3}}
            <b>{{item.cxjgN3}}</b>
            <i></i>
          </td>
          <td :class="{loading4:item.loading4}">
            <span @click="getBackLink(item.url,index)">{{item.cx4}}</span>
            <b>{{item.noLink}}</b>
            {{item.cxjg4}}
            <i></i>
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
  name: "FriendLink",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "友链检测",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      baiduSl: "",
      baiduSy: "",
      baiduposition: "",
      prValue: "-",
      ggPr: "",
      baiduRank: "",
      list: ""
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getAll();
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
    getSuoyin() {
      return this.$http
        .get("/Api/seo/shoulu1", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.baiduSl = res.data.baidu ? res.data.baidu : "-";
          this.baiduSy = res.data.baiduindex ? res.data.baiduindex : "-";
          this.baiduposition = res.data.baiduposition
            ? res.data.baiduposition
            : "-";
        })
        .catch(err => {
          console.log(err);
        });
    },
    getPrGoogle() {
      return this.$http
        .get("/Api/seo/pr_google", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.ggPr = res.data.pr;
          this.prValue = res.data.value;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getBaiduRank() {
      return this.$http
        .get("/Api/seo/baidurank", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.baiduRank = res.data.baiduRank;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getSuoyinDetail(domain, idx) {
      this.list[idx].loading1 = true;
      return this.$http
        .get("/Api/seo/shoulu1", {
          params: {
            domain: domain
          }
        })
        .then(res => {
          if (!res.data.baidu) {
            this.list[idx].cx1 = "重测";
          } else {
            this.list[idx].cx1 = "";
            this.list[idx].cxjg1 = res.data.baidu;
          }
          this.list[idx].loading1 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
        })
        .catch(err => {
          console.log(err);
          this.list[idx].loading1 = false;
        });
    },
    getBaiduRankDetail(domain, idx) {
      this.list[idx].loading2 = true;
      return this.$http
        .get("/Api/seo/baidurank", {
          params: {
            domain: domain
          }
        })
        .then(res => {
          if (!res.data.avg_ip) {
            this.list[idx].cx2 = "重测";
          } else {
            this.list[idx].cx2 = "";
            this.list[idx].cxjg2 = res.data.avg_ip;
            this.list[idx].cxjgN2 = "/" + res.data.BR;
          }
          this.list[idx].loading2 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
        })
        .catch(res => {
          console.log(res.msg);
          this.list[idx].loading2 = false;
        });
    },
    getPrGoogleDetail(domain, idx) {
      this.list[idx].loading3 = true;
      return this.$http
        .get("/Api/seo/pr_google", {
          params: {
            domain: domain
          }
        })
        .then(res => {
          if (!res.data.value) {
            this.list[idx].cx3 = "重测";
          } else {
            this.list[idx].cx3 = "";
            this.list[idx].cxjg3 = res.data.pr;
            this.list[idx].cxjgN3 = "/" + res.data.value;
          }
          this.list[idx].loading3 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
        })
        .catch(res => {
          console.log(res.msg);
          this.list[idx].loading3 = false;
        });
    },
    getBackLink(url, idx) {
      this.list[idx].loading4 = true;
      return this.$http
        .get("/Api/seo/backlink", {
          params: {
            domain: this.content,
            url: url
          }
        })
        .then(res => {
          console.log(res);
          if (!res.data.mapLink && !res.data.linkOther && res.data.sum) {
            this.list[idx].cx4 = "";
            this.list[idx].noLink = "首页无本站链接";
            this.list[idx].cxjg4 = "外链数:"+res.data.sum;
          }
          this.list[idx].loading4 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
        })
        .catch(res => {
          console.log(res.msg);
          this.list[idx].loading4 = false;
        });
    },
    getLinkInfo() {
      return this.$http
        .get("/Api/pageinfo/getLinkInfo", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          let Res = JSON.parse(JSON.stringify(res));
          this.list = res.data.list;
          for (let i in this.list) {
            this.list[i].url = encodeURIComponent(this.list[i].url);
            this.list[i].cx1 = "重测";
            this.list[i].cx2 = "重测";
            this.list[i].cx3 = "重测";
            this.list[i].cx4 = "重测";
            this.list[i].cxjg1 = "";
            this.list[i].cxjg2 = "";
            this.list[i].cxjg3 = "";
            this.list[i].cxjg4 = "";
            this.list[i].cxjgN2 = "";
            this.list[i].cxjgN3 = "";
            this.list[i].loading1 = false;
            this.list[i].loading2 = false;
            this.list[i].loading3 = false;
            this.list[i].loading4 = false;
            this.list[i].noLink = "";
          }
          return Res;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getAll() {
      this.bus.$emit("loading", true);
      this.$http
        .all([this.getSuoyin(), this.getBaiduRank(), this.getPrGoogle()])
        .then(
          this.$http.spread((acct, perms) => {
            this.getLinkInfo().then(res => {
              this.bus.$emit("loading", false);
              for (let i = 0; i < res.data.list.length; i++) {
                this.getSuoyinDetail(res.data.list[i].domain, i);
                this.getBaiduRankDetail(res.data.list[i].domain, i);
                this.getPrGoogleDetail(res.data.list[i].domain, i);
              }
            });
          })
        );
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getAll();
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
  span {
    font-size: 18px;
    color: #666;
    i {
      color: #ff3838;
    }
  }
}
.title_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  tr {
    td {
      height: 60px;
      border-left: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      padding-left: 40px;
      position: relative;
      span {
        color: #fff;
        position: absolute;
        left: 76px;
      }
    }
    td:first-child,
    td:nth-child(3) {
      color: #808080;
      background: #fafafa;
      width: 20%;
    }
    td:last-child,
    td:nth-child(2) {
      border-left: none;
    }
    .color_red {
      color: #ff3838;
    }
  }
}
.link_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  margin-top: 20px;
  tr {
    td {
      height: 60px;
      border-left: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      text-align: center;
    }
    td:first-child {
      color: #ff9e40;
    }
  }
  tr:first-child {
    td {
      color: #808080;
      background: #fafafa;
    }
  }
}
.ip_main_table {
  font-size: 16px;
  border: 1px solid #ebebeb;
  margin-top: 20px;
  border-bottom: none;
  i {
    display: none;
    width: 100%;
    height: 100%;
    background: url(../../assets/loading.gif) no-repeat center center;
  }
  tr {
    td {
      height: 60px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;
      padding-right: 10px;
      span {
        color: #ff9e40;
        cursor: pointer;
        a {
          color: #ff9e40;
        }
      }
      b {
        font-weight: normal;
      }
    }
    .loading1,
    .loading2,
    .loading3 {
      i {
        display: block;
      }
      span {
        display: none;
      }
    }
    .loading4 {
      i {
        display: block;
        background-position: center left;
      }
      span {
        display: none;
      }
    }
    td:first-child {
      width: 100px;
    }
    td:last-child,
    :nth-child(2) {
      text-align: left;
      p:last-child {
        font-size: 12px;
        color: #999;
      }
      b {
        color: #f05955;
        font-weight: normal;
      }
    }
  }
  tr:first-child {
    td {
      background: #fafafa;
      color: #666;
    }
  }
  tr:first-child {
    td {
      i {
        width: 18px;
        height: 18px;
        display: inline-block;
        background-image: url(../../assets/gray_up.png);
        vertical-align: middle;
      }
      .blue_down {
        background-image: url(../../assets/blue_down.png);
      }
      .red_up {
        background-image: url(../../assets/red_up.png);
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
