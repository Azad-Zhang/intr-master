<template>
  <div id="company-album">
    <div class="ComAlbum">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in state.imagesList" :key="item">
          <el-image
            style="width: 100%; height: 100%"
            :src="'/api' + item.path"
            fit="contain"
          />
        </el-carousel-item>
      </el-carousel>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="state.modify = true"
          >上传图片</el-button
        >
        <el-button type="primary" @click="state.delImage = true"
          >删除图片</el-button
        >
      </div>
    </div>
    <el-dialog v-model="state.modify" width="550px" class="upAva">
      <div class="upHead">上传图片</div>
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :multiple="true"
        :http-request="loudAvatar"
        :file-list="state.fileList"
        :on-change="methods.handleUploadChange"
        :auto-upload="false"
        :limit="5"
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
      <div style="margin-bottom: 20px" class="upButton">
        <el-button round @click="state.modify = false" style="width: 80px"
          >取消</el-button
        >
        <el-button
          round
          @click="methods.imagesSubmit"
          style="width: 80px"
          :disabled="toSubmit"
          >提交</el-button
        >
      </div>
    </el-dialog>
    <el-dialog v-model="state.delImage" width="550px" class="upAva">
      <div class="upHead">请删除所选中图片</div>
      <el-checkbox
        v-model="state.checkAll"
        :indeterminate="state.isIndeterminate"
        @change="methods.handleCheckAllChange"
        >全选</el-checkbox
      >
      <el-checkbox-group
        v-model="state.checkedImagesID"
        @change="methods.handleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="item in state.imagesList"
          :key="item.ID"
          :label="item.ID"
          ><el-image
            style="width: 50px; height: 50px"
            :src="'/api' + item.path"
            fit="contain"
        /></el-checkbox>
      </el-checkbox-group>
      <el-button @click="state.delImage = false">取消</el-button>
      <el-button type="danger" @click="methods.deleteImage()">删除</el-button>
    </el-dialog>
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
import { UploadFilled } from "@element-plus/icons-vue";
// 在这里定义组件的响应式变量和函数

// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  imagesList: ref([]),
  //   myId: store.state.userInfo.comInfo.cid,
  modify: ref(false),
  delImage: ref(false),
  fileList: reactive([]),
  checkAll: ref(false),
  isIndeterminate: ref(true),
  checkedImagesID: ref([]),
  imagesID: ref([]),
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
  async getAlbum() {
    return await api.company.getAlbum(store.state.userInfo.comInfo.cid);
  },
  handleUploadChange(file, fileList) {
    console.log("handleUploadChange");
    state.fileList = [file.raw];
  },
  async imagesSubmit() {
    console.log("头像上传");
    console.log(state.fileList[0]);
    const avatarResult = await api.company.uploadAlbum(state.fileList[0]);
    console.log(avatarResult);
    state.imagesList.push(avatarResult);
  },
  handleCheckAllChange(value) {
    state.checkedImagesID = value ? state.imagesID : [];
    console.log("当前imagesID");
    console.log(state.imagesID);
    console.log("点击后，checkedImagesID");
    console.log(state.checkedImagesID);
  },
  handleCheckedCitiesChange(value) {
    console.log("子选中");
    const checkedCount = value.length;
    state.checkAll = checkedCount === state.imagesID.length;
    state.isIndeterminate =
      checkedCount > 0 && checkedCount < state.imagesID.length;
    console.log("当前checkedID");
    console.log(state.checkedImagesID);
  },
  async deleteImage() {
    // console.log("选中的id");
    // console.log(state.checkedImagesID);
    for (let i = 0; i < state.checkedImagesID.length; i++) {
      var myResult = await api.company.deleteAlbum(state.checkedImagesID[i]);
      console.log("得到的结果");
      console.log(myResult);
    }
  },
  async Flash() {
    var myResult = await methods.getAlbum();
    console.log("得到的结果");
    console.log(myResult);
    state.imagesList = myResult;
    for (let i = 0; i < myResult.length; i++) {
      state.imagesID.push(myResult[i].ID);
    }
  },
};

// 生命周期钩子
onMounted(async () => {
  // 组件被挂载时执行的逻辑
  setTimeout(async () => {
    var moResult = await methods.Flash();
  }, 1000);
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
#company-album {
}

.el-card {
  height: 400px;
  /* text-align: center; */
  position: relative;
}
/* :deep(.el-upload-dragger) {
  position: absolute;
  top: 25%;
  left: 35%;
  background: #e1f4f3;
  border-radius: 4px;
  border: 1px dashed #21cbc2;
  color: #00c2b3;
}

:deep(.el-upload:hover) {
  border: 1px dashed #21cbc2;
}
.el-icon {
  font-size: 20px;
  display: inline-block;
  margin-right: 10px;
}
span {
  margin-top: 50px !important;
  display: block;
  line-height: 30px;
  font-size: 20px;
  background-color: red;
}
.el-upload__tip {
  position: absolute;
  top: 70%;
  left: 48%;
  font-size: 16px;
} */
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-upload__tip {
  text-align: center;
}
.upButton {
  text-align: center;
}
/*  */

* {
  box-sizing: border-box;
}
.el-main * {
  line-height: initial;
}

.el-input {
  width: 30%;
}
/* .avator {
  width: 200px;
  height: 50px;
} */
.el-avatar {
  width: 80px;
  height: 80px;
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
.el-popper__arrow {
  margin: 0;
}
.el-checkbox {
  margin-bottom: 20px;
  width: 70px;
}
</style>
