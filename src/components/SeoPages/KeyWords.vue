<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <h1 class="websiteValue_banner_title2">{{title}}</h1>
        <div class="websiteValue_banner_input">
          <form @submit.prevent>
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
      </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="cha_default" v-show="nothing">未找到相关关键词</div>
    <div class="main_content" v-if="!content==''" v-show="!nothing">
      <div class="content_title">查询结果</div>
      <table class="ip_main_table" width="1200px">
        <thead :class="fixed?'fix_top':''">
          <tr :class="fixed?'fix_abt':''">
            <td>序号</td>
            <td>关键词</td>
            <td>PC/移动</td>
            <td>收录数</td>
            <td>首页第1位</td>
            <td>首页第2位</td>
            <td>优化难度</td>
          </tr>
        </thead>
        <tr v-for="(item,index) in list">
          <td>{{index+1}}</td>
          <td v-html="highLight[index]"></td>
          <td v-html="item.ips"></td>
          <td>{{item.shoulu}}</td>
          <td>
            <a rel="nofollow" target="_blank" :href="'http://'+item.page1_site">
              <p>{{item.page1_site}}</p>
              <p>{{item.page1_title|ellipsis}}</p>
            </a>
          </td>
          <td>
            <a rel="nofollow" target="_blank" :href="'http://'+item.page2_site">
              <p>{{item.page2_site}}</p>
              <p>{{item.page2_title|ellipsis}}</p>
            </a>
          </td>
          <td class="level">
            <span>
              <span :class="item.c?item.c:'l0'"></span>
            </span>
          </td>
        </tr>
      </table>
      <div class="adv_box">
        <a v-for="advs in advpic" target="_blank" href="http://www.baidu.com">
          <img :src="require(`../../assets/${advs}.png`)" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "KeyWords",
  data() {
    return {
      title: "关键词挖掘",
      nothing: false,
      content: "",
      SeoContent: "",
      list: "",
      fixed: false,
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getList() {
      this.content = this.SeoContent;
      this.$router.replace({
        name: "KeyWords",
        params: { domain: this.encode_unicode_param(this.content) }
      });
      let storage = window.sessionStorage;
      storage.setItem("searchContent", this.content);
      this.getKeyWords();
    },
    encode_unicode_param(t) {
      for (var e = "", a = 0; a < t.length; a++) {
        var i = t.charCodeAt(a).toString(16);
        2 == i.length ? (e += "n" + i) : (e += i);
      }
      return e;
    },
    handleScroll() {
      setTimeout(() => {
        var scrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        var offsetTop = document.querySelector(".ip_main_table").offsetTop;
        if (scrollTop >= offsetTop) {
          this.fixed = true;
        } else {
          this.fixed = false;
        }
      }, 800);
    },
    getKeyWords() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/pageinfo/getKeywordsInfo", {
          params: {
            word: this.encode_unicode_param(this.content)
          }
        })
        .then(res => {
          if (res.code == 3 || res.data == null || res.data.length == 0) {
            this.nothing = true;
          } else {
            this.nothing = false;
            this.list = res.data;
          }
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    }
  },
  computed: {
    highLight() {
      let titleString = [];
      for (let i in this.list) {
        titleString.push(this.list[i].word);
      }
      if (!titleString) {
        return "";
      }
      if (this.content) {
        var result = [];
        let replaceReg = new RegExp(this.content, "g");
        let replaceString =
          "<span class='key_highlight'>" + this.content + "</span>";
        for (let i in titleString) {
          result.push(titleString[i].replace(replaceReg, replaceString));
        }
      }
      return result;
    }
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 20) {
        return value.slice(0, 18) + "...";
      }
      return value;
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getKeyWords();
    }
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
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
  font-weight: normal;
}
.websiteValue_banner_input1 {
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: none;
  outline: none;
  text-indent: 20px;
}
.websiteValue_banner_input {
  position: relative;
  margin-top: 28px;
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
}
.websiteValue_banner_ul_title {
  float: left;
}
.websiteValue_banner_ul a:hover {
  color: #007bb7;
}
.websiteValue_banner_ul a {
  cursor: pointer;
}
.main_content {
  width: 1200px;
  margin: 0 auto;
}

.content_title {
  font-size: 24px;
  margin: 60px 0 30px 0;
}

.ip_main_table {
  font-size: 16px;
  border: 1px solid #ebebeb;
  margin-top: 20px;
  border-bottom: none;

  tr {
    td {
      height: 60px;
      padding-right: 10px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;

      p:last-child {
        font-size: 12px;
        color: #999;
      }
    }

    .level {
      span {
        display: inline-block;
        position: relative;
        width: 60px;
        height: 6px;
        vertical-align: middle;
        background: #eee;
        border-radius: 10px;

        span {
          position: absolute;
          top: 0;
          left: 0;
        }

        .l0 {
          width: 0;
        }

        .l1 {
          width: 19%;
          background: #55b7f0;
        }

        .l2 {
          width: 30%;
          background: #4bd955;
        }

        .l3 {
          width: 55%;
          background: #fcbf4a;
        }

        .l4 {
          width: 80%;
          background: #f05955;
        }
        .l5 {
          width: 100%;
          background: #f05955;
        }
      }
    }
    td:first-child,
    td:last-child {
      width: 80px;
    }

    td:nth-child(2) {
      text-align: left;
      padding-left: 20px;
      width: 210px;
    }
    td:nth-child(3) {
      width: 130px;
    }
    td:nth-child(4) {
      width: 90px;
    }
    td:nth-child(5),
    td:nth-child(6) {
      text-align: left;
      width: 252px;
    }
  }

  .fix_top {
    position: fixed;
    top: 0;
    z-index: 99;
    td {
      border: none;
    }
    td:nth-child(4) {
      width: 100px;
    }
    td:nth-child(5) {
      width: 257px;
    }
    .fix_abt {
      position: absolute;
      width: 1200px;
    }
  }

  tr:first-child {
    td {
      background: #fafafa;
      color: #666;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 50px 0;
}
</style>
