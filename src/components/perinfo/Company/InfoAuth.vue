<template>
  <div class="InfoAuth">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="企业认证" name="first">
        <div class="content">
          <el-card class="stu-card" v-if="EdCom == 0">
            <template #header>
              <div class="card-header">
                <h5>实名认证权益</h5>
                <p>
                  实名认证后，您可获得的权益：
                  <span>1.发布招聘岗位</span>
                  <span>2.浏览人才市场</span>
                  <span>3.陆续开放更多权益</span>
                </p>
              </div>
            </template>
            <div class="stuContent">
              <ul>
                <li>
                  <span>公司名称</span
                  ><span class="value">{{ state.comInfo.name }}</span>
                </li>
                <li>
                  <span>法定代表人</span
                  ><span class="value">{{ state.comInfo.LegalRepre }}</span>
                </li>
                <li>
                  <span>企业类型</span
                  ><span class="value">{{ state.comInfo.CompanyType }}</span>
                </li>
                <li>
                  <span>注册资金</span
                  ><span class="value">{{ state.comInfo.financing }}</span>
                </li>
                <li>
                  <span>成立日期</span
                  ><span class="value">{{
                    state.comInfo.DateIncorporation
                  }}</span>
                </li>
                <li>
                  <span>经营状态</span
                  ><span class="value">{{
                    state.comInfo.OperatingStatus
                  }}</span>
                </li>
                <li>
                  <span>注册地址</span
                  ><span class="value">{{
                    state.comInfo.RegisteredAddress.Area +
                    state.comInfo.RegisteredAddress.Desc
                  }}</span>
                </li>
                <li>
                  <span>统一社会信用代码</span
                  ><span class="value">{{ state.comInfo.UnifiedCode }}</span>
                </li>
                <li>
                  <span>经营范围</span
                  ><span class="value">{{ state.comInfo.NatureBusiness }}</span>
                </li>
                <li>
                  <span>公司地址</span
                  ><span class="value">
                    {{
                      state.comInfo.CompanyArea.Area +
                      state.comInfo.CompanyArea.Desc
                    }}</span
                  >
                </li>
                <li id="Real-Name">
                  <span>营业执照</span>
                  <div id="Real-Name-ID">
                    <div class="Real-box">
                      <div class="img-box">
                        <!-- v-if="comInfo.Businesslicense == null" -->
                        <img
                          src="data:image/png;base64,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"
                          alt=""
                        />
                        <!-- <img
                          :src="comInfo.Businesslicense"
                          alt=""
                         
                          style="width: 400px"
                        /> -->
                      </div>
                      <!-- <p class="img-desc">背面照片</p>
                      <p class="img-desc">* 支持 .JPG .JPEG .PNG不超过2M</p> -->
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </el-card>
          <el-card class="stu-card" v-else>
            <template #header>
              <div class="card-header">
                <h5>实名认证权益</h5>
                <p>
                  实名认证后，您可获得的权益：
                  <span>1.发布招聘岗位</span>
                  <span>2.浏览人才市场</span>
                  <span>3.陆续开放更多权益</span>
                </p>
              </div>
            </template>
            <div class="stuContent">
              <ul>
                <li>
                  <span>公司名称</span>
                  <el-input v-model="state.comInfo.name"></el-input>
                </li>
                <li>
                  <span>法定代表人</span>
                  <el-input v-model="state.comInfo.LegalRepre"></el-input>
                </li>
                <li>
                  <span>企业类型</span>
                  <el-select
                    v-model="state.comInfo.CompanyType"
                    class="m-2"
                    placeholder="选择企业类型"
                  >
                    <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> -->
                    <el-option label="计算机" value="计算机" />
                    <el-option label="餐饮" value="餐饮" />
                    <el-option label="美食" value="美食" />
                  </el-select>
                </li>
                <li>
                  <span>注册资金</span>
                  <el-select
                    v-model="state.comInfo.financing"
                    class="m-2"
                    placeholder="选择注册资金"
                  >
                    <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> -->
                    <el-option label="10万" value="10万" />
                    <el-option label="50万" value="50万" />
                    <el-option label="100万" value="100万" />
                    <el-option label="200万" value="200万" />
                    <el-option label="500万" value="500万" />
                  </el-select>
                </li>
                <li>
                  <span>成立日期</span>
                  <el-date-picker
                    v-model="state.comInfo.DateIncorporation"
                    type="date"
                    placeholder="成立日期"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                  />
                </li>
                <li>
                  <span>经营状态</span>
                  <el-select
                    v-model="state.comInfo.OperatingStatus"
                    class="m-2"
                    placeholder="选择经营状态"
                  >
                    <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> -->
                    <el-option label="正常营业" value="正常营业" />
                    <el-option label="停业整顿" value="停业整顿" />
                    <el-option label="下市" value="下市" />
                  </el-select>
                </li>
                <li>
                  <span>注册地址</span>
                  <el-cascader
                    v-model="state.comInfo.RegisteredAddress.Area"
                    :options="MyArea"
                    @change="handleChange"
                  />
                  <el-input
                    v-model="state.comInfo.RegisteredAddress.Desc"
                  ></el-input>
                </li>
                <li>
                  <span>统一社会信用代码</span>
                  <el-input v-model="state.comInfo.UnifiedCode"></el-input>
                </li>
                <li>
                  <span>经营范围</span>
                  <el-select
                    v-model="state.comInfo.NatureBusiness"
                    class="m-2"
                    placeholder="选择经营范围"
                  >
                    <!-- <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> -->
                    <el-option label="计算机" value="计算机" />
                    <el-option label="餐饮" value="餐饮" />
                    <el-option label="美食" value="美食" />
                  </el-select>
                  <!-- <el-input v-model="MyComInfo.NatureBusiness"></el-input> -->
                </li>
                <li>
                  <span>公司地址</span>
                  <el-cascader
                    v-model="state.comInfo.CompanyArea.Area"
                    :options="MyArea"
                    @change="handleChange"
                  />
                  <el-input v-model="state.comInfo.CompanyArea.Desc"></el-input>
                </li>
              </ul>
            </div>
          </el-card>
          <el-button class="primary" @click="EdCom = 1" v-if="EdCom == 0" round
            >修改</el-button
          >
          <div v-else>
            <el-button class="primary" round @click="ToSave">保存</el-button>
            <el-button
              class="primary"
              round
              @click="EdCom = 0"
              style="right: 240px"
              >返回</el-button
            >
          </div>
        </div>
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
import store from "@/store/index.js";
import api from "@/api/api.js";
// 在这里定义组件的响应式变量和函数

