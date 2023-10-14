<template>
  <div class="index">
    <div class="loopImg">
      <!-- <div class="mask-text">
        <p class="mask-text-p1">学习是一种信仰</p>
        <p class="mask-text-p2">——这是学生的本分！</p>
        <p class="mask-text-p1">将知识转换为价值</p>
        <p class="mask-text-p2">——这是我们的责任！</p>
      </div> -->
      <div class="mask"></div>
      <LoopImg :height="'850px'"></LoopImg>
    </div>
    <div class="bg-mask">
      <!-- /*面向*区第二部分，背景处理，因结构没设置好，采用死方法。** */ -->
    </div>
    <div class="content w15">
      <div class="cont1">
        <el-row>
          <el-col :span="12">
            <el-card shadow="hover" :body-style="{ height: '100%' }">
              <div class="image-box">
                <el-image :src="imageArrays[0]"></el-image>
              </div>
              <div class="cont-desc">
                <h1>校园服务新平台</h1>
                <h3 style="text-align: center">——————助力学生稳就业</h3>
                <p class="desc-info">
                  由重师学子打造的：“重庆市高校就业服务平台”， 提供 企业——学生
                  安全可靠的交流平台。
                </p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-card shadow="hover">
                <div class="image-box" style="height: 300px">
                  <el-image :src="imageArrays[1]"></el-image>
                </div>
                <h1 style="text-align: center">企业招聘首选平台</h1>
              </el-card>
            </el-row>
            <el-row>
              <el-card shadow="hover">
                <div class="image-box" style="height: 300px">
                  <el-image :src="imageArrays[2]"></el-image>
                </div>
                <h1 style="text-align: center">
                  专注应届生就业，安全，有保障！
                </h1>
              </el-card>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div class="cont2">
        <el-tabs
          v-model="currentActive"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="面向学生" name="first">
            <div class="stu-box">
              <div class="stu-cont1">
                <el-row>
                  <el-col :span="10">
                    <div class="stu-info1">
                      <h1>应聘与求职</h1>
                      <p>
                        CZP从解决应届生就业问题出发,立足企业
                        与毕业生的交流,将企业通过平台与学校建立连接，
                        由来源与学校的真实学生和经由我们审核的可信公司共
                        同构建一个就业平台！
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <div class="stu-icon-box">
                      <div class="stu-icon-item">
                        <p>
                          <span class="icon-anquanyinsi"></span>
                        </p>
                        <h3>安全隐私</h3>
                        <p>保护您的个人隐私,绝不会泄露!</p>
                      </div>
                      <div class="stu-icon-item">
                        <p>
                          <span class="icon-wendingkekao"></span>
                        </p>
                        <h3>稳定可靠</h3>
                        <p>企业、学生、学校三方保障！</p>
                      </div>
                      <div class="stu-icon-item">
                        <p>
                          <span class="icon-zhenshikexin"></span>
                        </p>
                        <h3>真实可信</h3>
                        <p>良心企业,值得信任！</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="stu-cont2">
                <el-row>
                  <el-col :span="10">
                    <div class="stu-info2">
                      <h1>海量机会等你来</h1>
                      <p>
                        丰富的机会,多达30000万家公司等你挑选。 含有
                        国企、私企、各个大厂,薪酬丰富,应届生不可不知道的绝佳平台！
                      </p>
                    </div>
                  </el-col>
                  <el-col :span="14">
                    <div class="stu-icon-box2">
                      <div
                        v-for="item in iconData"
                        :key="item.name"
                        class="stu-icon-item"
                      >
                        <p>
                          <span
                            :style="{ color: item.color }"
                            :class="item.iconName"
                          ></span>
                        </p>
                        <h3>{{ item.name }}</h3>
                        <p>{{ item.desc }}</p>
                      </div>
                    </div>
                    <div v-for="item in iconData" :key="item">{{ item }}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="面向企业" name="second">面向企业</el-tab-pane>
          <el-tab-pane label="面向学校" name="third">面向学校</el-tab-pane>
        </el-tabs>
      </div>

      <div class="cont-end">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="showBox">
              <div class="centerBox">
                <img :src="imageArrays[3]" class="myImage" />
              </div>
              <div class="text-info">
                企业招聘
                <br />
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="showBox">
              <div class="centerBox">
                <img :src="imageArrays[4]" class="myImage" />
              </div>

              <div class="text-info">学生应聘</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="showBox">
              <div class="centerBox">
                <img :src="imageArrays[5]" class="myImage" />
              </div>

              <!-- <el-image ></el-image> -->
              <!-- <el-image ></el-image> -->
              <div class="text-info">学校审核</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup>
