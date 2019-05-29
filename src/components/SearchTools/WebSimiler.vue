<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="websiteValue_banner">
        <div class="websiteValue_banner_contain">
            <p class="websiteValue_banner_title2">{{title}}</p>
            <div class="websiteValue_banner_input">
                <form @submit.prevent>
                <input
                    v-model="S_SeoContent"
                    type="text"
                    placeholder="请输入网址"
                    class="websiteValue_banner_input1"
                    name="yuming"
                >
                <input
                    @keyup.enter="getList"
                    v-model="SeoContent"
                    type="text"
                    placeholder="请输入网址"
                    class="websiteValue_banner_input1"
                    name="yuming"
                >
                <input type="button">
                    <img  @click="getList" src="../../assets/websiteValue-search.png" alt class="websiteValue-search">
                </input>
                </form>
            </div>
        </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <div class="no_similar">
        <img src="../../assets/no_same.png">
        <p v-if="this.isSame == true" class="no_same">相同域名不能比较！</p>
        <p v-if="!this.isSame == true" class="same">相同部分大概为 <span>1.55%</span></p>
      </div>
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
  name: "WebSimiler",
  components: {
    NearlySearch
  },
  data() {
    return {
      isSame:"",
      title: "页面相似度查询",
      content: "",
      SeoContent: "",
      S_SeoContent: "",
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      window.scrollTo(0, 0);
    },
    getList() {
      if(this.S_SeoContent == this.SeoContent && this.S_SeoContent!==""){
        this.isSame = true
        this.content=this.SeoContent
      }else{
        this.isSame = false
        this.content=this.SeoContent
        let storage = window.sessionStorage;
        storage.setItem("searchContent", this.content);
        storage.setItem("S_SeoContent", this.S_SeoContent);
      }
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    this.S_SeoContent = storage.S_SeoContent;
    storage.setItem("navIndex", "2");
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="less" scoped>
.websiteValue_banner{background:#f5f6f9;height: 220px;width: 100%;}
.websiteValue_banner_contain{width: 840px;margin: 0 auto;text-align: center;color: #666;}
.websiteValue_banner_title{font-size: 48px;padding-top: 105px;}
.websiteValue_banner_title2{font-size: 26px;padding-top: 42px;color:#333;}
.websiteValue_banner_input1{width: 49%;height: 50px;border-radius: 4px;border: none;outline: none;text-indent: 20px;}
.websiteValue_banner_input{position: relative;margin-top: 28px;}
.websiteValue-search{position: absolute;right: 0;width: 30px;height: 30px;top: 0;margin: 10px 0;border-left: 1px solid #f5f5f5;padding: 0 20px;cursor: pointer;}
.websiteValue_banner_ul li{float: left;padding-left: 16px;}
.websiteValue_banner_ul li a{color: #666;font-size: 14px;}
.websiteValue_banner_ul_title{float: left;}
.websiteValue_banner_ul a:hover{
    color: #007bb7;
}
    .websiteValue_banner_ul a{cursor: pointer;}
.main_content {
  width: 1200px;
  margin: 0 auto;
}
.content_title {
  font-size: 24px;
  margin: 60px 0 30px 0;
}
.no_similar{
  width: 1200px;
  height: 360px;
  border: 1px solid #ebebeb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .no_same{
    font-size:16px;
    color: #ff3939;
  }
  .same{
    font-size:16px;
    color: #808080;
    span{
      color: #fd9a31
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 100px 0 50px 0;
}
</style>
