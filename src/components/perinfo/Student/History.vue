<template>
  <div class="History">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>历史记录</span>
        </div>
      </template>
      <div v-for="(item, index) in state.myHisPos" :key="index">
        <PosCard
          :key="item.pid"
          :fData="item"
          style="width: 730px; border: 1px solid #000"
        ></PosCard>
      </div>
    </el-card>
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
import PosCard from "@/components/recruit/PosCard.vue";
import api from "@/api/api.js";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  myHisPos: [],
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
  setTimeout(async () => {
    const myResult = await api.user.getAllHistoryPosition();
    console.log(myResult);
    for (let i = 0; i < myResult.length; i++) {
      const posInfo = await api.user.toPidGetPositions(myResult[i].pid);
      state.myHisPos.push(posInfo);
    }
    // /user/position/browse/13
  }, 1000);
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scope>
.el-card {
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
}
.card-header {
  text-align-last: left;
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  font-weight: 600;
  color: #2e2e2e;
  font-size: 18px;
}
:deep(.el-card__header) {
  padding: 0;
  margin: 0;
  border: none;
}
:deep(.el-card__body) {
  padding-top: 0;
  padding-left: 32px;
}
</style>
