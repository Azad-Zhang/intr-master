<template>
  <div id="info-auth">
    <el-tabs
      v-model="state.activeName"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="学生认证" name="first">
        <el-card class="stu-card">
          <template #header>
            <div class="card-header">
              <h5>实名认证权益</h5>
              <p>
                实名认证后，您可获得的权益：
                <span>1.参与人才推荐</span>
                <span>2.与企业更好的沟通</span>
                <span>3.陆续开放更多权益</span>
              </p>
            </div>
          </template>
          <div class="stuContent">
            <ul v-if="state.modify == false">
              <li>
                <span>真实姓名：</span
                ><span class="value">{{ state.stuInfo.name }}</span>
                <!-- <el-input  v-model="state.stuInfo.name"></el-input> -->
              </li>
              <li>
                <span>学生学号：</span
                ><span class="value">{{ state.stuInfo.stuId }}</span>
                <!-- <el-input v-model="state.stuInfo.stuId"></el-input> -->
              </li>
              <!-- <li id="Real-Name">
                <span>身份证照</span>
                <div id="Real-Name-ID">
                  <div class="Real-box">
                    <div class="img-box">
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      />
                    </div>
                    <p class="img-desc">正面照片</p>
                    <p class="img-desc">* 支持 .JPG .JPEG .PNG不超过2M</p>
                  </div>
                  <div class="Real-box">
                    <div class="img-box">
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                      />
                    </div>
                    <p class="img-desc">背面照片</p>
                    <p class="img-desc">* 支持 .JPG .JPEG .PNG不超过2M</p>
                  </div>
                </div>
              </li> -->
              <li>
                <el-form-item label="入学时间" class="myForm">
                  <div>
                    <el-date-picker
                      :disabled="!state.modify"
                      v-model="state.stuInfo.admissionDate"
                      type="month"
                      placeholder="Pick a month"
                      :default-value="new Date(2020, 9, 1)"
                      style="margin-left: 45px"
                    />
                  </div>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="毕业时间" class="myForm">
                  <div>
                    <el-date-picker
                      :disabled="!state.modify"
                      v-model="state.stuInfo.graduationTime"
                      type="month"
                      placeholder="Pick a month"
                      :default-value="new Date(2020, 9, 1)"
                      style="margin-left: 45px"
                    />
                  </div>
                </el-form-item>
              </li>
              <li>
                <span>学校名称：</span
                ><span class="value">{{ state.stuInfo.school }}</span>
                <!-- <el-input v-model="state.stuInfo.school"></el-input> -->
              </li>
              <li>
                <span>学院名称：</span
                ><span class="value">{{ state.stuInfo.college }}</span>
                <!-- <el-input v-model="state.stuInfo.college"></el-input> -->
              </li>
              <li>
                <span>专业名称：</span
                ><span class="value">{{ state.stuInfo.major }}</span>
                <!-- <el-input  v-model="state.stuInfo.major"></el-input> -->
              </li>
              <li>
                <span>学历信息：</span
                ><span class="value">{{ state.stuInfo.qualification }}</span>
                <!-- <el-input v-model="state.stuInfo.qualification"></el-input> -->
              </li>
            </ul>
            <ul v-else>
              <li>
                <span>真实姓名：</span>
                <el-input v-model="state.stuInfo.name"></el-input>
              </li>
              <li>
                <span>学生学号：</span>
                <el-input v-model="state.stuInfo.stuId"></el-input>
              </li>
              <li>
                <el-form-item label="入学时间" class="myForm">
                  <div>
                    <el-date-picker
                      :disabled="!state.modify"
                      v-model="state.stuInfo.admissionDate"
                      type="month"
                      placeholder="Pick a month"
                      :default-value="new Date(2020, 9, 1)"
                      style="margin-left: 45px"
                    />
                  </div>
                </el-form-item>
              </li>
              <li>
                <el-form-item label="毕业时间" class="myForm">
                  <div>
                    <el-date-picker
                      :disabled="!state.modify"
                      v-model="state.stuInfo.graduationTime"
                      type="month"
                      placeholder="Pick a month"
                      :default-value="new Date(2020, 9, 1)"
                      style="margin-left: 45px"
                    />
                  </div>
                </el-form-item>
              </li>
              <li>
                <span>学校名称：</span>
                <el-input v-model="state.stuInfo.school"></el-input>
              </li>
              <li>
                <span>学院名称：</span>
                <el-input v-model="state.stuInfo.college"></el-input>
              </li>
              <li>
                <span>专业名称：</span>
                <el-input v-model="state.stuInfo.major"></el-input>
              </li>
              <li>
                <span>学历信息：</span>
                <el-input v-model="state.stuInfo.qualification"></el-input>
              </li>
            </ul>
          </div>
          <el-button
            class="reback resolve"
            type="info"
            plain
            @click="state.modify = false"
            v-if="state.modify == true"
            >返回</el-button
          >
          <el-button class="resolve" @click="methods.toModify()">{{
            state.modify == false ? "修改信息" : "保存信息"
          }}</el-button>
        </el-card>
      </el-tab-pane>
    </el-tabs>
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
import store from "@/store/index.js";
import api from "@/api/api.js";
// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  activeName: ref("first"),
  modify: ref(false),
  stuInfo: store.state.userInfo?.stuInfo,
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
  async toModify() {
    state.modify = !state.modify;
    if (state.modify == false) {
      var myResult = await api.user.authenStuInfo(state.stuInfo);
      console.log("执行结果");
      console.log(myResult);
    }
  },
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
#info-auth {
}
.el-main * {
  line-height: initial;
}
.el-tabs {
  background-color: rgb(255, 255, 255);
}
:deep(.el-tabs__item) {
  width: 100px;
  height: 47px;
  line-height: 47px;
  margin-left: 20px;
}
.InfoAuth > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-card {
  margin: 0;
  border: none;
}
:deep(.el-card__header) {
  padding: 16px;
  border: none;
}
:deep(.el-card__body) {
  padding: 16px;
}
.content {
  position: relative;
}
.card-header {
  /* display: flex;
  justify-content: space-between; */
  display: block;
  text-align: left;
  background-color: rgb(248, 248, 248);
  padding: 8px 16px 8px 8px;
}
.card-header h5 {
  color: #222226;
  line-height: 24px;
  margin-bottom: 4px;
  font-size: 16px;
}
.card-header p {
  color: #555666;
  font-size: 12px;
  line-height: 24px;
}
.card-header p span {
  display: inline-block;
  margin-right: 32px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
.stuContent {
  padding-top: 12px;
  padding-right: 20px;
  padding-bottom: 16px;
}

.stuContent:hover {
  background-color: rgb(248, 248, 248);
}

.stuContent ul li {
  display: flex;
  font-size: 14px;
  margin-bottom: 32px;
  line-height: 24px;
  height: 24px;
}
.stuContent ul li > span {
  width: 130px;
  text-align: right;
  color: #555666;
  margin-right: 40px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.stuContent ul li .value {
  color: #999aaa;
  text-align: left;
  width: 400px;
}

#Real-Name {
  height: initial;
  line-height: initial;
}
#Real-Name-ID {
  text-align: left;
}
.Real-box {
  margin-bottom: 32px;
}
.el-button {
  width: 100px;
  height: 25px;
  position: absolute;
  bottom: 40px;
  right: 100px;
}
.resolve {
  line-height: 35px;
  height: 35px;
}
:deep(.el-form-item__label) {
  margin-left: 58px;
}
:deep(.el-input) {
  width: 250px;
}
:deep(.el-input__wrapper) {
  height: 30px;
}
.el-avatar {
  width: 80px !important;
  height: 80px;
  cursor: pointer;
}
.logo {
  height: 70px !important;
}
.reback {
  right: 230px;
}

.el-input {
  width: 250px;
  height: 30px;
}
</style>
