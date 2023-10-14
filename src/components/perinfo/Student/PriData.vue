<template>
  <!-- <el-button @click="methods.test">测试</el-button> -->
  <div id="print-data">
    <!-- 第一栏 开始 -->
    <el-card class="avatorCard">
      <div class="avator" @click="methods.uploadAvatarClick()">
        <div>
          <el-avatar :src="'/api' + state.user.base?.avatar" />
        </div>
      </div>
      <!-- 上传头像 -->
      <el-dialog v-model="state.showUp" width="550px" class="upAva">
        <div class="upHead">上传图片</div>
        <el-upload
          class="upload-demo"
          accept="JPG, .PNG, .JPEG,.jpg, .png, .jpeg"
          drag
          action="#"
          :multiple="false"
          :http-request="loudAvatar"
          :file-list="state.fileList"
          :on-change="methods.handleUploadChange"
          :on-exceed="methods.handleExceed"
          :auto-upload="false"
          :limit="1"
          ref="upload"
        >
          <!-- :on-exceed="handleExceed" -->
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            点击或拖动图片至此处
            <!-- Drop file here or <em>click to upload</em> -->
          </div>
          <template #tip>
            <div class="el-upload__tip">
              图片宽度*高度至少为150*150像素，大小不超过2MB
            </div>
          </template>
        </el-upload>
        <div style="margin-bottom: 20px">
          <el-button round @click="showUp = false" style="width: 80px"
            >取消</el-button
          >
          <el-button
            round
            @click="methods.avaSubmit"
            style="width: 80px"
            :disabled="state.fileList.length == 0"
            >提交</el-button
          >
        </div>
      </el-dialog>
    </el-card>
    <!-- 第一栏 结束 -->

    <!-- 第二栏 开始 -->
    <el-card class="Basic-Info-card">
      <template #header>
        <div class="card-header">
          <span>基本信息</span>
          <el-button type="Info" class="right" @click="methods.toModify">{{
            state.modify == false ? "修改信息" : "保存信息"
          }}</el-button>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="state.user"
        :rules="state.rules"
        label-width="72px"
        class="Basic-form"
        :size="state.formSize"
      >
        <el-form-item label="用户昵称" prop="nickName">
          <div v-if="state.modify == false">{{ state.user.base.nickName }}</div>
          <el-input v-model="state.user.base.nickName" v-else />
        </el-form-item>
        <el-form-item
          label="性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别"
          prop="gender"
        >
          <div v-if="state.modify == false">
            {{
              state.user.base.gender == 0 || state.user.base.gender == "男"
                ? "男"
                : "女"
            }}
          </div>

          <el-radio-group v-model="state.user.base.gender" v-else>
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="出生日期" prop="birthday">
          <div v-if="state.modify == false">{{ state.user.base.birthday }}</div>
          <el-col :span="11" v-else>
            <el-form-item prop="birthday">
              <el-date-picker
                v-model="state.user.base.birthday"
                type="date"
                placeholder="出生日期"
                format="YYYY-MM-DDT00:00:00Z"
                value-format="YYYY-MM-DDT00:00:00Z"
              />
              <!-- format="YYYY/MM/DD"
                value-format="YYYY-MM-DD" -->
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="个人简介" prop="signature">
          <div v-if="state.modify == false">
            {{ state.user.base.signature }}
          </div>
          <el-input
            v-model="state.user.base.signature"
            type="textarea"
            rows="5"
            minlength="30"
            maxlength="200"
            v-else
          />
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 第二栏 结束 -->

    <!-- 第三栏 开始 -->
    <el-card class="Educ-Info-card">
      <template #header>
        <div class="card-header">
          <span>教育信息</span>
        </div>
      </template>
      <el-form
        ref="ruleFormRef"
        :model="state.stuInfo"
        :rules="rules"
        label-width="72px"
        class="Basic-form"
        :size="formSize"
      >
        <el-form-item label="学校名称" prop="name">
          <div>{{ state.stuInfo.school }}</div>
          <!-- <el-input v-model="formData.name"  /> -->
          <!-- <el-input placeholder="未填写"></el-input> -->
        </el-form-item>
        <el-form-item
          label="专&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业"
          prop="name"
        >
          <div>{{ state.stuInfo.major }}</div>
          <!-- <div v-if="showOrHidd.name">{{ formData.name }}</div>
        <el-input v-model="formData.name" v-else /> -->
          <!-- <el-input placeholder="未填写"></el-input> -->
        </el-form-item>
        <el-form-item label="入学时间">
          <div>
            <el-date-picker
              :disabled="!modify"
              v-model="state.stuInfo.admissionDate"
              type="month"
              placeholder="Pick a month"
              :default-value="new Date(2020, 9, 1)"
            />
          </div>
        </el-form-item>

        <el-form-item label="毕业时间" class="myForm">
          <div>
            <el-date-picker
              :disabled="!modify"
              v-model="state.stuInfo.graduationTime"
              type="month"
              placeholder="Pick a month"
              :default-value="new Date(2020, 9, 1)"
            />
          </div>
        </el-form-item>
        <!-- <el-form-item
        label="学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历"
      >
        <el-select v-model="formData.xueli" placeholder="本科">
          <el-option label="本科" value="本科" />
          <el-option label="硕士" value="硕士" />
        </el-select>
      </el-form-item> -->
      </el-form>
    </el-card>
    <!-- 第三栏 结束 -->
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
import { UploadFilled } from "@element-plus/icons-vue";
import store from "@/store/index.js";
import api from "@/api/api.js";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  user: reactive(store.state?.userInfo),
  stuInfo: reactive(store.state?.userInfo.stuInfo),
  showUp: ref(false),
  fileList: reactive([]),
  modify: ref(false),
  rules: reactive({
    name: [
      {
        message: "请输入昵称",
        trigger: "blur",
      },
      {
        min: 2,
        max: 20,
        message: "昵称长度需在 2 到 20 个字符",
        trigger: "blur",
      },
    ],
    email: [
      {
        message: "请输入邮箱",
        trigger: "blur",
      },
    ],
    location: [
      {
        message: "请选在您的所在地区",
        trigger: "change",
      },
    ],
    birth: [
      {
        type: "date",
        message: "Please pick a date",
        trigger: "change",
      },
    ],
    sex: [
      {
        message: "Please select activity resource",
        trigger: "change",
      },
    ],
    desc: [
      {
        message: "Please input activity form",
        trigger: "blur",
      },
    ],
  }),
  formSize: ref("default"),
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
  //   test() {
  //     console.log(state.user);
  //   },
  uploadAvatarClick() {
    console.log("点击");
    state.showUp = true;
  },
  handleUploadChange(file, fileList) {
    console.log("handleUploadChange");
    state.fileList = [file.raw];
  },
  handleExceed(file, fileList) {
    console.log("handleExceed");
    state.fileList = file;
  },
  async avaSubmit() {
    console.log("头像上传");
    console.log(state.fileList[0]);
    const avatarResult = await api.user.uploadAvatar(state.fileList[0]);
    console.log(avatarResult);
    state.user.base.avatar = avatarResult.url;
    state.showUp = false;
  },
  toModify() {
    console.log("当前modify");
    console.log(state.modify);
    state.modify = !state.modify;
    if (state.modify == false) {
      api.user.renewUserInfo(state.user.base);
    }
  },
};

