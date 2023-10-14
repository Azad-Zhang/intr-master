<template>
  <div class="CurrVita">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>我的简历</span>
        </div>
      </template>
      <div class="content">
        <el-image :src="'/api' + '/common/rich/file/12c0c_20231013050911.png'">
        </el-image>
        <!-- <div class="interviewVideo_main" id="videoContainer">
          此处根据pdf的页数动态生成相应数量的canvas画布
          <canvas
            v-for="pageIndex in pdfPages"
            :id="`pdf-canvas-` + pageIndex"
            :key="pageIndex"
          ></canvas>
        </div> -->
      </div>
      <div>
        <el-button round @click="showUp = true"> 上传简历 </el-button>

        <div>
          <el-button round @click="downLoad"> 下载文件 </el-button>
          <el-button round @click="showUp = true"> 修改文件 </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
// let pdfDoc = reactive({}); // 保存加载的pdf文件流
// let pdfPages = ref(0); // pdf文件的页数
// let pdfUrl = ref("src/assets/local/张仕鹏个人简历.pdf"); //pdf文件的链接
// let pdfScale = ref(1.0); // 缩放比例
//调用loadFile方法
onMounted(() => {
  //   loadFile(pdfUrl.value);
});
//获取pdf文档流与pdf文件的页数
// const loadFile = async (url) => {
//   pdfjsLib.GlobalWorkerOptions.workerSrc =
//     "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";
//   const loadingTask = pdfjsLib.getDocument(url);
//   loadingTask.promise.then((pdf) => {
//     console.log(pdf);
//     pdfDoc = pdf;
//     pdfPages.value = pdf.numPages;
//     nextTick(() => {
//       renderPage(1);
//     });
//   });
// };
//渲染pdf文件
// const renderPage = (num) => {
//   pdfDoc.getPage(num).then((page) => {
//     const canvasId = "pdf-canvas-" + num;
//     const canvas = document.getElementById(canvasId);
//     const ctx = canvas.getContext("2d");
//     const dpr = window.devicePixelRatio || 1;
//     const bsr =
//       ctx.webkitBackingStorePixelRatio ||
//       ctx.mozBackingStorePixelRatio ||
//       ctx.msBackingStorePixelRatio ||
//       ctx.oBackingStorePixelRatio ||
//       ctx.backingStorePixelRatio ||
//       1;
//     const ratio = dpr / bsr;
//     const viewport = page.getViewport({ scale: pdfScale.value });
//     canvas.width = viewport.width * ratio;
//     canvas.height = viewport.height * ratio;
//     canvas.style.width = viewport.width + "px";
//     canvas.style.height = viewport.height + "px";
//     ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
//     const renderContext = {
//       canvasContext: ctx,
//       viewport: viewport,
//     };
//     page.render(renderContext);
//     if (num < pdfPages.value) {
//       renderPage(num + 1);
//     }
//   });
// };
</script>
<style scoped>
.el-main * {
  line-height: initial;
  text-align: center;
}
#videoContainer {
  text-align: center;
}
.el-card {
  /* height: 1200px; */
}

.el-button {
  /* position: absolute; */
  right: 0;
  cursor: pointer;
  z-index: 999;
}
.el-button:focus,
.el-button:hover {
  color: var(--el-button-text-color);
  border-color: var(--el-button-border-color);
  background-color: initial;
  outline: 0;
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

:deep(.el-dialog__body) {
  padding-bottom: 20px;
}
embed {
  width: 100%;
  height: 800px;
}
</style>
