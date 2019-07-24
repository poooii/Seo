<template>
  <div>
    <!-- 头部搜索框 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">{{title}}</p>
        <div class="websiteValue_banner_input">
          <form @submit.prevent>
            <input
              @keyup.enter="getlist"
              v-model="SeoContent"
              type="text"
              placeholder="输入想要查询价格的域名"
              class="websiteValue_banner_input1"
              name="yuming"
            />
            <input type="button" />
            <img
              @click="getlist"
              src="../../assets/websiteValue-search.png"
              alt
              class="websiteValue-search"
            />
          </form>
        </div>
        <!-- 热门搜索 -->
        <div class="clearfix websiteValue_banner_ul1">
          <span class="websiteValue_banner_ul_title">多个IP请空格或换行，一次可查询10个IP</span>
        </div>
      </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的IP</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">查询结果</div>
      <table class="link_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>IP地址</td>
          <td>状态</td>
        </tr>
        <tr v-for="(item,index) in content">
          <td>{{index+1}}</td>
          <td>{{item.domain}}</td>
          <td :class="{loading:item.loading,normal:true}" v-show="!item.Gerror">
            <span @click="getIpInfo(content.length,index,false)" class="re_search">{{item.cx}}</span>
            {{item.cxjg}}
            <i></i>
          </td>
          <td v-show="item.Gerror" class="sealed">格式错误</td>
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
  name: "IpMultipleSearch",
  data() {
    return {
      title: "IP地址批量查询工具",
      content: "",
      SeoContent: "",
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getlist() {
      this.bus.$emit("loading", true);
      setTimeout(() => {
        this.bus.$emit("loading", false);
      }, 1000);
      this.content = this.SeoContent.split(" ");
      this.$router.replace({
        name: "IpMultipleSearch",
        params: { domain: this.content[0] + "%0D%0A" }
      });
      this.content = this.content.map(item => ({ domain: item }));
      for (let i in this.content) {
        this.content[i].cx = "";
        this.content[i].cxjg = "";
        this.content[i].loading = true;
        this.content[i].Gerror = false;
      }
      let curIndex = this.content.length ? this.content.length : 0;
      this.getIpInfo(curIndex, 0, true);
      let storage = window.sessionStorage;
      storage.setItem("searchContent", this.SeoContent);
    },
    getIpInfo(cur, i, goOn) {
      if (cur <= i) {
        return;
      }
      this.content[i].loading = true;
      var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (re.test(this.content[i].domain)) {
        this.content[i].Gerror = false;
      } else {
        this.content[i].Gerror = true;
      }
      this.$http
        .get("/Api/Pageinfo/getIpInfo", {
          params: {
            ip: this.content[i].domain,
            type: 1
          }
        })
        .then(res => {
          console.log(res);
          if (res.data == null || res.data.length == 0 || !res.data.info) {
            this.content[i].cx = "重测";
            this.content[i].cxjg = "";
            this.content[i].loading = false;
          } else {
            this.content[i].cx = "";
            this.content[i].cxjg = res.data.info;
            this.content[i].loading = false;
            let newContent = JSON.parse(JSON.stringify(this.content));
            this.content = newContent;
          }
          if (goOn) {
            i++;
            this.getIpInfo(cur, i, goOn);
          }
        })
        .catch(err => {
          console.log(err);
          this.content[i].loading = false;
          if (goOn) {
            i++;
            this.getIpInfo(cur, i, goOn);
          }
        });
    }
  },
  mounted() {
    this.bus.$emit("loading", true);
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 1000);
    let storage = window.sessionStorage;
    this.SeoContent = storage.searchContent;
    storage.setItem("navIndex", "4");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.content = storage.searchContent.split(" ");
      this.content = this.content.map(item => ({ domain: item }));
      for (let i in this.content) {
        this.content[i].cx = "";
        this.content[i].cxjg = "";
        this.content[i].loading = true;
        this.content[i].Gerror = false;
      }
      let curIndex = this.content.length ? this.content.length : 0;
      this.getIpInfo(curIndex, 0, true);
    }
  },
  activated() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "4");
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
      .re_search {
        color: #028ecd;
        cursor: pointer;
      }
    }
    td:nth-child(2) {
      text-align: left;
      padding-left: 100px;
    }
    td:first-child {
      width: 100px;
    }
    .loading {
      i {
        display: block;
      }
      span {
        display: none;
      }
    }
    .sealed {
      color: #ff3838;
    }
    .normal {
      color: #63c85e;
    }
    .retest {
      color: #028ecd;
      cursor: pointer;
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
  margin: 80px 0 50px 0;
}
</style>
