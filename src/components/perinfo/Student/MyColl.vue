<template>
  <div id="my-coll">
    <div id="CollAside">
      <el-row>
        <el-col>
          <el-menu default-active="1">
            <!-- 打开创建收藏夹dialog -->
            <el-menu-item @click="state.dialogFormVisible = true">
              <i class="iconfont icon-editor" :class="{ active_i: true }"></i>
              <span class="newBuilt">新建收藏夹</span>
            </el-menu-item>

            <el-menu-item
              v-for="(item, index) in state.actDir"
              :key="item.id"
              @click="methods.mySwitch(index)"
              :class="{ active: item.isAct }"
            >
              <i
                class="iconfont icon-folder-add"
                :class="{ active_i: item.isAct }"
              ></i>
              {{ item.name }}
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div id="contentBox">
      <div v-for="(item, index) in state.actDir" :key="index">
        <el-card class="box-card" v-show="index == state.isActive">
          <template #header>
            <div class="card-header">
              <p>
                <el-input
                  v-if="state.renewName"
                  v-model="item.name"
                  style="width: 300px"
                ></el-input>
                <span v-else>{{ item.name }}</span>

                <i
                  class="iconfont icon-editor"
                  @click="methods.renewName(item.ID, item.name, item.remark)"
                ></i>
                <!-- <el-button class="toAddButton">添加</el-button> -->
              </p>
              <p class="mt10">
                <el-input
                  v-if="state.renewName"
                  v-model="item.remark"
                  style="width: 300px"
                ></el-input>
                <span v-else>{{ item.remark }}</span>

                <i
                  class="iconfont icon-editor"
                  @click="methods.renewName(item.ID, item.name, item.remark)"
                ></i>
              </p>
            </div>
          </template>
          <div>
            <!-- 这里是显示内容 -->
            <div v-if="item.ShowInfo != null">
              <div v-for="sitem in item.ShowInfo" class="scard">
                <div v-if="sitem.Type == 1">"这是公司"</div>
                <div v-else class="scard-content">
                  <div style="display: inline-block">
                    <PosCard
                      :key="sitem.aid"
                      :fData="sitem"
                      style="width: 730px; border: 1px solid #000"
                    ></PosCard>
                  </div>
                  <div style="display: inline-block; margin-top: 20px">
                    <el-button @click="methods.PushJob()">查看</el-button>
                    <el-button @click="methods.toDelete(item.ID, sitem.pid)"
                      >删除</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="imgDiv">
                <img
                  src="https://static.zhipin.com/zhipin-recommend/v178/images/assess-empty.png"
                  alt=""
                />
              </div>
              <div><span>当前未添加任何收藏</span></div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 实际新建收藏夹页面 -->
    <el-dialog v-model="state.dialogFormVisible" title="新建收藏夹">
      <el-form :model="state.form">
        <el-form-item label="收藏夹名称" :label-width="formLabelWidth">
          <el-input v-model="state.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="收藏夹备注" :label-width="formLabelWidth">
          <el-input v-model="state.form.remark" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="toCancel()">返回</el-button>
          <el-button type="primary" @click="methods.newBuilt()">
            创建
          </el-button>
        </span>
      </template>
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
import PosCard from "@/components/recruit/PosCard.vue";
// 在这里定义组件的响应式变量和函数
import api from "@/api/api.js";
// props
const props = defineProps({
  // 定义props
});
const formLabelWidth = "140px";
// 响应式变量
const state = reactive({
  // 定义响应式变量
  dialogFormVisible: ref(false),
  actDir: ref([]),
  isActive: ref(0),
  renewName: ref(false),
  renewRemark: ref(false),
  form: {
    name: "测试能否创建姓名",
    remark: "测试备注",
  },
  collsInfo: [],
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});
function toCancel() {
  state.dialogFormVisible = false;
  state.form = {
    name: "",
    remark: "",
  };
}

