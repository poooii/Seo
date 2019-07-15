<template>
  <div @click="hideSearchBox">
    <!-- 头部 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">死链接检测</p>
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
    <div class="cha_default" v-show="noLink">未检测到友链</div>
    <div class="main_content" v-if="!content==''" v-show="!noLink">
      <div class="content_title">
        查询结果：
        <span>
          共有链接
          <i class="alive">{{d_len}}</i> 个；死链接
          <i class="dead">{{deadLink}}</i> 个
          <img v-show="finish" src="../../assets/loading_detail.gif" />
        </span>
      </div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>链接信息</td>
          <td>网站标题</td>
          <td>状态</td>
        </tr>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td>
            <a target="_blank" :href="item.url">{{item.url}}</a>
          </td>
          <td>{{item.tilte}}</td>
          <td :class="{loading:item.loading,alive:true}">
            <span @click="getStatus(item.url,index)">{{item.cx}}</span>
            {{item.cxjg}}
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
  name: "DeadLink",
  components: {
    NearlySearch
  },
  data() {
    return {
      searchIdx: "0",
      SeoContent: "",
      advpic: ["adv1", "adv3", "adv2"],
      content: "",
      showViews: "0",
      noLink: false,
      finish: false,
      deadLink: 0,
      list: "",
      d_len: 0,
      downList: [
        {
          name: "所有链接",
          idx: "0"
        },
        {
          name: "站内链接",
          idx: "1"
        },
        {
          name: "站外链接",
          idx: "2"
        }
      ],
      hotsearch: [
        "po188.com",
        "www.hj135.com",
        "jiaofu.cn",
        "riyiseo.com",
        "shuadan.cn",
        "caoping6s.cn",
        "014121.cn"
      ]
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
    searchHot(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.SeoContent = storage.searchContent;
      this.content = storage.searchContent;
    },
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.SeoContent = storage.searchContent;
      this.showViews = 0;
      window.scrollTo(0, 0);
    },
    getList() {
      let netReg =
        "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$";
      let netRe = new RegExp(netReg);
      if (!netRe.test(this.SeoContent)) {
        alert("请输入正确域名,域名不包括(http://以及https://)");
        return false;
      }
      this.content = this.SeoContent;
      this.showViews = this.downList[0].idx;
      let storage = window.sessionStorage;
      storage.setItem("searchContent", this.content);
      this.deadLink = 0;
      this.getDLinkInfo();
    },
    encode_unicode_param(t) {
      for (var e = "", a = 0; a < t.length; a++) {
        var i = t.charCodeAt(a).toString(16);
        2 == i.length ? (e += "n" + i) : (e += i);
      }
      return e;
    },
    getDLinkInfo() {
      this.bus.$emit("loading", true);
      this.finish = true;
      return this.$http
        .get("/Api/pageinfo/getDLinkInfo", {
          params: {
            domain:
              this.encode_unicode_param(this.content) +
              "_" +
              this.showViews +
              "_1"
          }
        })
        .then(res => {
          if (res.data == null || res.data.length == 0) {
            this.noLink = true;
          } else {
            this.noLink = false;
            this.list = res.data;
            this.d_len = this.list.length ? this.list.length : 0;
          }
          for (let i in this.list) {
            this.list[i].cx = "重查";
            this.list[i].cxjg = "";
            this.list[i].loading = true;
          }
          this.bus.$emit("loading", false);
          let curIndex = this.list.length ? this.list.length : 0;
          this.getStatus2(curIndex, 0);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    },
    getStatus(domain, idx) {
      this.list[idx].loading = true;
      let newList = JSON.parse(JSON.stringify(this.list));
      this.list = newList;
      return this.$http
        .get("/Api/pageinfo/getDLinkStatus", {
          params: {
            domain: domain
          }
        })
        .then(res => {
          if (res.data.linkbad == "0") {
            this.list[idx].cx = "";
            this.list[idx].cxjg = "正常";
          } else {
            this.list[idx].cx = "重查";
            this.list[idx].cxjg = "";
          }
          this.list[idx].loading = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getStatus2(cur, i) {
      if (cur <= i) {
        this.finish = false;
        return;
      }
      this.$http
        .get("/Api/pageinfo/getDLinkStatus", {
          params: {
            domain: this.list[i].url
          }
        })
        .then(res => {
          if (res.data.linkbad == "0") {
            this.list[i].cx = "";
            this.list[i].cxjg = "正常";
          } else {
            this.list[i].cx = "重查";
            this.list[i].cxjg = "";
          }
          if (res.data.linkbad == "1") {
            this.deadLink++;
          }
          this.list[i].loading = false;
          let newList = JSON.parse(JSON.stringify(this.list));
          this.list = newList;
          i++;
          this.getStatus2(cur, i);
        })
        .catch(res => {
          console.log(res.msg);
          this.list[i].loading = false;
          i++;
          this.getStatus2(cur, i);
        });
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    storage.setItem("navIndex", "2");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getDLinkInfo();
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
    img {
      width: 60px;
    }
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
      a {
        color: #007bb7;
      }
      span {
        color: #ff3838;
        cursor: pointer;
      }
    }
    .loading {
      i {
        display: block;
      }
      span {
        display: none;
      }
    }
    .alive {
      color: #00b35d;
    }
    td:nth-child(2) {
      text-align: left;
    }
    td:first-child {
      width: 100px;
      padding-right: 40px;
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
  margin: 30px 0 50px 0;
}
</style>
