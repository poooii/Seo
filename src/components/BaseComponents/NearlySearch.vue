<template>
  <div class="recent_search">
    <div class="recent_search_box">
      <p>最近查询</p>
      <ul class="clearfix">
        <li v-for="items in hotsearch">
          <a @click="changeSearchs(items)">{{items}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "nearly-search",
  data() {
    return {
      hotsearch: [
        "po188.com",
        "www.hj135.com",
        "jiaofu.cn",
        "riyiseo.com",
        "shuadan.cn",
        "caoping6s.cn",
        "014121.cn"
      ]
    };
  },
  methods: {
    changeSearchs(data) {
      this.$emit("msgNearlysearch", data);
    }
  }
};
</script>

<style lang="less" scoped>
.recent_search {
  width: 100%;
  background: #f5f6f9;
  padding-bottom: 40px;
  .recent_search_box {
    width: 1200px;
    margin: 0 auto;
    p {
      font-size: 16px;
      color: #333;
      padding: 40px 0 10px 0;
    }
    ul {
      line-height: 32px;
      li {
        float: left;
        margin-right: 10px;
        a {
          color: #666;
          font-size: 12px;
          cursor: pointer;
        }
        a:hover {
          color: #007bb7;
        }
      }
    }
  }
}
</style>
