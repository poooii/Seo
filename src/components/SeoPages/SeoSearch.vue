<template>
  <div>
    <!-- 头部搜索框 -->
    <!-- 搜索框子组件，可反复调用，title为传入的搜索框上文字，@msgToSearch为组件传出的搜索内容，@msgSearchHot为组件传出的热门搜索内容 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="seo_main_content" v-if="!content==''">
      <!-- 主体第一大块 -->
      <div class="content_title clearfix">
        <span class="t_title fl">手机游戏_手机软件 - PC6手机站</span>
        <span class="t_time fr">更新时间：2019-03.31 05:26:26</span>
        <span class="t_history fr">
          <img src="../../assets/dataupdate.png">历史数据
        </span>
      </div>
      <div>
        <ul class="weight_content clearfix">
          <li class="weight_details">
            <!-- 过滤器，限制域名字符个数 -->
            <div class="weight_net">{{content | ellipsis}}</div>
            <span class="weight_name">域名</span>
          </li>
          <li class="weight_details" v-for="weights in weightcontent">
            <div class="weight_net">
              <!-- 循环权重图片 -->
              <img :src="require(`../../assets/${weights.img}.png`)">
              <span>{{weights.weight}}</span>
            </div>
            <!-- 循环名称 -->
            <span class="weight_name">{{weights.name}}</span>
          </li>
        </ul>
      </div>
      <div>
        <ul class="weight_details_p1">
          <li>
            <span class="weight_details_msg">SEO信息：</span>
            <span class="msg_details">
              百度来路：
              <span class="red">{{baidulailu}}</span>IP
            </span>
            <span class="msg_details">
              移动来路：
              <span class="black">134,014 ~ 173,573</span>IP
            </span>
            <span class="msg_details">
              出站链接：
              <span class="black">13</span>
            </span>
            <span class="msg_details">
              首页内链：
              <span class="black">17</span>
            </span>
          </li>
          <li>
            <span class="weight_details_msg">ALEXA排名：</span>
            <span class="msg_details">
              世界排名：
              <span class="black">{{alexa_rank}}</span>
            </span>
            <span class="msg_details">
              预估日均IP≈
              <span class="black">{{alexa_ip}}</span>
            </span>
            <span class="msg_details">
              预估日均PV≈
              <span class="black">{{alexa_pv}}</span>
            </span>
          </li>
          <li>
            <span class="weight_details_msg">网站标题：</span>
            <span class="msg_details black">足球比分预测足球在线交流-亚博体育官方论坛 - POWERED BY DISCUZ!</span>
          </li>
          <li>
            <span class="weight_details_msg">备案信息：</span>
            <span class="msg_details">
              备案号：
              <span class="blue">{{icp}}</span>
            </span>
            <span class="msg_details">
              性质：
              <span class="black">{{icp_type}}</span>
            </span>
            <span class="msg_details">
              名称：
              <span class="black">{{company}}</span>
            </span>
            <span class="msg_details">
              审核时间：
              <span class="black">{{icp_createtime}}</span>
            </span>
          </li>
          <li>
            <span class="weight_details_msg">域名信息：</span>
            <span class="msg_details">
              注册邮箱：
              <span class="black">{{email_code | ellipsis}}</span>
            </span>
            <span class="msg_details">
              年龄：
              <span class="black">{{whios_created}}</span>
              （{{whios_created2}}）
            </span>
          </li>
          <li>
            <span class="weight_details_msg">网站速度：</span>
            <span class="msg_details">{{speed}}</span>
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
            <td>{{pc_cishu}}</td>
            <td>{{yidong_cishu}}</td>
            <td>1</td>
            <td>{{baiduindex}}</td>
            <td>{{shoulu_1day}}</td>
            <td>{{shoulu_7day}}</td>
            <td>{{shoulu_30day}}</td>
          </tr>
        </table>
      </div>
      <!-- 第一块广告位 -->
      <div class="advertise_box">
        <img v-for="advs in advpic" :src="require(`../../assets/${advs}.png`)">
      </div>
      <!-- 第二表格 -->
      <div class="table_content_2nd">
        <table width="1200px">
          <tr>
            <td class="bg_gray"></td>
            <td class="bg_gray">百度</td>
            <td class="bg_gray">google</td>
            <td class="bg_gray">搜狗</td>
            <td class="bg_gray">360</td>
          </tr>
          <tr>
            <td>收录</td>
            <td>{{shoulu_baidu}}</td>
            <td>{{shoulu_google}}</td>
            <td>{{shoulu_sougou}}</td>
            <td>{{shoulu_360}}</td>
          </tr>
          <tr>
            <td>反链</td>
            <td>{{fanlian_baidu}}</td>
            <td>{{fanlian_google}}</td>
            <td>{{fanlian_sougou}}</td>
            <td>{{fanlian_360}}</td>
          </tr>
        </table>
      </div>
      <!-- 百度关键词 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">百度关键词</span>
          <!-- 以下为点击切换标签，并且传值进方法中，后期根据传入的值得，在方法中调用ajax，重新赋值数据，刷新页面，0，1，2等值后期可以任意修改，对应方法中也需要修改 -->
          <span
            class="echarts_title_first"
            :class="{ color_blue:equipchange == 0}"
            @click="ChangeEquip(0)"
          >PC趋势</span>
          <span
            class="echarts_title_second"
            :class="{ color_blue:equipchange == 1}"
            @click="ChangeEquip(1)"
          >移动趋势</span>
          <span
            class="echarts_days"
            :class="{ days_blue:chartdayschange == '0'}"
            @click="ChangeChartDays('0')"
          >7天</span>
          <span
            class="echarts_days"
            :class="{ days_blue:chartdayschange == '1'}"
            @click="ChangeChartDays('1')"
          >30天</span>
          <span
            class="echarts_days"
            :class="{ days_blue:chartdayschange == '2'}"
            @click="ChangeChartDays('2')"
          >3个月</span>
        </div>
        <div class="echarts_main">
          <table width="1200px" class="bn_right">
            <tr>
              <td class="bg_gray bn_top bn_left">
                <span class="e_blue"></span>前10名
              </td>
              <td class="bg_gray bn_top">
                <span class="e_green"></span>前20名
              </td>
              <td class="bg_gray bn_top">
                <span class="e_yellow"></span>前30名
              </td>
              <td class="bg_gray bn_top">
                <span class="e_lblue"></span>前40名
              </td>
              <td class="bg_gray bn_top bn_right">
                <span class="e_purple"></span>前50名
              </td>
            </tr>
            <tr>
              <td v-for="items in word_localtion_local">{{items}}</td>
            </tr>
          </table>
          <!-- 图表 -->
          <!-- 封装的echarts图表组件 ：后面为传入的值得，在data中定义-->
          <LineCharts
            :xdata="xdata"
            :showxis="showxis"
            :option="series"
            :styl="{width: '1140px', height: '340px'}"
            id="keywordChart"
          ></LineCharts>
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
              <td class="bg_gray">
                2%
                密度
                8%
              </td>
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
        <img v-for="advs in advpic" :src="require(`../../assets/${advs}.png`)">
      </div>
      <!-- 来路关键词 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">来路关键词</span>
          <span
            class="echarts_title_first"
            :class="{ color_blue:fromchange == '0'}"
            @click="ChangeFrom('0')"
          >PC趋势</span>
          <span
            class="echarts_title_second"
            :class="{ color_blue:fromchange == '1'}"
            @click="ChangeFrom('1')"
          >移动趋势</span>
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
            <tr v-for="items in qushi">
              <td>{{items.W}}</td>
              <td class="keyword_3rd_orange">{{transfPage(items.P)}}</td>
              <td>{{items.zs}}</td>
              <td>{{items.zs_pc}}</td>
              <td>{{items.zs_wise}}</td>
              <td>{{toThousands(items.sl)}}</td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 收录/索引信息 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">收录/索引信息</span>
          <span
            class="echarts_title_first"
            :class="{ color_blue:equipchange == '0'}"
            @click="ChangeEquip('0')"
          >收录</span>
          <span
            class="echarts_title_3rd"
            :class="{ color_blue:equipchange == '1'}"
            @click="ChangeEquip('1')"
          >索引</span>
          <span
            class="echarts_days"
            :class="{ days_blue:dayschange == '0'}"
            @click="ChangeDays('0')"
          >7天</span>
          <span
            class="echarts_days"
            :class="{ days_blue:dayschange == '1'}"
            @click="ChangeDays('1')"
          >30天</span>
          <span
            class="echarts_days"
            :class="{ days_blue:dayschange == '2'}"
            @click="ChangeDays('2')"
          >3个月</span>
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
            :xdata="xdata"
            :showxis="showxis"
            :option="series"
            :styl="{width: '1140px', height: '340px'}"
            id="keywordChart2"
          ></LineCharts>
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
            <tr v-for="item in footballdata">
              <td class="bg_gray">{{item.title}}</td>
              <td>{{item.content}}</td>
              <td>
                <i>{{item.num}}</i>个字符（一般不超过80）
              </td>
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
              <img
                src="https://traffic.alexa.com/graph?w=700&h=280&r=6m&y=t&u=www.wowchina.com"
                alt
              >
            </div>
            <div class="alexa_pic_right">
              <p>ALEXA搜索流量占比</p>
              <img
                src="https://traffic.alexa.com/graph?w=700&h=280&r=6m&y=t&u=www.wowchina.com"
                alt
              >
            </div>
          </div>
        </div>
      </div>
      <!-- 相关域名 -->
      <div class="echarts_container">
        <div class="echarts_title">
          <span class="echarts_title_name">相关域名</span>
          <span
            class="echarts_title_first"
            :class="{ color_blue:related_net == '0'}"
            @click="ChangeNet('0')"
          >子域名</span>
          <span
            class="echarts_title_first"
            :class="{ color_blue:related_net == '1'}"
            @click="ChangeNet('1')"
          >同IP网站</span>
          <span
            class="echarts_title_first"
            :class="{ color_blue:related_net == '2'}"
            @click="ChangeNet('2')"
          >网站反链</span>
        </div>
        <div class="echarts_main keyword_container_5th">
          <table width="1200px">
            <tr>
              <td class="bg_gray">
                <i>{{subdomain_sum}}</i> 个相关子域名
              </td>
            </tr>
            <tr>
              <td>
                <ul class="clearfix">
                  <li v-for="items in hotsearch">
                    <a>{{items}}</a>
                  </li>
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
              <td>{{ip}}</td>
              <td class="bg_gray">协议类型：</td>
              <td>{{xieyi_type}}</td>
            </tr>
            <tr>
              <td class="bg_gray">服务器类型：</td>
              <td>{{server_type}}</td>
              <td class="bg_gray">页面类型：</td>
              <td>{{page_type}}</td>
            </tr>
            <tr>
              <td class="bg_gray">所在地址：</td>
              <td>{{address}}</td>
              <td class="bg_gray"></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
      <!-- 底部广告位 -->
      <div class="advertise_box bottom_adv">
        <img v-for="advs in advpic" :src="require(`../../assets/${advs}.png`)">
      </div>
    </div>
    <NearlySearch @msgNearlysearch="getNearly"></NearlySearch>
  </div>
