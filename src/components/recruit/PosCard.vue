<template>
  <div class="card-box" @click="toPosition(props.fData.pid)">
    <div class="brief">
      <div class="brief-info">{{ props.fData.name }}</div>
      <div class="brief-price">
        {{
          props.fData.max == "" || props.fData.max == "0"
            ? props.fData.min + "￥"
            : props.fData.min + "-" + props.fData.max + "￥"
        }}
      </div>
    </div>
    <div class="require">
      <span>{{ props.fData.area }}</span>
      <span>{{ props.fData.type }}</span>
      <span>{{ props.fData.education }}</span>
      <span>{{ props.fData.experience }}</span>
      <!-- 学历和经验 -->
      <!-- <span>{{ fData.degree }}</span>
        <span>{{ fData.experience }}</span> -->
    </div>
    <hr />
    <div class="intr">
      <!-- <div><img src="../../assets/images/wechat.png" alt="" /></div> -->
      <el-avatar :size="60" :src="props.fData.avatar" @error="errorHandler">
        <!-- <img src="http://efuny.top:8080/up/img/4x1t9217QQ图片20230502225447.jpg" /> -->
        <img :src="'/api'+'/up/img/4x1t9217QQ图片20230502225447.jpg'" />
      </el-avatar>
      <!-- <span>{{ fData.baseinfor.FullName }}</span> -->
      <span>牛子公司</span>

      <!-- <span>{{ fData.baseinfor.Industry }}</span> -->
      <!-- <span>{{ fData.baseinfor.Financing }}</span> -->
    </div>
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
import api from "@/api/api.js";
import store from "@/store/index.js";
import { useRouter } from "vue-router";
// 在这里定义组件的响应式变量和函数
const router = useRouter();
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
const toPosition = async function (pid) {
  //增加被看数
  var viewResult = await api.user.addHistoryPosition(props.fData.pid);
  console.log("增加被看记录结果");
  console.log(viewResult);
  router.push({
    path: "/jobIntr",
    query: {
      pid: props.fData.pid,
    },
  });
};

// 生命周期钩子
onMounted(() => {
  // 组件被挂载时执行的逻辑
  console.log(props.fData);
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
  width: 400px;
  height: 160px;
  padding: 20px;
  padding-bottom: 10px;
  background-color: #fff;
  margin-top: 20px;
}

.card-box:hover {
  box-shadow: var(--el-box-shadow);
  transform: translateY(-3%);
}

.card-box:hover .brief-info {
  color: var(--el-color-primary-light-2);
}

.brief {
  display: flex;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
}

.brief-info {
  flex: 5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 5px;
  color: #414a60;
}

.brief-price {
  padding-right: 5px;
  color: tomato;
}

.require {
  padding-right: 10px;
}

.require > span {
  font-size: 18px;

  /* padding-right: px; */
}

.require > span::after {
  content: "|";
  margin-left: 10px;
}
.require > span:last-child::after {
  content: none;
}
hr {
  margin-top: 15px;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
}

.intr {
  display: flex;
  height: 68px;
  font-size: 18px;
  /* padding: 10px; */
  /* background-color: black; */
}

.intr img {
  width: 60px;
  height: 60px;
  margin: 0 20px 0 20px;
}

.intr > * {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
