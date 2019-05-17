<template>
    <!-- 头部 -->
    <div class="websiteValue_banner">
        <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">{{title}}</p>
        <div class="websiteValue_banner_input">
            <form>
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
</template>

<script>
export default {
    name: "SearchBox",
    props:{
        hotsearch:{type: Array},
        title:{type: String},
        content:{type: String}
    },
    data () {
        return{
            SeoContent:""
        }
    },
    methods: {
        getlist() {
            let netReg = "^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$"
            let netRe = new RegExp(netReg)
            if (!netRe.test(this.SeoContent)) {
                alert("请输入正确网址")
                return false
            }
            this.$emit("msgToSearch",this.SeoContent)
        }
    },
    watch: {
    content: {
      handler(newVal, oldVal) {
        this.SeoContent=newVal
      },
      deep: true
    }
  },
    mounted() {
        let storage=window.sessionStorage;
        this.SeoContent=storage.searchContent
    },
}
</script>

<style scoped>
    .websiteValue_banner{background:#f5f6f9;height: 220px;width: 100%;}
    .websiteValue_banner_contain{width: 840px;margin: 0 auto;text-align: center;color: #666;}
    .websiteValue_banner_title{font-size: 48px;padding-top: 105px;}
    .websiteValue_banner_title2{font-size: 26px;padding-top: 42px;color:#333;}
    .websiteValue_banner_input1{width: 100%;height: 50px;border-radius: 4px;border: none;outline: none;text-indent: 20px;}
    .websiteValue_banner_input{position: relative;margin-top: 28px;}
    .websiteValue-search{position: absolute;right: 0;width: 30px;height: 30px;top: 0;margin: 10px 0;border-left: 1px solid #f5f5f5;padding: 0 20px;cursor: pointer;}
    .websiteValue_banner_ul li{float: left;padding-left: 16px;}
    .websiteValue_banner_ul li a{color: #666;font-size: 14px;}
    .websiteValue_banner_ul_title{float: left;}
</style>
