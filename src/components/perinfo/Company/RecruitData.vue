<template>
  <div class="RecruitData">
    <el-tabs type="border-card" class="SwitchTime" v-model="state.TotalData">
      <el-tab-pane label="日报" name="0"></el-tab-pane>
      <el-tab-pane label="周报" name="1"></el-tab-pane>
      <el-tab-pane label="月报" name="2"></el-tab-pane>
    </el-tabs>
    <el-card shadow="none">
      <div class="head">
        <h3>{{ state.FirstData.Title }}</h3>
      </div>
      <div class="content">
        <RecruitCard :myData="state.ViewData" />
        <RecruitCard :myData="state.ChatData" />
        <RecruitCard :myData="state.FavrData" />
      </div>
    </el-card>
    <el-card shadow="none">
      <div class="head">
        <h3>近期趋势・{{ state.ViewData.Header }}</h3>
        <div class="SwitchDay">
          <div class="Day">
            <el-tabs type="border-card">
              <el-tab-pane label="近7天"></el-tab-pane>
              <el-tab-pane label="近30天"></el-tab-pane>
              <el-tab-pane label="自选日期"></el-tab-pane>
            </el-tabs>
          </div>
          <el-date-picker
            v-model="value1"
            type="monthrange"
            range-separator="To"
            start-placeholder="Start month"
            end-placeholder="End month"
            :disabled="true"
          />
        </div>
      </div>
      <div class="content">
        <div id="Graphical" style="height: 300px; width: 100%"></div>
        <!-- <div id="char" style="width: 600px; height: 600px"></div> -->
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
import RecruitCard from "@/components/perinfo/Company/RecruitCard.vue";
import * as echarts from "echarts"; // 导入echarts库
// import api from "@/api/api.js;";
// import { ECharts, EChartsOption, init } from "echarts";
// import ECharts from "echarts";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  TotalData: 0,
  FirstData: {
    Title: "今日数据",
  },
  ViewData: {
    Header: "浏览数",
    Number: 995,
    FootData: "较昨日",
    Cha: -81,
    isActive: true,
  },
  ChatData: {
    Header: "沟通数",
    Number: 995,
    FootData: "较昨日",
    Cha: -81,
    isActive: true,
  },
  FavrData: {
    Header: "收藏数",
    Number: 995,
    FootData: "较昨日",
    Cha: -81,
    isActive: true,
  },
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
};
const getRenderer = function () {
  let myChart = echarts.init(document.getElementById("Graphical"));
  let option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
      snap: true,
    },
    series: [
      {
        name: "浏览量",
        data: [
          state.ViewData.Number - Math.round(Math.random() * 200 + 50),
          state.ViewData.Number + Math.round(Math.random() * 500 + 150),
          state.ViewData.Number + Math.round(Math.random() * 700 + 20),
          state.ViewData.Number - Math.round(Math.random() * 300 + 30),
          state.ViewData.Number + Math.round(Math.random() * 200 - 20),
          state.ViewData.Number - Math.round(Math.random() * 800 + 9),
          state.ViewData.Number,
        ],
        type: "line",
        smooth: true,
      },
    ],
    axisPointer: [{ show: true, snap: true }],
    tooltip: {
      trigger: "axis",
      //加了变量a和字符'度'
      formatter: "{b0}{a0}:{c0}",
      // formatter: a + "{a0}:{c0}" + "度" + "<br/>" + a + "{a1}:{c1}" + "度",
    },
  };
  option.xAxis.data = [];
  for (let i = 6; i >= 0; i--) {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate() - i;
    if (month < 10) {
      month = month + "月";
    }
    if (day < 10) {
      day = day;
    }
    option.xAxis.data.push(month + day + "日");
  }
  myChart.setOption(option);

  // 设置参数
};

// 生命周期钩子
onMounted(() => {
  getRenderer();
  // 组件被挂载时执行的逻辑
  //   const chartElement = document.getElementById("Graphical");
  //   const echartsInstance = ECharts.init(chartElement);

  //   let option = {
  //     xAxis: {
  //       type: "category",
  //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //     },
  //     yAxis: {
  //       type: "value",
  //       snap: true,
  //     },
  //     series: [
  //       {
  //         name: "浏览量",
  //         data: [
  //           state.ViewData.Number - Math.round(Math.random() * 200 + 50),
  //           state.ViewData.Number + Math.round(Math.random() * 500 + 150),
  //           state.ViewData.Number + Math.round(Math.random() * 700 + 20),
  //           state.ViewData.Number - Math.round(Math.random() * 300 + 30),
  //           state.ViewData.Number + Math.round(Math.random() * 200 - 20),
  //           state.ViewData.Number - Math.round(Math.random() * 800 + 9),
  //           state.ViewData.Number,
  //         ],
  //         type: "line",
  //         smooth: true,
  //       },
  //     ],
  //     axisPointer: [{ show: true, snap: true }],
  //     tooltip: {
  //       trigger: "axis",
  //       formatter: "{b0}:{c0}",
  //     },
  //   };

  //   option.xAxis.data = [];
  //   for (let i = 6; i >= 0; i--) {
  //     const date = new Date();
  //     let month = date.getMonth() + 1;
  //     let day = date.getDate() - i;
  //     if (month < 10) month = "0" + month;
  //     if (day < 10) day = "0" + day;
  //     option.xAxis.data.push(`${month}月${day}日`);
  //   }

  //   echartsInstance.setOption(option);
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.Day {
  display: inline-block;
  margin-right: 20px;
}
.el-button {
  margin: 0;
}
:deep(.el-tabs__content) {
  margin: 0;
  padding: 0;
  border: none;
}
:deep(.el-tabs__header .is-top) {
  border-bottom: none;
}
:deep(.el-tabs__item) {
  border-bottom: none;
}
:deep(.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active) {
  transition: none;
  border-bottom: 1px solid var(--el-border-color);
}
:deep(.el-tabs--border-card) {
  background: #fff;
  border: 1px solid var(--el-border-color);
  border-bottom: none;
}
:deep(.el-range-editor.is-disabled) {
  height: 40px;
}
.SwitchDay {
  display: flex;
}
</style>
