<template>
  <div class="PriSet">
    <el-card class="Basic-Info-card">
      <template #header>
        <div class="card-header">
          <span>隐私设置</span>
        </div>
      </template>
      <ul class="form">
        <li>
          <span class="left">
            <h5>工作信息</h5>
            <p>开启后在个人主页等模块向他人展示工作信息</p>
          </span>
          <p class="right">
            <el-switch
              active-color="#13ce66"
              v-model="options.work"
              class="ml-2"
            />
          </p>
        </li>
        <li>
          <span class="left">
            <h5>教育信息</h5>
            <p>开启后在个人主页等模块向他人展示工作信息</p>
          </span>
          <p class="right">
            <el-switch
              active-color="#13ce66"
              v-model="options.educate"
              class="ml-2"
            />
          </p>
        </li>
        <li>
          <span class="left">
            <h5>屏蔽设置</h5>
            <p>屏蔽后，对方将不可在您的内容下进行评论</p>
          </span>
          <p class="right">
            <el-switch
              active-color="#13ce66"
              v-model="options.shield"
              class="ml-2"
            />
          </p>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

let options = reactive({ work: false, educate: false, shield: false });
</script>
<style scoped>
.el-card {
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
  height: 600px;
}

.card-header {
  text-align-last: left;
  height: 48px;
  line-height: 48px;
  padding-left: 16px;
  font-weight: 600;
  color: #2e2e2e;
  font-size: 25px;
}
:deep(.el-card__header) {
  padding: 0;
  margin: 0;
}
:deep(.el-card__body) {
  padding: 0;
}
.form * {
  line-height: initial;
}
.form li {
  display: flex;
  height: 90px;
  padding-top: 24px;
  padding-left: 16px;
  justify-content: space-between;
  border-bottom: 1px solid #aaa;
}

.left,
.right {
  display: inline-block;
}
.left {
  /* width: 75px; */
  width: 280px;
  margin-left: 16px;
  text-align: left;
  /* display: flex; */
  /* justify-content: space-between; */
}
.left h5 {
  font-size: 20px;
  font-weight: 600;
  height: 24px;
  margin-bottom: 16px;
  display: block;
}
.left p {
  font-size: 14px;
  height: 24px;
}
.right {
  line-height: 55px;
}
</style>
