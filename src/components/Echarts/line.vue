<template>
    <div
       :id="id"
       :style="styl">
    </div>
</template>

<script>
export default {
    name:"echarts-line",
    props: {
    id: {
      type: String
    },
    option: {
      type: Array
    },
    xdata: {
        type: Array
    },
    styl: Object
    
  },
  mounted() {
      this.drawLine()
  },
  watch: {
      option: {
          handler(newVal, oldVal) {
              this.drawLine()
          },
        deep:true
      }
  },
  methods: {
      drawLine () {
        let myChart = this.$echarts.init(document.getElementById(this.id))
        myChart.setOption({
          color:['#2aa0ea','#51d02e', '#fac600', '#1fd5e5', '#a951ec','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
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
              data: this.xdata,
              axisLine:{
                lineStyle: {
                  type: 'solid',
                  color: '#b4becc'
                }
              },
              axisLabel: {
                textStyle: {
                    color: '#666',
                }
              },
              splitLine:{
                show:true
              },
              axisTick:{
                show:false
              }
          },
          yAxis: {
              type: 'value',
              axisLine:{
                lineStyle: {
                  type: 'solid',
                  color: '#b4becc'
                }
              },
              axisLabel : {
                textStyle: {
                    color: '#666',
                },
                formatter (value) {
                  if(value>1000){
                    return (value / 10000).toFixed(1)+'万'
                  }else{
                    return value
                  }
                } 
              },
              axisTick:{
                show:false
              }
          },
          series: this.option
        })
      }
  }
}
</script>