</template>

<script>
import LineCharts from "../Echarts/line";
import SearchBox from "../BaseComponents/SearchBox";
import NearlySearch from "../BaseComponents/NearlySearch";
import { setTimeout } from "timers";

export default {
  name: "SeoSearch",
  components: {
    LineCharts,
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      // 传入echarts中，是否显示x轴和y轴
      showxis: true,
      //被遍历的ip集合
      hotsearch: [],
      hotsearch_get: {
        0: [],
        1: [],
        2: []
      },
      // 搜索框标题
      title: "SEO综合查询",
      //来路关键词切换
      fromchange: "0",
      // 搜索内容
      content: "",
      // 以下几个为切换标签的默认值得，如要修改与dom处对应即可
      equipchange: "0",
      dayschange: "",
      chartdayschange: "2",
      related_net: "0",
      //百度来路ip
      baidulailu: "",
      //pc词数
      yidong_cishu: "",
      //移动词数
      pc_cishu: "",
      // icp info
      icp: "",
      icp_type: "",
      company: "",
      //注册邮箱
      email_code: "",
      whios_created: "",
      icp_createtime: "",
      whios_created2: "",
      //排名
      alexa_rank: "",
      alexa_ip: "",
      alexa_pv: "",
      //子域名
      subdomain_sum: "",
      subdomain_sums: {
        0: "",
        1: "",
        2: ""
      },
      //测速
      speed: "",
      //dns信息
      ip: "",
      address: "",
      dns_num: "",
      //ip框

      //索引 收录1
      baiduindex: "",
      shoulu_baidu: "",
      shoulu_google: "",
      shoulu_sougou: "",
      shoulu_360: "",
      // 收录2
      fanlian_baidu: "",
      fanlian_google: "",
      fanlian_sougou: "",
      fanlian_360: "",
      // 收录3
      shoulu_1day: "",
      shoulu_7day: "",
      shoulu_30day: "",
      // 类型
      xieyi_type: "",
      page_type: "",
      server_type: "",
      //来路趋势
      qushi: {},
      qushi_pc: {},
      qushi_yidong: {},
      // 关键词排名
      word_localtion_local: [],
      word_localtion: [],
      // 模拟足球数据
      footballdata: [
        {
          title: "网站标题：",
          content:
            "足球比分预测足球在线交流-亚博体育官方论坛 - POWERED BY DISCUZ!0",
          num: "30"
        },
        {
          title: "网站关键字：",
          content: "亚博体育 足球交流 足球比分预测",
          num: "18"
        },
        {
          title: "网站简介",
          content:
            "看足球比分，首选亚博体育！体育足球比分频道提供最快最准最全的足球即时比分，比分直播、足球比分直播与比赛现场同步，更有赛事数据统计、现场分析等。亚博 体育官网为您提供更全面的足球资讯-看足球来这里就对了。。",
          num: "5"
        }
      ],
      // 传入echarts中的数据
      xdata: [],
      xdata_m: [],
      xdataRes: [],
      xdataRes_m: [],
      series: [],
      series_m: [],
      // 模拟的假数据，可看做是ajax返回的数据
      seriesRes: [
        {
          name: "前10",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "前20号",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "前30",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "前40",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "前50",
          type: "line",
          symbol: "none",
          data: []
        }
      ],
      seriesRes_m: [
        {
          name: "前10",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "前20号",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "前30",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "前40",
          type: "line",
          symbol: "none",
          data: []
        },
        {
          name: "前50",
          type: "line",
          symbol: "none",
          data: []
        }
      ],
      // 模拟图片数据
      advpic: ["adv1", "adv3", "adv2"],
      // 模拟权重处数据
      weightcontent: {
        aizhan: {
          name: "爱站权重",
          weight: "0",
          img: "az_wt"
        },
        zhanzhang: {
          name: "站长权重",
          weight: "0",
          img: "zz_wt"
        },
        yidong: {
          name: "移动权重",
          weight: "0",
          img: "bd_wt"
        },
        sougou: {
          name: "搜狗PR",
          weight: "0",
          img: "sg_wt"
        },
        google: {
          name: "谷歌PR",
          weight: "0",
          img: "gg_wt"
        }
      }
    };
  },
  methods: {
    // 几个标签选择切换
    ChangeEquip(equip) {
      if (equip == "0") {
        this.word_localtion_local = this.word_localtion.slice(0, 5);
      } else {
        this.word_localtion_local = this.word_localtion.slice(-5);
      }
      this.equipchange = equip;

      this.ChangeChartDays(2);
    },
    //来路关键词切换
    ChangeFrom(fromnum) {
      this.fromchange = fromnum;
    },
    // 百度关键词echarts图标切换
    ChangeChartDays(days) {
      this.chartdayschange = days;
      var seriesType;
      var xdataType;
      var echartsData = [];
      var chartXdata = [];
      if (this.equipchange == 0) {
        seriesType = this.seriesRes;
        xdataType = this.xdataRes;
      } else {
        seriesType = this.seriesRes_m;
        xdataType = this.xdataRes_m;
      }
      echartsData = JSON.parse(JSON.stringify(seriesType));
      chartXdata = JSON.parse(JSON.stringify(xdataType));
      if (this.chartdayschange == "0") {
        for (let i in echartsData) {
          echartsData[i].data = seriesType[i].data.slice(-7);
        }
        chartXdata = xdataType.slice(-7);
        this.series = echartsData;
        this.xdata = chartXdata;
      }
      if (this.chartdayschange == "1") {
        for (let i in echartsData) {
          echartsData[i].data = seriesType[i].data.slice(-30);
        }
        chartXdata = xdataType.slice(-30);
        this.series = echartsData;
        this.xdata = chartXdata;
      }
      if (this.chartdayschange == "2") {
        this.series = seriesType;
        this.xdata = xdataType;
      }
    },
    //切换ip标签
    ChangeNet(net) {
      this.related_net = net;
      this.hotsearch = this.hotsearch_get[net];
      this.subdomain_sum = this.subdomain_sums[net];
    },
    // 搜索框点击事件
    getMsg(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
      this.word_localtion_local.length = 0;
      this.word_localtion.length = 0;
      this.equipchange = 0;
      this.doAllGet();
      setTimeout(() => {
        this.bus.$emit("loading", false);
      }, 1500);
    },
    // 点击热门搜索
    searchHot(data) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", data);
      this.content = storage.searchContent;
    },
    // 点击底部最近搜索
    getNearly(msg) {
      let storage = window.sessionStorage;
      storage.setItem("searchContent", msg);
      this.content = storage.searchContent;
      window.scrollTo(0, 0);
    },
    //请求数据

    // google 权重
    getPrGoogle() {
      return this.$http
        .get("/Api/seo/pr_google", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.weightcontent.google.weight = res.data.pr ? res.data.pr : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getPrSogou() {
      return this.$http
        .get("/Api/seo/pr_sogou", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.weightcontent.sougou.weight = res.data.pr ? res.data.pr : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getBaiduRank() {
      return this.$http
        .get("/Api/seo/baidurank", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (res.data.min_ip && res.data.max_ip) {
            this.baidulailu =
              this.toThousands(res.data.min_ip) +
              " ~ " +
              this.toThousands(res.data.max_ip);
          } else {
            this.baidulailu = "-";
          }
          this.weightcontent.aizhan.weight = res.data.br ? res.data.br : "-";
          this.weightcontent.yidong.weight = res.data.m_br
            ? res.data.m_br
            : "-";
          this.pc_cishu = res.data.pc_sum ? res.data.pc_sum : "-";
          this.yidong_cishu = res.data.m_sum ? res.data.m_sum : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getIcp() {
      return this.$http
        .get("/Api/seo/icp", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.icp = res.data.icp ? res.data.icp : "-";
          this.icp_type = res.data.type ? res.data.type : "-";
          this.company = res.data.company ? res.data.company : "-";
          if (res.data.icp_time) {
            var date = new Date(res.data.icp_time * 1000);
            this.icp_createtime =
              date.getFullYear() +
              "-" +
              (date.getUTCMonth() + 1) +
              "-" +
              date.getUTCDate();
          } else {
            this.icp_createtime = "-";
          }
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getWhois() {
      return this.$http
        .get("/Api/seo/whois", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.email_code = res.data.emailCode ? res.data.emailCode : "-";
          this.whios_created = res.data.created
            ? this.timeDiff(res.data.created)
            : "-";
          this.whios_created2 = res.data.created
            ? "创建于" +
              res.data.created.replace("-", "年").replace("-", "月") +
              "日"
            : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getAlexa() {
      return this.$http
        .get("/Api/seo/alexa", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.alexa_ip = res.data.ip ? res.data.ip : "-";
          this.alexa_pv = res.data.pv ? res.data.pv : "-";
          this.alexa_rank = res.data.rank ? res.data.rank : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getSubdomains() {
      return this.$http
        .get("/Api/seo/subdomains", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (res.data.sum > 0) {
            this.subdomain_sums[0] = res.data.sum;
            this.subdomain_sum = res.data.sum;
            for (var t in res.data.domains) {
              if (t > 20) break;
              this.hotsearch.push(res.data.domains[t].site);
              this.hotsearch_get[0].push(res.data.domains[t].site);
            }
          }
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getSpeed() {
      return this.$http
        .get("/Api/seo/speed", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.speed = res.data.telecom
            ? "电信:" + res.data.telecom
            : "测速失败";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getDns() {
      return this.$http
        .get("/Api/seo/dns", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (res.data.num > 0) {
            this.subdomain_sums[1] = res.data.num;
            for (var t in res.data.domains) {
              if (t > 20) break;
              this.hotsearch_get[1].push(res.data.domains[t]);
            }
          }
          this.ip = res.data.ip ? res.data.ip : "-";
          this.address = res.data.address ? res.data.address : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getLink() {
      return this.$http
        .get("/Api/seo/link", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (res.data.count > 0) {
            this.subdomain_sums[2] = res.data.count;
            for (var t in res.data.items) {
              if (t > 20) break;
              this.hotsearch_get[2].push(res.data.items[t].url);
            }
          }
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getShoulu1() {
      return this.$http
        .get("/Api/seo/shoulu1", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.baiduindex = res.data.baiduindex ? res.data.baiduindex : "-";
          this.shoulu_google = res.data.google ? res.data.google : "-";
          this.shoulu_sougou = res.data.sogou ? res.data.sogou : "-";
          this.shoulu_360 = res.data[360]
            ? res.data[360]
            : res.data.s_360
            ? res.data.s_360
            : "-";
          this.shoulu_baidu = res.data.baidu ? res.data.baidu : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getShoulu2() {
      return this.$http
        .get("/Api/seo/shoulu2", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.fanlian_google = res.data.google_r ? res.data.google_r : "-";
          this.fanlian_sougou = res.data.sogou_r ? res.data.sogou_r : "-";
          this.fanlian_360 = res.data["360_r"]
            ? res.data["360_r"]
            : res.data.f_360
            ? res.data.f_360
            : "-";
          this.fanlian_baidu = res.data.baidu_r ? res.data.baidu_r : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getShoulu3() {
      return this.$http
        .get("/Api/seo/shoulu3", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.shoulu_1day = res.data.baidu_1days ? res.data.baidu_1days : "-";
          this.shoulu_7day = res.data.baidu_7days ? res.data.baidu_7days : "-";
          this.shoulu_30day = res.data.baidu_30days
            ? res.data.baidu_30days
            : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getWebpage() {
      return this.$http
        .get("/Api/seo/webpage", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.server_type = res.data.header.Server
            ? res.data.header.Server
            : "-";
          this.page_type = res.data.header.ContentType
            ? res.data.header.ContentType
            : "-";
          this.xieyi_type = res.data.header.Protocol
            ? res.data.header.Protocol
            : "-";
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    getBaidurankKeywords() {
      return this.$http
        .get("/Api/seo/baidurankKeywords", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.qushi = this.qushi_pc = res.data.data;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    wordlocation() {
      return this.$http
        .get("/Api/seo/wordlocation", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          var i = res.data;
          for (let n = 0; n < 5; n++) {
            let l = i["pc_sum_" + (n + 1)];
            let m = i["m_sum_" + (n + 1)];
            this.word_localtion.push(l);
            this.word_localtion.push(m);
          }
          this.word_localtion_local = this.word_localtion.slice(0, 5);
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    baiduTrend_m() {
      return this.$http
        .get("/Api/seo/baiduTrend_m", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.xdataRes_m = res.data.date.reverse();
          this.xdata_m = this.xdataRes_m;
          this.seriesRes_m[0].data = res.data.t1.reverse();
          this.seriesRes_m[1].data = res.data.t2.reverse();
          this.seriesRes_m[2].data = res.data.t3.reverse();
          this.seriesRes_m[3].data = res.data.t4.reverse();
          this.seriesRes_m[4].data = res.data.t5.reverse();
          this.series_m = this.seriesRes_m;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    baiduTrend_pc() {
      return this.$http
        .get("/Api/seo/baiduTrend_pc", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          this.xdataRes = res.data.date.reverse();
          this.xdata = this.xdataRes;
          this.seriesRes[0].data = res.data.t1.reverse();
          this.seriesRes[1].data = res.data.t2.reverse();
          this.seriesRes[2].data = res.data.t3.reverse();
          this.seriesRes[3].data = res.data.t4.reverse();
          this.seriesRes[4].data = res.data.t5.reverse();
          this.series = this.seriesRes;
        })
        .catch(res => {
          console.log(res.msg);
        });
    },
    toThousands(t) {
      return (t || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    },
    timeDiff(t) {
      var e = new Date(),
        a = new Date(t),
        i = (e = e.valueOf()) - (a = a.valueOf());
      return (
        (i = new Date(i)).getFullYear() -
        1970 +
        "年" +
        i.getMonth() +
        "月" +
        (i.getDate() - 1) +
        "日"
      );
    },
    transfPage(v) {
      var i = v % 10;
      var j = (v - i) / 10 + 1;
      return "第" + i + "页第" + j + "位";
    },
    doAllGet() {
      this.bus.$emit("loading", true);
      this.$http
        .all([
          this.getBaiduRank(),
          this.getPrSogou(),
          this.getPrGoogle(),
          this.getIcp(),
          this.getWhois(),
          this.getAlexa()
        ])
        .then(
          this.$http.spread((acct, perms) => {
            this.bus.$emit("loading", false);
            this.$http.all([
              this.getSubdomains(),
              this.getSpeed(),
              this.getDns(),
              this.getLink(),
              this.getShoulu1(),
              this.getShoulu2(),
              this.getShoulu3(),
              this.getWebpage(),
              this.getBaidurankKeywords(),
              this.wordlocation(),
              this.baiduTrend_pc(),
              this.baiduTrend_m()
            ]);
          })
        );
    }
  },
  filters: {
    // 限制头部表格网址字符个数
    ellipsis(value) {
      if (!value) return "";
      if (value.length > 18) {
        return value.slice(0, 18) + "...";
      }
      return value;
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "1");
    this.content = storage.searchContent;
    if (storage.searchContent !== "" && storage.searchContent !== undefined) {
      this.doAllGet();
    }
    setTimeout(() => {
      this.bus.$emit("loading", false);
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
.bg_gray {
  background: #fafafa;
  color: #808080;
}

.seo_main_content {
  width: 1200px;
  background: #fff;
  margin: 0 auto;
  margin-top: 60px;
  font-size: 16px;
}

.t_title {
  font-size: 24px;
  line-height: 32px;
  height: 26px;
  color: #333;
}

.t_time {
  line-height: 32px;
  height: 16px;
  color: #999;
}

.t_history {
  line-height: 32px;
  height: 16px;
  margin-right: 20px;
  color: #2b99ff;
}

.weight_content {
  margin: 28px 0 20px 0;
  color: #999;
  font-size: 14px;
}

.weight_content {
  .weight_details {
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
  .weight_details:last-child {
    border-right: 1px solid #ebebeb;
    width: 198px;
  }
}

.weight_net {
  font-size: 18px;
  color: #333;
  margin-top: 20px;
  position: relative;

  span {
    position: absolute;
    top: -4px;
    left: 108px;
    color: #fff;
  }
}

.weight_net:first-child {
  line-height: 30px;
}

.weight_name {
  display: block;
  margin-top: 10px;
}

.t_history img {
  vertical-align: -6px;
  margin-right: 6px;
}

.weight_details_p1 {
  margin-bottom: 20px;
}

.weight_details_p1 > li {
  width: 1198px;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #808080;
  border: 1px solid #ebebeb;
  border-bottom: none;
}

.weight_details_p1 > li:last-child {
  border-bottom: 1px solid #ebebeb;
}

.weight_details_p1 span.red {
  color: #ff3a3a;
  margin-right: 5px;
}

.weight_details_p1 span.black {
  color: #333;
  margin-right: 5px;
}

.weight_details_p1 span.blue {
  color: #00a0db;
  margin-right: 5px;
}

.weight_details_msg {
  width: 220px;
  background: #fafafa;
  height: 60px;
  line-height: 60px;
  padding-left: 40px;
}

.msg_details {
  margin-left: 30px;
}

.table_content_1st {
  margin-bottom: 20px;
}

.table_content_1st table,
.table_content_2nd table,
.echarts_main table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
}

.table_content_1st table td,
.table_content_2nd table td,
.echarts_main table td {
  border-left: 1px solid #ebebeb;
  border-top: 1px solid #ebebeb;
  text-align: center;
  vertical-align: middle;
  width: 169px;
  height: 60px;
}

.echarts_main table {
  .bn_top {
    border-top: none;
  }

  .bn_left {
    border-left: none;
  }
}

.table_content_2nd table td,
.echarts_main table td {
  width: 239px;
  height: 60px;
}

.advertise_box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.bottom_adv {
  margin-bottom: 60px;
}

.echarts_title {
  padding: 10px 0 20px 0;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 20px;
}

.echarts_title span {
  cursor: pointer;
}

.echarts_title_name {
  font-size: 24px;
  margin-right: 40px;
}

.echarts_title_first {
  margin-right: 30px;
}

.echarts_title_second {
  margin-right: 680px;
}

.echarts_title_3rd {
  margin-right: 698px;
}

.echarts_days {
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

.days_blue {
  color: #fff;
  background: #008abd;
  border-color: #008abd;
}

.echarts_container {
  margin-bottom: 20px;
}

.echarts_main {
  width: 1200px;
  height: auto;
  border: 1px solid #ebebeb;
  padding-bottom: 20px;

  .bn_right {
    border-right: none;
  }
}

.echarts_main table td span {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  margin-right: 8px;
  vertical-align: -2px;
}

.e_blue {
  background: @echartsBlue;
}

.e_green {
  background: @echartsGreen;
}

.e_yellow {
  background: @echartsYellow;
}

.e_lblue {
  background: @echartsLblue;
}

.e_purple {
  background: @echartsPurple;
}

.keyword_title_2nd {
  border: none;
  margin-bottom: 10px;
}

.keyword_container_2nd {
  border: none;
  height: auto;

  table {
    tr {
      td:first-child {
        width: 18%;
      }
    }
  }
}

.keyword_container_4th {
  border: none;
  padding-bottom: 0;

  table {
    tr {
      td {
        text-align: left;
        padding: 0 3% 0 3%;
        line-height: 32px;
      }

      td:first-child {
        width: 20%;
        border-right: none;
      }

      td:nth-child(2) {
        border-left: none;
      }

      td:last-child {
        width: 20%;
        padding-right: 1%;
        color: #808080;

        i {
          color: #ec1f37;
        }
      }
    }
  }
}

.keyword_container_5th {
  border: none;
  padding-bottom: 0;

  table {
    tr {
      td {
        text-align: left;
        padding: 0 3% 0 3%;
        line-height: 32px;

        i {
          color: #ec1f37;
        }

        ul {
          padding: 20px 0;

          li {
            float: left;
            margin-right: 20px;

            a {
              cursor: pointer;
              color: #666;
            }

            a:hover {
              color: #007bb7;
            }
          }
        }
      }
    }
  }
}

.keyword_container_6th {
  border: none;
  padding-bottom: 0;

  table {
    tr {
      td {
        text-align: left;
        padding: 0 3% 0 3%;
        line-height: 32px;
      }

      td:first-child {
        width: 20%;
        border-right: none;
      }

      td:nth-child(2) {
        width: 30%;
        border-left: none;
      }

      td:nth-child(3) {
        width: 20%;
        border-left: none;
      }

      td:last-child {
        border-left: none;
      }
    }
  }
}

.keyword_container_3rd {
  border: none;
  height: auto;
  padding-bottom: 0;

  table {
    tr {
      td:first-child {
        width: 30%;
      }
    }
  }
}

.keyword_3rd_orange {
  color: #fb9747;
}

.search_table {
  border-right: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 20px;

  td {
    border-left: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
    text-align: center;
    vertical-align: middle;
    width: 169px;
    height: 60px;
  }
}

.alexa_pic_content {
  margin-top: 50px;

  p {
    margin-bottom: 30px;
  }

  div {
    float: left;
    width: 46%;
    margin-left: 4%;
  }
}
</style>
