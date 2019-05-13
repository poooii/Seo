<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox
      :hotsearch="hotsearch"
      :title="title"
      @msgToSearch="getMsg"
    ></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入要查询的站点</div>
    <div class="seo_main_content" v-if="!content==''">
      <!-- 主体第一大块 -->
      <div class="content_title clearfix">
        <span class="t_title fl">手机游戏_手机软件 - PC6手机站</span>
        <span class="t_time fr">更新时间：2019-03.31 05:26:26</span>
        <span class="t_history fr"><img src="../../assets/dataupdate.png">历史数据</span>
      </div>
      <div>
        <ul class="weight_content clearfix">
          <li class="weight_details">
            <div class="weight_net">{{content | ellipsis}}</div>
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
      <!-- 表格 -->
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
      <div class="advertise_box">
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
      <!-- 百度关键词 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">百度关键词</span>
          <span class="echarts_title_first" :class="{ color_blue:equipchange == '0'}" @click="ChangeEquip('0')">PC趋势</span>
          <span class="echarts_title_second" :class="{ color_blue:equipchange == '1'}" @click="ChangeEquip('1')">移动趋势</span>
          <span class="echarts_days" :class="{ days_blue:dayschange == '0'}" @click="ChangeDays('0')">7天</span>
          <span class="echarts_days" :class="{ days_blue:dayschange == '1'}" @click="ChangeDays('1')">30天</span>
          <span class="echarts_days" :class="{ days_blue:dayschange == '2'}" @click="ChangeDays('2')">3个月</span>
        </div>
        <div class="echarts_main">
          <table width="1200px" class="bn_right">
            <tr>
              <td class="bg_gray bn_top bn_left"><span class="e_blue"></span>前10名</td>
              <td class="bg_gray bn_top"><span class="e_green"></span>前20名</td>
              <td class="bg_gray bn_top"><span class="e_yellow"></span>前30名</td>
              <td class="bg_gray bn_top"><span class="e_lblue"></span>前40名</td>
              <td class="bg_gray bn_top bn_right"><span class="e_purple"></span>前50名</td>
            </tr>
            <tr>
              <td class="bn_left">2387</td>
              <td>2387</td>
              <td>2387</td>
              <td>2387</td>
              <td>2387</td>
            </tr>
          </table>
          <!-- 图表 -->
          <LineCharts
          :xdata="xdata"
          :option="series"
          :styl="{width: '1140px', height: '340px'}"
          id="keywordChart">
          </LineCharts>
        </div>
      </div>
      <div class="echarts_container">
        <div class="echarts_title keyword_title_2nd">
          <span class="echarts_title_name">百度关键词</span>
        </div>
        <div class="echarts_main keyword_container_2nd">
          <table width="1200px">
            <tr>
              <td class="bg_gray">关键词</td>
              <td class="bg_gray">出现频率</td>
              <td class="bg_gray">2%<密度<8%</td>
              <td class="bg_gray">百度指数</td>
              <td class="bg_gray">360指数</td>
              <td class="bg_gray">百度排名</td>
              <td class="bg_gray">排名变化</td>
              <td class="bg_gray">预计流量</td>
            </tr>
            <tr>
              <td>手机游戏下载</td>
              <td>4</td>
              <td>1.68%</td>
              <td>308</td>
              <td>102</td>
              <td>50+</td>
              <td>-</td>
              <td class="color_blue">较少 IP</td>
            </tr>
            <tr>
              <td>手机游戏下载</td>
              <td>3</td>
              <td>1.26%</td>
              <td>612</td>
              <td>165</td>
              <td class="color_blue">重试</td>
              <td>-</td>
              <td class="color_blue">未知 IP</td>
            </tr>
            <tr>
              <td>手机游戏免费下载</td>
              <td>1</td>
              <td>0.56%</td>
              <td>212</td>
              <td>0</td>
              <td class="color_blue">重试</td>
              <td>-</td>
              <td class="color_blue">未知 IP</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 第二块广告位 -->
      <div class="advertise_box">
        <img v-for="advs in advpic" :src='require(`../../assets/${advs}.png`)'>
      </div>
      <!-- 来路关键词 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">来路关键词</span>
          <span class="echarts_title_first" :class="{ color_blue:equipchange == '0'}" @click="ChangeEquip('0')">PC趋势</span>
          <span class="echarts_title_second" :class="{ color_blue:equipchange == '1'}" @click="ChangeEquip('1')">移动趋势</span>
        </div>
        <div class="echarts_main keyword_container_3rd">
          <table width="1200px">
            <tr>
              <td class="bg_gray">关键词</td>
              <td class="bg_gray">百度排名</td>
              <td class="bg_gray">百度指数</td>
              <td class="bg_gray">PC指数</td>
              <td class="bg_gray">移动指数</td>
              <td class="bg_gray">收录量</td>
            </tr>
            <tr>
              <td>普通话成绩查询</td>
              <td class="keyword_3rd_orange">第一页第一位</td>
              <td>6946</td>
              <td>362</td>
              <td>6946</td>
              <td>0</td>
            </tr>
            <tr>
              <td>微粒贷怎么开通</td>
              <td class="keyword_3rd_orange">第一页第一位</td>
              <td>6946</td>
              <td>362</td>
              <td>6946</td>
              <td>0</td>
            </tr>
            <tr>
              <td>顺风快递单查询</td>
              <td class="keyword_3rd_orange">第一页第一位</td>
              <td>6946</td>
              <td>362</td>
              <td>6946</td>
              <td>0</td>
            </tr>
            <tr>
              <td>微粒贷怎么开通</td>
              <td class="keyword_3rd_orange">第一页第一位</td>
              <td>6946</td>
              <td>362</td>
              <td>6946</td>
              <td>0</td>
            </tr>
            <tr>
              <td>微粒贷怎么开通</td>
              <td class="keyword_3rd_orange">第一页第一位</td>
              <td>6946</td>
              <td>362</td>
              <td>6946</td>
              <td>0</td>
            </tr>
            <tr>
              <td>余额宝一天收益</td>
              <td class="keyword_3rd_orange">第一页第一位</td>
              <td>6946</td>
              <td>362</td>
              <td>6946</td>
              <td>0</td>
            </tr>
            <tr>
              <td>OFF是开是关</td>
              <td class="keyword_3rd_orange">第一页第一位</td>
              <td>6946</td>
              <td>362</td>
              <td>6946</td>
              <td>0</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 收录/索引信息 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">收录/索引信息</span>
          <span class="echarts_title_first" :class="{ color_blue:equipchange == '0'}" @click="ChangeEquip('0')">收录</span>
          <span class="echarts_title_3rd" :class="{ color_blue:equipchange == '1'}" @click="ChangeEquip('1')">索引</span>
          <span class="echarts_days" :class="{ days_blue:dayschange == '0'}" @click="ChangeDays('0')">7天</span>
          <span class="echarts_days" :class="{ days_blue:dayschange == '1'}" @click="ChangeDays('1')">30天</span>
          <span class="echarts_days" :class="{ days_blue:dayschange == '2'}" @click="ChangeDays('2')">3个月</span>
        </div>
        <div class="echarts_main">
          <table width="1200px" class="bn_right">
            <tr>
              <td class="bg_gray bn_top bn_left">今日</td>
              <td class="bg_gray bn_top">一周</td>
              <td class="bg_gray bn_top">一月</td>
            </tr>
            <tr>
              <td class="bn_left">2387</td>
              <td>2387</td>
              <td>2387</td>
            </tr>
          </table>
          <!-- 第二图表 -->
          <LineCharts
          :xdata="xdata2"
          :option="series2"
          :styl="{width: '1140px', height: '340px'}"
          id="keywordChart2">
          </LineCharts>
        </div>
      </div>
      <table width="1200px" class="search_table">
          <tr>
            <td class="bg_gray">日期</td>
            <td class="bg_gray">百度搜录</td>
            <td class="bg_gray">百度索引</td>
            <td class="bg_gray">百度反链</td>
            <td class="bg_gray">搜狗收录</td>
            <td class="bg_gray">360收录</td>
          </tr>
          <tr>
            <td>2019-04-08</td>
            <td>1,260,000</td>
            <td>1,726,946</td>
            <td>63,600</td>
            <td>1,382,374</td>
            <td>539,000</td>
          </tr>
          <tr>
            <td>2019-04-08</td>
            <td>1,260,000</td>
            <td>1,726,946</td>
            <td>63,600</td>
            <td>1,382,374</td>
            <td>539,000</td>
          </tr>
          <tr>
            <td>2019-04-08</td>
            <td>1,260,000</td>
            <td>1,726,946</td>
            <td>63,600</td>
            <td>1,382,374</td>
            <td>539,000</td>
          </tr>
          <tr>
            <td>2019-04-08</td>
            <td>1,260,000</td>
            <td>1,726,946</td>
            <td>63,600</td>
            <td>1,382,374</td>
            <td>539,000</td>
          </tr>
          <tr>
            <td>2019-04-08</td>
            <td>1,260,000</td>
            <td>1,726,946</td>
            <td>63,600</td>
            <td>1,382,374</td>
            <td>539,000</td>
          </tr>
          <tr>
            <td>2019-04-08</td>
            <td>1,260,000</td>
            <td>1,726,946</td>
            <td>63,600</td>
            <td>1,382,374</td>
            <td>539,000</td>
          </tr>
          <tr>
            <td>2019-04-08</td>
            <td>1,260,000</td>
            <td>1,726,946</td>
            <td>63,600</td>
            <td>1,382,374</td>
            <td>539,000</td>
          </tr>
          <tr>
            <td>2019-04-08</td>
            <td>1,260,000</td>
            <td>1,726,946</td>
            <td>63,600</td>
            <td>1,382,374</td>
            <td>539,000</td>
          </tr>
      </table>
      <!-- 页面信息 -->
      <div class="echarts_container">
        <div class="echarts_title keyword_title_2nd">
          <span class="echarts_title_name">页面信息</span>
        </div>
        <div class="echarts_main keyword_container_4th">
          <table width="1200px">
            <tr>
              <td class="bg_gray">网站标题：</td>
              <td> 足球比分预测足球在线交流-亚博体育官方论坛 - POWERED BY DISCUZ!0</td>
              <td><i>30</i>个字符（一般不超过80）</td>
            </tr>
            <tr>
              <td class="bg_gray">网站关键字：</td>
              <td>亚博体育  足球交流  足球比分预测</td>
              <td><i>9</i>个字符（一般不超过100）</td>
            </tr>
            <tr>
              <td  class="bg_gray">网站简介：</td>
              <td>看足球比分，首选亚博体育！体育足球比分频道提供最快最准最全的足球即时比分，比分直播、足球比分直播与比赛现场同步，更有赛事数据统计、现场分析等。亚博
               体育官网为您提供更全面的足球资讯-看足球来这里就对了。。</td>
              <td><i>180</i>个字符（一般不超过100）</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="echarts_container">
        <div class="echarts_title keyword_title_2nd">
          <span class="echarts_title_name">ALEXA趋势信息</span>
        </div>
        <div class="echarts_main">
          <table width="1200px" class="bn_right">
            <tr>
              <td class="bg_gray bn_top bn_left">综合排名</td>
              <td class="bg_gray bn_top">当日排名</td>
              <td class="bg_gray bn_top">一周排名</td>
              <td class="bg_gray bn_top">一月排名</td>
              <td class="bg_gray bn_top">三月排名</td>
            </tr>
            <tr>
              <td class="bn_left">2387</td>
              <td>2387</td>
              <td>2387</td>
              <td>2387</td>
              <td>2387</td>
            </tr>
          </table>
          <div class="alexa_pic_content clearfix">
            <div class="alexa_pic_left">
              <p>ALEXA排名走势图</p>
              <img src="https://traffic.alexa.com/graph?w=700&h=280&r=6m&y=t&u=www.wowchina.com" alt="">
            </div>
            <div class="alexa_pic_right">
              <p>ALEXA搜索流量占比</p>
              <img src="https://traffic.alexa.com/graph?w=700&h=280&r=6m&y=t&u=www.wowchina.com" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 相关域名 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">相关域名</span>
          <span class="echarts_title_first" :class="{ color_blue:related_net == '0'}" @click="ChangeNet('0')">子域名</span>
          <span class="echarts_title_first" :class="{ color_blue:related_net == '1'}" @click="ChangeNet('1')">同IP网站</span>
          <span class="echarts_title_first" :class="{ color_blue:related_net == '2'}" @click="ChangeNet('2')">网站反链</span>
        </div>
        <div class="echarts_main keyword_container_5th">
          <table width="1200px">
            <tr>
              <td class="bg_gray"><i>17316</i> 个相关子域名</td>
            </tr>
            <tr>
              <td>
                <ul class="clearfix">
                  <li  v-for="items in hotsearch"><a>{{items}}</a></li>
                  <li  v-for="items in hotsearch"><a>{{items}}</a></li>
                </ul>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 服务器信息 -->
      <div class="echarts_container">
        <div class="echarts_title keyword_title_2nd">
          <span class="echarts_title_name">服务器信息</span>
        </div>
        <div class="echarts_main keyword_container_6th">
          <table width="1200px">
            <tr>
              <td class="bg_gray">IP：</td>
              <td>220.181.56.216</td>
              <td class="bg_gray">经度：</td>
              <td>116.3883</td>
            </tr>
            <tr>
              <td class="bg_gray">纬度：</td>
              <td>39.9289</td>
              <td class="bg_gray">托管地址：</td>
              <td>China Beijing</td>
            </tr>
            <tr>
              <td  class="bg_gray">所在地址：</td>
              <td>北京市电信</td>
              <td class="bg_gray"></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 底部广告位 -->
      <div class="advertise_box bottom_adv">
        <img v-for="advs in advpic" :src='require(`../../assets/${advs}.png`)'>
      </div>
    </div>
    <!-- 最近查询 -->
    <div class="recent_search">
      <div class="recent_search_box">
        <p>最近查询</p>
        <ul class="clearfix">
          <li  v-for="items in hotsearch"><a>{{items}}</a></li>
          <li  v-for="items in hotsearch"><a>{{items}}</a></li>
          <li  v-for="items in hotsearch"><a>{{items}}</a></li>
          <li  v-for="items in hotsearch"><a>{{items}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import LineCharts from "../Echarts/line"
import SearchBox from '../BaseComponents/SearchBox'
export default {
    name:'SeoSearch',
    components: {
      LineCharts,
      SearchBox
    },
    data () {
    return {
      title:"SEO综合查询",
      content:"",
      SeoContent:"",
      equipchange:'0',
      dayschange:"0",
      related_net:"0",
      xdata:[],
      xdata2:['04-02','04-03','-04-04','04-05','04-06','04-07','04-08','04-09'],
      series: [],
      series2: [{
                  name:'前10',
                  type:'line',
                  symbol: 'none',
                  data:[22000, 20000, 21000, 21000, 21000, 22000, 21000,20000],
                  areaStyle: {normal: {color: '#e2f4ff'}},
              }],
        mockdata:[
            {
              name:'seven',
              series:[
              {
                  name:'前10',
                  type:'line',
                  symbol: 'none',
                  data:[22000, 20000, 21000, 21000, 21000, 22000, 21000,20000]
              },
              {
                  name:'前20号',
                  type:'line',
                  symbol: 'none',
                  data:[17500, 16000, 16000, 16500, 16000, 16000, 15200,15000]
              },
              {
                  name:'前30',
                  type:'line',
                  symbol: 'none',
                  data:[11000, 11200, 11000, 12000, 12500, 12000, 12000,14000]
              },
              {
                  name:'前40',
                  type:'line',
                  symbol: 'none',
                  data:[6000, 6500, 6200, 6000, 6300, 6600, 6600,7000]
              },
              {
                  name:'前50',
                  type:'line',
                  symbol: 'none',
                  data:[3000, 3500, 3500, 3800, 3900, 3500, 3800,4200]
              }
              ],
                xdata:['04-02','04-03','-04-04','04-05','04-06','04-07','04-08','04-09'],
            },
          {
          name:'thirty',
          series: [
            {
                name:'前10',
                type:'line',
                symbol: 'none',
                data:[12000, 20000, 25000, 26000, 28000, 29000, 31000,32000]
            },
            {
                name:'前20号',
                type:'line',
                symbol: 'none',
                data:[10500, 12000, 13000, 14500, 15000, 16000, 17200,19000]
            },
            {
                name:'前30',
                type:'line',
                symbol: 'none',
                data:[8000, 9200, 9000, 9000, 10500, 11000, 12000,14000]
            },
            {
                name:'前40',
                type:'line',
                symbol: 'none',
                data:[6000, 6500, 6200, 6000, 6300, 6600, 6600,7000]
            },
            {
                name:'前50',
                type:'line',
                symbol: 'none',
                data:[3000, 3500, 3500, 3800, 3900, 3500, 3800,4200]
            }
          ],
          xdata:['04-02','04-06','-04-10','04-14','04-18','04-22','04-26','04-30'],
        },
        {
          name:'threem',
          series: [
            {
                name:'前10',
                type:'line',
                symbol: 'none',
                data:[42000, 44000, 41000, 41000, 41000, 42000, 45000,40000]
            },
            {
                name:'前20号',
                type:'line',
                symbol: 'none',
                data:[37500, 36000, 36000, 36500, 36000, 36000, 35200,35000]
            },
            {
                name:'前30',
                type:'line',
                symbol: 'none',
                data:[21000, 21200, 21000, 22000, 22500, 22000, 22000,24000]
            },
            {
                name:'前40',
                type:'line',
                symbol: 'none',
                data:[16000, 16500, 16200, 16000, 16300, 16600, 16600,17000]
            },
            {
                name:'前50',
                type:'line',
                symbol: 'none',
                data:[3000, 3500, 3500, 3800, 3900, 3500, 3800,4200]
            }
          ],
            xdata:['04-02','04-14','-04-26','05-10','05-22','06-02','06-14','06-26'],
        },
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
      ChangeEquip (equip) {
        this.equipchange = equip
        this.dayschange = '0'
        this.series = this.mockdata[equip].series
        this.xdata = this.mockdata[equip].xdata
      },
      ChangeDays (days) {
        this.dayschange = days
        this.series = this.mockdata[days].series
        this.xdata = this.mockdata[days].xdata
      },
      ChangeNet (net) {
        this.related_net = net
      },
      getMsg (data) {
         let storage=window.localStorage;
         storage.setItem("searchContent",data);
        this.content=storage.searchContent
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
      let storage=window.localStorage;
      this.content = storage.searchContent
      this.series = this.mockdata[0].series
      this.xdata = this.mockdata[0].xdata
  }
}
</script>

<style lang="less" scoped>
    .bg_gray{
      background: #fafafa;
      color: #808080;
    }
    .cha_default{
      width: 1200px;
      margin: 0 auto;
      padding: 130px 0 130px;
      color: #d3d3d3;
      letter-spacing: 2px;
      font-size: 30px;
      text-align: center;
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
    .weight_content {
      .weight_details{
        float: left;
        width: 199px;
        height: 100px;
        text-align: center;
        border: 1px solid #ebebeb;
        border-right: none;
        margin: 0;
        padding: 0;
      }
    }
    .weight_content {
      .weight_details:last-child{
      border-right: 1px solid #ebebeb;
      width: 198px;
      }
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
    .table_content_1st{
      margin-bottom: 20px;
    }
    .table_content_1st table,.table_content_2nd table,.echarts_main table{
      border-right:1px solid #ebebeb;
      border-bottom:1px solid #ebebeb;
    }
    .table_content_1st table td,.table_content_2nd table td,.echarts_main table td{
      border-left:1px solid #ebebeb;
      border-top:1px solid #ebebeb;
      text-align: center;
      vertical-align: middle;
      width: 169px;
      height: 60px;
    }
    .echarts_main table{
      .bn_top{border-top: none}
      .bn_left{border-left: none}
    }
    .table_content_2nd table td,.echarts_main table td{
      width: 239px;
      height: 60px;
    }
    .advertise_box{
      display:flex;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .bottom_adv{
      margin-bottom: 60px;
    }
    .echarts_title{
      padding: 10px 0 20px 0;
      border-bottom: 1px solid #ebebeb;
      margin-bottom: 20px;
    }
    .echarts_title span{
      cursor: pointer;
    }
    .echarts_title_name{
      font-size: 24px;
      margin-right: 40px;
    }
    .echarts_title_first{
      margin-right: 30px;
    }
    .echarts_title_second{
      margin-right: 680px;
    }
    .echarts_title_3rd{
      margin-right: 698px;
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
      margin-left: 5px;
    }
    .days_blue{
      color: #fff;
      background: #008abd;
      border-color: #008abd;
    }
    .echarts_container{
      margin-bottom: 20px;
    }
    .echarts_main{
      width: 1200px;
      height: auto;
      border: 1px solid #ebebeb;
      padding-bottom: 20px;
      .bn_right{border-right: none;}
    }
    .echarts_main table td span{
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      margin-right: 8px;
      vertical-align: -2px;
    }
    .e_blue{
      background: @echartsBlue;
    }
    .e_green{
      background: @echartsGreen;
    }
    .e_yellow{
      background: @echartsYellow;
    }
    .e_lblue{
      background: @echartsLblue;
    }
    .e_purple{
      background: @echartsPurple;
    }
    .keyword_title_2nd{
      border: none;
      margin-bottom: 10px;
    }
    .keyword_container_2nd{
      border: none;
      height: auto;
      table{
        tr{
          td:first-child{width: 18%}
        }
      }
    }
    .keyword_container_4th{
      border: none;
      padding-bottom: 0;
      table{
        tr{
          td{text-align: left;padding: 0 3% 0 3%;line-height: 32px;}
          td:first-child{width:20%;border-right: none;}
          td:nth-child(2){border-left: none;}
          td:last-child{
            width: 20%;
            padding-right: 1%;
            color: #808080;
            i{color:#ec1f37}
          }
        }
      }
    }
    .keyword_container_5th{
      border: none;
      padding-bottom: 0;
      table{
        tr{
          td{
            text-align: left;
            padding: 0 3% 0 3%;
            line-height: 32px;
            i{color:#ec1f37}
            ul{
              padding: 20px 0;
              li{
                float: left;
                margin-right: 20px;
                a{cursor: pointer;color: #666;}
                a:hover{color: #007bb7;}
              }
            }
          }
        }
      }
    }
    .keyword_container_6th{
      border: none;
      padding-bottom: 0;
      table{
        tr{
          td{text-align: left;padding: 0 3% 0 3%;line-height: 32px;}
          td:first-child{width:20%;border-right: none;}
          td:nth-child(2){width:30%;border-left: none;}
          td:nth-child(3){width:20%;border-left: none;}
          td:last-child{border-left: none;}
        }
      }
    }
    .keyword_container_3rd{
      border: none;
      height: auto;
      padding-bottom: 0;
      table{
        tr{
          td:first-child{width: 30%}
        }
      }
    }
    .keyword_3rd_orange{
      color: #fb9747;
    }
    .search_table{
      border-right:1px solid #ebebeb;
      border-bottom:1px solid #ebebeb;
      margin-bottom: 20px;
      td{
        border-left:1px solid #ebebeb;
        border-top:1px solid #ebebeb;
        text-align: center;
        vertical-align: middle;
        width: 169px;
        height: 60px;
      }
    }
    .alexa_pic_content{
      margin-top: 50px;
      p{margin-bottom: 30px}
      div{float: left;width: 46%;margin-left: 4%}
    }
    .recent_search{
      width: 100%;
      background:#f5f6f9;
      height: 220px;
      .recent_search_box{
        width:1200px;
        margin: 0 auto;
        p{
          font-size: 16px;
          color: #333;
          padding: 40px 0 10px 0;
        }
        ul{
          line-height: 32px;
          li{
            float: left;
            margin-right: 10px;
            a{
              color: #666;
              font-size: 12px;
              cursor: pointer;
            }
            a:hover{color: #007bb7;}
          }
        }
      }
    }
</style>
