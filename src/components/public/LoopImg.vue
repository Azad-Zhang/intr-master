<template>
  <el-carousel :height="heightData" indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      <el-image
        :fit="cover"
        style="width: 100%; height: 100%"
        :src="imgDate"
      ></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  props: {
    height: String,
  },
  data() {
    return {
      heightData: this.height,
      imgDate: new URL(
        "@/assets/images/home-page/home-page2.webp",
        import.meta.url
      ).href,
    };
  },
  watch: {
    height(newHeight) {
      this.heightData = newHeight;
    },
  },
  created() {
    /* 被创建的时候 */
    console.log(this.heightData);
  },
  updated() {
    /* 更新的时候 */
  },
  mounted() {
    /* 被正常挂载的时候 */
  },
  unmounted() {
    /* 对应v2的destroyed，被销毁的时候 */
  },
};
</script>

<style scoped>
/* .el-image {
  height: 100% !important;
} */
</style>
