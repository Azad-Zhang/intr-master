<template>
  <div class="PosCard" v-for="(item, index) in myData" :key="item.id">
    <el-card shadow="none">
      <el-checkbox v-model="item.Checked" />
      <div class="PosDesc">
        <h3>{{ item.name }}</h3>

        <ul class="posContent">
          <li>{{ item.type }}</li>
          <li>{{ item.area }}</li>
          <li>{{ item.isPractice }}</li>
          <li>{{ mySalary(item.min, item.max) }}</li>
        </ul>
      </div>
      <div class="PosData">
        <ul>
          <li>
            <span class="number">{{ item.view_count }}</span>
            <span>看过我</span>
          </li>
          <li>
            <span class="number">{{ item.chat_count }}</span>
            <span>沟通过</span>
          </li>
          <li>
            <span class="number">{{ item.fav_count }}</span>
            <span>感兴趣</span>
          </li>
          <li class="statusLi">
            <span class="status">{{ myStatus(item.status) }}</span>
          </li>
        </ul>
      </div>
      <div class="toolbar">
        <ul>
          <li @click="sendEditMessage(item.pid)">编辑</li>
          <li @click="sendOpenMessage(item.pid)">打开</li>
          <!-- <li class="more">...</li> -->
          <li @click="sendDeleteMessage(item.pid)">删除</li>
        </ul>
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
const emits = defineEmits();
// props
const props = defineProps({
  // 定义props
  myData: Object,
});

const mySalary = function (min, max) {
  if (max != "0") {
    return min + "-" + max;
  } else return min;
};

const myStatus = function (status) {
  if (status == "0") {
    return "开放中";
  } else if (status == "1") {
    return "待开放";
  } else if (status == "2") {
    return "审核失败";
  } else if (status == "3") {
    return "已关闭";
  }
};
const sendEditMessage = function (pid) {
  console.log("编辑职位");
  emits("edit", pid);
  console.log(pid);
};
const sendOpenMessage = function (pid) {
  console.log("打开工作");
  emits("open", pid);
  console.log(pid);
};
const sendDeleteMessage = function (pid) {
  console.log("删除工作");
  emits("delete", pid);
  console.log(pid);
};
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
.PosCard {
  margin-bottom: 20px;
}
:deep(.el-card__body) {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
:deep(.el-checkbox) {
  flex-grow: 0 !important;
  justify-content: center !important;
}

:deep(.el-card__body > *) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}
.PosDesc {
  flex-grow: 1;
  /* height: 20px; */
  display: inline-block;
  text-align: left;
  padding-left: 30px;
}
.PosDesc h3 {
  font-size: 25px;
}
.posContent {
  width: 350px;
}
.posContent li {
  display: inline-block;
  margin-right: 10px;
  /* padding-left: 10px; */
}
.posContent li::after {
  content: "|";
  margin-left: 10px;
}
.posContent li:last-child::after {
  content: "";
}
.PosData {
  flex-grow: 6;
  margin: 0 20px;
}
.PosData ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.PosData ul li {
  display: block;
  height: 100%;
}
.PosData ul li span {
  display: block;
  /* height: 100%; */
}
.number {
  font-size: 22px;
  padding-bottom: 20px;
  /* margin-bottom: 20px; */
}

.status {
  /* background-color: red; */
  height: 100%;
  line-height: 60px;
  position: relative;
  text-align: left;
  width: 70px;
}
.status::before {
  content: "";
  position: absolute;
  width: 1px;
  height: 1px;
  border: 2px solid #000;
  /* background-color: red; */
  border-radius: 13px;
  left: -15px;
  top: 27px;
}
.toolbar ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toolbar ul li {
  display: block;
  height: 100%;
  line-height: 60px;
  color: #00c2b3;
  cursor: pointer;
  /* background-color: red; */
}
:deep(.more) {
  color: #000 !important;
  /* line-height: 40px; */
  margin-top: -10px;
  font-size: 20px;
  font-weight: bolder;
}
</style>
