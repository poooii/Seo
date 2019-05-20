<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :hotsearch="hotsearch" :content="content" :title="title" @msgToSearch="getMsg"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入要查询的站点</div>
    <div class="baidu_main_content" v-if="!content==''">
      <div class="content_title">
        <span class="t_title">手机游戏_手机软件 - PC6手机站</span>
      </div>
      <div>
        <ul class="weight_content clearfix">
          <li class="weight_details">
            <img class="baidu_tags" src="../../assets/weight_01.png" alt>
            <ol>
              <li>
                预计来路：
                <span class="color_blue">12,235 ~ 18,623</span> IP
              </li>
              <li>
                权重：
                <img src="../../assets/yd-5.png" alt>
              </li>
              <li>
                分类：
                <span class="color_blue">软件下载</span>
              </li>
              <li>分类排名：44 32</li>
              <li>分类关键词：167,136</li>
              <li>分类指数：15,163,077</li>
            </ol>
          </li>
          <li class="weight_details">
            <img class="baidu_tags" src="../../assets/weight_02.png" alt>
            <ol>
              <li>
                预计来路：
                <span class="color_blue">12,235 ~ 18,623</span> IP
              </li>
              <li>
                权重：
                <img src="../../assets/yd-5.png" alt>
              </li>
              <li>
                分类：
                <span class="color_blue">软件下载</span>
              </li>
              <li>分类排名：44 32</li>
              <li>分类关键词：167,136</li>
              <li>分类指数：15,163,077</li>
            </ol>
          </li>
          <li class="weight_details">
            <img class="baidu_tags" src="../../assets/weight_03.png" alt>
            <ol>
              <li>
                总来路：
                <span class="color_blue">12,235 ~ 18,623</span> IP
              </li>
              <li>百度收录：1,260,000</li>
              <li>24小时收录：38</li>
              <li>百度索引：1,734,121</li>
              <li>一周收录：40万</li>
              <li>一月收录：60万</li>
            </ol>
          </li>
        </ul>
      </div>
      <!-- 折线图 -->
      <div class="chart_container">
        <div class="title_container">
          <span class="color_line_blue">总关键词</span>
          <span>预计来路</span>
          <span>权重</span>
          <span>收录</span>
          <span>索引</span>
          <span class="fr">
            <i class="eyellow"></i>总量
          </span>
          <span class="fr">
            <i class="eblue"></i>移动端
          </span>
          <span class="fr">
            <i class="egreen"></i>PC端
          </span>
        </div>
        <LineCharts
          :showxis="showxis"
          :xdata="xdata"
          :option="series"
          :styl="{width: '1140px', height: '340px'}"
          id="keywordChart"
        ></LineCharts>
      </div>
      <!-- 相关子域名 -->
      <div class="chart_container">
        <div class="title_container">
          <span>相关子域名</span>
        </div>
        <ul class="clearfix related_name_box">
          <li v-for="items in hotsearch">
            <a>{{items}}</a>
          </li>
          <li v-for="items in hotsearch">
            <a>{{items}}</a>
          </li>
          <li v-for="items in hotsearch">
            <a>{{items}}</a>
          </li>
          <li v-for="items in hotsearch">
            <a>{{items}}</a>
          </li>
        </ul>
      </div>
      <!-- 广告位 -->
      <div class="advertise_box">
        <a v-for="advs in advpic" href>
          <img :src="require(`../../assets/${advs}.png`)">
        </a>
      </div>
      <!-- 广告位下表格 -->
      <div class="chart_container adv_bottom_table_box">
        <table width="1200px">
          <tr>
            <td class="bg_gray">平台</td>
            <td class="bg_gray">PC端</td>
            <td class="bg_gray">移动端</td>
          </tr>
          <tr>
            <td>总词数</td>
            <td>22,387</td>
            <td>42,387</td>
          </tr>
          <tr>
            <td>第一页</td>
            <td>
              2,387
              <span class="lower">
                <i></i> 87（7.15%）
              </span>
            </td>
            <td>
              2,387
              <span class="upper">
                <i></i> 87（7.15%）
              </span>
            </td>
          </tr>
          <tr>
            <td>第一页</td>
            <td>
              2,387
              <span class="lower">
                <i></i> 87（7.15%）
              </span>
            </td>
            <td>
              2,387
              <span class="upper">
                <i></i> 87（7.15%）
              </span>
            </td>
          </tr>
          <tr>
            <td>第一页</td>
            <td>
              2,387
              <span class="lower">
                <i></i> 87（7.15%）
              </span>
            </td>
            <td>
              2,387
              <span class="upper">
                <i></i> 87（7.15%）
              </span>
            </td>
          </tr>
          <tr>
            <td>第一页</td>
            <td>
              2,387
              <span class="lower">
                <i></i> 87（7.15%）
              </span>
            </td>
            <td>
              2,387
              <span class="upper">
                <i></i> 87（7.15%）
              </span>
            </td>
          </tr>
          <tr>
            <td>第一页</td>
            <td>
              2,387
              <span class="lower">
                <i></i> 87（7.15%）
              </span>
            </td>
            <td>
              2,387
              <span class="upper">
                <i></i> 87（7.15%）
              </span>
            </td>
          </tr>
        </table>
      </div>
      <!-- 排名趋势echarts -->
      <div class="chart_container clearfix">
        <div class="title_container">
          <span>排名趋势</span>
          <span
            class="fr echarts_days"
            :class="{ days_blue:dayschange == '2'}"
            @click="ChangeDays('2')"
            style="margin-right:20px"
          >3个月</span>
          <span
            class="fr echarts_days"
            :class="{ days_blue:dayschange == '1'}"
            @click="ChangeDays('1')"
          >30天</span>
          <span
            class="fr echarts_days"
            :class="{ days_blue:dayschange == '0'}"
            @click="ChangeDays('0')"
          >7天</span>
        </div>
        <LineCharts
          :showxis="showxis"
          :xdata="xdata"
          :option="series"
          :styl="{width: '800px', height: '340px',float:'left'}"
          id="keywordChart2"
        ></LineCharts>
        <circleCharts
          :styl="{width: '320px', height: '320px',float:'left'}"
          id="circleChart"
          :option="cseries"
        ></circleCharts>
      </div>
      <!-- 平台数据 -->
      <div class="commerce_box">
        <div class="commerce_title">
          <span class="commerce_title_name">平台</span>
          <span class="commerce_title_first color_blue">PC端</span>
          <span>移动端</span>
        </div>
        <div class="chart_container" style="padding:0">
          <div class="title_container">
            <span class="color_line_blue">涨入关键词</span>
            <span>跌出关键词</span>
          </div>
          <table width="1200px" class="commerce_table">
            <tr>
              <td>关键词</td>
              <td>搜索量</td>
              <td>新排名</td>
              <td>旧排名</td>
            </tr>
            <tr>
              <td>申通快递单号查询</td>
              <td>122,100</td>
              <td>第16名</td>
              <td>无排名</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>122,100</td>
              <td>第16名</td>
              <td>无排名</td>
            </tr>
            <tr>
              <td>成人版抖音app</td>
              <td>122,100</td>
              <td>第16名</td>
              <td>无排名</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>122,100</td>
              <td>第16名</td>
              <td>无排名</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>122,100</td>
              <td>第16名</td>
              <td>无排名</td>
            </tr>
          </table>
        </div>
      </div>
        <div class="chart_container" style="padding:0;margin-bottom:60px">
          <div class="title_container">
            <span class="color_line_blue">/</span>
            <span>mipd</span>
            <span>company</span>
            <span>z</span>
            <span>n</span>
            <span>x</span>
          </div>
          <table width="1200px" class="commerce_detail_table">
            <tr>
              <td>关键词</td>
              <td>排名</td>
              <td>（PC）搜索量</td>
              <td>收录量</td>
              <td>网页标题</td>
            </tr>
            <tr>
              <td>申通快递单号查询</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>成人版抖音app</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
            <tr>
              <td>直播吧</td>
              <td>第1页第1位</td>
              <td>13</td>
              <td>18，000</td>
              <td>APP下载乐视视频安卓...</td>
            </tr>
          </table>
          <div class="page_box">
            <span><</span>
            <span v-for="num in 10">{{num}}</span>
            <span>...</span>
            <span>50</span>
            <span>></span>
          </div>
        </div>
      </div>
    <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
    </div>
  </div>
