<template>
    <div>
       <!-- 头部搜索框 -->
        <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
        <div class="main_content">
            <table class="title_table" width="1200px">
                <tr>
                    <td>域名</td>
                    <td>IP地址</td>
                    <td>地区</td>
                </tr>
                <tr>
                    <td><a href="http://www.pc6.com" target="_blank">www.pc6.com</a></td>
                    <td>123.206.112.44</td>
                    <td>北京市</td>
                </tr>
            </table>
        </div>
        <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
    </div>
</template>

<script>
import SearchBox from "../BaseComponents/SearchBox";
import NearlySearch from "../BaseComponents/NearlySearch";
export default {
    name:'IpSearch',
    components: {
        SearchBox,
        NearlySearch
    },
    data() {
        return{
            title: "IP反查域名",
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
    .main_content{
        width: 1200px;
        margin: 0 auto;
    }
    .title_table{
        border-right: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;
        font-size:16px;
        tr{
            td{
                width: 33.33%;
                height: 60px;
                text-align: center;
                border-left: 1px solid #ebebeb;
                border-top: 1px solid #ebebeb;
                a{
                    width: 100%;
                    height: 100%;
                    line-height: 60px;
                    color: #007bb7;
                }
            }
        }
        tr:first-child{
            td{
                background: #fafafa;
                color: #666;
            }
        }
    }
</style>
