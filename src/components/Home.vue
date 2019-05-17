<template>
  <!-- banner -->
    <div>
      <div class="websiteValue_banner">
          <div class="websiteValue_banner_contain">
              <p class="websiteValue_banner_title">站长查询就上一起查（17cha.cn）</p>
              <p class="websiteValue_banner_title2">致力服务每一位站长！</p>
              <div class="websiteValue_banner_input">
                  <form>
                      <input v-model="content" type="text" placeholder="输入想要查询价格的域名" class="websiteValue_banner_input1" name="yuming">
                      <button @click="tosearch">
                          <img src="../assets/websiteValue-search.png" alt="" class="websiteValue-search">
                      </button>

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
      <!-- banner end -->
      <!-- main content -->
      <div class="main_content">
        <div class="img_box"><img src="../assets/17chalogo.png" alt=""></div>
        <div class="home_describe">
          一起查（17cha.cn）致力于SEO常用工具、搜索优化工具、域名/IP查询工具的研究和开发应用，
          不断更新有利于站长的实用工具，同时免费开放给站长朋友使用，做站长的好助手，助力网站腾飞！
        </div>
        <div class="home_list">
          <div class="list_left_pic">
            <img src="../assets/homelist1.png" alt="">
            <div class="list_describe_container">
              <p class="p_title">精准排名查询</p>
              <p class="p_details">高性能软件框架，多线程查询，查询速度快，排名结果准确</p>
            </div>
          </div>
          <div class="list_right_pic">
            <div class="list_describe_container">
              <p class="p_title">多搜索引擎覆盖</p>
              <p class="p_details">支持百度，360搜索，搜狗搜索，神马搜索等搜索引擎数据查询</p>
            </div>
            <img src="../assets/homelist2.png" alt="">
          </div>
          <div class="list_left_pic">
            <img src="../assets/homelist3.png" alt="">
            <div class="list_describe_container">
              <p class="p_title">永久免费使用</p>
              <p class="p_details">站长类工具永久免费使用</p>
            </div>
          </div>
          <div class="list_right_pic">
            <div class="list_describe_container">
              <p class="p_title">批量查询方便快捷</p>
              <p class="p_details">多网站数据批量查询，方便快捷，不需要多次查询</p>
            </div>
            <img src="../assets/homelist4.png" alt="">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      content:"",
      hotsearch:['po188.com','www.hj135.com','jiaofu.cn','riyiseo.com','shuadan.cn','caoping6s.cn','014121.cn']
    }
  },
  methods:{
    tosearch() {
      let storage=window.sessionStorage;
      storage.setItem("searchContent",this.content);
      this.$router.push({
        name:"SeoSearch"
      })
    }
  },
}
</script>

<style scoped>
  .websiteValue_banner{background: url('../assets/websiteValue-banner.png') no-repeat center center;height: 480px;width: 100%;}
  .websiteValue_banner_contain{width: 840px;margin: 0 auto;text-align: center;color: #fff;}
  .websiteValue_banner_title{font-size: 48px;padding-top: 105px;}
  .websiteValue_banner_title2{font-size: 28px;padding-top: 10px;}
  .websiteValue_banner_input1{width: 100%;height: 50px;border-radius: 4px;border: none;outline: none;text-indent: 20px;}
  .websiteValue_banner_input{position: relative;margin-top: 55px;}
  .websiteValue-search{position: absolute;right: 0;width: 30px;height: 30px;top: 0;margin: 10px 0;border-left: 1px solid #f5f5f5;padding: 0 20px;cursor: pointer;}
  .websiteValue_banner_ul li{float: left;padding-left: 16px;}
  .websiteValue_banner_ul li a{color: #fff;font-size: 14px;}
  .websiteValue_banner_ul_title{float: left;}
  .websiteValue_banner_ul1{padding-top: 20px;}
  .main_content{
    background: #fff;
    width: 1200px;
    margin: 0 auto;
  }
  .main_content .img_box{
    margin: 0 auto;
    text-align: center;
    margin-top: 110px;
  }
  .img_box img{
    width: 300px;
    margin-left: -76px;
  }
  .home_describe{
    width: 966px;
    height: 98px;
    margin: 0 auto;
    font-size: 22px;
    line-height: 36px;
    text-align: center;
    color: #666;
    margin-top: 36px;
  }
  .home_list{
    width: 1120px;
    margin: 0 auto;
  }
  .home_list>.list_left_pic{
    width: 1058px;
    height: 466px;
    margin-top: 100px;
    display: flex;
    align-items:center;
    justify-content: space-between;
  }
  .home_list>.list_right_pic{
    width: 1030px;
    height: 460px;
    margin-top: 100px;
    margin-left: 60px;
    display: flex;
    align-items:center;
    justify-content: space-between;
  }
  .list_describe_container>.p_title{
    font-size: 44px;
    line-height: 32px;
    height: 41px;
  }
  .list_describe_container>.p_details{
    font-size: 22px;
    line-height: 36px;
    height: 58px;
    width: 326px;
    margin-top: 26px;
    color: #666;
  }
  .list_right_pic:last-child{
    margin-bottom: 120px;
  }
</style>
