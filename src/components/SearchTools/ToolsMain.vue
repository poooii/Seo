<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "ToolsMain",
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/searchs/") {
      let storage = window.sessionStorage;
      storage.removeItem("searchContent");
      storage.removeItem("Keywords");
    }
    next();
  },
  data() {
    return {};
  }
};
</script>