import LoopImg from "@/components/public/LoopImg.vue";
import { ref, reactive, onMounted, onUnmounted } from "vue";
import image1 from "@/assets/images/home-page/home-page1.png";
import image2 from "@/assets/images/home-page/home-page3.jpeg";
import image3 from "@/assets/images/home-page/home-page4.jpeg";
import image4 from "@/assets/images/home-page/home-page-end1.jpg";
import image5 from "@/assets/images/home-page/home-page-end2.jpg";
import image6 from "@/assets/images/home-page/home-page-end3.jpg";

const imageArrays = ref([image1, image2, image3, image4, image5, image6]);
const currentActive = ref("first");
const iconData = reactive([
  {
    iconName: "icon-tengxun",
    name: "腾讯",
    desc: "社交、游戏龙头",
    color: "#333333",
  },
  {
    iconName: "icon-weibo",
    name: "微博",
    desc: "社交、资讯",
    color: "#d81e06",
  },
  {
    iconName: "icon-changyonglogo27",
    name: "阿里巴巴",
    desc: "购物、金融",
    color: "#FF6A00",
  },
  {
    iconName: "icon-wangyi",
    name: "网易",
    desc: "教育、培训",
    color: "#d81e06",
  },
  {
    iconName: "icon-zijietiaodong1",
    name: "字节跳动",
    desc: "社交、娱乐",
    color: "rgba(30,180,219,1)",
  },
  {
    iconName: "icon-baidu",
    name: "百度",
    desc: "搜索、资讯",
    color: "#1296db",
  },
]);
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};

const funcReload = () => {
  console.log("被执行");
  // 你的重新加载逻辑
};
</script>
<style scoped>
@import url("http://at.alicdn.com/t/font_3304731_d23l9pc5ksl.css");
/* @import url("//at.alicdn.com/t/font_3325537_rs0vb9caakk.css"); */
.mask {
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
  top: 0%;
  z-index: 55;
  background-color: rgba(55, 55, 55, 0.5);
}
.mask-text {
  position: absolute;
  top: 20%;
  left: 10%;
  z-index: 999;
  width: 80%;
  height: 20%;
  /* background-color: #fff; */
}

.mask-text > p {
  font-size: 50px;
  font-weight: bold;
  color: rgba(222, 222, 222, 1);
  margin-top: 30px;
  text-align: left;
}
.mask-text > .mask-text-p2 {
  text-indent: 2em;
}

.loopImg {
  position: relative;
  margin-top: 20px;
}
:deep(.loopImg .el-carousel__arrow) {
  transform: scale(3);
  width: 25px;
  height: 25px;
  font-size: larger;
  font-weight: bold;
  color: white;
  border-radius: 50%;
}
:deep(.loopImg .el-carousel__arrow--left) {
  transform: scale(3) translateX(20%);
}
:deep(.loopImg .el-carousel__arrow--right) {
  transform: scale(3) translateX(-20%);
}

.content {
  margin-top: 10px;

  /* box-shadow: var(--el-box-shadow-lighter); */
  /* border: 1px black solid; */
}
.cont1 {
  height: 800px;
}
.content > .el-row {
  height: 100%;
}
.content > .el-row > .el-col > .el-row {
  /* height: 49%; */
  height: 49%;
  margin-bottom: 15px;
}

.el-col {
  /* background-color: black; */
  height: 100%;
}

