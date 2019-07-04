<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table width="1200px" class="tsz_table">
        <tr>
          <td>序号</td>
          <td>网址</td>
          <td>360综合权重</td>
          <td>360权重PC</td>
          <td>360权重WAP</td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <a target="_blank" :href="'http://'+content">{{content}}</a>
          </td>

          <td class="weight_details" v-for="weights in weightcontent">
            <!-- 循环权重图片 -->
            <img :src="require(`../../assets/${weights.img}.png`)" />
            <span>{{weights.weight|toZero}}</span>
            <!-- 循环名称 -->
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
  name: "ThreeSixZeroWeight",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "360权重查询",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      weightcontent: {
        przh: {
          weight: "",
          img: "weight_360"
        },
        prpc: {
          weight: "",
          img: "weight_360"
        },
        prm: {
          weight: "",
          img: "weight_360"
        }
      }
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.getPr();
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
    getPr() {
      this.bus.$emit("loading", true);
      this.$http
        .get("/Api/seo/baidurank", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.weightcontent.przh.weight = res.data.br;
          this.weightcontent.prpc.weight = res.data.br;
          this.weightcontent.prm.weight = res.data.br ? res.data.br - 1 : "0";
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    }
  },
  filters: {
    toZero(val) {
      if (val < 0) {
        return 0;
      } else {
        return val;
      }
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getPr();
    }
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
}

.tsz_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;

  tr {
    td {
      border-top: 1px solid #ebebeb;
      vertical-align: middle;
      width: 250px;
      height: 60px;
      font-size: 16px;
      text-align: center;
      position: relative;
      a {
        width: 100%;
        height: 100%;
        line-height: 60px;
        color: #007bb7;
      }

      span {
        position: absolute;
        top: 18px;
        left: 134px;
        color: #fff;
      }
    }

    td:first-child {
      border-left: 1px solid #ebebeb;
      width: 100px;
    }

    td:nth-child(2) {
      width: 350px;
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
  margin: 240px 0 50px 0;
}
</style>
