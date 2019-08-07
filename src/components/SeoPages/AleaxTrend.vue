<template>
  <div>
    <!-- 头部搜索框 -->
    <SearchBox :title="title" :content="content" @msgToSearch="getMsg" @msgSearchHot="searchHot"></SearchBox>
    <div class="cha_default" v-if="content==''||content==undefined">请输入查询的网站</div>
    <div class="cha_default" v-show="noResult">未查询到结果</div>
    <div class="main_content" v-if="!content==''" v-show="!noResult">
      <div class="content_title">查询结果</div>
      <div class="aleax_trend_container">
        <table width="1198px">
          <tr>
            <td>综合排名</td>
            <td>当日排名</td>
            <td>一周排名</td>
            <td>一月排名</td>
            <td>三月排名</td>
          </tr>
          <tr>
            <td>{{alexa_3month}}</td>
            <td v-for="item in alexa">
              {{item.v}}
              <span :class="item.o">
                <i></i>
                {{item.c}}
              </span>
            </td>
          </tr>
        </table>
        <div class="aleax_pic_box clearfix">
          <div class="fl">
            <p>ALEXA排名走势图</p>
            <img
              :src="`https://traffic.alexa.com/graph?w=700&h=280&r=6m&y=t&u=${this.content}`"
              alt
            />
          </div>
          <div class="fr">
            <p>ALEXA搜索流量占比</p>
            <img
              :src="`https://traffic.alexa.com/graph?w=700&h=280&r=6m&y=q&u=${this.content}`"
              alt
            />
          </div>
        </div>
      </div>
      <div class="adv_box">
        <a v-for="advs in advpic" target="_blank" href="http://www.baidu.com">
          <img :src="require(`../../assets/${advs}.png`)" />
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
  name: "AleaxTrend",
  components: {
    SearchBox,
    NearlySearch
  },
  data() {
    return {
      title: "alexa趋势信息",
      content: "",
      advpic: ["adv1", "adv3", "adv2"],
      noResult: false,
      alexa: {
        o_d: {
          v: "",
          c: "",
          o: ""
        },
        s_d: {
          v: "",
          c: "",
          o: ""
        },
        o_m: {
          v: "",
          c: "",
          o: ""
        },
        t_m: {
          v: "",
          c: "",
          o: ""
        }
      },
      alexa_3month: ""
    };
  },
  methods: {
    getMsg(data) {
      this.$router.replace({
        name: "AleaxTrend",
        params: { domain: data }
      });
      this.content = data;
      this.getAlexa();
    },
    searchHot(data) {
      this.$router.replace({
        name: "AleaxTrend",
        params: { domain: data }
      });
      this.content = data;
      this.getAlexa();
    },
    getNearly(msg) {
      this.$router.replace({
        name: "AleaxTrend",
        params: { domain: msg }
      });
      this.content = msg;
      this.getAlexa();
      window.scrollTo(0, 0);
    },
    getAlexa() {
      this.bus.$emit("loading", true);
      return this.$http
        .get("/Api/seo/alexa", {
          params: {
            domain: this.content
          }
        })
        .then(res => {
          if (res.data == null || res.data.length == 0) {
            this.noResult = true;
          } else {
            this.noResult = false;
            this.alexa.o_d.v = res.data.alexaUsageStatistic.alexa_1days.value;
            this.alexa.o_d.c = res.data.alexaUsageStatistic.alexa_1days.change;
            this.alexa.o_d.o = this.getColor(
              res.data.alexaUsageStatistic.alexa_1days.change
            );

            this.alexa.s_d.v = res.data.alexaUsageStatistic.alexa_7days.value;
            this.alexa.s_d.c = res.data.alexaUsageStatistic.alexa_7days.change;
            this.alexa.s_d.o = this.getColor(
              res.data.alexaUsageStatistic.alexa_7days.change
            );

            this.alexa.o_m.v = res.data.alexaUsageStatistic.alexa_1months.value;
            this.alexa.o_m.c =
              res.data.alexaUsageStatistic.alexa_1months.change;
            this.alexa.o_m.o = this.getColor(
              res.data.alexaUsageStatistic.alexa_1months.change
            );

            this.alexa.t_m.v = res.data.alexaUsageStatistic.alexa_3months.value;
            this.alexa.t_m.c =
              res.data.alexaUsageStatistic.alexa_3months.change;
            this.alexa.t_m.o = this.getColor(
              res.data.alexaUsageStatistic.alexa_3months.change
            );
            this.alexa_3month =
              res.data.alexaUsageStatistic.alexa_3months.value;
          }
          this.bus.$emit("loading", false);
        })
        .catch(res => {
          console.log(res.msg);
          this.noResult = true;
          this.bus.$emit("loading", false);
        });
    },
    getColor(t) {
      return t.substr(0, 1) == "+" ? "upper" : "lower";
    }
  },
  mounted() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "1");
    window.scrollTo(0, 0);
    if (this.$route.params.domain !== ".") {
      this.content = this.$route.params.domain;
      this.getAlexa();
    }
  },
  activated() {
    let storage = window.sessionStorage;
    storage.setItem("navIndex", "1");
  }
};
</script>

<style lang="less" scoped>
.main_content {
  width: 1200px;
  margin: 0 auto;
}

.content_title {
  font-size: 22px;
  margin: 60px 0 30px 0;
}

.adv_box {
  display: flex;
  justify-content: space-between;
  margin: 40px 0 50px 0;
}

.aleax_trend_container {
  border: 1px solid #ebebeb;

  table {
    tr {
      td {
        border-bottom: 1px solid #ebebeb;
        border-right: 1px solid #ebebeb;
        height: 40px;
        text-align: center;

        .lower {
          color: #00b35d;

          i {
            width: 0;
            height: 0;
            top: 15px;
            border-width: 5px 5px 0;
            border-style: solid;
            border-color: #00b35d transparent transparent;
            position: relative;
            margin-right: 5px;
          }
        }

        .upper {
          color: #ec1f37;

          i {
            width: 0;
            height: 0;
            border-width: 0 5px 5px;
            border-style: solid;
            border-color: transparent transparent #ec1f37;
            position: relative;
            margin-right: 5px;
            bottom: 12px;
          }
        }
      }

      td:last-child {
        border-right: none;
      }
    }

    tr:first-child {
      background: #fafafa;
      color: #666;
    }
  }

  .aleax_pic_box {
    padding: 40px 5%;

    p {
      margin-bottom: 30px;
    }

    div {
      width: 40%;

      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