// 方法
const methods = {
  // 定义组件方法
  async getInfo() {
    return await api.user.getAllCollections();
  },
  //创建新收藏夹
  newBuilt() {
    api.user.addCollections(state.form);
    state.dialogFormVisible = false;
    methods.Flash();
  },
  mySwitch(index) {
    state.isActive = index;
    console.log("index:state.isActive");
    console.log(index + ":" + state.isActive);
  },
  async renewName(id, name, remark) {
    state.renewName = !state.renewName;
    if (state.renewName == false) {
      var myResult = await api.user.renewCollectionInfo(id, name, remark);
      console.log("修改结果");
      console.log(myResult);
    }
  },
  async Flash() {
    var myResult = await methods.getInfo();
    //   console.log("挂载处得到的信息");
    //   console.log(myResult);
    state.actDir = myResult;
    let collsID = [];
    for (let i = 0; i < myResult.length; i++) {
      collsID.push(myResult[i].ID);
    }
    if (collsID.length != 0) {
      var collResult = await api.user.getCollsInfo(collsID);
      if (collResult == false) {
        console.log("当前收藏夹内无任何数据");
      } else {
        state.collsInfo = collResult;
        for (let i = 0; i < state.actDir.length; i++) {
          console.log("看看收藏夹id");
          console.log(state.actDir[i].ID);
          state.actDir[i].ShowInfo = [];
          state.actDir[i].isAct = false;
          for (let j = 0; j < collResult.length; j++) {
            console.log("看看收藏信息ID");
            console.log(collResult[j].collection_id);
            if (state.actDir[i].ID == collResult[j].collection_id) {
              state.actDir[i].ShowInfo.push(collResult[j].Info);
            }
          }
        }
      }
    }

    console.log("看看最后");
    console.log(state.actDir);
  },
  PushJob() {
    console.log("点击");
  },
  toDelete(id, pid) {
    console.log("删除");
    // console.log(id);
    // console.log(pid);

    // api.user.deletePositionsToColl(id, "2", pid);
  },
};

// 生命周期钩子
onMounted(async () => {
  // 组件被挂载时执行的逻辑
  methods.Flash();
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
@import url("//at.alicdn.com/t/font_3325537_rna8asdhlg8.css");
#my-coll {
  display: flex;
}
.el-main * {
  line-height: initial;
}
#CollAside {
  width: 200px;
  height: 850px;
  background-color: #fff;
  float: left;
}

.el-menu {
  /* padding: 0; */
  border: none;
}
.el-menu-item {
  display: block;
  padding: 16px 8px 0px 16px;
  margin: 0;
  height: 66px;
  border-bottom: 1px solid #ededed;
  border-left: none;
  text-align: left;
  line-height: 40px;
}
.el-menu-item:hover {
  background-color: rgb(246, 247, 248);
}
.el-menu-item:hover i {
  color: #666;
}
.el-menu-item i {
  color: rgb(246, 247, 248);
}
.active {
  background-color: rgb(246, 247, 248);
}
.active_i {
  color: #000 !import;
  font-weight: 800;
}
.el-menu-item span {
  padding-left: 10px;
}
.el-menu .is-active {
  color: #333;
}
#contentBox {
  width: 888px;
  height: 850px;
  float: left;
  background-color: #fff;
  /* background-color: red; */
}
.el-card {
  width: 100%;
  height: 844px;
  display: inline-block;
  border-radius: 0;
  margin: 0;
  padding: 0;
  border: none;
  border-left: 1px solid var(--el-card-border-color);
  box-shadow: none;
}
.card-header {
  height: 85px;
  padding: 0 16px;
}
:deep(.el-card__header) {
  padding: 0;
  margin: 0;
}
.card-header p {
  height: 32px;
  line-height: 32px;
  margin-top: 10px;
  text-align: left;

  /* padding: 0 16px; */
}
.card-header p i {
  margin-left: 10px;
  font-size: 20px;
}
.el-menu-item * {
  vertical-align: middle;
}
.imgDiv {
  margin-top: 230px;
}
i {
  cursor: pointer;
}
.newBuilt {
  color: red;
}
/* 
 */
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.toAddButton {
  float: right;
}
.scard-content {
  /* background-color: red; */
}
</style>
