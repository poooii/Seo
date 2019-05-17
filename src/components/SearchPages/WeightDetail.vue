<template>
  <div>
    <div class="top_bar">
      <span>百度权重 > m.pc6.com 关键词</span>
    </div>
    <div class="weight_detail_title">
      <span class="color_blue">手机游戏_手机软件 - PC6手机站</span> 跌出关键词
      <span class="fr detail_title_time">
        时间：
        <input type="date" value="2019-01-02">
      </span>
    </div>
    <table width="1200px" class="first_table">
      <tr>
        <td>平台</td>
        <td>PC端</td>
        <td>移动端</td>
      </tr>
      <tr>
        <td>总词数</td>
        <td>22,387</td>
        <td>42,387</td>
      </tr>
      <tr>
        <td>第一页</td>
        <td>
          22,387
          <span class="lower">
            <i></i> 87（7.15%）
          </span>
        </td>
        <td>
          42,387
          <span class="upper">
            <i></i> 87（7.15%）
          </span>
        </td>
      </tr>
      <tr>
        <td>第一页</td>
        <td>
          22,387
          <span class="lower">
            <i></i> 87（7.15%）
          </span>
        </td>
        <td>
          42,387
          <span class="upper">
            <i></i> 87（7.15%）
          </span>
        </td>
      </tr>
      <tr>
        <td>第一页</td>
        <td>
          22,387
          <span class="lower">
            <i></i> 87（7.15%）
          </span>
        </td>
        <td>
          42,387
          <span class="upper">
            <i></i> 87（7.15%）
          </span>
        </td>
      </tr>
      <tr>
        <td>第一页</td>
        <td>
          22,387
          <span class="lower">
            <i></i> 87（7.15%）
          </span>
        </td>
        <td>
          42,387
          <span class="upper">
            <i></i> 87（7.15%）
          </span>
        </td>
      </tr>
      <tr>
        <td>第一页</td>
        <td>
          22,387
          <span class="lower">
            <i></i> 87（7.15%）
          </span>
        </td>
        <td>
          42,387
          <span class="upper">
            <i></i> 87（7.15%）
          </span>
        </td>
      </tr>
    </table>
    <div class="recent_search">
      <div class="recent_search_box">
        <p>最近查询</p>
        <ul class="clearfix">
          <li v-for="items in hotsearch">
            <a @click="backToWeight(items)">{{items}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeightDetail",
  data() {
    return {
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
    backToWeight(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.$router.push({
        name: "BaiduWeight"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.top_bar {
  width: 100%;
  height: 60px;
  background: #f5f6f9;
  font-size: 14px;
  line-height: 60px;
  span {
    display: block;
    width: 1200px;
    margin: 0 auto;
  }
}
.weight_detail_title {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0 20px 0;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 20px;
  font-size: 24px;
}
.detail_title_time {
  font-size: 16px;
  color: #666;
  input {
    border-radius: 4px;
    border: 1px solid #ccc;
  }
}
.first_table {
  margin: 0 auto;
  font-size: 16px;
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  td {
    width: 33%;
    height: 60px;
    text-align: center;
    border-left: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
  }
  tr:first-child td {
    background: #fafafa;
  }
}
.lower {
  color: #00b35d;
  i {
    width: 0;
    height: 0;
    top: 15px;
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: #00b35d transparent transparent;
    position: relative;
    margin-right: 5px;
  }
}
.upper {
  color: #ec1f37;
  i {
    width: 0;
    height: 0;
    border-width: 0 5px 5px;
    border-style: solid;
    border-color: transparent transparent #ec1f37;
    position: relative;
    margin-right: 5px;
    bottom: 12px;
  }
}
.recent_search {
  width: 100%;
  background: #f5f6f9;
  padding-bottom: 40px;
  .recent_search_box {
    width: 1200px;
    margin: 0 auto;
    p {
      font-size: 16px;
      color: #333;
      padding: 40px 0 10px 0;
    }
    ul {
      line-height: 32px;
      li {
        float: left;
        margin-right: 10px;
        a {
          color: #666;
          font-size: 12px;
          cursor: pointer;
        }
        a:hover {
          color: #007bb7;
        }
      }
    }
  }
}
.color_blue {
  color: #008abd;
}
</style>
