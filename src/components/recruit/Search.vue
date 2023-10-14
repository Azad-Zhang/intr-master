<template>
  <div class="serach-box">
    <div class="serach-left">搜索选项</div>
    <div class="serach-input">
      <input placeholder="搜索职位、公司" />
    </div>
    <div class="serach-btn">搜索</div>
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
.serach-box {
  position: relative;
  display: flex;
  width: 80%;
  height: 65px;
  margin: 50px auto;
  background-color: #fff;
  box-shadow: var(--el-box-shadow-light);
}

.serach-box * {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 28px;
  box-sizing: border-box;
}

.serach-box:hover input {
  border: 1px var(--el-color-primary) solid;
  border-left: none;
}

.serach-box:hover .serach-left {
  border: 1px var(--el-color-primary) solid;
  border-right: none;
}

.serach-box .serach-left {
  height: 100%;
  width: 220px;
  font-size: 28px;
}

.serach-box .serach-left::after {
  content: "";
  width: 0;
  height: 0;
  margin: 10px 0 0 10px;
  border: 8px solid rgba(0, 0, 0, 0);
  border-top-color: #606266;
}

.serach-box .serach-input {
  flex: 5;
  height: 100%;
}

.serach-box .serach-input input {
  /* box-sizing: border-box; */
  height: 100%;
  width: 100%;
  outline-style: none;
}

.recruit-box .serach-input input::placeholder {
  color: #909399;
}

.serach-box .serach-btn {
  flex: 1;
  height: 100%;
  color: #ecf5ff;
  background-color: var(--el-color-primary);
}

.serach-box .serach-btn:hover {
  cursor: pointer;
}

.serach-options {
  position: absolute;
  top: 100%;
  width: 400px;
  height: 400px;
  background-color: green;
}
</style>
