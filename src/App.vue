<template>
  <el-container>
    <el-header> <NavBar></NavBar></el-header>
    <el-main> <router-view></router-view></el-main>
    <el-footer><Footer></Footer></el-footer>
  </el-container>
  <!-- <Drawer
    v-if="store.state.checkLogin==true && store.state.isWhoLogin='student'"
  ></Drawer> -->
  <Drawer v-if="store.state.checkLogin"></Drawer>
</template>
<script setup>
import NavBar from "@/components/public/NavBar.vue";
import Footer from "@/components/public/Footer.vue";
import Drawer from "@/components/public/Drawer.vue";
import store from "@/store/index.js";
</script>
<style scoped></style>
