<template>
  <div id="editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="methods.handleCreated"
    />
    <el-button type="primary" @click="methods.toSave">保存</el-button>
  </div>
</template>
<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import {
  ref,
  reactive,
  computed,
  onMounted,
  onUpdated,
  onUnmounted,
  shallowRef,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import store from "@/store/index.js";
import api from "@/api/api.js";
const props = defineProps({
  // 定义props
  Choice: String,
});
const editorRef = shallowRef();
const valueHtml = ref("<p>hello</p>");
// 在这里定义组件的响应式变量和函数

// 编辑器实例，必须用 shallowRef

const toolbarConfig = {};
// // 内容 HTML

// // props

// 响应式变量
const state = reactive({
  test: ref("asdfas"),
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
  handleCreated(editor) {
    editorRef.value = editor;
  },
  async toSave() {
    // console.log("当前文本内容");
    // console.log(editorRef.value.getHtml());
    // console.log(store.state.userInfo.comInfo);
    if (props.Choice == 1) {
      store.state.userInfo.comInfo.desc = editorRef.value.getHtml();
    } else {
      store.state.userInfo.comInfo.product = editorRef.value.getHtml();
    }

    var myResult = await api.company.renewCompanyInfo(
      store.state.userInfo.comInfo
    );
  },
};
const editorConfig = reactive({
  MENU_CONF: {},
});
editorConfig.MENU_CONF["uploadImage"] = {
  server: "/api/common/rich/file",
  fieldName: "file",
  maxFileSize: 2 * 1024 * 1024,
  maxNumberOfFiles: 10,
  allowedFileTypes: ["image/*"],
  metaWithUrl: false,
  withCredentials: true,
  timeout: 5 * 1000,
  onBeforeUpload(file) {
    console.log("上传之前");
    console.log(file);
    return file;
  },
  onProgress(progress) {
    console.log("progress", progress);
  },
  onSuccess(file, res) {
    console.log(`${file.name} 上传成功`, res);
  },
  onFailed(file, res) {
    console.log(`${file.name} 上传失败`, res);
  },
  onError(file, err, res) {
    console.log(`${file.name} 上传出错`);
    console.log(err);
    console.log(res);
  },
};
// 生命周期钩子
onMounted(() => {
  setTimeout(() => {
    // console.log("查看得到的两个值");
    // console.log(props);
    if (props.Choice == 1) {
      valueHtml.value = store.state.userInfo.comInfo?.desc;
    } else if (props.Choice == 2) {
      valueHtml.value = store.state.userInfo.comInfo?.product;
    }
  }, 1000); // 将逻辑延迟一秒执行
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>
<style scoped>
#editor {
  border: 1px solid #ccc;
  margin-bottom: 50px;
  position: relative;
}
/*工具栏样式*/
.toolbar {
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
}
/*工具栏剧中显示*/
.w-e-toolbar {
  justify-content: center !important;
}
.el-button {
  position: absolute;
  bottom: -50px;
  right: 10%;
  width: 100px;
  height: 40px;
}
/*编辑器样式*/
.editable {
  border: 1px solid #d9d9d9;
  min-height: 1500px;
  width: 850px;
  margin: 30px auto 150px auto;
  background-color: #fff;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
  border: 1px solid #e8e8e8;
}
</style>