let EdCom = ref(0);
let activeName = ref("first");
const MyArea = [
  {
    value: "重庆市",
    label: "重庆市",
    children: [
      {
        value: "梁平区",
        label: "梁平区",
      },
      {
        value: "沙坪坝区",
        label: "沙坪坝区",
      },
      {
        value: "高新区",
        label: "高新区",
      },
    ],
  },
  {
    value: "上海市",
    label: "上海市",
    children: [
      {
        value: "黄浦区",
        label: "黄浦区",
      },
      {
        value: "卢湾区",
        label: "卢湾区",
      },
      {
        value: "徐汇区",
        label: "徐汇区",
      },
      {
        value: "长宁区",
        label: "长宁区",
      },
      {
        value: "静安区",
        label: "静安区",
      },
      {
        value: "普陀区",
        label: "普陀区",
      },
    ],
  },
];
// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  avatar: "null",
  comInfo: {
    name: "公司名称",
    LegalRepre: "法定代表人",
    CompanyType: "企业类型",
    financing: "注册资金",
    DateIncorporation: "成立日期",
    OperatingStatus: "正常",
    RegisteredAddress: { Area: "重庆市", Desc: "沙坪坝区" },
    UnifiedCode: "123456789",
    NatureBusiness: "计算机",
    CompanyArea: { Area: "重庆市", Desc: "沙坪坝区" },
    RealNameImage: "营业执照",
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

// 生命周期钩子
onMounted(() => {
  // 组件被挂载时执行的逻辑
  setTimeout(() => {
    state.avatar = store.state.userInfo.base.avatar;
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
</style>
