<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">手机游戏_手机软件 - PC6手机站</div>
      <table class="title_table" width="1200px">
        <tr>
          <td>百度收录：</td>
          <td class="color_red">2,520,000</td>
          <td>百度索引</td>
          <td class="color_red">2,520,000</td>
        </tr>
        <tr>
          <td>首页未知：</td>
          <td></td>
          <td>PR输出值：</td>
          <td>0.49</td>
        </tr>
        <tr>
          <td>百度权重</td>
          <td>
            <img src="../../assets/yd-5.png" alt>
          </td>
          <td>PR：</td>
          <td>
            <img src="../../assets/sg-5.png" alt>
          </td>
        </tr>
      </table>
      <table class="link_table" width="1200px">
        <tr>
          <td>出站/反向链接</td>
          <td>图片链接</td>
          <td>文字链接</td>
          <td>带nofollow链接</td>
        </tr>
        <tr>
          <td>出站链接：20</td>
          <td>8</td>
          <td>12</td>
          <td>1</td>
        </tr>
        <tr>
          <td>反向链接：3</td>
          <td>1</td>
          <td>2</td>
          <td>0</td>
        </tr>
      </table>
      <div class="content_title">
        检测结果：
        <span>
          出站链接中有
          <i>17个</i> 没有本站链接
        </span>
      </div>
      <table class="ip_main_table" width="1200px">
        <tr>
          <td>序号</td>
          <td>站点</td>
          <td>
            百度收录
            <i></i>
          </td>
          <td>
            百度预计流量/权重
            <i class="blue_down"></i>
          </td>
          <td>
            PR/输出值
            <i class="red_up"></i>
          </td>
          <td>
            对方友链情况
            <i></i>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>
            <p>信用中国</p>
            <p>www.creditchina.gov.cn</p>
          </td>
          <td>40,500</td>
          <td>9285 / 5</td>
          <td>0 / 0.15</td>
          <td>
            <b>首页无本站链接!</b> 外链数：123
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <p>信用中国</p>
            <p>www.creditchina.gov.cn</p>
          </td>
          <td>40,500</td>
          <td>9285 / 5</td>
          <td>0 / 0.15</td>
          <td>
            <span>
              链接：
              <a target="_blank" href="http://www.baidu.com">图片链接</a>
            </span> 位置/外链数： 9/34
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <p>信用中国</p>
            <p>www.creditchina.gov.cn</p>
          </td>
          <td>40,500</td>
          <td>9285 / 5</td>
          <td>0 / 0.15</td>
          <td>
            <span>
              链接：
              <a target="_blank" href="http://www.baidu.com">图片链接</a>
            </span> 位置/外链数： 9/34
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <p>信用中国</p>
            <p>www.creditchina.gov.cn</p>
          </td>
          <td>40,500</td>
          <td>9285 / 5</td>
          <td>0 / 0.15</td>
          <td>
            <span>
              链接：
              <a target="_blank" href="http://www.baidu.com">图片链接</a>
            </span> 位置/外链数： 9/34
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <p>信用中国</p>
            <p>www.creditchina.gov.cn</p>
          </td>
          <td>40,500</td>
          <td>9285 / 5</td>
          <td>0 / 0.15</td>
          <td>
            <span>
              链接：
              <a target="_blank" href="http://www.baidu.com">图片链接</a>
            </span> 位置/外链数： 9/34
          </td>
        </tr>
        <tr>
          <td colspan="6">
            <span><</span>
            <span v-for="num in 10">{{num}}</span>
            <span>...</span>
            <span class="color_blue">50</span>
            <span>></span>
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
import SearchBox from "../BaseComponents/SearchBox";
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
  name: "FriendLink",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "友链检测",
      content: "",
      advpic: ["adv1", "adv3", "adv2"]
    };
  },
  methods: {
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
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
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
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
  span {
    font-size: 18px;
    color: #666;
    i {
      color: #ff3838;
    }
  }
}
.title_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  tr {
    td {
      height: 60px;
      border-left: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      padding-left: 40px;
    }
    td:first-child,
    td:nth-child(3) {
      color: #808080;
      background: #fafafa;
      width: 20%;
    }
    td:last-child,
    td:nth-child(2) {
      border-left: none;
    }
    .color_red {
      color: #ff3838;
    }
  }
}
.link_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  font-size: 16px;
  margin-top: 20px;
  tr {
    td {
      height: 60px;
      border-left: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      text-align: center;
    }
    td:first-child {
      color: #ff9e40;
    }
  }
  tr:first-child {
    td {
      color: #808080;
      background: #fafafa;
    }
  }
}
.ip_main_table {
  font-size: 16px;
  border: 1px solid #ebebeb;
  margin-top: 20px;
  border-bottom: none;
  tr {
    td {
      height: 60px;
      text-align: center;
      border-bottom: 1px solid #ebebeb;
      padding-right: 10px;
    }
    td:first-child {
      width: 100px;
    }
    td:last-child,
    :nth-child(2) {
      text-align: left;
      p:last-child {
        font-size: 12px;
        color: #999;
      }
      b {
        color: #f05955;
        font-weight: normal;
      }
      span {
        color: #ff9e40;
        a {
          color: #ff9e40;
        }
      }
    }
  }
  tr:first-child {
    td {
      background: #fafafa;
      color: #666;
    }
  }
  tr:first-child {
    td {
      i {
        width: 18px;
        height: 18px;
        display: inline-block;
        background-image: url(../../assets/gray_up.png);
        vertical-align: middle;
      }
      .blue_down {
        background-image: url(../../assets/blue_down.png);
      }
      .red_up {
        background-image: url(../../assets/red_up.png);
      }
    }
  }
  tr:last-child {
    td {
      text-align: right;
      span {
        display: inline-block;
        height: 60px;
        line-height: 60px;
        margin-right: 24px;
        cursor: pointer;
        font-size: 16px;
        color: #333;
      }
    }
  }
}
.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 50px 0;
}
</style>
