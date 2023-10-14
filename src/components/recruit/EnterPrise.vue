<template>
  <div class="card-box">
    <div class="entrp-info">
      <!-- <img src="../../assets/images/wechat.png" alt=""> -->
      <el-avatar
        :size="60"
        src="/api/up/img/4x1t9217QQ图片20230502225447.jpg"
        @error="errorHandler"
      >
        <!-- :src="'/api/' + props.fData.avatar" -->
        <!-- <img
          src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        /> -->
      </el-avatar>
      <div class="entrp-info-txt">
        <h3 class="entrp-name">{{ props.fData.name }}</h3>
        <h7 class="entrp-intr">
          <span v-for="item in props.fData.treatment" :key="item">{{
            item
          }}</span>
        </h7>
      </div>
    </div>

    <div class="pos-info">
      <span>{{ props.fData.area }}</span>
      <span>{{ props.fData.size }}</span>
      <span>{{ props.fData.sector }}</span>
      <span>{{ props.fData.financing }}</span>
    </div>
    <!-- <p v-for="item in myCompany.coms" :key="item">
    
    </p> -->
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
  fData: Object,
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
  props.fData.treatment = props.fData.treatment.split("-").slice(4);
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
.card-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 380px;
  height: 150px;
  padding: 20px;
  margin: 50px 0 50px 0;
  /* border: 1px solid red; */
  cursor: pointer;
  background-color: #fff;
  box-shadow: var(--el-box-shadow-lighter);
}
.card-box:hover {
  box-shadow: var(--el-box-shadow);
  transform: translateY(-3%);
}
.card-box > p {
  display: flex;
  flex-direction: column;
  flex: 1;
  /* border-bottom: 1px solid red; */
}

.entrp-info {
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: row;
}

.entrp-info > img {
  width: 70px;
  height: 70px;
}

.entrp-info > div {
  flex: 1;
  height: 100%;
}

.entrp-info-txt {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
}

.entrp-name {
  flex: 1;
  /* background-color: green; */
  font-size: 22px;
  font-weight: 400;
}

.entrp-intr {
  flex: 3;
  /* background-color: yellow; */
}

.entrp-intr > span::after {
  content: "|";
  margin-left: 8px;
}
.entrp-intr > span:last-child::after {
  content: none;
}
.pos-intr {
  display: flex;
  flex: 1;
  justify-content: space-between;
  padding: 5px;
}

.pos-intr:hover :first-child {
  color: var(--el-color-primary);
}

.pos-intr:first-child {
  font-size: 22px;
}

.pos-intr :first-child :nth-child(1):hover {
  color: var(--el-color-primary);
  font-weight: bold;
}

.pos-intr :nth-child(2) {
  color: tomato;
}

.pos-info {
  flex: 2;
}
.pos-info > span {
  padding: 3px;
  background-color: #f8f9fc;
}
</style>
