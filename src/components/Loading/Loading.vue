<template>
  <div class="loading" v-show="loading">
    <img src="../../assets/loading.gif">
  </div>
</template>
<script>
export default {
  name: "Loading",
  data() {
    return {
      loading: false
    };
  },
  created() {
    var that = this;
    this.bus.$on("loading", function(data) {
      that.loading = !!data;
    });
  }
};
</script>
<style scoped lang="less">
.loading {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  color: #fff;
  opacity: 0.8;
  background-color: rgba(0, 0, 0, 0.9);
  p {
    padding: 0.15rem 0.15rem 0.2rem;
    color: #fff;
    font-size: 0.16rem;
  }
  img {
  }
}
</style>