<template>
  <div @click="hideSearchBox">
    <!-- 头部 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">域名被封</p>
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
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>状态</td>
        </tr>
        <tr>
          <td>1</td>
          <td>{{content}}</td>
          <td class="normal">域名正常</td>
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
  name: "DomainNameSealed",
  components: {
    NearlySearch
  },
  data() {
    return {
      searchIdx: "0",
      SeoContent: "",
      downList: [
        {
          name: "域名检测",
          idx: "0"
        },
        {
          name: "qq域名检测",
          idx: "1"
        },
        {
          name: "微信域名检测",
          idx: "2"
        }
      ],
      advpic: ["adv1", "adv3", "adv2"],
      content: "",
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
      this.searchIdx = 0;
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
      this.doGet();
    },
    doGet() {
      this.bus.$emit("loading", true);
      setTimeout(() => {
        this.bus.$emit("loading", false);
      }, 1500);
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    storage.setItem("navIndex", "3");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.doGet();
    }
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
  }
}
.link_table {
  border: 1px solid #ebebeb;
  border-bottom: none;
  tr {
    td {
      min-width: 100px;
      height: 60px;
      text-align: center;
      font-size: 16px;
      border-bottom: 1px solid #ebebeb;
      position: relative;
    }
    td:nth-child(2) {
      text-align: left;
      padding-left: 100px;
    }
    td:first-child {
      width: 100px;
    }
    .sealed {
      color: #ff3838;
    }
    .normal {
      color: #63c85e;
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
