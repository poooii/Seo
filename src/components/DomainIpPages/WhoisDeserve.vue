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
            >
            <input type="button">
            <img
              @click="getList"
              src="../../assets/websiteValue-search.png"
              alt
              class="websiteValue-search"
            >
          </form>
        </div>
      </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">
        查询结果：
        <span>
          共有链接
          <i class="alive">498</i> 个；死链接
          <i class="dead">214</i> 个 检测完成
        </span>
      </div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>域名</td>
          <td>注册人</td>
          <td>邮箱</td>
          <td>BR</td>
          <td>PR</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a>
          </td>
          <td>马云</td>
          <td>
            <a href="javascript:void(0);">sjjh@163.com</a>
          </td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
            <span>0</span>
          </td>
          <td>
            <img src="../../assets/gg_wt.png" alt>
            <span>0</span>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a>
          </td>
          <td>马云</td>
          <td>
            <a href="javascript:void(0);">sjjh@163.com</a>
          </td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
            <span>0</span>
          </td>
          <td>
            <img src="../../assets/gg_wt.png" alt>
            <span>0</span>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a>
          </td>
          <td>马云</td>
          <td>
            <a href="javascript:void(0);">sjjh@163.com</a>
          </td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
            <span>0</span>
          </td>
          <td>
            <img src="../../assets/gg_wt.png" alt>
            <span>0</span>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a>
          </td>
          <td>马云</td>
          <td>
            <a href="javascript:void(0);">sjjh@163.com</a>
          </td>
          <td>
            <img src="../../assets/bd_wt.png" alt>
            <span>0</span>
          </td>
          <td>
            <img src="../../assets/gg_wt.png" alt>
            <span>0</span>
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
      downList: [
        {
          name: "通过注册人",
          idx: "0"
        },
        {
          name: "通过邮箱",
          idx: "1"
        }
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
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    storage.setItem("navIndex", "3");
    window.scrollTo(0, 0);
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
      }
      span {
        position: absolute;
        top: 17px;
        left: 63px;
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
