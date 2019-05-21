<template>
    <div @click="hideSearchBox">
        <!-- 头部 -->
        <div class="websiteValue_banner">
            <div class="websiteValue_banner_contain">
            <p class="websiteValue_banner_title2">历史数据</p>
            <div class="websiteValue_banner_input">
                <form>
                    <div class="search_downlist" @click.stop>
                        <ul>
                            <li :class="{show:searchIdx==0||searchIdx==undefined}" @click="changeSearch('0')">百度SEO历史</li>
                            <li :class="{show:searchIdx==1||searchIdx==undefined}" @click="changeSearch('1')">Aleax排名历史</li>
                            <li :class="{show:searchIdx==2||searchIdx==undefined}" @click="changeSearch('2')">收录/反链历史</li>
                        </ul>
                         <i></i>
                    </div>
                    <input
                        v-model="SeoContent"
                        type="text"
                        placeholder="输入想要查询价格的域名"
                        class="websiteValue_banner_input1"
                        name="yuming"
                    >
                    <input type="button">
                        <img  src="../../assets/websiteValue-search.png" alt class="websiteValue-search">
                    </input>
                </form>
            </div>
            <!-- 热门搜索 -->
            <div class="clearfix websiteValue_banner_ul1">
                <span class="websiteValue_banner_ul_title">热门搜索：</span>
                <ul class="websiteValue_banner_ul clearfix">
                <li v-for="items in hotsearch">
                    <a href="javascript:void(0);">{{items}}</a>
                </li>
                </ul>
            </div>
            </div>
        </div>
        <div class="main_content">
            <div class="content_title">手机游戏_手机软件 - PC6手机站</div>
            <div class="lishi_range clearfix">
                <div class="search_check fl">
                    <ul>
                        <li :class="{active:range=='1m'}" @click="changeRange('1m')">一个月</li>
                        <li :class="{active:range=='3m'}" @click="changeRange('3m')">三个月</li>
                        <li :class="{active:range=='6m'}" @click="changeRange('6m')">半年</li>
                    </ul>
                </div>
                <div class="range">
                    <div class="prev" @click="changePrey"><i class="ico-pager-prev"></i></div>
                    <div class="next" @click="changeNexty"><i class="ico-pager-next"></i></div>
                    <div class="prevYear" v-model="prevyear">{{prevyear}}年</div>
                    <div class="nextYear" v-model="nextyear">{{nextyear}}年</div>
                    <div class="list">
                        <ul class="date_range">
                            <li @click="changeMonth(index)" :class="{active:index==Month,firstactive:index==Month}" v-for="(month,index) in months">{{month}}月</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="chart_container">
                <div class="title_container">
                    <span class="color_line_blue">今日排行</span>
                    <span>一周平均排名</span>
                    <span>一月平均排名</span>
                    <span>三月平均排名</span>
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
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                    </tr>
                    <tr>
                        <td>2019-04-09</td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="lower"><i></i>37</span></td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
                        <td>2,387 <span class="upper"><i></i>37</span> </td>
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
        <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
    </div>
</template>

<script>
import LineCharts from "../Echarts/line";
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
    name: "HistoryData",
    components: {
        LineCharts,
        NearlySearch
    },
    data() {
        return {
            showxis: true,
            prevyear:'2018',
            nextyear:'2019',
            range:'1m',
            Month:'18',
            searchIdx:'0',
            SeoContent: "",
            hotsearch: [
                "po188.com",
                "www.hj135.com",
                "jiaofu.cn",
                "riyiseo.com",
                "shuadan.cn",
                "caoping6s.cn",
                "014121.cn"
            ],
            months: ['10','11','12','1','2','3','4','5','6','7','8','9','10','11','12','1','2','3','4','5'],
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
            series2: [
                {
                name: "前10",
                type: "line",
                symbol: "none",
                data: [22000, 20000, 21000, 21000, 21000, 22000, 21000, 20000],
                areaStyle: { normal: { color: "#e2f4ff" } }
                }
            ],
        }
    },
    methods: {
        changeSearch(index) {
            if(this.searchIdx==index){
                this.searchIdx=undefined;
            }else{
                this.searchIdx=index;
            }
        },
        hideSearchBox() {
            if(this.searchIdx==undefined){
            this.searchIdx=0
            }
        },
        changeRange(range) {
            this.range=range
        },
        changeMonth(index) {
            this.Month=index
        },
        changePrey() {
            this.prevyear--
            this.nextyear--
        },
        changeNexty() {
            this.prevyear++
            this.nextyear++
        },
        getNearly(msg) {
            let storage=window.sessionStorage;
            storage.setItem("searchContent",msg);
            this.SeoContent=storage.searchContent
            window.scrollTo(0,0);
        }
    },
    mounted() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", '1');
    this.SeoContent = storage.searchContent;
    window.scrollTo(0,0);
  }
}
</script>

