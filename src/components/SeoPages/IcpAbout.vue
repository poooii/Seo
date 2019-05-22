<template>
    <div>
        <!-- 头部搜索框 -->
        <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
        <div class="cha_default" v-if="content==''||content==undefined">请输入要查询的站点</div>
        <div class="main_content" v-if="!content==''">
            <div class="content_title">备案信息</div>
        </div>
    </div>
</template>

<script>
import SearchBox from "../BaseComponents/SearchBox";
export default {
    name:'IcpAbout',
    components: {
        SearchBox
    },
    data() {
        return{
            title: "ICP备案查询",
            content:'',
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
    }
</style>
