<template>
  <div>
    <!-- 头部 -->
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
      <!-- 主体第一大块 -->
      <div class="content_title clearfix">
        <span class="t_title fl">手机游戏_手机软件 - PC6手机站</span>
        <span class="t_time fr">更新时间：2019-03.31 05:26:26</span>
        <span class="t_history fr"><img src="../../assets/dataupdate.png">历史数据</span>
      </div>
      <div>
        <ul class="weight_content clearfix">
          <li class="weight_details">
            <div class="weight_net">{{weightnet | ellipsis}}</div>
            <span class="weight_name">域名</span>
          </li>
          <li class="weight_details" v-for="weights in weightcontent">
            <div class="weight_net"><img :src='require(`../../assets/${weights.img}.png`)'></div>
            <span class="weight_name">{{weights.name}}</span>
          </li>
        </ul>
      </div>
      <div>        
        <ul class="weight_details_p1">
          <li>
            <span class="weight_details_msg">SEO信息：</span>
            <span class="msg_details">百度来路：<span class="red">134,014 ~ 173,573</span>IP</span>
            <span class="msg_details">移动来路：<span class="black">134,014 ~ 173,573</span>IP</span>
            <span class="msg_details">出站链接：<span class="black">13</span></span>
            <span class="msg_details">首页内链：<span class="black">17</span></span>
          </li>
          <li>
            <span class="weight_details_msg">ALEXA排名：</span>
            <span class="msg_details">世界排名：<span class="black">1460</span></span>
            <span class="msg_details">预估日均IP≈<span class="black">342,000</span></span>
            <span class="msg_details"> 预估日均PV≈<span class="black">615,600</span></span>
          </li>
          <li>
            <span class="weight_details_msg">网站标题：</span>
            <span class="msg_details black">足球比分预测足球在线交流-亚博体育官方论坛 - POWERED BY DISCUZ!</span>
          </li>
          <li>
            <span class="weight_details_msg">备案信息：</span>
            <span class="msg_details">备案号：<span class="blue">湘ICP备16001275号-10</span></span>
            <span class="msg_details">性质：<span class="black">企业</span></span>
            <span class="msg_details">名称：<span class="black">长沙七丽网络科技有限公司</span></span>
            <span class="msg_details">审核时间：<span class="black">2018-10-29</span></span>
          </li>
          <li>
            <span class="weight_details_msg">域名信息：</span>
            <span class="msg_details">注册邮箱：<span class="black">-</span></span>
            <span class="msg_details">年龄：<span class="black">20年1月9日</span>（创建于1999年02月23日）</span>
          </li>
          <li>
            <span class="weight_details_msg">网站速度：</span>
            <span class="msg_details">电信：<span class="black">14.542毫秒</span></span>
          </li>
        </ul>
      </div>
      <!-- 第一表格 -->
      <div class="table_content_1st">
        <table width="1200px">
          <tr>
            <td class="bg_gray">PC词数</td>
            <td class="bg_gray">移动词数</td>
            <td class="bg_gray">首页位置</td>
            <td class="bg_gray">索引</td>
            <td class="bg_gray">24小时收录</td>
            <td class="bg_gray">一周收录</td>
            <td class="bg_gray">一月收录</td>
          </tr>
          <tr>
            <td>22,985</td>
            <td>48,969</td>
            <td>1</td>
            <td>1,726,946</td>
            <td>36</td>
            <td>49.9万</td>
            <td>51万</td>
          </tr>
        </table>
      </div>
      <!-- 第一块广告位 -->
      <div class="advertise_box1">
        <img v-for="advs in advpic" :src='require(`../../assets/${advs}.png`)'>
      </div>
      <!-- 第二表格 -->
      <div class="table_content_2nd">
        <table width="1200px">
          <tr>
            <td class="bg_gray"></td>
            <td class="bg_gray">百度</td>
            <td class="bg_gray">搜搜</td>
            <td class="bg_gray">搜狗</td>
            <td class="bg_gray">360</td>
          </tr>
          <tr>
            <td>收录</td>
            <td>1,260,000</td>
            <td>0</td>
            <td>539,000</td>
            <td>1,382,374</td>
          </tr>
          <tr>
            <td>反链</td>
            <td>63600</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr>
        </table>
      </div>
      <!-- 第二块百度关键词 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">百度关键词</span>
          <span class="echarts_title_first color_blue">PC趋势</span>
          <span>移动趋势</span>
          <span class="day1 echarts_days days_blue">7天</span>
          <span class="echarts_days">30天</span>
          <span class="echarts_days">3个月</span>
        </div>
        <div class="echarts_main">
          <table width="1200px">
            <tr>
              <td class="bg_gray">前10名</td>
              <td class="bg_gray">前20名</td>
              <td class="bg_gray">前30名</td>
              <td class="bg_gray">前40名</td>
              <td class="bg_gray">前50名</td>
            </tr>
            <tr>
              <td>2387</td>
              <td>2387</td>
              <td>2387</td>
              <td>2387</td>
              <td>2387</td>
            </tr>
          </table>
          <div id="keywordChart" :style="{width: '1140px', height: '300px'}"></div>
        </div>
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
      weightnet:"",
      xdata:['04-02','04-03','-04-04','04-05','04-06','04-07','04-08','04-09'],
      series: [
              {
                  name:'前10',
                  type:'line',
                  stack: '总量',
                  data:[22000, 20000, 21000, 21000, 21000, 22000, 21000,20000]
              },
              {
                  name:'前20号',
                  type:'line',
                  stack: '总量',
                  data:[17500, 16000, 16000, 16500, 16000, 16000, 15200,15000]
              },
              {
                  name:'前30',
                  type:'line',
                  stack: '总量',
                  data:[11000, 11200, 11000, 12000, 12500, 12000, 12000,14000]
              },
              {
                  name:'前40',
                  type:'line',
                  stack: '总量',
                  data:[6000, 6500, 6200, 6000, 6300, 6600, 6600,7000]
              },
              {
                  name:'前50',
                  type:'line',
                  stack: '总量',
                  data:[3000, 3500, 3500, 3800, 3900, 3500, 3800,4200]
              }
          ],
      hotsearch:['po188.com','www.hj135.com','jiaofu.cn','riyiseo.com','shuadan.cn','caoping6s.cn','014121.cn'],
      advpic:['adv1','adv3','adv2'],
      weightcontent:[
        {
          name:'爱站权重',
          img:'az-5'
        },
        {
          name:'站长权重',
          img:'zz-5'
        },
        {
          name:'移动权重',
          img:'yd-5'
        },
        {
          name:'搜狗PR',
          img:'sg-5'
        },
        {
          name:'谷歌PR',
          img:'az-5'
        }
      ]
    }
  },
  methods: {
      getlist () {
         this.$http.get('')
         .then((res)=>{
           console.log(res)
         })
         .catch(()=>{})
      },
      drawLine () {
        let myChart = this.$echarts.init(document.getElementById('keywordChart'))
        myChart.setOption({
          tooltip: {
            trigger: 'axis'
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.xdata
          },
          yAxis: {
              type: 'value'
          },
          series: this.series
        })
      }
  },
  filters: {
    ellipsis (value) {
      if (!value) return ''
      if (value.length > 18) {
        return value.slice(0,18) + '...'
      }
      return value
    }
  },
  mounted () {
      this.content = this.$route.params.content
      this.weightnet = this.$route.params.content
      this.drawLine()
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
    .bg_gray{
      background: #fafafa;
      color: #808080;
    }
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
    .weight_content{
      margin: 28px 0 20px 0;
      color: #999;
      font-size: 14px;
    }
    .weight_content .weight_details{
      float: left;
      width: 199px;
      height: 100px;
      text-align: center;
      border: 1px solid #ebebeb;
      border-right: none;
      margin: 0;
      padding: 0;
    }
    .weight_content .weight_details:last-child{
      border-right: 1px solid #ebebeb;
      width: 198px;
    }
    .weight_net{
      font-size: 18px;
      color: #333;
      margin-top: 20px;
    }
    .weight_net:first-child{
      line-height: 30px;
    }
    .weight_name{
      display: block;
      margin-top: 10px;
    }
    .t_history img{
      vertical-align: -6px;
      margin-right: 6px;
    }
    .weight_details_p1{
      margin-bottom: 20px;
    }
    .weight_details_p1>li{
      width: 1198px;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #808080;
      border: 1px solid #ebebeb;
      border-bottom: none;
    }
    .weight_details_p1>li:last-child{
      border-bottom: 1px solid #ebebeb;
    }
    .weight_details_p1 span.red{
      color: #ff3a3a;
      margin-right: 5px;
    }
    .weight_details_p1 span.black{
      color: #333;
      margin-right: 5px;
    }
    .weight_details_p1 span.blue{
      color: #00a0db;
      margin-right: 5px;
    }
    .weight_details_msg{
      width: 220px;
      background: #fafafa;
      height: 60px;
      line-height: 60px;
      padding-left: 40px;
    }
    .msg_details{
      margin-left: 30px;
    }
    .table_content_1st table,.table_content_2nd table,.echarts_main table{
      border-right:1px solid #ebebeb;
      border-bottom:1px solid #ebebeb;
      margin-bottom: 20px;
    }
    .table_content_1st table td,.table_content_2nd table td,.echarts_main table td{
      border-left:1px solid #ebebeb;
      border-top:1px solid #ebebeb;
      text-align: center;
      vertical-align: middle;
      width: 169px;
      height: 60px;
    }
    .table_content_2nd table td,.echarts_main table td{
      width: 239px;
      height: 60px;
    }
    .advertise_box1{
      display:flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .echarts_container{
      margin-bottom: 20px;
    }
    .echarts_title{
      padding: 20px 0;
      border-bottom: 1px solid #ebebeb;
      margin-bottom: 20px;
    }
    .echarts_title_name{
      font-size: 24px;
      margin-right: 40px;
    }
    .echarts_title_first{
      margin-right: 30px;
    }
    .color_blue{
      color: #008abd;
    }
    .echarts_days{
      display: inline-block;
      width: 56px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      margin-left: 5px;
    }
    .day1{
      margin-left: 684px;
    }
    .days_blue{
      color: #fff;
      background: #008abd;
      border-color: #008abd;
    }
    .echarts_main{
      width: 1200px;
      height: 500px;
      border: 1px solid #ebebeb;
    }
</style>
