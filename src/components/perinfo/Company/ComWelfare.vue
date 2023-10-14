<template>
  <div id="company-welfare">
    <div class="content">
      <el-card class="box-out" shadow="none">
        <h3>{{ state.info1.head }}</h3>
        <span class="desc">{{ state.info1.desc }}</span>
        <el-form>
          <el-form-item :label="state.info1.formTitle[0]">
            <el-select
              v-model="state.myWelfare.workStaHours"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in myTime"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-select
              v-model="state.myWelfare.workEndHours"
              placeholder="Select"
              size="large"
            >
              <el-option
                v-for="item in myTime"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="state.info1.formTitle[1]">
            <el-radio-group v-model="state.myWelfare.workOvertime" size="large">
              <el-radio-button label="不加班" />
              <el-radio-button label="偶尔加班" />
              <el-radio-button label="弹性工作" />
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="state.info1.formTitle[2]">
            <el-radio-group v-model="state.myWelfare.restTime" size="large">
              <el-radio-button label="双班" />
              <el-radio-button label="排班轮休" />
            </el-radio-group>
          </el-form-item>
        </el-form>

        <h3>{{ state.info2.head }}</h3>
        <span class="desc">{{ state.info2.desc }}</span>
        <el-form label-position="top" label-width="100px" :model="state.info2">
          <el-form-item
            v-for="item in state.info2.form"
            :key="item.head"
            :label="item.head"
          >
            <el-card
              shadow="none"
              v-for="val in item.data"
              :key="val.title"
              class="Welfare"
              @click="methods.toPush(val.title)"
            >
              <div class="iconDiv">
                <i class="iconfont wfIcon" :class="val.icon"></i>
              </div>
              <div class="WelfareDiv">
                <span class="samTitle">{{ val.title }}</span>
                <span class="Welfdesc">{{ val.desc }}</span>
              </div>
            </el-card>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="next" @click="methods.toSubmit()"
          >提交</el-button
        >
        <div class="selected">
          已选{{ state.selects.length }}项：
          <span
            v-for="(item, index) in state.selects"
            :key="item"
            class="select"
            >{{ item }}
            <i style="cursor: pointer" @click="state.selects.pop(index)"
              >X</i
            ></span
          >
        </div>
      </el-card>
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
import store from "@/store/index.js";
import api from "@/api/api.js";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

let myTreatment = ref("19:00-20:00");

