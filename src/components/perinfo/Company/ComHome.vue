<template>
  <div id="company-home">
    <el-card class="box-Out">
      <el-tabs
        v-model="state.activeName"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :label="items[0].label"
          :name="items[0].name"
          v-for="(items, index) in state.EnterPrise"
          :key="items[0].name"
        >
          <el-card class="box-in" v-for="item in items" :key="item.name">
            <h2>{{ item.label }}</h2>
            <span class="desc">{{ item.desc }}</span>
            <!-- 这里就应该是公司的组件了 -->

            <ComEssInfo v-if="item.name == 'first'" />

            <ComIntro v-else-if="item.name == 'second'" />

            <ComWelfare v-else-if="item.name == 'third'" />

            <ComAlbum v-else-if="item.name == 'fourth'" />
            <!--
            <ComVideo v-else-if="item.name == 'fifth'" /> -->

            <Products v-else-if="item.name == 'sixth'" />
            <!--
            <Executive v-else-if="item.name == 'seventh'" /> -->
          </el-card>
        </el-tab-pane>
      </el-tabs>
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
import ComEssInfo from "@/components/perinfo/Company/ComEssInfo.vue";
import ComIntro from "@/components/perinfo/Company/ComIntro.vue";
import ComWelfare from "@/components/perinfo/Company/ComWelfare.vue";
import ComAlbum from "@/components/perinfo/Company/ComAlbum.vue";
import Products from "@/components/perinfo/Company/Products.vue";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  activeName: ref("first"),
  EnterPrise: reactive([
    [
      {
        label: "公司基本信息",
        name: "first",
        desc: "丰富的公司介绍，能获得更多求职者的青睐，为您的职位带来更多查看与沟通",
      },
      {
        label: "公司介绍",
        name: "second",
        desc: "可以简单介绍一下公司发展状况、服务领域、主要产品等信息",
      },
      {
        label: "公司福利",
        name: "third",
        desc: "标准时间仅为求职者提供参考，不代表公司下所有职位工作时间",
      },
    ],
    [
      {
        label: "公司相册",
        name: "fourth",
        desc: "公司照片建议选择近景前台或者其他办公环境，远景门口或者大楼",
      },
      //   {
      //     label: "公司视频",
      //     name: "fifth",
      //     desc: "您可以上传公司的相关视频，内容可以是企业宣传片、环境介绍、产品介绍、活动记录等等;支持内容时长为最短10秒，最长10分钟",
      //   },
    ],
    [
      {
        label: "产品介绍",
        name: "sixth",
        desc: "产品指的公司研发的网站、手机应用、生产销售的硬件设备或服务",
      },
      //   { label: "高管介绍", name: "seventh", desc: "公司主要管理人员的介绍" },
    ],
    //   { label: "在职感受", name: "eighth" },
  ]),
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
#company-home {
  margin-bottom: 30px;
}

.el-card {
  text-align: left;
  border: none;
  margin-top: 0;
  box-shadow: none;
}
:deep(.el-tabs__item) {
  font-size: 20px;
  height: 55px;
  line-height: 55px;
  /* padding-bottom: 40px; */
}
:deep(.el-tabs__header) {
  height: 50 px;
}
:deep(.el-card__body) {
  padding-top: 0;
}
h2 {
  height: 50px;
  /* background-color: red; */
  line-height: 40px;
}
.desc {
  color: #8d92a1;
  font-size: 16px;
  display: block;
  padding-bottom: 20px;
}
</style>
