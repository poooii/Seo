<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">{{title}}</p>
        <div class="websiteValue_banner_input">
          <form @submit.prevent>
            <input
              @keyup.enter="getList"
              v-model="S_SeoContent"
              type="text"
              placeholder="请输入网址"
              class="websiteValue_banner_input1"
              name="yuming"
            />
            <input
              @keyup.enter="getList"
              v-model="SeoContent"
              type="text"
              placeholder="请输入网址"
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
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <div class="no_similar">
        <img src="../../assets/no_same.png" />
        <p v-if="this.isSame == true" class="no_same">相同域名不能比较！</p>
        <p v-if="!this.isSame == true" class="same" v-show="!noResult">
          相同部分大概为
          <span>{{like}}%</span>
        </p>
        <p v-if="!this.isSame" v-show="noResult" class="no_same">{{errMsg}}</p>
      </div>
      <div class="adv_box">
        <a v-for="advs in advpic" target="_blank" href="http://www.baidu.com">
          <img :src="require(`../../assets/${advs}.png`)" />
        </a>
      </div>
    </div>
    <NearlySearch></NearlySearch>
  </div>
</template>

<script>
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
  name: "WebSimiler",
  components: {
    NearlySearch
  },
  data() {
    return {
      isSame: "",
      title: "页面相似度查询",
      content: "",
      SeoContent: "",
      S_SeoContent: "",
      like: "",
      errMsg: "",
      noResult: false,
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getList() {
      let netReg =
        "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$";
      let netRe = new RegExp(netReg);
      if (!netRe.test(this.SeoContent) || !netRe.test(this.S_SeoContent)) {
        alert("请输入正确域名,域名不包括(http://以及https://)");
        return false;
      }
      if (this.S_SeoContent == this.SeoContent && this.S_SeoContent !== "") {
        this.isSame = true;
        this.content = this.SeoContent;
      } else {
        this.isSame = false;
        this.content = this.SeoContent;
        this.getPageLikeInfo();
      }
      this.$router.replace({
        name: "WebSimiler",
        params: { domain: this.content }
      });
    },
    encode_unicode_param(t) {
      for (var e = "", a = 0; a < t.length; a++) {
        var i = t.charCodeAt(a).toString(16);
        2 == i.length ? (e += "n" + i) : (e += i);
      }
      return e;
    },
    getPageLikeInfo() {
      this.like = "";
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/pageinfo/getPageLikeInfo", {
          params: {
            c_domain1: this.encode_unicode_param(this.S_SeoContent),
            c_domain2: this.encode_unicode_param(this.SeoContent),
            domain1: this.S_SeoContent,
            domain2: this.SeoContent
          }
        })
        .then(res => {
          console.log(res);
          if (!res.data.error_message == "") {
            this.noResult = true;
            this.errMsg = res.data.error_message;
          } else {
            this.noResult = false;
            this.like = res.data[0].result;
          }
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "2");
    window.scrollTo(0, 0);
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 4000);
  },
  activated() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "2");
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
  width: 49%;
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
  font-size: 22px;
  margin: 60px 0 30px 0;
}
.no_similar {
  width: 1200px;
  height: 360px;
  border: 1px solid #ebebeb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .no_same {
    font-size: 16px;
    color: #ff3939;
  }
  .same {
    font-size: 16px;
    color: #808080;
    span {
      color: #fd9a31;
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 100px 0 50px 0;
}
</style>
