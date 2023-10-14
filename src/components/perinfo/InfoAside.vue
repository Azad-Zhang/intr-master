<template>
  <el-row>
    <el-col>
      <el-menu default-active="1">
        <el-menu-item
          v-for="item in asideInfo"
          :key="item.index"
          @click="herf(item.index)"
          :class="{ myActive: item.isActive }"
        >
          <el-icon>
            <location />
          </el-icon>
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Location } from "@element-plus/icons-vue";

const props = defineProps({
  asideInfo: Array,
});



onMounted(() => {
//   console.log("InfoAside下接收到的参数：");
//   console.log(props.asideInfo);
});

function herf(index) {
  for (const item in props.asideInfo) {
    if (props.asideInfo[item].index == index) {
      props.asideInfo[item].isActive = true;
    } else {
      props.asideInfo[item].isActive = false;
    }
  }
}

// console.log(props.asideInfo);
</script>

<style scoped>
.el-menu {
  height: 392px;
}
.el-menu .el-menu-item {
  display: block;
}
.el-menu .el-menu-item:hover {
  background-color: rgb(240, 240, 245);
}
.el-menu .is-active {
  color: #333;
}
.el-menu a {
  text-decoration: none;
  color: #333;
}
.myActive {
  background-color: rgb(240, 240, 245);
}
</style>
