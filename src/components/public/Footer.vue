<template>
  <div class="footer w15">
    <div class="line w15"></div>
    <el-row>
      <el-col :span="4">
        <div class="footer-box">
          <ul>
            <li>
              <a href>相关链接</a>
            </li>
            <li>
              <a href>帮助中心</a>
            </li>
            <li>
              <a href>建议反馈</a>
            </li>
            <li>
              <a href>企业认证</a>
            </li>
            <li>
              <a href>加入我们</a>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="middle">
          <h1>校园就业服务平台</h1>
          <h2>@版权所有——CZP</h2>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right">
          <h2>联系方式：</h2>
          <div class="contactBox">
            <div class="contract-item">
              <div class="viewCard">
                <img src="@/assets/images/wechat.png" alt="" />
                <!-- <img src="/src/assets/images/wechat.png" alt="" /> -->
              </div>
              <span class="icon-weixin"></span>
              <br />
              <h4>官方微信</h4>
            </div>
            <div class="contract-item">
              <div class="viewCard">
                <img src="@/assets/images/wechat.png" alt="" />
                <!-- <img src="/src/assets/images/wechat.png" alt="" /> -->
              </div>
              <span style="color: #d81e06" class="icon-weibo"></span>
              <br />
              <h4>官方微博</h4>
            </div>
            <div class="contract-item">
              <div class="viewCard">
                <img src="@/assets/images/wechat.png" alt="" />
                <!-- <img src="/src/assets/images/wechat.png" alt="" /> -->
              </div>
              <span style="color: #e47c32" class="icon-youxiang"></span>
              <br />
              <h4>官方邮箱</h4>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    /* 被创建的时候 */
  },
  updated() {
    /* 更新的时候 */
  },
  mounted() {
    /* 被正常挂载的时候 */
  },
  unmounted() {
    /* 对应v2 的destroyed  被销毁的时候 */
  },
};
</script>
<style scoped>
.footer {
  margin-top: 100px;
  width: 1500px !important;
  height: 150px;
}
/* .footer-box {
    width: 100%;
    height: 100%;
} */
.line {
  background-color: rgba(0, 0, 0, 0.2);
  height: 2px;
}
.footer-box > ul > li {
  margin: 5px 0 0 10px;
  font-size: 18px;
}
.footer-box > ul > li:first-child {
  font-weight: bold;
  color: rgba(148, 148, 148, 1);
  margin-bottom: 5px;
}
.middle {
  text-align: center;
}
.middle > h1 {
  font-size: 48px;
  margin: 5px 0 20px 0;
}
.right {
  height: 100%;
}
.contactBox {
  float: left;
  width: 100%;
  height: 85px;
  /* background-color: black; */
}
.contactBox span {
  font-size: 65px;
  color: #57bb40;
}
.contract-item {
  display: inline-block;
  width: 100px;
  text-align: center;
}
.contract-item:hover .viewCard {
  display: block;
  box-shadow: var(--el-box-shadow);
}
.viewCard {
  display: none;
  position: absolute;
  bottom: 100%;
  width: 200px;
  height: 200px;
  background-color: white;
}
.viewCard > img {
  width: 100%;
  height: 100%;
}
</style>
