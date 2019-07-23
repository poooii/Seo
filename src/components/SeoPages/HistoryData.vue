<template>
  <div @click="hideSearchBox">
    <!-- 头部 -->
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">历史数据</p>
        <div class="websiteValue_banner_input">
          <form @submit.prevent>
            <div class="search_downlist" @click.stop>
              <ul>
                <li
                  :class="{show:searchIdx==idx||searchIdx==undefined}"
                  v-for="(item,idx) in downList"
                  @click="changeSearch(idx)"
                >{{item.name}}</li>
              </ul>
              <i></i>
            </div>
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
        <!-- 热门搜索 -->
        <div class="clearfix websiteValue_banner_ul1">
          <span class="websiteValue_banner_ul_title">热门搜索：</span>
          <ul class="websiteValue_banner_ul clearfix">
            <li v-for="items in hotsearch">
              <a @click="searchHot(items)">{{items}}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="main_content" v-if="!content==''">
      <div class="content_title">{{title}}</div>
      <div class="lishi_range clearfix">
        <div class="search_check fl">
          <ul>
            <li :class="{active:range=='1'}" @click="changeRange(1)">一个月</li>
            <li :class="{active:range=='3'}" @click="changeRange(3)">三个月</li>
            <li :class="{active:range=='6'}" @click="changeRange(6)">半年</li>
          </ul>
        </div>
        <div class="range">
          <div class="prev" @click="changeYear(false)">
            <i class="ico-pager-prev"></i>
          </div>
          <div class="next" @click="changeYear(true)">
            <i class="ico-pager-next"></i>
          </div>
          <!--<div class="prevYear" v-model="prevyear">{{prevyear}}年</div>-->
          <!--<div class="nextYear" v-model="nextyear">{{nextyear}}年</div>-->
          <div class="list">
            <ul class="date_range">
              <li
                @click="getMonthsBym(item.y,item.m)"
                :class="{active:item.s>0}"
                v-for="(item) in months"
              >
                {{item.m}}月
                <span class="y" v-if="item.m == 1">{{item.y}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 搜索超时 -->
      <div class="cha_default" v-show="!foundNull">未查询到数据，请稍候再试</div>
      <!-- SEO搜索结果 -->
      <div v-if="showViews=='0'" v-show="foundNull">
        <div class="chart_container">
          <div class="title_container">
            <span :class="{color_line_blue:seoresult=='0'}" @click="changeSeoresult('0')">PC词量</span>
            <span :class="{color_line_blue:seoresult=='1'}" @click="changeSeoresult('1')">移动词量</span>
            <span :class="{color_line_blue:seoresult=='2'}" @click="changeSeoresult('2')">百度PC来路</span>
            <span :class="{color_line_blue:seoresult=='3'}" @click="changeSeoresult('3')">百度移动来路</span>
            <span :class="{color_line_blue:seoresult=='4'}" @click="changeSeoresult('4')">总预计来路</span>
            <span :class="{color_line_blue:seoresult=='5'}" @click="changeSeoresult('5')">PC权重</span>
            <span :class="{color_line_blue:seoresult=='6'}" @click="changeSeoresult('6')">移动权重</span>
          </div>
          <LineCharts
            :xdata="xdata"
            :showxis="showxis"
            :option="series"
            :styl="{width: '1140px', height: '360px'}"
            id="paimingChart"
          ></LineCharts>
        </div>
        <div class="paiming_table_container">
          <table width="1200px">
            <tr>
              <td>日期</td>
              <td>PC权重</td>
              <td>移动权重</td>
              <td>PC词量</td>
              <td>移动词量</td>
              <td>百度PC来路</td>
              <td>百度移动来路</td>
              <td>总预计来路</td>
            </tr>
            <tr v-for="(list,index) in seoList.data">
              <td>{{seoList.data[index]}}</td>
              <td>{{seoList.BR[index]}}</td>
              <td>{{seoList.mBR[index]}}</td>
              <td>{{seoList.pcSum[index]|NumFormat}}</td>
              <td>{{seoList.mSum[index]|NumFormat}}</td>
              <td>{{seoList.pcIP[index]|NumFormat}}</td>
              <td>{{seoList.mIP[index]|NumFormat}}</td>
              <td>{{seoList.IP[index]|NumFormat}}</td>
            </tr>
            <tr>
              <td>平均值</td>
              <td>{{seoList.BrAvg}}</td>
              <td>{{seoList.mBrAvg}}</td>
              <td>{{seoList.pcSumAvg}}</td>
              <td>{{seoList.mSumAvg}}</td>
              <td>{{seoList.pcIPAvg}}</td>
              <td>{{seoList.mIPAvg}}</td>
              <td>{{seoList.IPAvg}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- ALEAX搜索结果 -->
      <div v-if="showViews=='1'" v-show="foundNull">
        <div class="chart_container">
          <div class="title_container">
            <span :class="{color_line_blue:aleaxresult=='0'}" @click="changeAleaxresult('0')">今日排名</span>
            <span :class="{color_line_blue:aleaxresult=='1'}" @click="changeAleaxresult('1')">一周平均排名</span>
            <span :class="{color_line_blue:aleaxresult=='2'}" @click="changeAleaxresult('2')">一月平均排名</span>
            <span :class="{color_line_blue:aleaxresult=='3'}" @click="changeAleaxresult('3')">三月平均排名</span>
          </div>
          <LineCharts
            :xdata="xdata"
            :showxis="showxis"
            :option="series"
            :styl="{width: '1140px', height: '360px'}"
            id="paimingChart"
          ></LineCharts>
        </div>
        <div class="paiming_table_container">
          <table width="1200px">
            <tr>
              <td>日期</td>
              <td>今日排行</td>
              <td>一周平均排名</td>
              <td>一月平均排名</td>
              <td>三月平均排名</td>
            </tr>
            <tr v-for="(list,index) in aleaxList.data">
              <td>{{aleaxList.data[index]}}</td>
              <td>
                {{aleaxList.alexa_1days_value[index]|changeEmpty}}
                <span
                  :class="aleaxList.alexa_1days_value[index]-aleaxList.alexa_1days_value[index+1]>0?'upper':'lower'"
                >
                  <i></i>
                  {{aleaxList.alexa_1days_value[index]-aleaxList.alexa_1days_value[index+1]|aleaxSort}}
                </span>
              </td>
              <td>
                {{aleaxList.alexa_7days_value[index]|changeEmpty}}
                <span
                  :class="aleaxList.alexa_7days_value[index]-aleaxList.alexa_7days_value[index+1]>0?'upper':'lower'"
                >
                  <i></i>
                  {{aleaxList.alexa_7days_value[index]-aleaxList.alexa_7days_value[index+1]|aleaxSort}}
                </span>
              </td>
              <td>
                {{aleaxList.alexa_1months_value[index]|changeEmpty}}
                <span
                  :class="aleaxList.alexa_1months_value[index]-aleaxList.alexa_1months_value[index+1]>0?'upper':'lower'"
                >
                  <i></i>
                  {{aleaxList.alexa_1months_value[index]-aleaxList.alexa_1months_value[index+1]|aleaxSort}}
                </span>
              </td>
              <td>
                {{aleaxList.alexa_3months_value[index]|changeEmpty}}
                <span
                  :class="aleaxList.alexa_3months_value[index]-aleaxList.alexa_3months_value[index+1]>0?'upper':'lower'"
                >
                  <i></i>
                  {{aleaxList.alexa_3months_value[index]-aleaxList.alexa_3months_value[index+1]|aleaxSort}}
                </span>
              </td>
            </tr>
            <tr>
              <td>平均数</td>
              <td>{{aleaxList.alexa_1days_avg}}</td>
              <td>{{aleaxList.alexa_7days_avg}}</td>
              <td>{{aleaxList.alexa_1months_avg}}</td>
              <td>{{aleaxList.alexa_1months_avg}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 收录/反链搜索结果 -->
      <div v-if="showViews=='2'" v-show="foundNull">
        <div class="chart_container">
          <div class="title_container">
            <span :class="{color_line_blue:shouluresult=='0'}" @click="changeShouluresult('0')">百度收录</span>
            <span :class="{color_line_blue:shouluresult=='1'}" @click="changeShouluresult('1')">百度索引</span>
            <span :class="{color_line_blue:shouluresult=='2'}" @click="changeShouluresult('2')">百度反链</span>
            <span :class="{color_line_blue:shouluresult=='3'}" @click="changeShouluresult('3')">搜狗收录</span>
            <span :class="{color_line_blue:shouluresult=='4'}" @click="changeShouluresult('4')">搜狗反链</span>
            <span
              :class="{color_line_blue:shouluresult=='5'}"
              @click="changeShouluresult('5')"
            >360收录</span>
            <span
              :class="{color_line_blue:shouluresult=='6'}"
              @click="changeShouluresult('6')"
            >360反链</span>
          </div>
          <LineCharts
            :xdata="xdata"
            :showxis="showxis"
            :option="series"
            :styl="{width: '1140px', height: '360px'}"
            id="paimingChart"
          ></LineCharts>
        </div>
        <div class="paiming_table_container">
          <table width="1200px">
            <tr>
              <td>日期</td>
              <td>百度收录</td>
              <td>百度索引</td>
              <td>百度反链</td>
              <td>搜狗收录</td>
              <td>搜狗反链</td>
              <td>360收录</td>
              <td>360反链</td>
            </tr>
            <tr v-for="(list,index) in shouluList.data">
              <td>{{shouluList.data[index]}}</td>
              <td>{{shouluList.baidu[index]|changeEmpty}}</td>
              <td>{{shouluList.baiduindex[index]|changeEmpty}}</td>
              <td>{{shouluList.baidu_r[index]|changeEmpty}}</td>
              <td>{{shouluList.sogou[index]|changeEmpty}}</td>
              <td>{{shouluList.sogou_r[index]|changeEmpty}}</td>
              <td>{{shouluList['360'][index]|changeEmpty}}</td>
              <td>{{shouluList['360_r'][index]|changeEmpty}}</td>
            </tr>
            <tr>
              <td>平均数</td>
              <td>{{shouluList.baiduAvg}}</td>
              <td>{{shouluList.baiduindexAvg}}</td>
              <td>{{shouluList.baidu_rAvg}}</td>
              <td>{{shouluList.sogouAvg}}</td>
              <td>{{shouluList.sogou_rAvg}}</td>
              <td>{{shouluList.Avg360}}</td>
              <td>{{shouluList.Avg360_r}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
  </div>
</template>

<script>
import LineCharts from "../Echarts/line";
import NearlySearch from "../BaseComponents/NearlySearch";
import G from "../../api/G";

export default {
  name: "HistoryData",
  components: {
    LineCharts,
    NearlySearch
  },
  data() {
    return {
      //标题
      title: "",

      // 控制不同分类的搜索结果显示
      showViews: "0",
      downList: [
        {
          name: "百度SEO历史",
          idx: "0"
        },
        {
          name: "Aleax排名历史",
          idx: "1"
        },
        {
          name: "收录/反链历史",
          idx: "2"
        }
      ],
      //seo搜索结果图表
      seoresult: "0",
      //aleax搜索图表
      aleaxresult: "0",
      //收录反链图表
      shouluresult: "0",
      // 折线图坐标轴
      showxis: true,
      // 时间选择器年份
      prevyear: G.Y - 1,
      nextyear: G.Y,

      // 搜索内容
      search: "seo",

      //图标显示控制

      foundNull: true,
      // 时间选择器时间范围
      range: "1",
      // 搜索框三个分类
      searchIdx: "0",
      SeoContent: "",
      content: "",
      // 热门搜索测试数据
      hotsearch: [
        "po188.com",
        "www.hj135.com",
        "jiaofu.cn",
        "riyiseo.com",
        "shuadan.cn",
        "caoping6s.cn",
        "014121.cn"
      ],
      // 月份作为固定数据
      months: {},
      sel_m: "",
      sel_y: "",
      // 初始选中的月份
      // 初始选中的带小箭头的月份
      // 折线图测试数据
      xdata: [],
      //结束时间
      e: "",
      //开始时间
      s: "",
      // 折线图测试数据
      series: [],
      //折线图下方表格数据
      seoList: "",
      aleaxList: "",
      shouluList: "",
      shouluXdata: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
      },
      seoRes: {
        0: [
          {
            name: "PC词量",
            type: "line",
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        1: [
          {
            name: "移动词量",
            type: "line",
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        2: [
          {
            name: "百度PC来路",
            type: "line",
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        3: [
          {
            name: "百度移动来路",
            type: "line",
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        4: [
          {
            name: "总预计来路",
            type: "line",
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        5: [
          {
            name: "PC权重",
            type: "line",
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        6: [
          {
            name: "移动权重",
            type: "line",
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ]
      },
      aleaxRes: {
        0: [
          {
            name: "今日排行",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        1: [
          {
            name: "一周平均排名",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        2: [
          {
            name: "一月平均排名",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        3: [
          {
            name: "三月平均排名",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ]
      },
      shouluRes: {
        0: [
          {
            name: "百度收录",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        1: [
          {
            name: "百度索引",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        2: [
          {
            name: "百度反链",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        3: [
          {
            name: "搜狗收录",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        4: [
          {
            name: "搜狗反链",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        5: [
          {
            name: "360收录",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ],
        6: [
          {
            name: "360反链",
            type: "line",
            smooth: true,
            symbol: "none",
            data: [],
            areaStyle: { normal: { color: "#e2f4ff" } }
          }
        ]
      }
    };
  },
  methods: {
    getMonthsBym(y, m) {
      (this.sel_m = m), (this.sel_y = y);
      var l = G.D.getMonth() + 1,
        a = [],
        r = this.range,
        m_c = m + 1,
        m_y = y,
        ms = (G.Y - y) * 12 + l - m;
      ms = ms > 9 ? 9 : ms;
      for (var i = ms; i > 0; i--) {
        if (++m > 12) (m = 1), y++;
        a.push({ m: m, y: y, s: 0 });
      }
      for (var i = 0; a.length <= 18; i++) {
        if (--m_c < 1) (m_c = 12), m_y--;
        a.unshift({ m: m_c, y: m_y, s: r-- });
      }
      this.months = a;
      this.e = this.getEDate(this.sel_y, this.sel_m);
      this.s = this.getSDate(this.sel_y, this.sel_m, this.range);
      this.seoresult = 0;
      this.aleaxresult = 0;
      this.shouluresult = 0;
      if (this.showViews == "0") this.getHiswave2();
      if (this.showViews == "2") this.getHiswave();
      if (this.showViews == "1") this.getHiswave3();
    },
    getWebpage() {
      return this.$http
        .get("/Api/seo/webpage", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.title = res.data.html.title ? res.data.html.title : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getHiswave() {
      // 反链
      this.bus.$emit("loading", true);
      return this.$http
        .get("/Api/BaiduRank/hiswave", {
          params: {
            domain: this.content,
            begintime: this.s,
            endtime: this.e
          }
        })
        .then(res => {
          if (res.data === null || res.data === false) {
            this.foundNull = false;
            this.bus.$emit("loading", false);
          } else {
            this.foundNull = true;
            var msg = JSON.parse(JSON.stringify(res.data));
            this.shouluXdata[0] = msg.date.baidu.reverse();
            this.shouluXdata[1] = msg.date.baiduindex.reverse();
            this.shouluXdata[2] = msg.date.baidu_r.reverse();
            this.shouluXdata[3] = msg.date.sogou.reverse();
            this.shouluXdata[4] = msg.date.sogou_r.reverse();
            this.shouluXdata[5] = msg.date["360"].reverse();
            this.shouluXdata[6] = msg.date["360_r"].reverse();
            this.shouluRes[0][0].data = msg.series.baidu.reverse();
            this.shouluRes[1][0].data = msg.series.baiduindex.reverse();
            this.shouluRes[2][0].data = msg.series.baidu_r.reverse();
            this.shouluRes[3][0].data = msg.series.sogou.reverse();
            this.shouluRes[4][0].data = msg.series.sogou_r.reverse();
            this.shouluRes[5][0].data = msg.series["360"].reverse();
            this.shouluRes[6][0].data = msg.series["360_r"].reverse();
            this.xdata = this.shouluXdata[0];
            this.series = this.shouluRes[0];
            this.shouluList = res.data.series;
            this.shouluList.data = res.data.date.baidu;
            this.shouluList.baiduAvg = this.avg(msg.series.baidu);
            this.shouluList.baiduindexAvg = this.avg(msg.series.baiduindex);
            this.shouluList.baidu_rAvg = this.avg(msg.series.baidu_r);
            this.shouluList.sogouAvg = this.avg(msg.series.sogou);
            this.shouluList.sogou_rAvg = this.avg(msg.series.sogou_r);
            this.shouluList.Avg360 = this.avg(msg.series["360"]);
            this.shouluList.Avg360_r = this.avg(msg.series["360_r"]);
            this.bus.$emit("loading", false);
          }
        })
        .catch(res => {
          console.log(res.msg);
          this.foundNull = false;
          this.bus.$emit("loading", false);
        });
    },
    getHiswave3() {
      // aleax
      this.bus.$emit("loading", true);
      return this.$http
        .get("/Api/BaiduRank/hiswave3", {
          params: {
            domain: this.content,
            begintime: this.s,
            endtime: this.e
          }
        })
        .then(res => {
          if (res.data === null || res.data === false) {
            this.foundNull = false;
            this.bus.$emit("loading", false);
          } else {
            this.foundNull = true;
            var msg = JSON.parse(JSON.stringify(res.data));
            this.xdata = msg.date.alexa_1days_value.reverse();
            this.aleaxRes[0][0].data = msg.series.alexa_1days_value.reverse();
            this.aleaxRes[1][0].data = msg.series.alexa_7days_value.reverse();
            this.aleaxRes[2][0].data = msg.series.alexa_1months_value.reverse();
            this.aleaxRes[3][0].data = msg.series.alexa_3months_value.reverse();
            this.series = this.aleaxRes[0];
            this.aleaxList = res.data.series;
            this.aleaxList.data = res.data.date.alexa_1days_value;
            this.aleaxList.alexa_1days_avg = this.avg(
              msg.series.alexa_1days_value
            );
            this.aleaxList.alexa_7days_avg = this.avg(
              msg.series.alexa_7days_value
            );
            this.aleaxList.alexa_1months_avg = this.avg(
              msg.series.alexa_1months_value
            );
            this.aleaxList.alexa_3months_avg = this.avg(
              msg.series.alexa_3months_value
            );
            this.bus.$emit("loading", false);
          }
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    },
    getHiswave2() {
      // seo历史
      this.bus.$emit("loading", true);
      return this.$http
        .get("/Api/BaiduRank/hiswave2", {
          params: {
            domain: this.content,
            begintime: this.s,
            endtime: this.e
          }
        })
        .then(res => {
          if (res.data === null || res.data === false) {
            this.foundNull = false;
            this.bus.$emit("loading", false);
          } else {
            this.foundNull = true;
            var msg = JSON.parse(JSON.stringify(res.data));
            this.xdata = msg.date.pcSum.reverse();
            this.seoRes[0][0].data = msg.series.pcSum.reverse();
            this.seoRes[1][0].data = msg.series.mSum.reverse();
            this.seoRes[2][0].data = msg.series.pcIP.reverse();
            this.seoRes[3][0].data = msg.series.mIP.reverse();
            this.seoRes[4][0].data = msg.series.IP.reverse();
            this.seoRes[5][0].data = msg.series.BR.reverse();
            this.seoRes[6][0].data = msg.series.mBR.reverse();
            this.series = this.seoRes[0];
            this.seoList = res.data.series;
            this.seoList.data = res.data.date.pcSum;
            this.seoList.BrAvg = this.avg(msg.series.BR);
            this.seoList.mBrAvg = this.avg(msg.series.mBR);
            this.seoList.pcSumAvg = this.avg(msg.series.pcSum);
            this.seoList.mSumAvg = this.avg(msg.series.mSum);
            this.seoList.pcIPAvg = this.avg(msg.series.pcIP);
            this.seoList.mIPAvg = this.avg(msg.series.mIP);
            this.seoList.IPAvg = this.avg(msg.series.IP);
            this.bus.$emit("loading", false);
          }
        })
        .catch(res => {
          console.log(res.msg);
          this.bus.$emit("loading", false);
        });
    },
    // 改变搜索分类
    changeSearch(index) {
      if (this.searchIdx == index) {
        this.searchIdx = undefined;
      } else {
        let str = this.downList.splice(index, 1);
        this.downList.unshift(str[0]);
        this.searchIdx = 0;
      }
    },
    // 隐藏搜索框不用管
    hideSearchBox() {
      if (this.searchIdx == undefined) {
        this.searchIdx = 0;
      }
    },
    // 改变搜索范围后面用range当参数
    changeRange(range) {
      this.range = range;
      this.getMonthsBym(this.sel_y, this.sel_m);
    },
    // 改变年份的两个
    changeYear(b) {
      var nowDate = new Date();
      var nowyear = nowDate.getFullYear();
      var nextYear = this.months[this.months.length - 1].y;
      for (var i in this.months) {
        if (b && nextYear < nowyear) {
          this.months[i].y++;
        } else if (!b) {
          this.months[i].y--;
        }
        if (this.months[i].y == this.sel_y && this.months[i].m == this.sel_m) {
          for (var j = this.range - 1; j >= 0; j--) {
            this.months[parseInt(i) - parseInt(j)].s = 1;
          }
        } else {
          this.months[i].s = 0;
        }
      }
    },
    //结束时间格式化
    getEDate(y, m) {
      var e = new Date(y, m, 0),
        t = e.getFullYear(),
        a = e.getMonth() + 1,
        r = e.getDate(),
        i = t + "-";
      return (
        a < 10 && (i += "0"), (i += a + "-"), r < 10 && (i += "0"), (i += r)
      );
    },

    //开始时间格式化
    getSDate(y, m, o) {
      var e = new Date(y, m - o, 1),
        t = e.getFullYear(),
        a = e.getMonth() + 1,
        r = e.getDate(),
        i = t + "-";
      return (
        a < 10 && (i += "0"), (i += a + "-"), r < 10 && (i += "0"), (i += r)
      );
    },
    //切换seoresult图表
    changeSeoresult(idx) {
      this.seoresult = idx;
      this.series = this.seoRes[idx];
    },
    //切换aleax图表
    changeAleaxresult(idx) {
      this.aleaxresult = idx;
      this.series = this.aleaxRes[idx];
    },
    //切换收录反链图表
    changeShouluresult(idx) {
      this.shouluresult = idx;
      this.xdata = this.shouluXdata[idx];
      this.series = this.shouluRes[idx];
    },
    // 热门搜索
    searchHot(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.SeoContent = storage.searchContent;
      this.content = storage.searchContent;
      this.showViews = this.downList[0].idx;
      this.getAll();
    },
    // 最近搜索
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      this.SeoContent = storage.searchContent;
      this.showViews = this.downList[0].idx;
      this.getAll();
      window.scrollTo(0, 0);
    },
    //数组求平均
    avg(array) {
      var len = array.length;
      var sum = 0;
      for (var i = 0; i < len; i++) {
        sum += array[i] * 1;
      }
      return (sum / len).toFixed(0);
    },
    // 搜索框搜索
    getList() {
      let netReg =
        "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$";
      let netRe = new RegExp(netReg);
      if (!netRe.test(this.SeoContent)) {
        alert("请输入正确域名,域名不包括(http://以及https://)");
        return false;
      }
      this.content = this.SeoContent;
      this.$router.replace({
        name: "HistoryData",
        params: { domain: this.content }
      });
      this.showViews = this.downList[0].idx;
      let storage = window.sessionStorage;
      storage.setItem("searchContent", this.content);
      this.getAll();
      setTimeout(() => {
        this.bus.$emit("loading", false);
      }, 2000);
    },
    getAll() {
      this.bus.$emit("loading", true);
      this.$http.all([this.getMonthsBym(G.Y, G.M), this.getWebpage()]).then(
        this.$http.spread((acct, perms) => {
          this.bus.$emit("loading", false);
        })
      );
    }
  },
  filters: {
    NumFormat(value) {
      if (!value) return "-";
      var intPartFormat = value
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
      return intPartFormat;
    },
    aleaxSort(val) {
      var result = val;
      if (val < 0) result = val;
      if (val > 0) result = "+" + val;
      return result;
    },
    changeEmpty(val) {
      var result = val;
      if (!val) result = "-";
      return result;
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.getAll();
    } else {
      if (
        this.$route.params.shcontent !== undefined &&
        this.$route.params.shcontent !== ""
      ) {
        this.content = this.$route.params.shcontent;
        this.SeoContent = this.$route.params.shcontent;
        this.getAll();
      }
    }
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
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
  width: 80%;
  height: 50px;
  border-radius: 4px;
  border: none;
  outline: none;
  text-indent: 20px;
  margin-left: 150px;
}

.websiteValue_banner_input {
  position: relative;
  margin-top: 28px;
  height: 70px;
}

.websiteValue_banner_input form {
  border: 1px solid #ebebeb;
  background: #fff;
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
  cursor: pointer;
}

.websiteValue_banner_ul_title {
  float: left;
}

.websiteValue_banner_ul a:hover {
  color: #007bb7;
}

.y {
  position: absolute;
  top: -30px;
  left: -1px;
  padding-left: 5px;
  border-left: 1px solid #ebebeb;
  height: 34px;
  font-size: 14px;
  color: #666;
}

.search_downlist {
  width: 150px;
  height: 50px;
  background: #f3f3f3;
  position: absolute;

  i {
    background-image: url(../../assets/icon_arrowdown.png);
    position: absolute;
    width: 20px;
    height: 20px;
    top: 15px;
    right: 10px;
  }

  ul {
    li {
      font-size: 14px;
      color: #666;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      text-align: left;
      padding-left: 20px;
      background: #f3f3f3;
      border-bottom: 1px solid #ebebeb;
      display: none;
    }

    .show {
      display: block;
    }
  }
}

.main_content {
  width: 1200px;
  margin: 0 auto;

  .content_title {
    font-size: 24px;
    color: #333;
    margin: 60px 0 35px 0;
  }
}

.lishi_range {
  .search_check {
    margin: 20px 0 0;

    ul {
      li {
        float: left;
        margin-left: -1px;
        border: 1px solid #e3e3e3;
        background: #f7f7f7;
        padding: 10px 12px;
        color: #999;
        cursor: pointer;
      }

      .active {
        position: relative;
        color: #47a7e2;
        border-color: #99d8ff;
        background: #e0f3ff;
      }
    }
  }

  .range {
    position: relative;
    float: right;
    margin-top: 20px;
    width: 1000px;
    height: 39px;

    .prev {
      position: absolute;
      left: -18px;
      z-index: 3;
      top: -25px;
      width: 24px;
      height: 24px;
      cursor: pointer;

      i {
        width: 24px;
        height: 24px;
        display: block;
        background-image: url(../../assets/icon_prev.png);
      }
    }

    .next {
      position: absolute;
      right: 32px;
      z-index: 3;
      top: -25px;
      width: 24px;
      height: 24px;
      cursor: pointer;

      i {
        width: 24px;
        height: 24px;
        display: block;
        background-image: url(../../assets/icon_next.png);
      }
    }

    .prevYear {
      position: absolute;
      left: 30px;
      z-index: 3;
      top: -22px;
      left: 150px;
      padding-left: 5px;
      border-left: 1px solid #ebebeb;
      height: 24px;
      font-size: 14px;
      color: #666;
    }

    .nextYear {
      position: absolute;
      right: 30px;
      z-index: 3;
      top: -22px;
      right: 197px;
      border-left: 1px solid #ebebeb;
      padding-left: 5px;
      height: 24px;
      font-size: 14px;
      color: #666;
    }

    .date_range {
      li {
        position: relative;
        float: left;
        width: 49px;
        line-height: 37px;
        text-align: center;
        color: #666;
        border-left: solid 1px #e6e6e6;
        border-top: solid 1px #e6e6e6;
        border-bottom: solid 1px #e6e6e6;
        background: #f7f7f7;
        cursor: pointer;
      }

      li:last-child {
        border-right: 1px solid #e6e6e6;
        width: 48px;
      }

      .active {
        position: relative;
        z-index: 2;
        border-color: #99d8ff;
        background: #e0f3ff;
        color: #47a7e2;
      }

      .firstactive:before {
        content: "";
        display: block;
        position: absolute;
        top: 42px;
        left: 20px;
        width: 0;
        height: 0;
        font-size: 0;
        line-height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #2aa0ea;
      }

      .active:after {
        content: "";
        display: block;
        position: absolute;
        top: -1px;
        right: -1px;
        width: 1px;
        height: 39px;
        background: #99d8ff;
      }
    }
  }
}

.chart_container {
  height: 440px;
  border: 1px solid #ebebeb;
  margin-top: 30px;

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
      font-size: 16px;
    }

    .color_line_blue {
      border-bottom: 2px solid #2aa0ea;
      color: #2aa0ea;
    }
  }
}
.paiming_table_container {
  color: #666;
  margin-top: 20px;
  height: auto;
  margin-bottom: 60px;
  table {
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;

    tr {
      td {
        border-left: 1px solid #ebebeb;
        border-top: 1px solid #ebebeb;
        text-align: center;
        vertical-align: middle;
        height: 50px;
        font-size: 16px;

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
            margin-left: 5px;
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
            margin-left: 5px;
          }
        }
      }
    }

    tr:first-child {
      td {
        background: #fafafa;
      }
    }
    tr:last-child {
      td {
        color: #2097db;
        background: #f0f8ff;
      }
    }
    tr:nth-last-child(2) {
      span {
        display: none;
      }
    }
  }
}
</style>
