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
  data() {
    return {};
  }
};
</script>