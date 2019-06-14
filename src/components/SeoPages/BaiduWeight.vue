<template>
    <div>
        <!-- 头部搜索框 -->
        <SearchBox :content="content" :title="title" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
        <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
        <div class="baidu_main_content" v-if="!content==''">
            <div class="content_title">
                <span class="t_title">{{title}}</span>
            </div>
            <div>
                <ul class="weight_content clearfix">
                    <li class="weight_details">
                        <img class="baidu_tags" src="../../assets/weight_01.png" alt>
                        <ol>
                            <li>
                                预计来路：
                                <span class="color_blue">{{pc_ip}}</span> IP
                            </li>
                            <li>
                                权重：
                                <img src="../../assets/bd_wt.png" alt>
                                <i>{{br}}</i>
                            </li>
                            <li>
                                分类：
                                <span class="color_blue">-</span>
                            </li>
                            <li>分类排名：-</li>
                            <li>分类关键词：-</li>
                            <li>分类指数：-</li>
                        </ol>
                    </li>
                    <li class="weight_details">
                        <img class="baidu_tags" src="../../assets/weight_02.png" alt>
                        <ol>
                            <li>
                                预计来路：
                                <span class="color_blue">{{m_ip}}</span> IP
                            </li>
                            <li>
                                权重：
                                <img src="../../assets/bd_wt.png" alt>
                                <i>{{br_m}}</i>
                            </li>
                            <li>
                                分类：
                                <span class="color_blue">-</span>
                            </li>
                            <li>分类排名：-</li>
                            <li>分类关键词：-</li>
                            <li>分类指数：-</li>
                        </ol>
                    </li>
                    <li class="weight_details">
                        <img class="baidu_tags" src="../../assets/weight_03.png" alt>
                        <ol>
                            <li>
                                总来路：
                                <span class="color_blue">{{t_ip}}</span> IP
                            </li>
                            <li>百度收录：{{baidu_sl}}</li>
                            <li>24小时收录：{{shoulu_1day}}</li>
                            <li>百度索引：{{baiduindex}}</li>
                            <li>一周收录：{{shoulu_7day}}</li>
                            <li>一月收录：{{shoulu_30day}}</li>
                        </ol>
                    </li>
                </ul>
            </div>
            <!-- 折线图 -->
            <div class="chart_container">
                <div class="title_container">
                    <span :class="{color_line_blue:weightType=='0'}" @click="changeWeightType('0')">总关键词</span>
                    <span :class="{color_line_blue:weightType=='1'}" @click="changeWeightType('1')">预计来路</span>
                    <span :class="{color_line_blue:weightType=='2'}" @click="changeWeightType('2')">权重</span>
                    <span :class="{color_line_blue:weightType=='3'}" @click="changeWeightType('3')">收录</span>
                    <span :class="{color_line_blue:weightType=='4'}" @click="changeWeightType('4')">索引</span>
                    <template v-if="this.weightType=='0'||this.weightType=='1'">
            <span class="fr">
              <i class="eyellow"></i>总量
            </span>
                        <span class="fr">
              <i class="eblue"></i>移动端
            </span>
                        <span class="fr">
              <i class="egreen"></i>PC端
            </span>
                    </template>
                    <template v-if="this.weightType=='2'">
            <span class="fr">
              <i class="eblue"></i>移动端
            </span>
                        <span class="fr">
              <i class="egreen"></i>PC端
            </span>
                    </template>
                    <template v-if="this.weightType=='3'||this.weightType=='4'">
            <span class="fr">
              <i class="eyellow"></i>总量
            </span>
                    </template>
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
                    <li v-for="items in related_web">
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
                        <td>{{seriesRes[4].data[seriesRes[4].data.length-1]}}</td>
                        <td>{{seriesRes_m[4].data[seriesRes_m[4].data.length-1]}}</td>
                    </tr>
                    <tr v-for="(item,index) in trend_list">
                        <td>{{`第${index+1}页`}}</td>
                        <td>
                            {{item.pc}}
                            <span :class="{upper:item.value>0,lower:item.value<0,equal:item.value==0}">
                <i></i>
                <b>{{item.value}}</b>
                （{{(item.pc/seriesRes[4].data[seriesRes[4].data.length-1]*100).toFixed(2)+"%"}}）
              </span>
                        </td>
                        <td>
                            {{item.mb}}
                            <span :class="{upper:item.value_m>0,lower:item.value_m<0,equal:item.value_m==0}">
                <i></i>
                <b>{{item.value_m}}</b>
                （{{(item.mb/seriesRes[4].data[seriesRes[4].data.length-1]*100).toFixed(2)+"%"}}）
              </span>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 排名趋势echarts -->
            <div class="chart_container clearfix">
                <div class="title_container">
                    <span class="ranking_trend">排名趋势</span>
                    <span :class="{color_blue:rankingTrend=='0'}" @click="changeRankingTrend('0')">PC端</span>
                    <span :class="{color_blue:rankingTrend=='1'}" @click="changeRankingTrend('1')">移动端</span>
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
                        :xdata="xdata2"
                        :option="series2"
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
            <!-- <div class="commerce_box">
              <div class="commerce_title">
                <span class="commerce_title_name">平台</span>
                <span
                  class="commerce_title_first"
                  :class="{color_blue:networks=='pc'}"
                  @click="changeNetworks('pc')"
                >PC端</span>
                <span :class="{color_blue:networks=='m'}" @click="changeNetworks('m')">移动端</span>
              </div>
              <div class="chart_container" style="padding:0">
                <div class="title_container">
                  <span :class="{color_line_blue:keywordsType=='0'}" @click="changeKeywords('0')">涨入关键词</span>
                  <a @click="goToWeightDetail" href="javascript:void(0)">></a>
                  <span :class="{color_line_blue:keywordsType=='1'}" @click="changeKeywords('1')">跌出关键词</span>
                  <a @click="goToWeightDetail" href="javascript:void(0)">></a>
                </div>
                <table width="1200px" class="commerce_table">
                  <tr>
                    <td>关键词</td>
                    <td>搜索量</td>
                    <td>新排名</td>
                    <td>旧排名</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="chart_container" style="padding:0;margin-bottom:60px">
              <div class="title_container">
                <span
                  v-for="(item,index) in keywordsName"
                  :class="{color_line_blue:keywords==index}"
                  @click="changeKeywordsKey(index)"
                >{{item}}</span>
              </div>
              <table width="1200px" class="commerce_detail_table">
                <tr>
                  <td>关键词</td>
                  <td>排名</td>
                  <td>（PC）搜索量</td>
                  <td>收录量</td>
                  <td>网页标题</td>
                </tr>
              </table>
              <div class="page_box">
                <span><</span>
                <span v-for="num in 10">{{num}}</span>
                <span>...</span>
                <span>50</span>
                <span>></span>
              </div>
            </div>-->
        </div>
        <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
    </div>
