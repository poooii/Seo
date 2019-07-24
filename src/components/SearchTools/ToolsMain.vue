<template>
  <div>
    <keep-alive :max="4">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "ToolsMain",
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/searchs/") {
      let storage = window.sessionStorage;
      storage.removeItem("searchContent");
      storage.removeItem("Keywords");
      storage.removeItem("S_SeoContent");
    }
    next();
  },
  data() {
    return {};
  }
};
</script>