.el-card {
  box-sizing: border-box;
  height: 100%;
  margin: 5px;
  flex: 1;
}
.el-card:hover {
  transform: translateY(-3px);
}
.el-image {
  height: 550px;
}
.image-box {
  overflow: hidden;
}
.el-image:hover {
  transition: all 0.5s;
  transform: scale(1.2);
}
.cont-desc {
  height: 200px;
  box-sizing: border-box;
  padding: 20px;
  /* background-color: black; */
}
.desc-info {
  text-indent: 2em;
  margin-top: 20px;
}
/* 以下为末尾区 */
.cont-end {
  height: 300px;
  margin-top: 100px;
  /* background-color: black; */
}
.cont-end > .el-row {
  height: 100%;
}
.cont-end .showBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: green; */
}

.cont-end .el-image {
  position: absolute;
  height: 100%;
  height: 100%;
}
.cont-end .text-info {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  /* color: rgba(44, 44, 44, 0.8); */
  color: white;
  font-size: 3em;
  letter-spacing: 20px;
  /* font-weight: bold; */
  text-align: center;
}
.showBox:hover .text-info {
  cursor: pointer;
  /* color: rgba(188, 188, 188, 1); */
  color: #fff;
  background-color: rgba(26, 74, 197, 0.8);
}
.showBox .text-info::after {
  content: "";
  display: block;
  position: absolute;
  height: 3px;
  width: 0%;
  transition: all 0.2s;
  margin-top: 80px;
  color: white;
  background-color: #fff;
}
.showBox:hover .text-info::after {
  width: 50%;
  transition: all 0.5s;
}
.showBox:hover .el-image {
  transition: all 0.5s;
  transform: scale(1.1);
}
/*面向*区第二部分，背景处理，因结构没设置好，采用死方法。** */
.bg-mask {
  position: absolute;
  top: 2644px;
  width: 100%;
  height: 550px;
  background-color: #fbfbfb;
}

.cont2 {
  margin: 240px 0 150px 0;
}
:deep(.el-tabs__item) {
  /* border: 1px solid black; */
  height: 80px;
  line-height: 80px;
  font-size: 30px;
}
/**面向用户区：**/
.stu-box {
  /* height: 500px; */
  margin-top: 30px;
  /* border: 1px solid black; */
}
.stu-box .stu-cont1 {
  height: 500px;
}
.stu-box .el-row {
  height: 100%;
  /* background-color: green; */
}
.stu-box .el-row .el-col {
  position: relative;
}
.stu-cont1 .stu-info1,
.stu-cont2 .stu-info2 {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #5f6464;
}
.stu-cont1 .stu-info1 p,
.stu-cont2 .stu-info2 p {
  width: 350px;
  margin-top: 20px;
  font-size: 18px;
  letter-spacing: 5px;
}
.stu-icon-box {
  position: absolute;
  top: 30%;
  width: 100%;
  height: 300px;
  /* background-color: black; */
}
.stu-icon-item {
  float: left;
  width: 250px;
  height: 80%;
  margin-right: 30px;
  text-align: center;
  color: #303133;
  /* background-color: rgba(242, 242, 242, 1); */
}
.stu-icon-item:hover {
  cursor: pointer;
  background-color: rgba(244, 244, 244, 0.5);
}
.stu-icon-item > p:first-of-type {
  color: var(--el-color-primary);
  font-size: 100px;
}
.stu-icon-item > h3 {
}
.stu-icon-item > p:last-child {
  font-size: 16px;
  padding: 0 5px 0 5px;
  margin-top: 20px;
  /* word-wrap: normal; */
  letter-spacing: 1px;
  color: #606266;
}
/***面向学生第二部分 */
.stu-cont2 {
  width: 1600px;
  height: 500px;
  margin-top: 50px;
  /* border: 1px solid black; */
  /* background-color: #000; */
}
.stu-icon-box2 {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  background-color: rgba();
}
.stu-cont2 .stu-icon-box2 .stu-icon-item {
  height: 200px;
}
.centerBox {
  position: absolute;
  width: 100%;
  height: 100%;
}
.myImage {
  /* position: absolute; */
  width: 100%;
  height: 100%;
}
.showBox:hover .myImage {
  transition: all 0.5s;
  transform: scale(1.1);
}
</style>