<style lang="less" scoped>
    .websiteValue_banner{background:#f5f6f9;height: 220px;width: 100%;}
    .websiteValue_banner_contain{width: 840px;margin: 0 auto;text-align: center;color: #666;}
    .websiteValue_banner_title{font-size: 48px;padding-top: 105px;}
    .websiteValue_banner_title2{font-size: 26px;padding-top: 42px;color:#333;}
    .websiteValue_banner_input1{width: 80%;height: 50px;border-radius: 4px;border: none;outline: none;text-indent: 20px;margin-left: 150px;}
    .websiteValue_banner_input{position: relative;margin-top: 28px;height: 70px;}
    .websiteValue_banner_input form{border: 1px solid #ebebeb;background: #fff;}
    .websiteValue-search{position: absolute;right: 0;width: 30px;height: 30px;top: 0;margin: 10px 0;border-left: 1px solid #f5f5f5;padding: 0 20px;cursor: pointer;}
    .websiteValue_banner_ul li{float: left;padding-left: 16px;}
    .websiteValue_banner_ul li a{color: #666;font-size: 14px;}
    .websiteValue_banner_ul_title{float: left;}

    .search_downlist{
        width: 150px;
        height: 50px;
        background: #f3f3f3;
        position: absolute;
         i{
            background-image: url(../../assets/icon_arrowdown.png);
            position: absolute;
            width: 20px;
            height: 20px;
            top: 15px;
            right: 10px;
        }
        ul{
            li{
                font-size:14px;
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
            .show{
                display: block;
            }
        }
    }
    .main_content{
        width: 1200px;
        margin: 0 auto;
        .content_title{
            font-size: 24px;
            color: #333;
            margin: 60px 0 35px 0;
        }
    }
    .lishi_range{
        .search_check{
            margin: 20px 0 0;
            ul{
                li{
                    float: left;
                    margin-left: -1px;
                    border: 1px solid #e3e3e3;
                    background: #f7f7f7;
                    padding: 10px 12px;
                    color: #999;
                    cursor: pointer;
                }
                .active{
                    position: relative;
                    color: #47a7e2;
                    border-color: #99d8ff;
                    background: #e0f3ff;
                }
            }
        }
        .range{
            position: relative;
            float: right;
            margin-top: 20px;
            width: 1000px;
            height: 39px;
            .prev{
                position: absolute;
                left: 0;
                z-index: 3;
                top: -25px;
                width: 24px;
                height: 24px;
                cursor: pointer;
                i{
                    width: 24px;
                    height: 24px;
                    display: block;
                    background-image: url(../../assets/icon_prev.png)
                }
            }
            .next{
                    position: absolute;
                    right: 0;
                    z-index: 3;
                    top: -25px;
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                    i{
                         width: 24px;
                        height: 24px;
                        display: block;
                        background-image: url(../../assets/icon_next.png)
                    }
            }
            .prevYear{
                position: absolute;
                left: 30px;
                z-index: 3;
                top: -22px;
                height: 24px;
                font-size: 14px;
                color: #666;
            }
            .nextYear{
                position: absolute;
                right: 30px;
                z-index: 3;
                top: -22px;
                height: 24px;
                font-size: 14px;
                color: #666;
            }
            .date_range {
                li{
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
                li:last-child{
                    border-right: 1px solid #e6e6e6;
                    width: 48px;
                }
                .active{
                        position: relative;
                        z-index: 2;
                        border-color: #99d8ff;
                        background: #e0f3ff;
                        color: #47a7e2;
                }
                .firstactive:before{
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
                .active:after{
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
    .chart_container{
        height: 440px;
        border: 1px solid #ebebeb;
        margin-top: 30px;
        .title_container{
            height: 60px;
            background: #fafafa;
            border-bottom: 1px solid #ebebeb;
            span{
                display: inline-block;
                height: 60px;
                line-height: 60px;
                margin-left: 36px;
                min-width: 30px;
                text-align: center;
                cursor: pointer;
                font-size:16px;
            }
            .color_line_blue{
                border-bottom: 2px solid #2aa0ea;
                color: #2aa0ea;
            }
        }
    }
    .paiming_table_container{
        color: #666;
        margin-top: 20px;
        height: auto;
        border-bottom: 1px solid #ebebeb;
        table{
            border-right: 1px solid #ebebeb;
            border-bottom: 1px solid #ebebeb;
            tr{
                td{
                    border-left: 1px solid #ebebeb;
                    border-top: 1px solid #ebebeb;
                    text-align: center;
                    vertical-align: middle;
                    height: 60px;
                    font-size:16px;
                    .lower{
                        color: #00b35d;
                        i{
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
                    .upper{
                        color: #ec1f37;
                        i{
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
            tr:first-child{
                td{
                    background: #fafafa;
                }
            }
        }
    }
    .page_box{
        width: 100%;
        height: 60px;
        text-align: right;
        border-left: 1px solid #ebebeb;
        border-right: 1px solid #ebebeb;
        span{
            display: inline-block;
            height: 60px;
            line-height: 60px;
            margin-right: 24px;
            cursor: pointer;
            font-size:16px;
        }
    }
</style>
