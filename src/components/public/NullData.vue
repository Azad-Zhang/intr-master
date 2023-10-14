<template>
  <div class="NullData">
    <div class="imgDiv">
      <img
        src="https://static.zhipin.com/zhipin-recommend/v178/images/assess-empty.png"
        alt=""
      />
    </div>
    <div><span>没有相关数据</span></div>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
} from "vue";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
};

// 生命周期钩子
onMounted(() => {
  // 组件被挂载时执行的逻辑
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
.imgDiv {
  margin: 16% 0 0 0;
}
span {
  padding: 30px;
}
</style>