</template>

<script>
import LineCharts from "../Echarts/line";
import circleCharts from "../Echarts/circle";
import SearchBox from "../BaseComponents/SearchBox";
import NearlySearch from '../BaseComponents/NearlySearch'
export default {
  name: "BaiduWeight",
  components: {
    LineCharts,
    SearchBox,
    circleCharts,
    NearlySearch
  },
  data() {
    return {
      showxis:true,
      title: "百度权重",
      content: "",
      SeoContent: "",
      dayschange: "0",
      hotsearch: [
        "po188.com",
        "www.hj135.com",
        "jiaofu.cn",
        "riyiseo.com",
        "shuadan.cn",
        "caoping6s.cn",
        "014121.cn"
      ],
      xdata: [],
      xdata2: [
        "04-02",
        "04-03",
        "-04-04",
        "04-05",
        "04-06",
        "04-07",
        "04-08",
        "04-09"
      ],
      series: [],
      cseries: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["25%", "55%"],
          center: ["50%", "50%"],
          data: [
            { value: 10.76, name: "第一页" },
            { value: 17.69, name: "第二页" },
            { value: 28.4, name: "第三页" },
            { value: 24.2, name: "第四页" },
            { value: 18.95, name: "第五页" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          },
          label: {
            formatter: "{b}\n\n{d}%"
          }
        }
      ],
      mockdata: [
        {
          name: "seven",
          series: [
            {
              name: "前10",
              type: "line",
              symbol: "none",
              data: [22000, 20000, 21000, 21000, 21000, 22000, 21000, 20000]
            },
            {
              name: "前20号",
              type: "line",
              symbol: "none",
              data: [17500, 16000, 16000, 16500, 16000, 16000, 15200, 15000]
            },
            {
              name: "前30",
              type: "line",
              symbol: "none",
              data: [11000, 11200, 11000, 12000, 12500, 12000, 12000, 14000]
            }
          ],
          xdata: [
            "04-02",
            "04-03",
            "-04-04",
            "04-05",
            "04-06",
            "04-07",
            "04-08",
            "04-09"
          ]
        },
        {
          name: "thirty",
          series: [
            {
              name: "前10",
              type: "line",
              symbol: "none",
              data: [12000, 20000, 25000, 26000, 28000, 29000, 31000, 32000]
            },
            {
              name: "前20号",
              type: "line",
              symbol: "none",
              data: [10500, 12000, 13000, 14500, 15000, 16000, 17200, 19000]
            },
            {
              name: "前30",
              type: "line",
              symbol: "none",
              data: [8000, 9200, 9000, 9000, 10500, 11000, 12000, 14000]
            }
          ],
          xdata: [
            "04-02",
            "04-06",
            "-04-10",
            "04-14",
            "04-18",
            "04-22",
            "04-26",
            "04-30"
          ]
        },
        {
          name: "threem",
          series: [
            {
              name: "前10",
              type: "line",
              symbol: "none",
              data: [42000, 44000, 41000, 41000, 41000, 42000, 45000, 40000]
            },
            {
              name: "前20号",
              type: "line",
              symbol: "none",
              data: [37500, 36000, 36000, 36500, 36000, 36000, 35200, 35000]
            },
            {
              name: "前30",
              type: "line",
              symbol: "none",
              data: [21000, 21200, 21000, 22000, 22500, 22000, 22000, 24000]
            }
          ],
          xdata: [
            "04-02",
            "04-14",
            "-04-26",
            "05-10",
            "05-22",
            "06-02",
            "06-14",
            "06-26"
          ]
        }
      ],
      advpic: ["adv1", "adv3", "adv2"],
      weightcontent: [
        {
          name: "爱站权重",
          img: "az-5"
        },
        {
          name: "站长权重",
          img: "zz-5"
        },
        {
          name: "移动权重",
          img: "yd-5"
        },
        {
          name: "搜狗PR",
          img: "sg-5"
        },
        {
          name: "谷歌PR",
          img: "az-5"
        }
      ]
    };
  },
  methods: {
    ChangeDays(days) {
      this.dayschange = days;
    },
    ChangeNet(net) {
      this.related_net = net;
    },
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
    },
    getNearly(msg) {
      let storage=window.sessionStorage;
      storage.setItem("searchContent",msg);
      this.content=storage.searchContent
      window.scrollTo(0,0);
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", '1');
    this.content = storage.searchContent;
    this.series = this.mockdata[0].series;
    this.xdata = this.mockdata[0].xdata;
    window.scrollTo(0,0);
  }
};
</script>

