<template>
    <div>
        <!-- 头部搜索框 -->
        <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
        <div class="cha_default" v-if="content==''||content==undefined">请输入要查询的站点</div>
        <div class="main_content" v-if="!content==''">
            <div class="content_title">备案信息</div>
            <table width="1200px" class="icptable">
                <tr>
                    <td>主办单位名称</td>
                    <td>长沙七丽网络科技有限公司</td>
                    <td>主办单位性质：</td>
                    <td>企业</td>
                </tr>
                <tr>
                    <td>网站备案/许可证号：</td>
                    <td> 湘ICP备16001275号-10</td>
                    <td>网站名称：</td>
                    <td> PC6下载</td>
                </tr>
                <tr>
                    <td>网站首页网址：</td>
                    <td> <a href="http://www.pc6.com" target="_blank">www.pc6.com</a></td>
                    <td>网站域名：</td>
                    <td>pc6.com</td>
                </tr>
                <tr>
                    <td>审核时间：</td>
                    <td>2018-10-29</td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <div class="adv_box">
                <a v-for="advs in advpic" target="_blank"  href="http://www.baidu.com"><img :src="require(`../../assets/${advs}.png`)"></a>
            </div>
        </div>
        <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
    </div>
</template>

<script>
import SearchBox from "../BaseComponents/SearchBox";
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
    name:'IcpAbout',
    components: {
        SearchBox,
        NearlySearch
    },
    data() {
        return{
            title: "ICP备案查询",
            content:'',
            advpic: ["adv1", "adv3", "adv2"]
        }
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
}
</script>

<style lang="less" scoped>
    .cha_default {
    width: 1200px;
    margin: 0 auto;
    padding: 130px 0 130px;
    color: #d3d3d3;
    letter-spacing: 2px;
    font-size: 30px;
    text-align: center;
    }
    .main_content{
        width: 1200px;
        margin: 0 auto;
    }
    .content_title{
        font-size:24px;
        margin: 60px 0 30px 0;
    }
    .icptable{
        border-right: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        tr{
            td{
                border-top: 1px solid #ebebeb;
                vertical-align: middle;
                padding-left: 40px;
                width: 300px;
                height: 60px;
                font-size:16px;
                a{
                    width: 100%;
                    height: 100%;
                    line-height: 60px;
                    color: #007bb7;
                }
            }
            td:first-child{
                background: #fafafa;
                width: 220px;
                color: #808080;
                border-left: 1px solid #ebebeb;
            }
            td:nth-child(3){
                background: #fafafa;
                width: 220px;
                color: #808080;
            }
        }
    }
    .adv_box{
        display: flex;
        justify-content: space-between;
        margin: 30px 0 50px 0;
        
    }
</style>
