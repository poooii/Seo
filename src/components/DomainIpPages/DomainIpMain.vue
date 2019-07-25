<template>
  <keep-alive :max="4">
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {
  name: "DomainIpMain",
  data() {
    return {};
  }
};
</script>