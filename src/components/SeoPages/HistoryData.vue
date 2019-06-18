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
                                <li :class="{show:searchIdx==0||searchIdx==undefined}" @click="changeSearch('0')">
                                    百度SEO历史
                                </li>
                                <li :class="{show:searchIdx==1||searchIdx==undefined}" @click="changeSearch('1')">
                                    Aleax排名历史
                                </li>
                                <li :class="{show:searchIdx==2||searchIdx==undefined}" @click="changeSearch('2')">
                                    收录/反链历史
                                </li>
                            </ul>
                            <i></i>
                        </div>
                        <input
                                @keyup.enter="getList"
                                v-model="SeoContent"
                                type="text"
                                placeholder="输入想要查询价格的域名"
                                class="websiteValue_banner_input1"
                                name="yuming"
                        >
                        <input type="button">
                        <img @click="getList" src="../../assets/websiteValue-search.png" alt
                             class="websiteValue-search">
                        </input>
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
                    <div class="prev" @click="changeYear(false)"><i class="ico-pager-prev"></i></div>
                    <div class="next" @click="changeYear(true)"><i class="ico-pager-next"></i></div>
                    <!--<div class="prevYear" v-model="prevyear">{{prevyear}}年</div>-->
                    <!--<div class="nextYear" v-model="nextyear">{{nextyear}}年</div>-->
                    <div class="list">
                        <ul class="date_range">
                            <li @click="getMonthsBym(item.y,item.m)" :class="{active:item.s>0}"
                                v-for="(item) in months">
                                {{item.m}}月
                                <span class="y" v-if="item.m == 1">
                                    {{item.y}}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- SEO搜索结果 -->
            <div v-if="showViews=='0'">
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
                            :xdata="xdata2"
                            :showxis="showxis"
                            :option="series2"
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
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>5</td>
                            <td>7</td>
                            <td>308</td>
                            <td>1,734,121</td>
                            <td>13286~18848</td>
                            <td>13286~18848</td>
                            <td>132086~180848</td>
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
            </div>
            <!-- ALEAX搜索结果 -->
            <div v-if="showViews=='1'">
                <div class="chart_container">
                    <div class="title_container">
                        <span :class="{color_line_blue:aleaxresult=='0'}" @click="changeAleaxresult('0')">今日排名</span>
                        <span :class="{color_line_blue:aleaxresult=='1'}" @click="changeAleaxresult('1')">一周平均排名</span>
                        <span :class="{color_line_blue:aleaxresult=='2'}" @click="changeAleaxresult('2')">一月平均排名</span>
                        <span :class="{color_line_blue:aleaxresult=='3'}" @click="changeAleaxresult('3')">三月平均排名</span>
                    </div>
                    <LineCharts
                            :xdata="xdata2"
                            :showxis="showxis"
                            :option="series2"
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
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="lower"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
                            <td>2,387 <span class="upper"><i></i>37</span></td>
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
            </div>
            <!-- 收录/反链搜索结果 -->
            <div v-if="showViews=='2'">
                <div class="chart_container">
                    <div class="title_container">
                        <span :class="{color_line_blue:shouluresult=='0'}" @click="changeShouluresult('0')">百度收录</span>
                        <span :class="{color_line_blue:shouluresult=='1'}" @click="changeShouluresult('1')">百度索引</span>
                        <span :class="{color_line_blue:shouluresult=='2'}" @click="changeShouluresult('2')">百度反链</span>
                        <span :class="{color_line_blue:shouluresult=='3'}" @click="changeShouluresult('3')">搜狗收录</span>
                        <span :class="{color_line_blue:shouluresult=='4'}" @click="changeShouluresult('4')">搜狗反链</span>
                        <span :class="{color_line_blue:shouluresult=='5'}" @click="changeShouluresult('5')">360收录</span>
                        <span :class="{color_line_blue:shouluresult=='6'}" @click="changeShouluresult('6')">360反链</span>
                    </div>
                    <LineCharts
                            :xdata="xdata2"
                            :showxis="showxis"
                            :option="series2"
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
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
                        </tr>
                        <tr>
                            <td>2019-04-09</td>
                            <td>1,220,000</td>
                            <td>1,734,121</td>
                            <td>90</td>
                            <td>1,382,374</td>
                            <td>387</td>
                            <td>539,000</td>
                            <td>1,560,000</td>
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
            </div>
        </div>
        <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
    </div>
