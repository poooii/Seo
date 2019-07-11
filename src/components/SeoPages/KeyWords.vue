<template>
    <div>
        <!-- 头部搜索框 -->
        <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
        <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
        <div class="main_content" v-if="!content==''">
            <div class="content_title">查询结果</div>
            <table class="ip_main_table" width="1200px">
                <tr>
                    <td>序号</td>
                    <td>关键词</td>
                    <td>PC/移动</td>
                    <td>收录数</td>
                    <td>首页第1位</td>
                    <td>首页第2位</td>
                    <td>优化难度</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>
                        <span>百度翻译</span>器在线
                    </td>
                    <td>59/64</td>
                    <td>2500.0万</td>
                    <td>
                        <p>fanyi.baidu.com</p>
                        <p>多语种即时在线翻译_百度翻译</p>
                    </td>
                    <td>
                        <p>fanyi.baidu.com</p>
                        <p>多语种即时在线翻译_百度翻译</p>
                    </td>
                    <td class="level">
            <span>
              <span class="l4"></span>
            </span>
                    </td>
                </tr>

                <tr>
                    <td colspan="7">
                        <span>上一页</span>
                        <span>下一页</span>
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
    import SearchBox from "../BaseComponents/SearchBox";
    import NearlySearch from "../BaseComponents/NearlySearch";

    export default {
        name: "KeyWords",
        components: {
            SearchBox,
            NearlySearch
        },
        data() {
            return {
                title: "关键词挖掘",
                content: "",
                advpic: ["adv1", "adv3", "adv2"]
            };
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
            },


            encode_unicode_param(t) {
                for (var e = "", a = 0; a < t.length; a++) {
                    var i = t.charCodeAt(a).toString(16);
                    2 == i.length ? e += "n" + i : e += i
                }
                return e
            },
            getKeyWords(){
                return this.$http
                    .get("/Api/pageinfo/getKeywordsInfo", {
                        params: {
                            words: this.encode_unicode_param(this.content)
                        }
                    })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(res => {
                        console.log(res.msg);
                    });
            },
            getAll() {
                this.bus.$emit("loading", true);
                this.getKeyWords();
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
            }
            setTimeout(() => {
                this.bus.$emit("loading", false);
            }, 2000);
        }
    };
</script>

<style lang="less" scoped>
    .main_content {
        width: 1200px;
        margin: 0 auto;
    }

    .content_title {
        font-size: 24px;
        margin: 60px 0 30px 0;
    }

    .ip_main_table {
        font-size: 16px;
        border: 1px solid #ebebeb;
        margin-top: 20px;
        border-bottom: none;

        tr {
            td {
                height: 60px;
                min-width: 100px;
                max-width: 250px;
                padding-right: 10px;
                text-align: center;
                border-bottom: 1px solid #ebebeb;

                p:last-child {
                    font-size: 12px;
                    color: #999;
                }
            }

            .level {
                span {
                    display: inline-block;
                    position: relative;
                    width: 60px;
                    height: 6px;
                    vertical-align: middle;
                    background: #eee;
                    border-radius: 10px;

                    span {
                        position: absolute;
                        top: 0;
                        left: 0;
                    }

                    .l0 {
                        width: 0;
                    }

                    .l1 {
                        width: 19%;
                        background: #55b7f0;
                    }

                    .l2 {
                        width: 30%;
                        background: #4bd955;
                    }

                    .l3 {
                        width: 55%;
                        background: #fcbf4a;
                    }

                    .l4 {
                        width: 80%;
                        background: #f05955;
                    }
                }
            }

            td:first-child {
                width: 100px;
            }

            td:nth-child(2) {
                text-align: left;
                padding-left: 20px;

                span {
                    color: #007bb7;
                }
            }

            td:nth-child(5),
            td:nth-child(6) {
                text-align: left;
                width: 250px;
            }
        }

        tr:first-child {
            td {
                background: #fafafa;
                color: #666;
            }
        }

        tr:last-child {
            td {
                text-align: right;
            }

            span {
                display: inline-block;
                height: 60px;
                line-height: 60px;
                margin-right: 24px;
                cursor: pointer;
                font-size: 16px;
            }
        }
    }

    .adv_box {
        display: flex;
        justify-content: space-between;
        margin: 30px 0 50px 0;
    }
</style>
