<template>
  <div :id="id" :style="styl"></div>
</template>

<script>
export default {
  name: "echarts-circle",
  data (){
    return{}
  },
  props: {
    id: {
      type: String
    },
    option: {
      type: Array
    },
    styl: Object
  },
  mounted() {
    this.drawLine();
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        this.drawLine();
      },
      deep: true
    }
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById(this.id));
      myChart.setOption({
        color: [
          "#2aa0ea",
          "#51d02e",
          "#fac600",
          "#1fd5e5",
          "#a951ec",
          "#749f83",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: this.option
      });
    }
  }
};
</script>