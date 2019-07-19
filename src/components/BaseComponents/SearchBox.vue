<template>
    <!-- 头部 -->
    <div class="websiteValue_banner">
        <div class="websiteValue_banner_contain">
        <h1 class="websiteValue_banner_title2">{{title}}</h1>
        <div class="websiteValue_banner_input">
            <form @submit.prevent>
            <input
                @keyup.enter="getlist"
                v-model="SeoContent"
                type="text"
                placeholder="请输入需要查询的内容"
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
                <a @click="searchHot(items)">{{items}}</a>
            </li>
            </ul>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchBox",
    props:{
        title:{type: String},
        content:{type: String}
    },
    data () {
        return{
            SeoContent:"",
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
        getlist() {
            let netReg = "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$"
            let netRe = new RegExp(netReg)
            if (!netRe.test(this.SeoContent)) {
                alert("请输入正确域名,域名不包括(http://以及https://)")
                return false
            }
            this.$emit("msgToSearch",this.SeoContent)
        },
        searchHot(data) {
            this.$emit("msgSearchHot", data);
        }
    },
    watch: {
    content: {
      handler(newVal, oldVal) {
        this.SeoContent=newVal
      },
      deep: true
    }
  }
}
</script>

<style scoped>
    .websiteValue_banner{background:#f5f6f9;height: 220px;width: 100%;}
    .websiteValue_banner_contain{width: 840px;margin: 0 auto;text-align: center;color: #666;}
    .websiteValue_banner_title{font-size: 48px;padding-top: 105px;}
    .websiteValue_banner_title2{font-size: 26px;padding-top: 42px;color:#333;font-weight: normal;}
    .websiteValue_banner_input1{width: 100%;height: 50px;border-radius: 4px;border: none;outline: none;text-indent: 20px;}
    .websiteValue_banner_input{position: relative;margin-top: 28px;}
    .websiteValue-search{position: absolute;right: 0;width: 30px;height: 30px;top: 0;margin: 10px 0;border-left: 1px solid #f5f5f5;padding: 0 20px;cursor: pointer;}
    .websiteValue_banner_ul li{float: left;padding-left: 16px;}
    .websiteValue_banner_ul li a{color: #666;font-size: 14px;}
    .websiteValue_banner_ul_title{float: left;}
    .websiteValue_banner_ul a:hover{
        color: #007bb7;
    }
    .websiteValue_banner_ul a{cursor: pointer;}
</style>
