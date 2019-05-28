<template>
    <div @click="hideSearchBox">
        <!-- 头部 -->
        <div class="websiteValue_banner">
            <div class="websiteValue_banner_contain">
            <p class="websiteValue_banner_title2">死链接检测</p>
            <div class="websiteValue_banner_input">
                <form @submit.prevent>
                    <div class="search_downlist" @click.stop>
                        <ul>
                            <li :class="{show:searchIdx==0||searchIdx==undefined}" @click="changeSearch('0')">全部链接</li>
                            <li :class="{show:searchIdx==1||searchIdx==undefined}" @click="changeSearch('1')">站内链接</li>
                            <li :class="{show:searchIdx==2||searchIdx==undefined}" @click="changeSearch('2')">站外链接</li>
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
                        <img @click="getList"  src="../../assets/websiteValue-search.png" alt class="websiteValue-search">
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
            <div class="content_title">查询结果：<span> 共有链接<i class="alive"> 498</i> 个；死链接<i class="dead"> 214</i> 个 检测完成</span></div>
            <table class="link_table" width="1200px">
                <tr>
                    <td>序号</td>
                    <td>链接信息</td>
                    <td>网站标题</td>
                    <td>状态</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td><a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a></td>
                    <td>搜狐号</td>
                    <td class="alive">正常</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td><a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a></td>
                    <td>搜狐号</td>
                    <td class="alive">正常</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td><a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a></td>
                    <td>搜狐号</td>
                    <td class="alive">正常</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td><a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a></td>
                    <td>搜狐号</td>
                    <td class="dead">死链接</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td><a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a></td>
                    <td>搜狐号</td>
                    <td class="alive">正常</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td><a href="http://www.baidu.com">http://news.sohu.com/s2018/guoqing69/index.shtml</a></td>
                    <td>搜狐号</td>
                    <td class="alive">正常</td>
                </tr>
                <tr>
                    <td colspan="4">
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
import LineCharts from "../Echarts/line";
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
    name: "DeadLink",
    components: {
        LineCharts,
        NearlySearch
    },
    data() {
        return {
            searchIdx:'0',
            SeoContent: "",
             advpic: ["adv1", "adv3", "adv2"],
            content:'',
            hotsearch: [
                "po188.com",
                "www.hj135.com",
                "jiaofu.cn",
                "riyiseo.com",
                "shuadan.cn",
                "caoping6s.cn",
                "014121.cn"
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
        searchHot(data){
            let storage = window.sessionStorage;
            storage.setItem("searchContent", data);
            this.SeoContent = storage.searchContent;
            this.content = storage.searchContent;
        },
        getNearly(msg) {
            let storage=window.sessionStorage
            storage.setItem("searchContent",msg)
            this.content=storage.searchContent
            this.searchIdx=0
            window.scrollTo(0,0);
        },
        getList() {
            this.content=this.SeoContent
            this.showViews=this.searchIdx
            let storage = window.sessionStorage;
            storage.setItem("searchContent", this.content);
        }
    },
    mounted() {
    let storage = window.sessionStorage;
    this.content = storage.searchContent;
    this.SeoContent = storage.searchContent;
    storage.setItem("navIndex", '2');
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
    .websiteValue_banner_ul li a{color: #666;font-size: 14px;cursor: pointer;}
    .websiteValue_banner_ul_title{float: left;}
    .websiteValue_banner_ul a:hover{
        color: #007bb7;
    }
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
            span{
                font-size:18px;
                color: #666;
                .alive{
                    color: #00b35d;
                }
                .dead{
                    color: #ff3838;
                }
            }
        }
    }
    .link_table{
        border: 1px solid #ebebeb;
        border-bottom: none;
        tr{
            td{
                min-width: 100px;
                height: 60px;
                text-align: center;
                font-size:16px;
                border-bottom: 1px solid #ebebeb;
                a{
                    color: #007bb7;
                }
            }
            .alive{
                    color: #00b35d;
                }
            .dead{
                color: #ff3838;
                }
            td:nth-child(2){
                text-align: left;
            }
            td:first-child{
                width: 100px;
                padding-right: 40px;
            }
        }
        tr:first-child{
            background: #fafafa;
            color: #666;
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
            span:hover{
                color: #007bb7;
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
