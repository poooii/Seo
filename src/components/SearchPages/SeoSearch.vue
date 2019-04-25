<template>
  <div>
    <div class="websiteValue_banner">
      <div class="websiteValue_banner_contain">
        <p class="websiteValue_banner_title2">SEO综合查询</p>
        <div class="websiteValue_banner_input">
          <form>
            <input
              v-model="content"
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
    <div class="seo_main_content">
      <div class="content_title clearfix">
        <span class="t_title fl">手机游戏_手机软件 - PC6手机站</span>
        <span class="t_time fr">更新时间：2019-03.31 05:26:26</span>
        <span class="t_history fr">历史数据</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'SeoSearch',
    data () {
    return {
      content:"",
      hotsearch:['po188.com','www.hj135.com','jiaofu.cn','riyiseo.com','shuadan.cn','caoping6s.cn','014121.cn'],
    }
  },
  methods: {
      getlist () {
         this.$http.get('/test.json')
         .then((res)=>{
           console.log(res)
         })
         .catch(()=>{})
      }
  },
  mounted () {
      this.content = this.$route.params.content
  }
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
    .seo_main_content{
      width: 1200px;
      background: #fff;
      margin: 0 auto;
      margin-top: 60px;
      font-size: 16px;
    }
    .t_title{
      font-size: 24px;
      line-height: 32px;
      height: 26px;
      color: #333;
    }
    .t_time{
      line-height: 32px;
      height: 16px;
      color:#999;
    }
    .t_history{
      line-height: 32px;
      height: 16px;
      margin-right: 20px;
      color: #2b99ff;
    }
</style>
