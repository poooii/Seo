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
    <div class="weight_container" style="padding:0;margin-bottom:60px">
      <div class="title_container">
        <span :class="{color_line_blue:keywords=='0'}" @click="changeKeywords('0')">涨入关键词（PC端）</span>
        <span :class="{color_line_blue:keywords=='1'}" @click="changeKeywords('1')">跌出关键词（PC端）</span>
        <span :class="{color_line_blue:keywords=='2'}" @click="changeKeywords('2')">涨入关键词（移动端）</span>
        <span :class="{color_line_blue:keywords=='3'}" @click="changeKeywords('3')">跌出关键词（移动端）</span>
      </div>
      <table width="1200px" class="commerce_detail_table">
        <tr>
          <td>关键词</td>
          <td>搜索量</td>
          <td>新排名</td>
          <td>旧排名</td>
          <td>趋势图</td>
          <td>标题</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts1"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts2"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts3"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts4"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts5"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts6"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts7"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts8"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts9"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
        <tr>
          <td>申通快递单号查询</td>
          <td>122，100</td>
          <td>第16名</td>
          <td>50名外</td>
          <td>
            <LineCharts
              :xdata="xdata2"
              :showxis="showxis"
              :option="series2"
              :styl="{width: '120px', height: '60px',position:'relative',top:'-20px'}"
              id="wdcharts10"
            ></LineCharts>
          </td>
          <td>乐视视频APP下载乐视视频安...</td>
        </tr>
      </table>
      <div class="page_box">
        <span><</span>
        <span v-for="num in 10">{{num}}</span>
        <span>...</span>
        <span class="color_blue">50</span>
        <span>></span>
      </div>
    </div>
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
import LineCharts from "../Echarts/line";
export default {
  name: "WeightDetail",
  components: {
    LineCharts
  },
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
      ],
      keywords: "0",
      showxis: false,
      xdata2: ["04-02", "04-03", "04-04", "04-06", "04-07", "04-08"],
      series2: [
        {
          name: "排名",
          type: "line",
          symbol: "none",
          data: [5, 5, 50, 50, 50, 2],
          areaStyle: {
            color: "#e2f4ff",
            origin: "end"
          },
          lineStyle: {
            width: 1
          }
        }
      ]
    };
  },
  methods: {
    changeKeywords(idx) {
      this.keywords = idx;
    },
    backToWeight(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.$router.push({
        name: "BaiduWeight",
        params: { navIndex: "1" }
      });
    }
  },
  mounted() {
    window.scrollTo(0, 0);
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
.color_yellow {
  color: #fc9a30;
}
.color_line_blue {
  border-bottom: 2px solid #2aa0ea;
  color: #2aa0ea;
}
.weight_container {
  font-size: 16px;
  width: 1200px;
  margin: 0 auto;
  color: #666;
  margin-top: 20px;
  height: auto;
  padding-bottom: 20px;
  border: 1px solid #ebebeb;
  .title_container {
    height: 60px;
    background: #fafafa;
    border-bottom: 1px solid #ebebeb;
    span {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      margin-left: 36px;
      min-width: 30px;
      text-align: center;
      cursor: pointer;
      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        margin-right: 8px;
        vertical-align: -2px;
      }
    }
    .days_blue {
      color: #fff;
      background: #008abd;
      border-color: #008abd;
    }
  }
  .commerce_detail_table {
    border-bottom: 1px solid #ebebeb;
    tr:first-child td {
      border-bottom: 1px solid #ebebeb;
      color: #666;
    }
    td {
      height: 60px;
      width: 14%;
      text-align: center;
    }
    td:first-child {
      border-right: 1px solid #ebebeb;
      background: #fafafa;
      text-align: left;
      padding-left: 36px;
      width: 20%;
    }
    td:last-child {
      width: 26%;
    }
    td:nth-child(3) {
      color: #fc9a30;
    }
  }
  .page_box {
    width: 100%;
    height: 60px;
    text-align: right;
    span {
      display: inline-block;
      height: 60px;
      line-height: 60px;
      margin-right: 24px;
      cursor: pointer;
    }
  }
}
</style>
