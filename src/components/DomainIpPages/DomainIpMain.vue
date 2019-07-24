<template>
  <keep-alive :max="4">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: "DomainIpMain",
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/searchs/") {
      let storage = window.sessionStorage;
      storage.removeItem("searchContent");
    }
    next();
  },
  data() {
    return {};
  }
};
</script>