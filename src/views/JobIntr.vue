<template>
  <div class="JobIntr">
    <div class="header">
      <div class="StaBanner w">
        <p class="state">
          {{ state.myPos.status == 1 ? "招聘中" : "暂停招聘" }}
        </p>
        <div class="title">
          <div class="left">
            <span class="JobName">{{ state.myPos.name }}</span>
            <span class="JobSalary">{{
              state.myPos.max == "" || state.myPos.max == "0"
                ? state.myPos.min + "￥"
                : state.myPos.min + "-" + state.myPos.max + "￥"
            }}</span>
          </div>
          <div class="right">
            <span class="treatment" v-for="item in state.comInfo.treatment">{{
              item
            }}</span>
            <span class="treatment more">...</span>
          </div>
        </div>
        <div class="require">
          <!-- 搞点，用after，最后一个取消 -->
          <span class="area">{{ state.comInfo.area }}</span>
          <em class="dot"></em>
          <span class="experience">{{ state.myPos.experience }}</span>
          <em class="dot"></em>
          <span class="education">{{ state.myPos.education }}</span>
        </div>
        <div class="buttons">
          <div class="interested" @click="state.collVisible = true">
            <i class="iconfont icon-aixin_shixin"></i>
            <span>感兴趣</span>
          </div>
          <div class="consulting">
            <span @click="setChatUser(26)">立即沟通</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-affix :offset="0">
      <div class="ActBanner" :class="{ h170: showFixedSearch }">
        <div class="w">
          <p class="state">
            {{ state.myPos.status == 1 ? "招聘中" : "暂停招聘" }}
          </p>
          <div class="title">
            <div class="left">
              <span class="JobName">{{ state.myPos.name }}</span>
              <span class="JobSalary">{{
                state.myPos.max == "" || state.myPos.max == "0"
                  ? state.myPos.min + "￥"
                  : state.myPos.min + "-" + state.myPos.max + "￥"
              }}</span>
            </div>
            <div class="right">
              <span class="treatment" v-for="item in state.comInfo.treatment">{{
                item
              }}</span>
              <span class="treatment">五险一金</span>
              <span class="treatment">补充医疗保险</span>
              <span class="treatment">定期体检</span>
              <span class="treatment">加班补助</span>
              <span class="treatment more">...</span>
            </div>
          </div>
          <div class="require">
    
            <span class="area">{{ state.comInfo.area }}</span>
            <em class="dot"></em>
            <span class="experience">{{ state.myPos.experience }}</span>
            <em class="dot"></em>
            <span class="education">{{ state.myPos.education }}</span>
          </div>
          <div class="buttons">
            <div class="interested">
              <i class="iconfont icon-aixin_shixin"></i>
              <span>感兴趣</span>
            </div>
            <div class="consulting">
              <span @click="setChatUser(26)">立即沟通</span>
            </div>
          </div>
        </div>
      </div>
    </el-affix> -->
    <div class="content w">
      <div class="avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <span class="avaName">彭女士</span>
        <span class="avaJob">招聘经理</span>
      </div>
      <div class="JobDescription">
        <h3 class="JobTitle">职业描述</h3>
        <div class="JobContent">
          工作职责：<br />
          {{ state.myPos.desc }}
        </div>
        <h3 class="JobTitle">公司介绍</h3>
        <div class="avatar" style="border-bottom: solid">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          />
          <span class="avaName">{{ state.comInfo.name }}</span>
          <span class="avaJob">{{ state.comInfo.area }}</span>
        </div>
        <el-carousel
          :interval="5000"
          type="card"
          height="200px"
          style="border-bottom: solid; margin-top: 10px"
        >
          <el-carousel-item v-for="item in state.imagesList" :key="item">
            <el-image
              style="width: 100%; height: 100%"
              :src="'/api' + item.url"
              fit="contain"
            />
          </el-carousel-item>
        </el-carousel>
        <div class="CompanyIntro">
          马上消费金融股份有限公司（简称“马上金融”）是一家经中国银保监会批准，持有消费金融牌照的科技驱动型金融机构。公司于2015年6月正式开业，于2016、2017、2018年分别完成三次增资扩股，注册资本金达40亿元。股东包括重庆百货大楼股份有限公司（600729.SH）、北京中关村科金技术有限公司、物美科技集团有限公司、重庆银行股份有限公司(01963.HK)、阳光财产保险股份有限公司、浙江中国小商品城集团股份有限公司(600415.SH)等。<br />
          秉承“让生活更轻松”的使命，马上金融以用户为中心，聚焦普惠金融，通过科技赋能创新，致力于打造成为最被信赖的金融服务商，为有金融服务需求的社会各阶层和群体提供小额分散的消费金融服务。公司积极助力消费升级、拉动内需和服务实体经济发展，不断为地方税收、就业等经济社会发展做出积极贡献。截至2020年6月末，注册用户突破1亿+，累计发放贷款超过4500亿元，累计纳税25.03亿元，创造就业岗位2000余个。<br />
          作为科技驱动的金融机构，马上金融在全球范围内选拔金融、大数据和人工智能等领域高精尖人才，组建了1000余人的技术团队、300余人的大数据风控团队，先后成立了人工智能研究院、博士后科研工作站、智慧金融与大数据分析重点实验室等内部科研平台，还与中国科学院、重庆师范大学等科研院校共建国家级应用数学中心，开展横向课题研究，不断提升产学研协作能力。基于上述科研基础，公司自主研发了800余套涵盖消费金融全业务流程、全生命周期的核心技术系统，累计提交专利申请230余项，获得软著作权登记证书43项。<br />
          目前，公司已获主体AAA信用评级和国家高新技术企业认定，跻身中国新一代人工智能产业创新国家队，连续四年入围“毕马威中国领先金融科技企业50强”，两项科研课题获中国银保监会银行业信息科技风险管理课题非银机构组一类成果奖，获评央行征信中心“个人征信系统数据质量工作优秀机构”，“中国服务业企业500强”等荣誉。创始人兼CEO赵国庆入选国家科技部科技创新创业人才、第四批中组部国家“万人计划”科技创业领军人才。<br /><br />
          我们的合伙人文化：信任、责任、授权、透明、分享<br /><br />
          我们的文化准则：简、拼、快 我们的愿景：让生活更轻松<br /><br />
          我们的目标：成为全球最被信赖的金融服务商<br /><br />
          我们的核心理念：以用户为中心<br /><br />
          我们的价值观：诚信、团队、效率、创新<br /><br />
        </div>
        <!-- <h3 class="JobTitle">工作地址</h3> -->
      </div>
    </div>
  </div>
  <el-dialog
    v-model="state.collVisible"
    title="请选择收藏夹"
    width="30%"
    center
  >
    <el-form :model="state.form" label-width="120px">
      <el-form-item label="收藏夹">
        <el-select v-model="state.form.col" placeholder="请选择你的收藏夹">
          <el-option
            v-for="(item, index) in state.form.cols"
            :label="item.name"
            :value="item.ID"
            :key="index"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.collVisible = false">取消</el-button>
        <el-button type="primary" @click="methods.addCollections">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
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
import api from "@/api/api.js";
import store from "@/store/index.js";
import { useRoute } from "vue-router";

