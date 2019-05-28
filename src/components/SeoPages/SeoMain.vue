<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "SeoMain",
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/searchs/") {
      let storage = window.sessionStorage;
      storage.removeItem("searchContent");
      storage.removeItem("Keywords");
      storage.removeItem("S_SeoContent");
    }
    next()
  },
  data() {
    return {};
  }
};
</script>