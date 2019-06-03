<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">{{title}}</p>
        <textarea v-model="prevContent"></textarea>
        <ul class="clearfix">
          <li v-for="(feature,idx) in features" @click="changeFeature(idx)">{{feature}}</li>
        </ul>
      </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入需要排版的内容</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">操作反馈</div>
      <div class="changecontent">{{changeContent}}</div>
      <div class="adv_box">
        <a v-for="advs in advpic" target="_blank" href="http://www.baidu.com">
          <img :src="require(`../../assets/${advs}.png`)">
        </a>
      </div>
    </div>
    <NearlySearch></NearlySearch>
  </div>
</template>

<script>
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
  name: "AutoSetType",
  components: {
    NearlySearch
  },
  data() {
    return {
      title: "自动排版工具",
      prevContent: "",
      changeContent: "",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      features: [
        "自动排版",
        "添加空行",
        "替换标点",
        "清除HTML",
        "简到繁",
        "检查错别字",
        "统计字数",
        "复制内容",
        "清空内容"
      ]
    };
  },
  methods: {
    changeFeature(idx) {
      this.content = this.prevContent;
      if (idx == 4) {
        if (this.features[4] == "简到繁") {
          this.$set(this.features, 4, "繁到简");
        } else {
          this.$set(this.features, 4, "简到繁");
        }
      }
      if (idx == 6) {
        let len = 0;
        for (let i = 0; i < this.content.length; i++) {
          len += 1;
        }
        this.changeContent = ` 文字长度${len}个字`;
      }
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "4");
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="less" scoped>
.websiteValue_banner {
  background: #f5f6f9;
  height: 310px;
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
  padding-top: 32px;
  padding-bottom: 20px;
  color: #333;
}
.websiteValue_banner_contain {
  textarea {
    width: 800px;
    border: 1px solid #ebebeb;
    padding: 10px;
    height: 120px;
    resize: none;
    outline: 0;
    -webkit-appearance: none;
    font-size: 16px;
    color: #333;
    font-family: "Microsoft Yahei", "\5FAE\8F6F\96C5\9ED1", arial;
  }
  ul {
    width: 830px;
    padding: 0 4px;
    margin-top: 20px;
    li {
      float: left;
      margin-left: 6px;
      width: 86px;
      height: 32px;
      background-color: #00a7eb;
      border-radius: 4px;
      line-height: 32px;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
    }
  }
}
.main_content {
  width: 1200px;
  margin: 0 auto;
  .changecontent {
    width: 1140px;
    min-height: 300px;
    padding: 30px 30px;
    border: 1px solid #ebebeb;
    font-size: 16px;
    color: #666;
  }
}
.content_title {
  font-size: 24px;
  margin: 60px 0 30px 0;
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 80px 0 50px 0;
}
</style>