// console.log("当前myTreatment");
// console.log(myTreatment);
let myTime = computed(() => {
  let time = [];

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      let result = 0;

      if (j == 0) {
        if (i < 10) {
          result = "0" + new String(i) + ":" + "00";
        } else result = new String(i) + ":" + "00";
      } else {
        if (i < 10) {
          result = "0" + new String(i) + ":" + "30";
        } else result = new String(i) + ":" + "30";
      }
      time.push(result);
    }
  }
  return time;
});
// 响应式变量
const state = reactive({
  // 定义响应式变量
  myWelfare: reactive({
    workStaHours: myTreatment[0],
    workEndHours: myTreatment[1],
    workOvertime: myTreatment[2],
    restTime: myTreatment[3],
  }),
  selects: ref([]),
  info1: {
    head: "1、工作时间",
    desc: "标准时间仅为求职者提供参考，不代表公司下所有职位工作时间",
    formTitle: ["工作时间：", "加班情况：", "休息时间："],
  },
  info2: {
    head: "2、公司福利",
    desc: "选择公司提供的福利，以吸引更多求职者",
    formTitle: ["保险", "薪资期权", "度假休假", "生活补贴"],
    form: [
      {
        head: "保险",
        data: [
          {
            title: "定期体检",
            icon: "icon-aixinD",
            desc: "阶段性职业健康检查",
          },
          {
            title: "补充医疗保险",
            icon: "icon-aixinD",
            desc: "补充医疗保险、商业医疗保险、社会互助和社区医疗保险等多种形式",
          },
          {
            title: "五险一金",
            icon: "icon-aixinD",
            desc: "缴纳养老保险、医疗保险、失业保险、工伤保险、住房公积金",
          },
        ],
      },
      {
        head: "薪资期权",
        data: [
          {
            title: "全勤奖",
            icon: "icon-aixinD",
            desc: "对于全勤员工给予全勤奖",
          },
          {
            title: "加班补助",
            icon: "icon-aixinD",
            desc: "正常工作时间之外的工资报酬",
          },
          {
            title: "股票期权",
            icon: "icon-aixinD",
            desc: "对优秀员工提供股票期权",
          },
          {
            title: "年终奖",
            icon: "icon-aixinD",
            desc: "年末给予员工年终奖励，对一年来的工作业绩给予肯定",
          },
        ],
      },
      {
        head: "度假休假",
        data: [
          {
            title: "员工旅游",
            icon: "icon-aixinD",
            desc: "组织员工旅游活动",
          },
          {
            title: "带薪年假",
            icon: "icon-aixinD",
            desc: "为员工提供带薪年假",
          },
        ],
      },
      {
        head: "生活补助",
        data: [
          {
            title: "交通补助",
            icon: "icon-aixinD",
            desc: "补贴员工因公实际发生的交通费用",
          },
          {
            title: "节日福利",
            icon: "icon-aixinD",
            desc: "法定或者特定节日时提供礼物",
          },
          {
            title: "通讯补贴",
            icon: "icon-aixinD",
            desc: "补贴员工因公实际发生的公务话费",
          },
          {
            title: "免费班车",
            icon: "icon-aixinD",
            desc: "配有班车，免费接送员工上下班",
          },
          {
            title: "住房补贴",
            icon: "icon-aixinD",
            desc: "每月员工因公实际发生的住宿费用",
          },
          {
            title: "零食下午茶",
            icon: "icon-aixinD",
            desc: "为员工提供零食、饮料、水果作为下午茶",
          },
          {
            title: "餐补",
            icon: "icon-aixinD",
            desc: "工作餐的额外补贴",
          },
          {
            title: "包吃",
            icon: "icon-aixinD",
            desc: "补贴员工因公实际发生的饮食费用",
          },
        ],
      },
    ],
  },
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
  toPush(title) {
    state.selects.push(title);
    console.log("当前selects");
    console.log(state.selects);
  },
  toSubmit() {
    console.log("提交");
    console.log("当前selects和myWelfare");
    console.log(state.selects);
    console.log(state.myWelfare);
    let treatment = "";
    treatment =
      state.myWelfare.workStaHours +
      "-" +
      state.myWelfare.workEndHours +
      "-" +
      state.myWelfare.workOvertime +
      "-" +
      state.myWelfare.restTime;
    for (let i = 0; i < state.selects.length; i++) {
      treatment += "-" + state.selects[i];
    }
    console.log(treatment);
    store.state.userInfo.comInfo.treatment = treatment;
    var myResult = api.company.renewCompanyInfo(store.state.userInfo.comInfo);
  },
};

// 生命周期钩子
onMounted(() => {
  setTimeout(() => {
    // console.log("当前得知store");
    // console.log(store.state.userInfo.comInfo);
    let myList = store.state.userInfo.comInfo.treatment.split("-");
    if (myList.length == 1) {
      console.log(true);
      myTreatment = reactive([
        "09:00",
        "18:00",
        "不加班",
        "双班",
        "定期体检",
        "全勤奖",
        "交通补助",
      ]);
      console.log(myTreatment);
      console.log(state.myWelfare);
      state.myWelfare.workStaHours = myTreatment[0];
      state.myWelfare.workEndHours = myTreatment[1];
      state.myWelfare.workOvertime = myTreatment[2];
      state.myWelfare.restTime = myTreatment[3];
    } else {
      myTreatment = store.state.userInfo.comInfo.treatment.split("-");
      state.myWelfare.workStaHours = myTreatment[0];
      state.myWelfare.workEndHours = myTreatment[1];
      state.myWelfare.workOvertime = myTreatment[2];
      state.myWelfare.restTime = myTreatment[3];
    }
    for (let i = 4; i < myTreatment.length; i++) {
      state.selects.push(myTreatment[i]);
    }
  }, 1000);
  //   setTimeout(() => {
  //   console.log("当前得知store");
  //   console.log(store.state.userInfo.comInfo);
  // let myList = store.state.userInfo.comInfo.treatment.split("-");
  // console.log(myList.length);
  // console.log(myList);
  // if (myList.length == 1) {
  //   console.log(true);
  //   myTreatment = reactive([
  //     "09:00",
  //     "18:00",
  //     "不加班",
  //     "双班",
  //     "定期体检",
  //     "全勤奖",
  //     "交通补助",
  //   ]);
  //   console.log(myTreatment);
  //   console.log(state.myWelfare);
  //   state.myWelfare.workStaHours = myTreatment[0];
  //   state.myWelfare.workEndHours = myTreatment[1];
  //   state.myWelfare.workOvertime = myTreatment[2];
  //   state.myWelfare.restTime = myTreatment[3];
  // } else {
  //   myTreatment = store.state.userInfo.comInfo.treatment.split("-");
  //   state.myWelfare.workStaHours = myTreatment[0];
  //   state.myWelfare.workEndHours = myTreatment[1];
  //   state.myWelfare.workOvertime = myTreatment[2];
  //   state.myWelfare.restTime = myTreatment[3];
  // }
  // for (let i = 4; i < myTreatment.length; i++) {
  //   state.selects.push(myTreatment[i]);
  // }
  //   }, 100); // 将逻辑延迟一秒执行
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
@import url("//at.alicdn.com/t/font_3325537_4n4gqte7u2k.css");
:deep(.box-out) {
  padding: 10px;
  padding-bottom: 30px;
}
:deep(.el-radio-button) {
  margin-right: 10px;
  /* border: 1px solid #000; */
  box-shadow: none;
  border: none;
}
:deep(.el-radio-button__inner) {
  /* border: none; */
  border: var(--el-border);
  box-shadow: none;
}
:deep(.el-radio-button:first-child .el-radio-button__inner),
:deep(.el-radio-button:last-child .el-radio-button__inner) {
  /* border: none; */
  border-radius: 0%;
}
/* :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
} */
:deep(.el-radio-button__inner) {
  width: 100px;
}
:deep(.el-form-item__label) {
  width: 120px;
  font-size: 18px;
  font-weight: bolder;
}
.el-card {
  position: relative;
}
.desc {
  color: #8d92a1;
  font-size: 16px;
  display: block;
  padding-bottom: 20px;
}
h3 {
  height: 40px;
  line-height: 40px;
}
.el-select {
  margin-right: 20px;
}
.next,
.up {
  position: absolute;
  bottom: 30px;
  right: 10%;
  width: 100px;
  height: 40px;
}
.up {
  right: 25%;
}
.Welfare {
  display: flex;
  justify-items: center;
  align-items: center;
  height: 100px;
  position: relative;
  width: 330px;
  cursor: pointer;
  /* margin-right: 20px; */
  margin: 10px 10px;
}
.Welfare:hover {
  background-color: #e5f8f8;
}
.wfIcon {
  font-size: 40px;
}
.iconDiv {
  /* background-color: green; */
  height: 100%;
  position: absolute;
  left: 20px;
  top: 30px;
}
.iconDiv,
.WelfareDiv {
  display: inline-block;
}
.WelfareDiv {
  width: 230px;
  padding-left: 80px;
}
:deep(.el-card__body) {
  padding: 0;
}
.Welfdesc {
  display: block;
  font-size: 13px;
  color: #8d92a1;
}
.selected {
  width: 60%;
}
.select {
  display: inline-block;
  background: #f2f2f2;
  border-radius: 20px;
  /* border: 1px solid #000; */
  padding: 10px;
  margin-right: 10px !important;
}
</style>
