<template>
  <div class="RecruitCard">
    <el-card shadow="none">
      <h4>{{ props.myData.Header }}</h4>
      <span class="myNumber">{{ props.myData.Number }}</span>
      <div class="footer">
        <div class="left">
          <span>{{ props.myData.FootData }}</span>
          <i class="iconfont icon-top-s" v-if="props.myData.Cha > 0"></i>
          <i class="iconfont icon-below-s" v-else></i>
          <span>{{ props.myData.Cha }}</span>
        </div>
        <div class="right">
          <span>{{ props.myData.FootData.slice(1) }}</span>
          <span>{{ props.myData.Number - props.myData.Cha }}</span>
        </div>
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
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
  myData: Object,
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
@import url("//at.alicdn.com/t/font_3325537_bq52oblmymj.css");
.RecruitCard {
  margin-right: 20px;
  margin-bottom: 40px;
}
.el-card {
  background-color: #f4f4f5;
  width: 250px;
  flex-wrap: nowrap;
}

:deep(.el-card__body > *) {
  text-align: left;
  flex-wrap: nowrap;
}
.el-card:hover {
  background-color: #e1f4f3;
}
h4 {
  font-weight: normal;
  /* padding-bottom: 2px; */
}
:deep(.el-card__body .content) {
  flex-wrap: nowrap;
}
.myNumber {
  font-size: 30px;
  font-weight: bold;
  padding-bottom: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
}
.left i {
  padding: 0 10px;
  color: #337ecc;
}
.right span {
  padding: 0 0 0 15px;
}
:deep(.el-card__body) {
  padding: 0;
}
</style>
