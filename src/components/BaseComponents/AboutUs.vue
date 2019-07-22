<template>
  <div class="main_content">
    <h1>关于我们</h1>
    <p class="under_title">
      <span class="l_line"></span> About us
      <span class="r_line"></span>
    </p>
    <div class="detail_box">
      <ul class="fl">
        <li :class="{selected:idx==0}" @click="changeIdx(0)">
          <span>关于本站</span>
        </li>
        <li :class="{selected:idx==1}" @click="changeIdx(1)">
          <span>广告合作</span>
        </li>
        <li :class="{selected:idx==2}" @click="changeIdx(2)">
          <span>帮助中心</span>
        </li>
        <li :class="{selected:idx==3}" @click="changeIdx(3)">
          <span>版权声明</span>
        </li>
      </ul>
      <div class="detail_right fr" v-show="idx==0">
        <p
          class="detail_title"
        >一起查（17cha.cn）致力于SEO常用工具、搜索优化工具、域名/IP查询工具的研究和开发应用，不断更新有利于站长的实用工具，同时免费开放给站长朋友使用，做站长的好助手，助力网站腾飞！</p>
        <p class="detail_title">1、精准排名查询</p>
        <p class="detail_describe">高性能软件框架，多线程查询，查询速度快，排名结果准确</p>
        <p class="detail_title">2、多搜索引擎覆盖</p>
        <p class="detail_describe">支持百度，360搜索，搜狗搜索，神马搜索等搜索引擎数据查询</p>
        <p class="detail_title">3、永久免费使用</p>
        <p class="detail_describe">站长类工具永久免费使用</p>
        <p class="detail_title">4、批量查询方便快捷</p>
        <p class="detail_describe">多网站数据批量查询，方便快捷，不需要多次查询</p>
      </div>
      <div class="detail_right fr" v-show="idx==1">
        <p class="detail_title">
          广告联系客服QQ：3001263800
          <a
            href="tencent://message/?uin=3001263800&Site=%E4%B8%AD%E4%BB%8B%E7%BD%91"
          >
            <img src="../../assets/websiteValue-qq.png" />
          </a>
        </p>
      </div>
      <div class="detail_right fr" v-show="idx==2">
        <p class="detail_title">百度权重值是什么？</p>
        <p
          class="detail_describe"
        >答：百度值是根据各方面因素，综合指定出的针对该网站在百度里的重要级别，该权重值与谷歌值是不同计算方式，所以该百度权重值仅是搜索引擎中的一个参考数据。</p>
        <p class="detail_title">为什么有时查询到的数据与实际排名不同？</p>
        <p
          class="detail_describe"
        >答：为了节省服务器资源，我们把该排名内容缓存进服务器里了，有可能在这一天的时间里排名发生了变化，特别是有些站每小时的排名变化特别快的。所以现在查询到的数据有可能是1天前或是1小时前的。</p>
        <p class="detail_title">百度预计来的流量和实际不一样？</p>
        <p class="detail_describe">答：我们经过计算每个词的排名和该词的搜索量来估计百度带来的流量，仅供参考，并不能作为直接依据。</p>
      </div>
      <div class="detail_right fr" v-show="idx==3">
        <p class="detail_title">一起查(17cha.cn)版权声明</p>
        <p class="detail_title">1、一起查所收集数据均来自搜索引擎蜘蛛抓取，并未经过人工干预，如抓取的数据侵犯贵公司的权利，请发邮件指出，我们将及时纠正。</p>
        <p class="detail_title">2、一起查(17cha.cn)是免费分享数据的站长平台，请勿将本站数据用于商业用途，由此引发的其他商业纠纷，本站概不负责。</p>
        <p
          class="detail_title"
        >3、未经一起查(17cha.cn)的明确许可，任何人不得盗链本站资源；不得复制或仿造本网站或者在非一起查(17cha.cn)所属的服务器上建立镜像，一起查(17cha.cn)对其自行开发的或和他人共同开发的所有内容、技术手段和服务拥有全部知识产权，任何人不得侵害或破坏.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  data() {
    return {
      idx: 0
    };
  },
  methods: {
    changeIdx(idx) {
      this.idx = idx;
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "5");
  }
};
</script>

<style lang="less" scoped>
.main_content {
  background: #f5f6f9;
  padding: 50px 0 200px 0;
  h1 {
    font-size: 32px;
    color: #2d3033;
    font-weight: normal;
    text-align: center;
  }
  .under_title {
    font-size: 16px;
    color: #879099;
    text-align: center;
    margin-top: 10px;
  }
  .l_line,
  .r_line {
    display: inline-block;
    width: 60px;
    border-top: 1px solid #ccc;
    vertical-align: middle;
    margin-right: 10px;
  }
  .r_line {
    margin: 0;
    margin-left: 10px;
  }
  .detail_box {
    width: 1080px;
    height: 600px;
    margin: 0 auto;
    margin-top: 60px;
    background: #fff;
    ul {
      width: 180px;
      height: 600px;
      background: #edeff2;
      li {
        height: 60px;
        font-size: 16px;
        color: #5a6066;
        cursor: pointer;
        span {
          padding-left: 40px;
          line-height: 60px;
        }
      }
      .selected {
        background: #fff;
        color: #0084c4;
        span {
          border-left: 4px solid #0084c4;
          padding-left: 36px;
        }
      }
    }
    .detail_right {
      width: 800px;
      padding: 0 60px 0 40px;
      .detail_title {
        font-size: 18px;
        line-height: 32px;
        color: #333;
        margin-top: 42px;
        img {
          vertical-align: middle;
          margin-left: 10px;
        }
      }
      .detail_describe {
        font-size: 14px;
        line-height: 28px;
        color: #666;
      }
    }
  }
}
</style>
