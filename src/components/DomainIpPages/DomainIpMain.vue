<template>
  <router-view></router-view>
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