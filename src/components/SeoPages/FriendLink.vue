<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title"></div>
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
        </tr>
        <tr>
          <td>出站链接：{{out}}</td>
          <td>{{img}}</td>
          <td>{{text}}</td>
        </tr>
        <tr>
          <td>反向链接：{{deserveLink}}</td>
          <td>{{picLink}}</td>
          <td>{{wordLink}}</td>
        </tr>
      </table>
      <div class="content_title">
        检测结果：
        <span>
          出站链接中有
          <i>{{ourLink}}个</i> 没有本站链接
          <img v-show="!finish" src="../../assets/loading_detail.gif" alt />
        </span>
      </div>
      <table class="ip_main_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>站点</td>
          <td class="pt" @click="changedirection('0')">
            百度收录
            <i :class="{blue_down:Sdirection==0,red_up:Sdirection==1}"></i>
          </td>
          <td class="pt" @click="changedirection('1')">
            百度预计流量/权重
            <i :class="{blue_down:Rdirection==0,red_up:Rdirection==1}"></i>
          </td>
          <td class="pt" @click="changedirection('2')">
            PR/输出值
            <i :class="{blue_down:Pdirection==0,red_up:Pdirection==1}"></i>
          </td>
          <td class="pt">
            对方友链情况
            <i class="nothing"></i>
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
            <i></i>
          </td>
          <td :class="{loading3:item.loading3}">
            <span @click="getPrGoogleDetail(item.domain,index)">{{item.cx3}}</span>
            {{item.cxjg3}}
            <i></i>
          </td>
          <td :class="{loading4:item.loading4}">
            <span @click="getBackLink(item.url,index)">{{item.cx4}}</span>
            <b>{{item.noLink}}</b>
            <span class="no_cursor">
              {{item.hasLink}}
              <a
                v-for="link in item.links"
                target="_blank"
                :href="link.link"
              >{{link.linkTitle}}</a>
            </span>
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
      list: "",
      ourLink: 0,
      deserveLink: 0,
      picLink: 0,
      wordLink: 0,
      finish: false,
      Sdirection: 3,
      Rdirection: 3,
      Pdirection: 3,
      Fdirection: 3,
      out: "",
      img: "",
      text: ""
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getAll();
      (this.Sdirection = 3),
        (this.Rdirection = 3),
        (this.Pdirection = 3),
        (this.Fdirection = 3);
    },
    searchHot(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getAll();
    },
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.getAll();
      window.scrollTo(0, 0);
    },
    sortKey(array, key) {
      return array.sort((a, b) => {
        var x = a[key].replace(/,/g, "") * 1;
        var y = b[key].replace(/,/g, "") * 1;
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    sortKey2(array, key) {
      return array.sort((a, b) => {
        var reg = /([/][^/]+)$/;
        var x = a[key].replace(reg, "") * 1;
        var y = b[key].replace(reg, "") * 1;
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    changedirection(idx) {
      if (!this.finish) {
        alert("数据未加载完全，请稍候！");
      } else {
        var arr = JSON.parse(JSON.stringify(this.list));
        if (idx == "0") {
          this.Pdirection = 3;
          this.Rdirection = 3;
          if (this.Sdirection == 0) {
            this.Sdirection = 1;
            this.sortKey(arr, "cxjg1");
          } else {
            this.Sdirection = 0;
            this.sortKey(arr, "cxjg1").reverse();
          }
        }
        if (idx == "1") {
          this.Sdirection = 3;
          this.Pdirection = 3;
          if (this.Rdirection == 0) {
            this.Rdirection = 1;
            this.sortKey2(arr, "cxjg2");
          } else {
            this.Rdirection = 0;
            this.sortKey2(arr, "cxjg2").reverse();
          }
        }
        if (idx == "2") {
          this.Sdirection = 3;
          this.Rdirection = 3;
          if (this.Pdirection == 0) {
            this.Pdirection = 1;
            this.sortKey2(arr, "cxjg3");
          } else {
            this.Pdirection = 0;
            this.sortKey2(arr, "cxjg3").reverse();
          }
        }
        this.list = arr;
      }
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
    getSuoyinDetail2(cur, i) {
      if (cur <= i) {
        return;
      }
      this.$http
        .get("/Api/seo/shoulu1", {
          params: {
            domain: this.list[i].domain
          }
        })
        .then(res => {
          if (!res.data.baidu) {
            this.list[i].cx1 = "重测";
          } else {
            this.list[i].cx1 = "";
            this.list[i].cxjg1 = res.data.baidu;
          }
          this.list[i].loading1 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
          i++;
          this.getSuoyinDetail2(cur, i);
        })
        .catch(err => {
          console.log(err);
          this.list[i].loading1 = false;
          i++;
          this.getSuoyinDetail2(cur, i);
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
            this.list[idx].cxjg2 = res.data.avg_ip + "/" + res.data.BR;
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
    getBaiduRankDetail2(cur, i) {
      if (cur <= i) {
        return;
      }
      this.$http
        .get("/Api/seo/baidurank", {
          params: {
            domain: this.list[i].domain
          }
        })
        .then(res => {
          if (!res.data.avg_ip) {
            this.list[i].cx2 = "重测";
          } else {
            this.list[i].cx2 = "";
            this.list[i].cxjg2 = res.data.avg_ip + "/" + res.data.BR;
          }
          this.list[i].loading2 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
          i++;
          this.getBaiduRankDetail2(cur, i);
        })
        .catch(res => {
          console.log(res.msg);
          this.list[i].loading2 = false;
          i++;
          this.getBaiduRankDetail2(cur, i);
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
            this.list[idx].cxjg3 = res.data.pr + "/" + res.data.value;
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
    getPrGoogleDetail2(cur, i) {
      if (cur <= i) {
        return;
      }
      this.$http
        .get("/Api/seo/pr_google", {
          params: {
            domain: this.list[i].domain
          }
        })
        .then(res => {
          if (!res.data.value) {
            this.list[i].cx3 = "重测";
          } else {
            this.list[i].cx3 = "";
            this.list[i].cxjg3 = res.data.pr + "/" + res.data.value;
          }
          this.list[i].loading3 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
          i++;
          this.getPrGoogleDetail2(cur, i);
        })
        .catch(res => {
          console.log(res.msg);
          this.list[i].loading3 = false;
          i++;
          this.getPrGoogleDetail2(cur, i);
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
          if (!res.data.mapLink && !res.data.linkOther && !res.data.error) {
            this.list[idx].cx4 = "";
            this.list[idx].noLink = "首页无本站链接!";
            this.list[idx].cxjg4 = "外链数:" + res.data.sum;
            this.ourLink++;
          }
          if (res.data.mapLink && res.data.position && !res.data.linkOther) {
            this.list[idx].cx4 = "";
            this.list[idx].cxjg4 =
              "位置/外链数：" + res.data.position + "/" + res.data.sum;
            this.list[idx].hasLink = "链接：";
            this.list[idx].link = res.data.mapLink;
            this.list[idx].linkTitle = res.data.mapVal;
            this.wordLink++;
            this.deserveLink++;
          }
          if (res.data.linkOther) {
            if (res.data.mapVal) {
              this.list[idx].hasLink = "链接：";
            } else {
              this.list[idx].hasLink = "非首页链接：";
            }
            this.list[idx].cx4 = "";
            this.list[idx].cxjg4 = "外链数：" + res.data.sum;
            this.list[idx].links = [];
            for (let i in res.data.linkOther) {
              this.list[idx].links.push(res.data.linkOther[i]);
            }
            this.list[idx].links = this.list[idx].links.map(item => ({
              link: item
            }));
            for (let i in this.list[idx].links) {
              this.list[idx].links[i].linkTitle = res.data.linkOtherVal[i];
              if (
                res.data.linkOtherVal[i] == "图片链接" ||
                res.data.mapVal == "图片链接"
              ) {
                this.list[idx].links[i].linkTitle = "图片链接";
                this.picLink++;
                this.deserveLink++;
              } else {
                this.wordLink++;
                this.deserveLink++;
              }
            }
          }
          if (res.data.error) {
            this.list[idx].cx4 = "重测";
          }
          this.list[idx].loading4 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
          var result = this.list.some(item => {
            if (item.loading4 == true) {
              return true;
            }
          });
          if (!result) {
            this.finish = true;
          }
        })
        .catch(res => {
          console.log(res.msg);
          this.list[idx].loading4 = false;
        });
    },
    getBackLink2(cur, idx) {
      if (cur <= idx) {
        return;
      }
      this.$http
        .get("/Api/seo/backlink", {
          params: {
            domain: this.content,
            url: encodeURIComponent(this.list[idx].url)
          }
        })
        .then(res => {
          if (!res.data.mapLink && !res.data.linkOther && !res.data.error) {
            this.list[idx].cx4 = "";
            this.list[idx].noLink = "首页无本站链接!";
            this.list[idx].cxjg4 = "外链数:" + res.data.sum;
            this.ourLink++;
          }
          if (res.data.mapLink && res.data.position && !res.data.linkOther) {
            this.list[idx].cx4 = "";
            this.list[idx].cxjg4 =
              "位置/外链数：" + res.data.position + "/" + res.data.sum;
            this.list[idx].hasLink = "链接：";
            this.list[idx].link = res.data.mapLink;
            this.list[idx].linkTitle = res.data.mapVal;
            this.wordLink++;
            this.deserveLink++;
          }
          if (res.data.linkOther) {
            if (res.data.mapVal) {
              this.list[idx].hasLink = "链接：";
            } else {
              this.list[idx].hasLink = "非首页链接：";
            }
            this.list[idx].cx4 = "";
            this.list[idx].cxjg4 = "外链数：" + res.data.sum;
            this.list[idx].links = [];
            for (let i in res.data.linkOther) {
              this.list[idx].links.push(res.data.linkOther[i]);
            }
            this.list[idx].links = this.list[idx].links.map(item => ({
              link: item
            }));
            for (let i in this.list[idx].links) {
              this.list[idx].links[i].linkTitle = res.data.linkOtherVal[i];
              if (
                res.data.linkOtherVal[i] == "图片链接" ||
                res.data.mapVal == "图片链接"
              ) {
                this.list[idx].links[i].linkTitle = "图片链接";
                this.picLink++;
                this.deserveLink++;
              } else {
                this.wordLink++;
                this.deserveLink++;
              }
            }
          }
          if (res.data.error) {
            this.list[idx].cx4 = "重测";
          }
          this.list[idx].loading4 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
          var result = this.list.some(item => {
            if (item.loading4 == true) {
              return true;
            }
          });
          if (!result) {
            this.finish = true;
          }
          idx++;
          this.getBackLink2(cur, idx);
        })
        .catch(res => {
          console.log(res.msg);
          this.list[idx].loading4 = false;
          idx++;
          this.getBackLink2(cur, idx);
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
          this.out = res.data.url.out ? res.data.url.out : "-";
          this.img = res.data.url.img ? res.data.url.img : "-";
          this.text = res.data.url.text ? res.data.url.text : "-";
          this.deserveLink = 0;
          this.ourLink = 0;
          this.picLink = 0;
          this.wordLink = 0;
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
            this.list[i].loading1 = true;
            this.list[i].loading2 = true;
            this.list[i].loading3 = true;
            this.list[i].loading4 = true;
            this.list[i].noLink = "";
            this.list[i].hasLink = "";
            this.list[i].links = "";
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
              let curIndex = res.data.list.length;
              this.getSuoyinDetail2(curIndex, 0);
              this.getBaiduRankDetail2(curIndex, 0);
              this.getPrGoogleDetail2(curIndex, 0);
              this.getBackLink2(curIndex, 0);
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
  img {
    width: 50px;
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
          margin-right: 8px;
        }
        a:hover {
          text-decoration: underline;
        }
      }
      .no_cursor {
        cursor: auto;
      }
      b {
        font-weight: normal;
      }
    }
    .pt {
      cursor: pointer;
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
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
      max-width: 300px;
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
      .nothing {
        display: none;
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