const route = useRoute();

let showFixedSearch = ref(false);
// props
const props = defineProps({
  // 定义props
});

// 响应式变量
const state = reactive({
  // 定义响应式变量
  myPos: {},
  comInfo: {},
  imagesList: [],
  collVisible: false,
  form: {
    cols: [],
    col: null,
  },
});

// 计算属性
const computedProperty = computed(() => {
  // 计算属性逻辑
});

// 方法
const methods = {
  // 定义组件方法
  addCollections() {
    console.log(state.form.col);

    console.log("2");
    console.log(state.myPos.pid);

    api.user.addPositionsToColl(state.form.col, "2", state.myPos.pid);
  },
};

const showSearch = function () {
  console.log("滚动了");
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //   console.log(scrollTop);
  // 当页面滚动到高度300px处时，显示搜索框
  if (scrollTop > 300) {
    showFixedSearch.value = true;
  } else {
    showFixedSearch.value = false;
  }
  //   console.log(showFixedSearch.value);
};

// 生命周期钩子
onMounted(() => {
  // 组件被挂载时执行的逻辑
  window.addEventListener("scroll", showSearch);
  console.log("当前路径");
  console.log(route.query.pid); // 输出: value1
  console.log("怎么个事？");
  setTimeout(async () => {
    console.log("我草？");
    let myResult = await api.common.getPosition(route.query.pid);
    console.log(myResult);
    state.myPos = myResult;
    const cid = myResult.cid;
    let myResult2 = await api.common.getCompany(cid);
    let list = myResult2.treatment.split("-");
    myResult2.treatment = list;
    state.comInfo = myResult2;
    let myResult3 = await api.company.getAlbum(cid);
    state.imagesList = myResult3;
    let myResult4 = await api.user.getAllCollections();
    console.log("得到的全部收藏夹");
    for (let i = 0; i < myResult4.length; i++) {
      state.form.cols.push({ ID: myResult4[i].ID, name: myResult4[i].name });
    }
    console.log(state.form.cols);
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
@import url("//at.alicdn.com/t/font_3325537_4n4gqte7u2k.css");
span {
  margin: 0;
}
.JobIntr {
  min-height: 2000px;
}
.state {
  text-align: right;
  margin-right: 10px;
}
.header,
.ActBanner {
  width: 100%;
  height: 170px;
  background-color: #b1b3b8;
  background-color: rgb(66, 74, 93);
  color: rgba(255, 255, 255, 0.7);
  padding: 24px 15px;
}
.StaBanner {
  height: 170px;

  /* background-color: red; */
}
.ActBanner {
  width: 100%;
  height: 0px;
  /* background-color: green; */
  /* overflow: hidden; */
  transition: all 0s;
}
.h170 {
  height: 170px;

  transition: all 0.5s ease-out;
}
.title {
  padding: 8px 0px;
  display: flex;
  justify-content: space-between;
}
.left,
.right {
  height: 45px;
  line-height: 45px;
}
.left {
  font-size: 32px;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.JobName {
  color: #fff;
  margin-right: 20px;
}
.JobSalary {
  color: #fa6a43;
  font-weight: bold;
}
.treatment {
  display: inline-block;
  padding: 0 15px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #5ed5c8;
  color: #5ed5c8;
  height: 23px;
  line-height: 23px;
  border-radius: 13px;
  margin-top: 0;
  vertical-align: middle;
}
.more {
  line-height: 16px;
}
.require {
  text-align: right;
  margin-right: 10px;
}
.require span {
  /* margin-right: 10px; */
}
.dot {
  display: inline-block;
  vertical-align: middle;
  width: 2px;
  height: 2px;
  margin: 0 7px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
}
.buttons {
  margin-top: 15px;
  text-align: right;
}
.interested,
.consulting {
  display: inline-block;
  margin-right: 20px;
  font-size: 18px;
  width: 100px;
  padding: 10px 20px;
  border: 1px solid #5dd5c8;
  color: #5dd5c8;
  cursor: pointer;
  text-align: center;
}
.icon-aixin_shixin {
  font-size: 16px;
  margin-right: 10px;
  color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s linear;
  /* color: red; */
  /* background-color: red; */
}
.interested:hover .icon-aixin_shixin {
  color: #5dd5c8;
  /* color: red; */
  /* background-color: red; */
}
.consulting {
  background-color: #5dd5c8;
  color: #fff;
}
.el-affix {
  height: 0;
  overflow: hidden;
}
.avatar {
  text-align: left;
  height: 100px;
  /* background-color: red; */
  position: relative;
}
.el-avatar {
  width: 80px;
  height: 80px;
  margin-top: 10px;
}
.avaName {
  font-size: 24px;
  position: absolute;
  bottom: 40px;
  left: 90px;
}
.avaJob {
  position: absolute;
  bottom: 15px;
  color: #9fa3b0;
  left: 90px;
}
.JobTitle {
  padding: 10px 0px;
  width: 80px;
  margin-bottom: 20px;
  border-bottom: 2px solid #79bbff;
}
.JobContent,
.CompanyIntro {
  color: #51586d;
  line-height: 36px;
  white-space: pre-line;
  text-align: left;
}
</style>
