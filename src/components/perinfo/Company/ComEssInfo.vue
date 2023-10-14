<template>
  <div id="company-ess-info">
    <el-form>
      <el-form-item label="账号头像:" label-width="100px">
        <!-- 绑定头像 -->
        <el-avatar
          :src="'/api' + state.baseInfo.avatar"
          @click="state.showUp = true"
        />
        <el-dialog v-model="state.showUp" width="550px" class="upAva">
          <div class="upHead">上传图片</div>
          <el-upload
            class="uploadAva"
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
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">点击或拖动图片至此处</div>
            <template #tip>
              <div class="el-upload__tip">
                图片宽度*高度至少为150*150像素，大小不超过2MB
              </div>
            </template>
          </el-upload>
          <div style="margin-bottom: 20px" class="upButtons">
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
      </el-form-item>

      <el-form-item label="公司名称:" label-width="100px">
        <el-input v-model="state.comInfo.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="公司地点:" label-width="100px">
        <el-input v-model="state.comInfo.area" disabled></el-input>
      </el-form-item>
      <el-form-item label="公司规模:" label-width="100px">
        <el-input v-model="state.comInfo.size" disabled></el-input>
      </el-form-item>
      <el-form-item label="所在行业:" label-width="100px">
        <el-input v-model="state.comInfo.sector" disabled></el-input>
      </el-form-item>
      <el-form-item label="融资情况:" label-width="100px">
        <el-input v-model="state.comInfo.financing" disabled></el-input>
      </el-form-item>
    </el-form>
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
import { Plus, UploadFilled } from "@element-plus/icons-vue";
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
  baseInfo: reactive({
    avatar: "null",
  }),
  comInfo: reactive({
    name: "null",
    area: "null",
    size: "null",
    sector: "null",
    financing: "null",
  }),
  showUp: ref(false),
  fileList: reactive([]),
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
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
    state.baseInfo.avatar = avatarResult.url;
    state.showUp = false;
  },
};

onMounted(() => {
  setTimeout(() => {
    // console.log("ComEssInfo当前挂载得到的数据");
    // console.log(store.state.userInfo);
    // console.log(state.comInfo);
    state.baseInfo = store.state.userInfo?.base;
    state.comInfo = store.state.userInfo?.comInfo;
    // console.log("更新后ComEssInfo的数据");
    // console.log(state.baseInfo);
  }, 1000); // 将逻辑延迟一秒执行
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
#company-ess-info {
  position: relative;
}

.el-form-item {
  /* background-color: green; */
  width: 50%;
}

:deep(.el-form-item__label) {
  display: flex;
  align-items: center;
  color: #8d92a1;
  font-size: 16px;
}
.el-select {
  width: 100%;
}

.el-avatar {
  width: 80px;
  height: 80px;
  cursor: pointer;
}
.upload-demo {
  height: 300px;
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
.upButtons .el-button {
  position: relative !important;
  width: 80px;
  right: 0;
}
:deep(.el-dialog__body) {
  padding-bottom: 20px;
}
.el-button {
  position: absolute;
  bottom: 0;
  right: 10%;
  width: 100px;
  height: 40px;
}
:deep(.el-upload) {
  width: 100%;
}
:deep(.el-upload-dragger) {
  width: 100%;
}
.el-upload__tip {
  text-align: center;
}
.upButtons {
  text-align: center;
}
</style>
