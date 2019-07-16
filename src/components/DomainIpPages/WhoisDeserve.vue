<template>
  <div @click="hideSearchBox">
    <!-- 头部 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">Whois反查</p>
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
              placeholder="输入想要查询价格的域名"
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
      </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="cha_default" v-show="noResult">未查询到结果</div>
    <div class="main_content" v-if="!content==''" v-show="!noResult">
      <div class="content_title">查询结果：</div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>注册人</td>
          <td>邮箱</td>
          <td>BR</td>
          <td>PR</td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td>
            <a :href="'http://'+item.site">{{item.site}}</a>
          </td>
          <td>{{item.phone}}</td>
          <td>
            <img :src="item.email" alt />
          </td>
          <td :class="{loading1:item.loading1}">
            <img v-show="!item.noBrResult" src="../../assets/bd_wt.png" alt />
            <span v-show="!item.noBrResult">{{item.cxjg1}}</span>
            <a @click="getBaiduRankDetail(list.length,index,false)" v-show="item.noBrResult">重测</a>
            <i></i>
          </td>
          <td :class="{loading2:item.loading2}">
            <img v-show="!item.noPrResult" src="../../assets/gg_wt.png" alt />
            <span v-show="!item.noPrResult">{{item.cxjg2}}</span>
            <a @click="getPrGoogleDetail(list.length,index,false)" v-show="item.noPrResult">重测</a>
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
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
  name: "WhoisDeserve",
  components: {
    NearlySearch
  },
  data() {
    return {
      searchIdx: "0",
      SeoContent: "",
      showViews: "0",
      list: "",
      noResult: false,
      downList: [
        {
          name: "通过注册人",
          idx: "0"
        }
        // {
        //   name: "通过邮箱",
        //   idx: "1"
        // }
      ],
      advpic: ["adv1", "adv3", "adv2"],
      content: ""
    };
  },
  methods: {
    changeSearch(index) {
      if (this.searchIdx == index) {
        this.searchIdx = undefined;
      } else {
        let str = this.downList.splice(index, 1);
        this.downList.unshift(str[0]);
        this.searchIdx = 0;
      }
    },
    hideSearchBox() {
      if (this.searchIdx == undefined) {
        this.searchIdx = 0;
      }
    },
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.SeoContent = storage.searchContent;
      this.searchIdx = 0;
      window.scrollTo(0, 0);
    },
    getList() {
      this.content = this.SeoContent;
      this.showViews = this.downList[0].idx;
      let storage = window.sessionStorage;
      storage.setItem("searchContent", this.content);
      if (this.showViews == "0") {
        this.getRWhois();
      }
    },
    getRWhois() {
      this.$http
        .get("/Api/pageinfo/getRWhoisInfo", {
          params: {
            t: "registrant",
            q: this.content
          }
        })
        .then(res => {
          if (res.data.length == 0 || res.data == null) {
            this.noResult = true;
          } else {
            this.list = res.data;
            for (let i in this.list) {
              this.list[i].loading1 = true;
              this.list[i].loading2 = true;
              this.list[i].cxjg1 = "";
              this.list[i].cxjg2 = "";
            }
            this.noResult = false;
          }
          let curIndex = res.data.length;
          this.getBaiduRankDetail(curIndex, 0, true);
          this.getPrGoogleDetail(curIndex, 0, true);
        })
        .catch(res => {
          console.log(res.msg);
          this.noResult = true;
        });
    },
    getBaiduRankDetail(cur, i, goOn) {
      if (cur <= i) {
        return;
      }
      this.list[i].loading1 = true;
      let newList1 = JSON.parse(JSON.stringify(this.list));
      this.list = newList1;
      this.$http
        .get("/Api/seo/baidurank", {
          params: {
            domain: this.list[i].site
          }
        })
        .then(res => {
          if (res.data == null || res.data.length == 0) {
            this.list[i].noBrResult = true;
          } else {
            this.list[i].noBrResult = false;
            this.list[i].cxjg1 = res.data.BR;
          }
          this.list[i].loading1 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
          if (goOn) {
            i++;
            this.getBaiduRankDetail(cur, i, goOn);
          }
        })
        .catch(res => {
          console.log(res.msg);
          this.list[i].loading1 = false;
          if (goOn) {
            i++;
            this.getBaiduRankDetail(cur, i, goOn);
          }
        });
    },
    getPrGoogleDetail(cur, i, goOn) {
      if (cur <= i) {
        return;
      }
      this.list[i].loading2 = true;
      let newList1 = JSON.parse(JSON.stringify(this.list));
      this.list = newList1;
      this.$http
        .get("/Api/seo/pr_google", {
          params: {
            domain: this.list[i].site
          }
        })
        .then(res => {
          if (res.data == null || res.data.length == 0) {
            this.list[i].noPrResult = true;
          } else {
            this.list[i].noPrResult = false;
            this.list[i].cxjg2 = res.data.pr;
          }
          this.list[i].loading2 = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
          if (goOn) {
            i++;
            this.getPrGoogleDetail(cur, i, goOn);
          }
        })
        .catch(res => {
          console.log(res.msg);
          this.list[i].loading2 = false;
          if (goOn) {
            i++;
            this.getPrGoogleDetail(cur, i, goOn);
          }
        });
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    storage.setItem("navIndex", "3");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getRWhois();
    }
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
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
      font-size: 14px;
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
  .content_title {
    font-size: 24px;
    color: #333;
    margin: 60px 0 35px 0;
    span {
      font-size: 18px;
      color: #666;
      .alive {
        color: #00b35d;
      }
      .dead {
        color: #ff3838;
      }
    }
  }
}
.link_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  i {
    display: none;
    width: 100%;
    height: 100%;
    background: url(../../assets/loading.gif) no-repeat center center;
  }
  tr {
    td {
      min-width: 100px;
      height: 60px;
      text-align: center;
      font-size: 16px;
      border-bottom: 1px solid #ebebeb;
      position: relative;
      a {
        color: #007bb7;
        cursor: pointer;
      }
      span {
        position: absolute;
        top: 17px;
        left: 74px;
        color: #fff;
      }
    }
    td:nth-child(2),
    td:nth-child(4) {
      text-align: left;
      min-width: 200px;
      padding-left: 60px;
    }
    td:first-child {
      width: 100px;
    }
    .loading1,
    .loading2 {
      i {
        display: block;
      }
      span {
        display: none;
      }
      img {
        display: none;
      }
      a {
        display: none;
      }
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
  margin: 100px 0 50px 0;
}
</style>