// 生命周期钩子
onMounted(() => {
  // 组件被挂载时执行的逻辑
  //   console.log("挂载更新");
  //   state.user = store.state?.userInfo;
  //   console.log(state.user);
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
@import url("//at.alicdn.com/t/font_3325537_rs0vb9caakk.css");
#print-data {
}
* {
  box-sizing: border-box;
}
.el-main * {
  line-height: initial;
  text-align: center;
}
.el-avatar {
  width: 80px;
  height: 80px;
  text-align: center;
}
.upHead {
  position: absolute;
  top: 18px;
  font-size: 16px;
  color: #3d3d3d;
  font-weight: bold;
}

.el-card {
  margin-bottom: 20px;
}
:deep(.el-card__header) {
  padding: 0;
  margin: 0;
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

:deep(.el-card__body) {
  padding: 16px;
}

.Basic-form {
  padding: 16px 0;
  font-size: 14px;
}
:deep(.el-form-item__label) {
  width: 72px;
  height: 24px;
  padding-left: 16px;
  margin-right: 40px;
  padding-right: 0;
}
.iconfont {
  font-size: 25px;
  vertical-align: middle;
}
.edit-icon {
  line-height: 24px;
  height: 24px;
  vertical-align: middle;
  display: none;
  cursor: pointer;
}
.el-form-item:hover .edit-icon {
  display: inline-block;
}
.upAva .el-button {
  width: 80px;
}
:deep(.el-dialog__body) {
  padding-bottom: 20px;
}
.el-col-11 {
  max-width: 45.8333333333%;
  flex: 0;
}
.right {
  float: right;
  margin-right: 20px;
  margin-top: 10px;
}
</style>