<style lang="less" scoped>
.bg_gray {
  background: #fafafa;
  color: #808080;
}
.cha_default {
  width: 1200px;
  margin: 0 auto;
  padding: 130px 0 130px;
  color: #d3d3d3;
  letter-spacing: 2px;
  font-size: 30px;
  text-align: center;
}
.baidu_main_content {
  width: 1200px;
  background: #fff;
  margin: 0 auto;
  margin-top: 60px;
  font-size: 16px;
}
.t_title {
  font-size: 24px;
  line-height: 32px;
  height: 26px;
  color: #333;
}
.weight_content {
  .baidu_tags {
    margin-top: 43px;
  }
  ol {
    color: #666;
    line-height: 48px;
    margin-top: 14px;
    img {
      vertical-align: -5px;
    }
    li {
      text-align: left;
      margin-left: 90px;
    }
  }
  margin: 28px 0 0 0;
  color: #999;
  font-size: 16px;
  .weight_details {
    float: left;
    width: 399px;
    height: 450px;
    text-align: center;
    border: 1px solid #ebebeb;
    border-right: none;
    margin: 0;
    padding: 0;
  }
  .weight_details:last-child {
    border-right: 1px solid #ebebeb;
    width: 398px;
  }
}
.chart_container {
  color: #666;
  margin-top: 20px;
  height: auto;
  padding-bottom: 20px;
  border: 1px solid #ebebeb;
  .related_name_box {
    line-height: 32px;
    padding: 0 36px;
    li {
      float: left;
      margin-right: 15px;
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
    span:nth-child(6) {
      margin-right: 36px;
    }
    .echarts_days {
      display: inline-block;
      width: 56px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      margin-left: 5px;
      margin-top: 15px;
    }
    .days_blue {
      color: #fff;
      background: #008abd;
      border-color: #008abd;
    }
  }
  .commerce_table {
    tr:first-child td {
      border-bottom: 1px solid #ebebeb;
      color: #666;
    }
    td {
      height: 60px;
      width: 25%;
      text-align: center;
    }
    td:first-child {
      border-right: 1px solid #ebebeb;
      background: #fafafa;
      text-align: left;
      padding-left: 36px;
      width: 20%;
    }
    td:nth-child(3) {
      color: #fc9a30;
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
      width: 18%;
      text-align: center;
    }
    td:first-child {
      border-right: 1px solid #ebebeb;
      background: #fafafa;
      text-align: left;
      padding-left: 36px;
      width: 20%
    }
    td:last-child{
      width: 26%;
    }
    td:nth-child(2) {
      color: #2aa0ea;
    }
  }
  .page_box{
    width: 100%;
    height: 60px;
    text-align: right;
    span{
      display: inline-block;
      height: 60px;
      line-height: 60px;
      margin-right: 24px;
      cursor: pointer;
    }
  }
}
.color_line_blue {
  border-bottom: 2px solid #2aa0ea;
  color: #2aa0ea;
}
.color_blue {
  color: #2aa0ea;
}
.eblue {
  background: @echartsBlue;
}
.egreen {
  background: @echartsGreen;
}
.eyellow {
  background: @echartsYellow;
}
.advertise_box {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.adv_bottom_table_box {
  border: none;
  table {
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    td {
      border-left: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      text-align: center;
      vertical-align: middle;
      width: 33.33%;
      height: 60px;
    }
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
.commerce_box {
  margin-top: 20px;
  .commerce_title {
    padding: 10px 0 20px 0;
    border-bottom: 1px solid #ebebeb;
    margin-bottom: 20px;
    span {
      cursor: pointer;
    }
    .commerce_title_name {
      font-size: 24px;
      margin-right: 36px;
      cursor: default;
    }
    .commerce_title_first {
      margin-right: 36px;
    }
  }
}
</style>
