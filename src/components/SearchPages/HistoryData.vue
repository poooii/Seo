<template>
    <div>
        <!-- 头部 -->
        <div class="websiteValue_banner">
            <div class="websiteValue_banner_contain">
            <p class="websiteValue_banner_title2">历史数据</p>
            <div class="websiteValue_banner_input">
                <form>
                    <div class="search_downlist">

                    </div>
                    <input
                        v-model="SeoContent"
                        type="text"
                        placeholder="输入想要查询价格的域名"
                        class="websiteValue_banner_input1"
                        name="yuming"
                    >
                    <input type="button">
                        <img  @click="getlist" src="../../assets/websiteValue-search.png" alt class="websiteValue-search">
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
    </div>
</template>

<script>
export default {
    name: "HistoryData",
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
        }
    },
}
</script>

<style lang="less" scoped>
    .websiteValue_banner{background:#f5f6f9;height: 220px;width: 100%;}
    .websiteValue_banner_contain{width: 840px;margin: 0 auto;text-align: center;color: #666;}
    .websiteValue_banner_title{font-size: 48px;padding-top: 105px;}
    .websiteValue_banner_title2{font-size: 26px;padding-top: 42px;color:#333;}
    .websiteValue_banner_input1{width: 80%;height: 50px;border-radius: 4px;border: none;outline: none;text-indent: 20px;margin-left: 150px;}
    .websiteValue_banner_input{position: relative;margin-top: 28px;height: 70px;}
    .websiteValue-search{position: absolute;right: 0;width: 30px;height: 30px;top: 0;margin: 10px 0;border-left: 1px solid #f5f5f5;padding: 0 20px;cursor: pointer;}
    .websiteValue_banner_ul li{float: left;padding-left: 16px;}
    .websiteValue_banner_ul li a{color: #666;font-size: 14px;}
    .websiteValue_banner_ul_title{float: left;}

    .search_downlist{
        width: 150px;
        height: 50px;
        background: #f3f3f3;
        position: absolute;
    }
</style>