</template>

<script>
    import LineCharts from "../Echarts/line";
    import circleCharts from "../Echarts/circle";
    import SearchBox from "../BaseComponents/SearchBox";
    import NearlySearch from "../BaseComponents/NearlySearch";

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
                // 折线图坐标轴显示
                showxis: true,
                title: "百度权重",
                content: "",
                SeoContent: "",
                br: "",
                br_m: "",
                related_web: [],
                dayschange: "2",
                //折线图分类
                weightType: "0",
                //平台pc移动切换
                networks: "pc",
                //涨入跌出关键词
                keywordsType: "0",
                //最后一张表格的分类
                keywords: "0",

                //第一table
                m_ip: "",
                pc_ip: "",
                t_ip: "",
                shoulu_1day: "",
                shoulu_7day: "",
                shoulu_30day: "",
                baidu_sl: "",
                baiduindex: "",
                title:'',
                //关键词名称
                keywordsName: ["/", "mipd", "company", "z", "n", "x"],
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
                trend_list: [
                    {
                        pc: "1",
                        mb: "",
                        value: "",
                        value_m: ""
                    },
                    {
                        pc: "",
                        mb: "",
                        value: "",
                        value_m: ""
                    },
                    {
                        pc: "",
                        mb: "",
                        value: "",
                        value_m: ""
                    },
                    {
                        pc: "",
                        mb: "",
                        value: "",
                        value_m: ""
                    },
                    {
                        pc: "",
                        mb: "",
                        value: "",
                        value_m: ""
                    }
                ],
                xdata: [],
                series: [],
                keySumRes: [
                    {
                        name: "移动端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "PC端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "总量",
                        type: "line",
                        symbol: "none",
                        data: []
                    }
                ],
                ipRes: [
                    {
                        name: "移动端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "PC端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "总量",
                        type: "line",
                        symbol: "none",
                        data: []
                    }
                ],
                rankRes: [
                    {
                        name: "移动端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "PC端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "总量",
                        type: "line",
                        symbol: "none",
                        data: []
                    }
                ],
                bdshouluRes: [
                    {
                        name: "移动端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "PC端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "总量",
                        type: "line",
                        symbol: "none",
                        data: []
                    }
                ],
                bdsuoyinRes: [
                    {
                        name: "移动端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "PC端",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "总量",
                        type: "line",
                        symbol: "none",
                        data: []
                    }
                ],
                // 第二张图表数据
                rankingTrend: "0",
                xdata2: [],
                series2: [],
                xdataRes: [],
                xdataRes_m: [],
                seriesRes: [
                    {
                        name: "前10",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "前20号",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "前30",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "前40",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "前50",
                        type: "line",
                        symbol: "none",
                        data: []
                    }
                ],
                seriesRes_m: [
                    {
                        name: "前10",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "前20号",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "前30",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "前40",
                        type: "line",
                        symbol: "none",
                        data: []
                    },
                    {
                        name: "前50",
                        type: "line",
                        symbol: "none",
                        data: []
                    }
                ],
                cseries: [],
                cseriesRes: [
                    {
                        type: "pie",
                        radius: ["25%", "55%"],
                        center: ["50%", "50%"],
                        data: [
                            {value: 0, name: "第一页"},
                            {value: 0, name: "第二页"},
                            {value: 0, name: "第三页"},
                            {value: 0, name: "第四页"},
                            {value: 0, name: "第五页"}
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
                cseriesRes_m: [
                    {
                        type: "pie",
                        radius: ["25%", "55%"],
                        center: ["50%", "50%"],
                        data: [
                            {value: 0, name: "第一页"},
                            {value: 0, name: "第二页"},
                            {value: 0, name: "第三页"},
                            {value: 0, name: "第四页"},
                            {value: 0, name: "第五页"}
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

                // 图片测试数据
                advpic: ["adv1", "adv3", "adv2"],
                // 权重图线上数据
                weightcontent: [
                    {
                        name: "爱站权重",
                        img: "az_wt"
                    },
                    {
                        name: "站长权重",
                        img: "zz_wt"
                    },
                    {
                        name: "移动权重",
                        img: "bd_wt"
                    },
                    {
                        name: "搜狗PR",
                        img: "sg_wt"
                    },
                    {
                        name: "谷歌PR",
                        img: "gg_wt"
                    }
                ]
            };
        },
        methods: {
            // 标签切换
            ChangeDays(days) {
                this.dayschange = days;
                var seriesType = this.seriesRes_m;
                var xdataType = this.xdataRes_m;
                var echartsData = [];
                var chartXdata = [];
                if (this.rankingTrend == "0") {
                    seriesType = this.seriesRes;
                    xdataType = this.xdataRes;
                }
                echartsData = JSON.parse(JSON.stringify(seriesType));
                chartXdata = JSON.parse(JSON.stringify(xdataType));
                if (this.dayschange == "0") {
                    for (let i in echartsData) {
                        echartsData[i].data = seriesType[i].data.slice(-7);
                    }
                    chartXdata = xdataType.slice(-7);
                    this.series2 = echartsData;
                    this.xdata2 = chartXdata;
                }
                if (this.dayschange == "1") {
                    for (let i in echartsData) {
                        echartsData[i].data = seriesType[i].data.slice(-30);
                    }
                    chartXdata = xdataType.slice(-30);
                    this.series2 = echartsData;
                    this.xdata2 = chartXdata;
                }
                if (this.dayschange == "2") {
                    this.series2 = seriesType;
                    this.xdata2 = xdataType;
                }
            },
            ChangeNet(net) {
                this.related_net = net;
            },
            // 搜索框点击
            getMsg(data) {
                let storage = window.sessionStorage;
                storage.setItem("searchContent", data);
                this.content = storage.searchContent;
                this.related_web.length = 0;
                this.getAll();
                this.weightType = 0;
                this.rankingTrend = 0;
                this.dayschange = 2;
                setTimeout(() => {
                    this.bus.$emit("loading", false);
                }, 1500);
            },
            //折线图分类切换
            changeWeightType(idx) {
                this.weightType = idx;
                if (idx == "0") {
                    this.series = this.keySumRes;
                }
                if (idx == "1") {
                    this.series = this.ipRes;
                }
                if (idx == "2") {
                    this.series = this.rankRes;
                }
                if (idx == "3") {
                    this.series = this.bdshouluRes;
                }
                if (idx == "4") {
                    this.series = this.bdsuoyinRes;
                }
            },
            //切换排名趋势
            changeRankingTrend(idx) {
                this.rankingTrend = idx;
                this.ChangeDays(2);
                if (idx == "0") {
                    this.cseries = this.cseriesRes;
                }
                if (idx == "1") {
                    this.cseries = this.cseriesRes_m;
                }
            },
            //平台移动pc切换
            changeNetworks(idx) {
                this.networks = idx;
            },
            //切换涨入跌出关键词
            changeKeywords(idx) {
                this.keywordsType = idx;
            },
            //最后一张表格分类切换
            changeKeywordsKey(idx) {
                this.keywords = idx;
            },
            // 热门搜索
            searchHot(data) {
                let storage = window.sessionStorage;
                storage.setItem("searchContent", data);
                this.content = storage.searchContent;
            },
            // 最近搜索
            getNearly(msg) {
                let storage = window.sessionStorage;
                storage.setItem("searchContent", msg);
                this.content = storage.searchContent;
                window.scrollTo(0, 0);
            },
            goToWeightDetail() {
                this.$router.push({
                    name: "WeightDetail"
                });
            },
            toThousands(t) {
                return (t || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
            },
            getHiswave() {
                //收录 索引
                var a = this.getThisMonth();
                var begintime = this.getPreMonth(a, 3);
                return this.$http
                    .get("/Api/BaiduRank/hiswave", {
                        params: {
                            domain: this.content,
                            begintime: begintime,
                            endtime: a
                        }
                    })
                    .then(res => {
                        this.bdshouluRes[2].data = res.data.series.baidu.reverse();
                        this.bdsuoyinRes[2].data = res.data.series.baiduindex.reverse();
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            getHiswave2() {
                // 总关键词 预计来路 权重
                var a = this.getThisMonth();
                var begintime = this.getPreMonth(a, 3);
                return this.$http
                    .get("/Api/BaiduRank/hiswave2", {
                        params: {
                            domain: this.content,
                            begintime: begintime,
                            endtime: a
                        }
                    })
                    .then(res => {
                        var msum = res.data.series.mSum.reverse();
                        var pcsum = res.data.series.pcSum.reverse();
                        var ip = res.data.series.IP.reverse();
                        var mip = res.data.series.mIP.reverse();
                        this.keySumRes[0].data = msum;
                        this.keySumRes[1].data = pcsum;
                        this.ipRes[0].data = mip;
                        this.ipRes[1].data = ip;
                        this.rankRes[0].data = res.data.series.mBR.reverse();
                        this.rankRes[1].data = res.data.series.BR;
                        var total = msum.map((value, index) => {
                            return value * 1 + pcsum[index] * 1;
                        });
                        var ipSum = mip.map((value, index) => {
                            return value * 1 + ip[index] * 1;
                        });
                        this.keySumRes[2].data = total;
                        this.ipRes[2].data = ipSum;
                        this.series = this.keySumRes;
                        var xdatares = res.data.date.BR.reverse();
                        for (let i in xdatares) {
                            xdatares[i] = xdatares[i].slice(5);
                        }
                        this.xdata = xdatares;
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            baiduTrend_m() {
                //移动排名
                return this.$http
                    .get("/Api/seo/baiduTrend_m", {
                        params: {
                            domain: this.content
                        }
                    })
                    .then(res => {
                        this.xdataRes_m = res.data.date.reverse();
                        for (let i = 0; i < 5; i++) {
                            this.seriesRes_m[i].data = res.data["t" + (i + 1)].reverse();
                        }
                        this.cseriesRes_m[0].data[0].value =
                            res.data["t" + 1][res.data["t" + 1].length - 1];
                        this.trend_list[0].mb = this.cseriesRes_m[0].data[0].value;
                        this.trend_list[0].value_m =
                            this.cseriesRes_m[0].data[0].value -
                            res.data["t" + 1][res.data["t" + 1].length - 2];
                        for (let i = 1; i < 5; i++) {
                            this.cseriesRes_m[0].data[i].value =
                                res.data["t" + (i + 1)][res.data["t" + (i + 1)].length - 1] -
                                res.data["t" + i][res.data["t" + i].length - 1];
                            this.trend_list[i].mb = this.cseriesRes_m[0].data[i].value;
                            this.trend_list[i].value_m =
                                res.data["t" + (i + 1)][res.data["t" + (i + 1)].length - 1] -
                                res.data["t" + (i + 1)][res.data["t" + (i + 1)].length - 2];
                        }
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            baiduTrend_pc() {
                // pc排名
                return this.$http
                    .get("/Api/seo/baiduTrend_pc", {
                        params: {
                            domain: this.content
                        }
                    })
                    .then(res => {
                        this.xdataRes = res.data.date.reverse();
                        this.xdata2 = this.xdataRes;
                        for (let i = 0; i < 5; i++) {
                            this.seriesRes[i].data = res.data["t" + (i + 1)].reverse();
                        }
                        this.series2 = this.seriesRes;
                        this.cseriesRes[0].data[0].value =
                            res.data["t" + 1][res.data["t" + 1].length - 1];
                        this.trend_list[0].pc = this.cseriesRes[0].data[0].value;
                        this.trend_list[0].value =
                            this.cseriesRes[0].data[0].value -
                            res.data["t" + 1][res.data["t" + 1].length - 2];
                        for (let i = 1; i < 5; i++) {
                            this.cseriesRes[0].data[i].value =
                                res.data["t" + (i + 1)][res.data["t" + (i + 1)].length - 1] -
                                res.data["t" + i][res.data["t" + i].length - 1];
                            this.trend_list[i].pc = this.cseriesRes[0].data[i].value;
                            this.trend_list[i].value =
                                res.data["t" + (i + 1)][res.data["t" + (i + 1)].length - 1] -
                                res.data["t" + (i + 1)][res.data["t" + (i + 1)].length - 2];
                        }
                        this.cseries = this.cseriesRes;
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            getSubdomains() {
                // 子域名
                return this.$http
                    .get("/Api/seo/subdomains", {
                        params: {
                            domain: this.content
                        }
                    })
                    .then(res => {
                        if (res.data.sum > 0) {
                            this.subdomain_sum = res.data.sum;
                            for (var t in res.data.domains) {
                                if (t > 20) break;
                                this.related_web.push(res.data.domains[t].site);
                            }
                        }
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            // pc预计来路 pc_min_ip ~ pc_max_ip 移动来路 m_min_ip ~ m_max_ip 总来路 min_ip ~ max_ip   br和m_br 是pc权重和移动权重
            getBaiduRank() {
                return this.$http
                    .get("/Api/seo/baidurank", {
                        params: {
                            domain: this.content
                        }
                    })
                    .then(res => {
                        this.br = res.data.br;
                        this.br_m = res.data.m_br;
                        if (res.data.pc_min_ip && res.data.pc_max_ip) {
                            this.pc_ip =
                                this.toThousands(res.data.pc_min_ip) +
                                " ~ " +
                                this.toThousands(res.data.pc_max_ip);
                        } else {
                            this.pc_ip = "-";
                        }
                        if (res.data.m_min_ip && res.data.m_max_ip) {
                            this.m_ip =
                                this.toThousands(res.data.m_min_ip) +
                                " ~ " +
                                this.toThousands(res.data.m_max_ip);
                        } else {
                            this.m_ip = "-";
                        }
                        if (res.data.m_min_ip && res.data.m_max_ip) {
                            this.t_ip =
                                this.toThousands(res.data.m_min_ip) +
                                " ~ " +
                                this.toThousands(res.data.m_max_ip);
                        } else {
                            this.t_ip = "-";
                        }
                        this.weightcontent.aizhan.weight = res.data.br ? res.data.br : "-";
                        this.weightcontent.yidong.weight = res.data.m_br
                            ? res.data.m_br
                            : "-";
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            getShoulu1() {
                //baiduindex 索引 baidu 收录
                return this.$http
                    .get("/Api/seo/shoulu1", {
                        params: {
                            domain: this.content
                        }
                    })
                    .then(res => {
                        this.baiduindex = res.data.baiduindex ? res.data.baiduindex : "-";
                        this.baidu_sl = res.data.baidu ? res.data.baidu : "-";
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            getShoulu3() {
                // 收录词数 1天 1周 一个月
                return this.$http
                    .get("/Api/seo/shoulu3", {
                        params: {
                            domain: this.content
                        }
                    })
                    .then(res => {
                        this.shoulu_1day = res.data.baidu_1days ? res.data.baidu_1days : "-";
                        this.shoulu_7day = res.data.baidu_7days ? res.data.baidu_7days : "-";
                        this.shoulu_30day = res.data.baidu_30days
                            ? res.data.baidu_30days
                            : "-";
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            getWebpage() {
                return this.$http
                    .get("/Api/seo/webpage", {
                        params: {
                            domain: this.content
                        }
                    })
                    .then(res => {

                        this.title = res.data.html.title
                            ? res.data.html.title
                            : "-";
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            getThisMonth() {
                var e = new Date(),
                    t = e.getFullYear(),
                    a = e.getMonth() + 1,
                    r = e.getDate(),
                    i = t + "-";
                return (
                    a < 10 && (i += "0"), (i += a + "-"), r < 10 && (i += "0"), (i += r)
                );
            },

            getPreMonth(e, t) {
                var a = e.split("-"),
                    r = a[0],
                    i = a[1],
                    s = a[2],
                    n = r,
                    o = parseInt(i) - t;
                o < 1 && ((n = parseInt(n) - 1), (o += 12)),
                o > 12 && ((n = parseInt(n) + 1), (o -= 12));
                var l = s,
                    d = new Date(n, o, 0);
                return (
                    l > (d = d.getDate()) && (l = d),
                    o < 10 && (o = "0" + o),
                    n + "-" + o + "-" + l
                );
            },
            getAll() {
                this.bus.$emit("loading", true);
                this.$http
                    .all([
                        this.getBaiduRank(),
                        this.getHiswave2(),
                        this.getHiswave(),
                        this.getSubdomains(),
                        this.baiduTrend_m(),
                        this.baiduTrend_pc(),
                        this.getShoulu3(),
                        this.getShoulu1(),
                        this.getWebpage()
                    ])
                    .then(
                        this.$http.spread((acct, perms) => {
                            this.bus.$emit("loading", false);
                        })
                    );
            }
        },
        mounted() {
            let storage = window.sessionStorage;
            this.content = storage.searchContent;
            storage.setItem("navIndex", "1");
            window.scrollTo(0, 0);
            if (storage.searchContent !== "" && storage.searchContent !== undefined) {
                this.getAll();
            }
            setTimeout(() => {
                this.bus.$emit("loading", false);
            }, 2000);
        }
    };
</script>

<style lang="less" scoped>
    b {
        font-weight: normal;
    }

    .bg_gray {
        background: #fafafa;
        color: #808080;
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

            ol {
                i {
                    position: relative;
                    color: #fff;
                    left: -25px;
                }
            }
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
                    font-size: 13px;
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

            .ranking_trend {
                font-size: 24px;
            }

            a {
                display: inline-block;
                margin: 1px 0 0 10px;
                width: 22px;
                height: 22px;
                background: #fafafa;
                border: none;
                color: #969292;
                font-size: 20px;
                text-align: center;
                line-height: 22px;
            }

            a:hover {
                background: #008abd;
                color: #fff;
            }

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
                width: 20%;
            }

            td:last-child {
                width: 26%;
            }

            td:nth-child(2) {
                color: #2aa0ea;
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

    .equal {
        color: #808080;

        i {
            width: 10px;
            height: 3px;
            background: #808080;
            display: inline-block;
            vertical-align: middle;
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
