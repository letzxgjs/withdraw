<template>
  <div id="personal">
    <mt-header fixed title="个人资料">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="list">
      <ul>
        <li>
          <span>真实姓名</span>
          <span class="name">{{realName}}</span>
        </li>
        <li>
          <span>修改昵称</span>
          <div class="right" @click="modifyName">
            <span class="item-content">{{username}}</span>
            <img src="../assets/img/icon_touch_right.png">
          </div>
        </li>
        <li>
          <span>修改手机</span>
          <div class="right" @click="modifyMobile">
            <span class="item-content">{{mobile}}</span>
            <img src="../assets/img/icon_touch_right.png">
          </div>
        </li>
        <li>
          <span>修改密码</span>
          <div class="right" @click="modifyPassword">
            <img src="../assets/img/icon_touch_right.png">
          </div>
        </li>
      </ul>
    </div>
    <mt-button @click="logout">登出</mt-button>
  </div>
</template>

<script>
import { logout } from "@/api/user.js";
import { clearLoginInfo } from "@/libs/utils";
import { mapState, mapActions } from "vuex";
export default {
  name: "personal",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      realName: state => state.user.realName,
      username: state => state.user.username,
      mobile: state => state.user.mobile
    })
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    back() {
      this.$router.go(-1);
    },
    modifyName() {
      this.$router.push({
        name: "modify-name"
      });
    },
    modifyMobile() {
      this.$router.push({
        name: "modify-mobile"
      });
    },
    modifyPassword() {
      this.$router.push({
        name: "modify-password"
      });
    },
    logout() {
      this.handleLogOut().then(res => {
        if (res.code == "0000") {
          this.$toast({
            message: res.message,
            iconClass: "icon icon-success"
          });
          this.$router.push({ name: "login" });
        }
      });
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/scss">
#personal {
  height: 100%;
  box-sizing: border-box;
  background: #2b2d3b;
  padding-top: 88px;
  .mint-header {
    background: #17181f;
    height: 88px;
    font-size: 30px;
    .mint-button {
      i {
        font-size: 40px;
        margin-left: 48px;
      }
    }
  }
  .list {
    ul {
      background: #21222b;
      padding: 10px 0 0 60px;
      box-sizing: border-box;
      width: 100%;
      li {
        width: 100%;
        height: 100px;
        line-height: 100px;
        padding-right: 60px;
        box-sizing: border-box;
        border-bottom: 1px solid #373949;
        display: flex;
        justify-content: space-between;
        &:last-of-type {
          border-bottom: none;
        }
        .name {
          color: #fff;
        }
        img {
          width: 14px;
          height: 24px;
          vertical-align: middle;
        }
        span {
          font-size: 26px;
          color: #c5c9e2;
          letter-spacing: 1px;
          vertical-align: middle;
        }
        .right {
          .item-content {
            color: #4f4e60;
            padding-right: 30px;
          }
        }
      }
    }
  }
  & > .mint-button {
    margin-top: 100px;
    margin-left: 100px;
    width: 550px;
    height: 80px;
    color: #c5c9e2;
    font-size: 28px;
    background: #212c33;
    border: 1px solid #01b07d;
    border-radius: 4px;
  }
}
</style>