</template>

<script>
    import LineCharts from "../Echarts/line";
    import NearlySearch from "../BaseComponents/NearlySearch";
    import G from "../../api/G"

    export default {
        name: "HistoryData",
        components: {
            LineCharts,
            NearlySearch
        },
        data() {
            return {
                //标题
                title:'',

                // 控制不同分类的搜索结果显示
                showViews: '0',
                //seo搜索结果图表
                seoresult: '0',
                //aleax搜索图表
                aleaxresult: '0',
                //收录反链图表
                shouluresult: '0',
                // 折线图坐标轴
                showxis: true,
                // 时间选择器年份
                prevyear: G.Y - 1,
                nextyear: G.Y,
                // 时间选择器时间范围
                range: '1',
                // 搜索框三个分类
                searchIdx: '0',
                SeoContent: "",
                content: '',
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
                sel_m: '',
                sel_y: '',
                // 初始选中的月份
                // 初始选中的带小箭头的月份
                // 折线图测试数据
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
                //结束时间
                e: '',
                //开始时间
                s: '',
                // 折线图测试数据
                series2: [
                    {
                        name: "前10",
                        type: "line",
                        symbol: "none",
                        data: [22000, 20000, 21000, 21000, 21000, 22000, 21000, 20000],
                        areaStyle: {normal: {color: "#e2f4ff"}}
                    }
                ],
            }
        },
        methods: {
            getMonthsBym(y, m) {
                this.sel_m = m, this.sel_y = y
                var l = G.D.getMonth() + 1, a = [], r = this.range, m_c = m + 1, m_y = y, ms = (G.Y - y) * 12 + l - m
                ms = ms > 9 ? 9 : ms
                for (var i = ms; i > 0; i--) {
                    if (++m > 12) m = 1, y++
                    a.push({m: m, y: y, s: 0})
                }
                for (var i = 0; a.length <= 18; i++) {
                    if (--m_c < 1) m_c = 12, m_y--
                    a.unshift({m: m_c, y: m_y, s: r--})
                }
                this.months = a
                this.e = this.getEDate(this.sel_y, this.sel_m)
                this.s = this.getSDate(this.sel_y, this.sel_m, this.range)
                this.getHiswave2()
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
            getHiswave2() {
                // 总关键词 预计来路 权重
                return this.$http
                    .get("/Api/BaiduRank/hiswave2", {
                        params: {
                            domain: this.content,
                            begintime: this.s,
                            endtime: this.e
                        }
                    })
                    .then(res => {
                        console.log(res)
                        // var msum = res.data.series.mSum.reverse();
                        // var pcsum = res.data.series.pcSum.reverse();
                        // var ip = res.data.series.IP.reverse();
                        // var mip = res.data.series.mIP.reverse();
                        // this.keySumRes[0].data = msum;
                        // this.keySumRes[1].data = pcsum;
                        // this.ipRes[0].data = mip;
                        // this.ipRes[1].data = ip;
                        // this.rankRes[0].data = res.data.series.mBR.reverse();
                        // this.rankRes[1].data = res.data.series.BR;
                        // var total = msum.map((value, index) => {
                        //     return value * 1 + pcsum[index] * 1;
                        // });
                        // var ipSum = mip.map((value, index) => {
                        //     return value * 1 + ip[index] * 1;
                        // });
                        // this.keySumRes[2].data = total;
                        // this.ipRes[2].data = ipSum;
                        // this.series = this.keySumRes;
                        // var xdatares = res.data.date.BR.reverse();
                        // for (let i in xdatares) {
                        //     xdatares[i] = xdatares[i].slice(5);
                        // }
                        // this.xdata = xdatares;
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            // 改变搜索分类
            changeSearch(index) {
                if (this.searchIdx == index) {
                    this.searchIdx = undefined;
                } else {
                    this.searchIdx = index;
                }
            },
            // 隐藏搜索框不用管
            hideSearchBox() {
                if (this.searchIdx == undefined) {
                    this.searchIdx = 0
                }
            },
            // 改变搜索范围后面用range当参数
            changeRange(range) {
                this.range = range
                this.getMonthsBym(this.sel_y, this.sel_m)
            },
            // 改变年份的两个
            changeYear(b) {
                for (var i in this.months) {
                    b ? this.months[i].y++ : this.months[i].y--;
                    if (this.months[i].y == this.sel_y && this.months[i].m == this.sel_m) {
                        for (var j = this.range - 1; j >= 0; j--) {
                            this.months[parseInt(i) - parseInt(j)].s = 1
                        }
                    } else {
                        this.months[i].s = 0
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
                this.seoresult = idx
            },
            //切换aleax图表
            changeAleaxresult(idx) {
                this.aleaxresult = idx
            },
            //切换收录反链图表
            changeShouluresult(idx) {
                this.shouluresult = idx
            },
            // 热门搜索
            searchHot(data) {
                let storage = window.sessionStorage;
                storage.setItem("searchContent", data);
                this.SeoContent = storage.searchContent;
                this.content = storage.searchContent;
            },
            // 最近搜索
            getNearly(msg) {
                let storage = window.sessionStorage
                storage.setItem("searchContent", msg)
                this.content = storage.searchContent
                this.SeoContent = storage.searchContent
                this.searchIdx = 0
                this.showViews = 0
                window.scrollTo(0, 0);
            },
            // 搜索框搜索
            getList() {
                this.content = this.SeoContent
                this.showViews = this.searchIdx
                let storage = window.sessionStorage;
                storage.setItem("searchContent", this.content);
            }
        },
        mounted() {
            let storage = window.sessionStorage;
            this.content = storage.searchContent;
            this.SeoContent = storage.searchContent;
            storage.setItem("navIndex", '1');
            window.scrollTo(0, 0);
            this.getMonthsBym(G.Y, G.M)
            this.getWebpage()
        }
    }
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
        top: -25px;
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
                left: 0;
                z-index: 3;
                top: -25px;
                width: 24px;
                height: 24px;
                cursor: pointer;

                i {
                    width: 24px;
                    height: 24px;
                    display: block;
                    background-image: url(../../assets/icon_prev.png)
                }
            }

            .next {
                position: absolute;
                right: 0;
                z-index: 3;
                top: -25px;
                width: 24px;
                height: 24px;
                cursor: pointer;

                i {
                    width: 24px;
                    height: 24px;
                    display: block;
                    background-image: url(../../assets/icon_next.png)
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
        border-bottom: 1px solid #ebebeb;

        table {
            border-right: 1px solid #ebebeb;
            border-bottom: 1px solid #ebebeb;

            tr {
                td {
                    border-left: 1px solid #ebebeb;
                    border-top: 1px solid #ebebeb;
                    text-align: center;
                    vertical-align: middle;
                    height: 60px;
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
                }
            }

            tr:first-child {
                td {
                    background: #fafafa;
                }
            }
        }
    }

    .page_box {
        width: 100%;
        height: 60px;
        text-align: right;
        border-left: 1px solid #ebebeb;
        border-right: 1px solid #ebebeb;

        span {
            display: inline-block;
            height: 60px;
            line-height: 60px;
            margin-right: 24px;
            cursor: pointer;
            font-size: 16px;
        }
    }
</style>
