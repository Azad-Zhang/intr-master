<template>
  <div id="position-manager">
    <el-card>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="全部职位" name="first" ref="tabPane">
          <ComPosCard
            :myData="positions"
            @edit="handleEdit"
            @open="handleOpen"
            @delete="handleDelete"
            v-if="positions.length != 0"
          />
          <NullData v-else />
        </el-tab-pane>
        <el-tab-pane label="开放中" name="second">
          <ComPosCard
            :myData="OpenData"
            @edit="handleEdit"
            @open="handleOpen"
            @delete="handleDelete"
            v-if="OpenData.length != 0"
          />
          <NullData v-else />
        </el-tab-pane>
        <el-tab-pane label="待开放" name="third">
          <ComPosCard
            :myData="ToBeOpenData"
            @edit="handleEdit"
            @open="handleOpen"
            @delete="handleDelete"
            v-if="ToBeOpenData.length != 0"
          />
          <NullData v-else />
        </el-tab-pane>
        <el-tab-pane label="审核失败" name="fourth">
          <ComPosCard
            :myData="AuditFailedData"
            @edit="handleEdit"
            @open="handleOpen"
            @delete="handleDelete"
            v-if="AuditFailedData.length != 0"
          />
          <NullData v-else />
        </el-tab-pane>
        <el-tab-pane label="已关闭" name="fifth">
          <!-- @childFlash="toFlash" -->
          <!-- @DellShow="IsDelShow" -->
          <ComPosCard
            :myData="CloseData"
            @edit="handleEdit"
            @open="handleOpen"
            @delete="handleDelete"
            v-if="CloseData.length != 0"
          />

          <NullData v-else />
        </el-tab-pane>
      </el-tabs>
      <el-button
        type="primary"
        class="RelPos"
        @click="RelShow = true"
        :disabled="isPos.value"
      >
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon
        >发布职位</el-button
      >
      <el-button
        type="primary"
        class="DelPos"
        v-if="DelShow"
        @click="DelCheckedPos"
      >
        <el-icon class="avatar-uploader-icon"><Minus /></el-icon>
        删除职位</el-button
      >
    </el-card>
    <el-dialog v-model="RelShow" title="发布职位" width="50%" center>
      <div class="content">
        <el-card class="PosValueCard" shadow="none">
          <template #header>
            <div>
              <h3 class="PosHead">1.职位基本信息</h3>
              <span class="SmallTitle"
                >职位发布成功后，招聘类型、职位名称、职位类型、工作城市，将无法修改</span
              >
            </div>
          </template>
          <div class="PosValue">
            <el-form>
              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[0].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>
                <span>{{ comInfo.name }}</span>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[1].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>
                <el-input v-model="RelePos.name"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[2].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>
                <el-select v-model="RelePos.type" placeholder="请选择职位类型">
                  <el-option key="eltype1" value="实习" />
                  <el-option key="eltype2" value="兼职" />
                  <el-option key="eltype3" value="全职" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[8].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>
                <el-select v-model="RelePos.min" placeholder="100">
                  <el-option
                    v-for="item in Salary"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[8].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>
                <el-select v-model="RelePos.max" placeholder="100">
                  <el-option
                    v-for="item in Salary"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[3].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>
                <el-input
                  v-model="RelePos.desc"
                  type="textarea"
                  maxlength="5000"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="PosValueCard" shadow="none">
          <template #header>
            <div>
              <h3 class="PosHead">2.职位要求</h3>
              <span class="SmallTitle"
                >我们将通过以下条件，为你精确推荐合适的牛人，请尽量详细填写</span
              >
            </div>
          </template>
          <div class="PosValue">
            <el-form>
              <el-form-item
                ><div class="label">
                  <span
                    v-for="(item, index) in PosLabel[10].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>

                <el-select v-model="RelePos.education" placeholder="选择学历">
                  <el-option value="本科" />
                  <el-option value="硕士" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[11].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>
                <el-select v-model="RelePos.experience" placeholder="选择经验">
                  <el-option value="无经验要求" />
                  <el-option value="有项目经验" /> </el-select
              ></el-form-item>

              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[6].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                  (it程序员-java开发-不加班-00后")(以"-"号分隔)
                </div>
                <el-input v-model="RelePos.tags"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span
                    v-for="(item, index) in PosLabel[7].slice()"
                    :key="index"
                  >
                    {{ item }}
                  </span>
                </div>
                <el-input v-model="RelePos.area"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <!-- <el-form>
          <el-form-item label="公司名：">
            <el-input v-model="CompanyInfo.ComName" disabled />
          </el-form-item>
          <el-form-item label="岗位名称：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
          <el-form-item label="地区:">
            <el-select
              v-model="Position.Area"
              class="m-2"
              placeholder="请选择地区"
            >
              <el-option
                v-for="item in Areas"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="经验要求：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
          <el-form-item label="学历要求：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
          <el-form-item label="工资薪酬：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
          <el-form-item label="岗位详细要求：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
        </el-form> -->
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="RelShow = false">取消</el-button>
          <el-button type="primary" @click="UpPosition">提交</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="EditShow" title="编辑职位" width="50%" center>
      <div class="content">
        <el-card class="PosValueCard" shadow="none">
          <template #header>
            <div>
              <h3 class="PosHead">1.职位基本信息</h3>
              <span class="SmallTitle"
                >职位发布成功后，招聘类型、职位名称、职位类型、工作城市，将无法修改</span
              >
            </div>
          </template>
          <div class="PosValue">
            <el-form>
              <el-form-item>
                <div class="label">
                  <span v-for="(item, index) in PosLabel[0].slice()">
                    {{ item }}
                  </span>
                </div>
                <span>{{ comInfo.name }}</span>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span v-for="(item, index) in PosLabel[1].slice()">
                    {{ item }}
                  </span>
                </div>
                <!-- <span>为什么不改变？</span> -->
                <el-input v-model="EditPos.name"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span v-for="(item, index) in PosLabel[2].slice()">
                    {{ item }}
                  </span>
                </div>
                <el-select v-model="EditPos.type" placeholder="请选择职位类型">
                  <el-option
                    v-for="item in PosDirecation"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span v-for="(item, index) in PosLabel[3].slice()">
                    {{ item }}
                  </span>
                </div>
                <el-input
                  v-model="EditPos.desc"
                  type="textarea"
                  maxlength="5000"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card class="PosValueCard" shadow="none">
          <template #header>
            <div>
              <h3 class="PosHead">2.职位要求</h3>
              <span class="SmallTitle"
                >我们将通过以下条件，为你精确推荐合适的牛人，请尽量详细填写</span
              >
            </div>
          </template>
          <div class="PosValue">
            <el-form>
              <el-form-item>
                <div class="label">
                  <span v-for="(item, index) in PosLabel[4].slice()">
                    {{ item }}
                  </span>
                </div>
                <el-select v-model="EditPos.isPractice" placeholder="实习">
                  <el-option
                    v-for="item in PosPractice"
                    :label="item"
                    :value="item"
                  />
                </el-select>
                <!-- <el-select v-model="RelePos.Experience" placeholder="选择经验">
                  <el-option
                    v-for="item in PosExper"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select> -->
                <!-- <el-select v-model="RelePos.Education" placeholder="选择学历">
                  <el-option
                    v-for="item in PosEduca"
                    :key="item"
                    :label="item"
                    :value="item"
                  />
                </el-select> -->
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span v-for="(item, index) in PosLabel[5].slice()">
                    {{ item }}
                  </span>
                </div>
                <el-select v-model="EditPos.min" placeholder="最低月薪">
                  <el-option
                    v-for="item in PosMinSalary"
                    :label="item"
                    :value="item"
                  />
                </el-select>
                <el-select v-model="EditPos.max" placeholder="最高月薪">
                  <el-option
                    v-for="item in PosMaxSalary"
                    :label="item"
                    :value="item"
                  />
                </el-select>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span v-for="(item, index) in PosLabel[6].slice()">
                    {{ item }}
                  </span>
                  (it程序员-java开发-不加班-00后")(以"-"号分隔)
                </div>
                <el-input v-model="EditPos.tags"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="label">
                  <span v-for="(item, index) in PosLabel[7].slice()">
                    {{ item }}
                  </span>
                </div>
                <el-input v-model="EditPos.area" disabled></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <!-- <el-form>
          <el-form-item label="公司名：">
            <el-input v-model="CompanyInfo.ComName" disabled />
          </el-form-item>
          <el-form-item label="岗位名称：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
          <el-form-item label="地区:">
            <el-select
              v-model="Position.Area"
              class="m-2"
              placeholder="请选择地区"
            >
              <el-option
                v-for="item in Areas"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="经验要求：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
          <el-form-item label="学历要求：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
          <el-form-item label="工资薪酬：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
          <el-form-item label="岗位详细要求：">
            <el-input v-model="Position.Postitle" />
          </el-form-item>
        </el-form> -->
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="EditShow = false">取消</el-button>
          <el-button type="primary" @click="rePosition">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { Plus, Minus } from "@element-plus/icons-vue";
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
import ComPosCard from "@/components/perinfo/Company/ComPosCard.vue";
import NullData from "@/components/public/NullData.vue";
// 在这里定义组件的响应式变量和函数

let activeName = ref("second");
let EditShow = ref(false);
const Salary = ["1000", "2000", "3000", "4000", "5000", "6000"];
let RelShow = ref(false);
let isPos = ref(true);
const tabPane = ref(null);
let positions = ref({});
let comInfo = reactive({});
const PosLabel = [
  "公司", //0
  "职位名称", //1
  "职位类型", //2
  "职位描述", //3
  "是否实习", //4
  //   "经验和学历",
  "薪资范围", //5
  "职位标签", //6
  "工作地点", //7
  "薪资情况", //8
  "兼职方向", //9
  "学历要求", //10
  "经验要求", //11
];
let RelePos = ref({
  name: "测试", // 职位名
  type: "全职", // 职位类型
  desc: "可以用富文本", // 职位描述，可以用富文本
  area: "重庆市沙坪坝区", // 地区
  status: 1, // 职位状态,正常0 未开放1
  isPractice: 1, // 不填为0 是否实习职位,普通0 实习1;default:0
  min: "3000", // 必填，实习为最低多少钱一天，非实习表示一个月最低多少
  max: "6000", // 可选，实习为最多多少钱一天，非实习表示一个月最高多少
  tags: "it程序员-java开发-不加班-00后", // 职位标签集合,通过-分隔
  //   dirction: "计算机",
  education: "本科",
  experience: "无经验要求",
});
let EditPos = ref({
  name: "测试", // 职位名
  type: "全职", // 职位类型
  desc: "可以用富文本", // 职位描述，可以用富文本
  area: "重庆市沙坪坝区", // 地区
  status: 1, // 职位状态,正常0 未开放1
  isPractice: 1, // 不填为0 是否实习职位,普通0 实习1;default:0
  min: "3000", // 必填，实习为最低多少钱一天，非实习表示一个月最低多少
  max: "6000", // 可选，实习为最多多少钱一天，非实习表示一个月最高多少
  tags: "it程序员-java开发-不加班-00后", // 职位标签集合,通过-分隔
  //   dirction: "计算机",
  education: "本科",
  experience: "无经验要求",
});
// 开放
let OpenData = reactive([]);
//待开放
let ToBeOpenData = reactive([]);
//关闭
let CloseData = reactive([]);
//待审核
let AuditFailedData = reactive([]);

const Flash = async function () {
  var myResult = await api.company.getAllPositions(
    store.state.userInfo.comInfo.cid
  );
  console.log("职位管理");
  console.log(myResult);
  positions = myResult;
  for (let i = 0; i < positions.length; i++) {
    console.log(positions[i].status);
    positions[i].checked = false;
    if (positions[i].status == 0) {
      OpenData.push(positions[i]);
    } else if (positions[i].status == 1) {
      ToBeOpenData.push(positions[i]);
    } else if (positions[i].status == 2) {
      CloseData.push(positions[i]);
    } else if (positions[i].status == 3) {
      AuditFailedData.push(positions[i]);
    }
  }
  comInfo = store.state.userInfo.comInfo;
};
const handleEdit = function (pid) {
  console.log("接收到的pid");

  console.log("Received edit message from child:", pid);
  // 执行编辑操作
  EditShow.value = true;
};
const handleOpen = function (pid) {
  console.log("接收到的pid");
  console.log("Received open message from child:", pid);

  // 执行打开操作
};
const handleDelete = function (pid) {
  console.log("接收到的pid");
  console.log("Received open message from child:", pid);
  api.company.deletePositions(pid);
  Flash();
  // 执行打开操作
};
// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const UpPosition = async function () {
  console.log("发布职位");
  console.log(RelePos.value);
  var myResult = await api.company.upPositions(RelePos.value);
  console.log("得到的结果");
  console.log(myResult);
  Flash();
  RelShow.value = false;
};

// 生命周期钩子
onMounted(async () => {
  // 组件被挂载时执行的逻辑
  Flash();
});

onUpdated(() => {
  // 组件更新时执行的逻辑
});

onUnmounted(() => {
  // 组件销毁时执行的逻辑
});
</script>
<style scoped>
#position-manager {
  position: relative;
}
:deep(.el-tabs__header) {
  margin-bottom: 55px;
}
.avatar-uploader-icon {
  font-size: 18px;
  margin-right: 5px;
  color: #fff;
}
.RelPos {
  position: absolute;
  top: 70px;
  left: 22px;
}
:deep(.el-dialog__title) {
  font-size: 25px;
  font-weight: bold;
}
.PosHead {
  font-size: 18px;
}
.SmallTitle {
}
:deep(.el-card__header) {
  border-bottom: none;
}
.label span {
  font-size: 16px;
}
.label span:last-child::after {
  content: " ：";
  font-size: 16px;
  margin-right: 10px;
}
span {
  font-size: 16px;
}
:deep(.el-textarea__inner) {
  height: 200px;
}
.PosValueCard {
  margin-bottom: 20px;
}
:deep(.el-dialog--center) {
  margin-top: 10px;
}
.DelPos {
  position: absolute;
  top: 70px;
  right: 22px;
}
:deep(.el-card__body) {
  padding: 0;
}
</style>
