<template>
  <common-drawer ref="drawer">
    <div id="home">
      <div class="head-index-box">
        <div class="head-index-left" @click="showDrawer">
          <img src="../assets/img/icon_my.png">
        </div>
        <div class="head-index-center">
          <img class="head-index-icon" src="../assets/img/logo.png">
        </div>
        <div class="head-index-right">
          <img src="../assets/img/icon_gamechooce.png">
        </div>
      </div>
    </div>
  </common-drawer>
</template>

<script>
import { XButton, Badge, ViewBox } from "vux";
import CommonDrawer from "./common-drawer";
import { info } from "@/api/user";
export default {
  components: { XButton, Badge, ViewBox, CommonDrawer },
  data: function() {
    // 页面数据
    return {
      drawerVisibility: true,
      showMenu: true
    };
  },
  // js 初始化完毕
  created: function() {},
  // html 初始化完毕
  mounted: function() {},
  methods: {
    showDrawer() {
      this.$refs.drawer.showDrawer();
    },
    goAccountDetails() {
      this.$router.push({
        name: "account-details"
      });
    },
    goPersonal() {
      this.$router.push({
        name: "personal"
      });
    },
    goMessage() {
      this.$router.push({
        name: "message"
      });
    }
  }
};
</script>

<style lang="scss">
#home {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #17181f;
}
.head-index-box {
  margin: auto;
  width: 684px;
  height: 88px;
  overflow: hidden;
  display: flex;
}
.head-index-left {
  width: 36px;
  height: 42px;
  margin-top: 23px;
}
.head-index-left img {
  width: 100%;
}
.head-index-right {
  width: 42px;
  height: 42px;
  margin-top: 23px;
}
.head-index-right img {
  width: 100%;
}
.head-index-center {
  float: left;
  // margin-left: 212px;
  // width: 202px;
  height: 38.1px;
  margin-top: 17.1px;
  flex: 1;
  text-align: center;
}
.head-index-center img {
  width: 202px;
}
</style>
