<template>
  <div id="login">
    <div class="head-wrap">
      <div class="logo"></div>
      <div class="talk"></div>
    </div>
    <div class="form-wrap">
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 1 }">
          <div class="icon icon-name2" v-if="currentInput === 1"></div>
          <div class="icon icon-name" v-else></div>
          <div class="minus">-</div>
          <div class="select-num">{{mobileArea}}</div>
          <div class="triangle-wrap" @click="sheetVisible=true">
            <div class="triangle"></div>
          </div>
          <input
            placeholder="请输入注册手机号"
            @blur="checkInput(1)"
            @focus="currentInput=1"
            v-model="mobile"
          >
        </div>
        <div class="tip">{{ regListTil.usernameTil }}</div>
      </div>
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 2}">
          <div class="icon icon-private2" v-if="currentInput === 2"></div>
          <div class="icon icon-private" v-else></div>
          <div class="minus">-</div>
          <input
            placeholder="请输入用户密码"
            type="password"
            @blur="checkInput(2)"
            @focus="currentInput=2"
            v-model="password"
          >
        </div>
        <div class="tip">{{ regListTil.passwordTil }}</div>
      </div>
      <div class="form-item-bottom">
        <label>
          <input type="checkbox" v-model="rememberMe" @input="remember">
          <span class="checked-box" v-if="rememberMe"></span>
          <span class="box" v-else></span>
          <span>记住我</span>
        </label>
        <div class="forget-password" @click="goForgetPassword">忘记密码?</div>
      </div>
      <mt-button @click="login" :disabled="ableBtn" :class="{'active':!ableBtn}">登录</mt-button>
      <div class="register">
        我还没有账户，
        <span class="click-register" @click="register">立即注册送五元现金</span>
      </div>
      <div class="agreement">
        注册即表示您同意《风暴电竞》
        <span>用户使用协议</span>
      </div>
    </div>
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>

<script>
import { login } from "@/api/user";
import { saveUserInfo, removeUserInfo, setToken } from "@/libs/utils";
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      mobileArea: "+86",
      password: "",
      rememberMe: false,
      sheetVisible: false,
      actions: [
        { name: "+86", method: this.selectMobileArea },
        { name: "+93", method: this.selectMobileArea }
      ],
      regListTil: {
        usernameTil: "",
        passwordTil: ""
      },
      validationResults: {
        mobile: false,
        password: false
      },
      currentInput: -1
    };
  },
  mounted() {
    let val = localStorage.getItem("loginUserInfo");
    if (val) {
      let data = JSON.parse(val);
      this.mobile = data.mobile;
      this.mobileArea = data.mobileArea;
      this.password = data.password;
      this.rememberMe = data.rememberMe;
    }
  },
  computed: {
    ableBtn() {
      var assistNum = 0;
      if (this.mobile.length === 11 && this.regListTil.usernameTil === "") {
        assistNum++;
      }
      if (this.password.length >= 8) {
        assistNum++;
      }
      if (assistNum === 2) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(["handleLogin", "handleLogOut", "handleUserInfo"]),
    register() {
      this.$router.push({
        name: "register"
      });
    },
    selectMobileArea(val) {
      this.mobileArea = val.name;
    },
    goForgetPassword() {
      this.$router.push({
        name: "forget-password"
      });
    },
    remember(val) {
      if (val.target.checked) {
        let data = {
          mobile: this.mobile,
          password: this.password,
          mobileArea: this.mobileArea,
          rememberMe: true
        };
        saveUserInfo(data);
      } else {
        removeUserInfo();
      }
    },
    // 检验手机号
    checkInput(value) {
      this.currentInput = -1;
      this.$nextTick(function() {
        if (value === 1) {
          let val = this.mobile;
          if (!/^1[34578]\d{9}$/.test(val)) {
            if (!val.length) {
              this.regListTil.usernameTil = "";
            } else if (val.length >= 11) {
              this.mobile = val.slice(0, 11);
            } else {
              this.validationResults.mobile = false;
              this.regListTil.usernameTil = "请输入正确格式手机号";
            }
          } else {
            // 验证手机号是否被注册过
            // var realTimePhone = { username: this.registerList.username };
            // this.$store.dispatch('actions_realTimePhone', realTimePhone)
            // axios({
            //   method: "get",
            //   url: "/dlfc-user-authc-service/registry/check",
            //   params: realTimePhone
            // }).then(res => {
            //   console.log("验证成功");
            //   console.log(res);
            //   if (res.code === 0) {
            this.validationResults.mobile = true;
            this.regListTil.usernameTil = "";
            //     this.assiantBtnNum1 = 1;
            //   } else {
            //     this.regListTil.usernameTil = res.message;
            //   }
            // });
          }
        }
        if (value === 2) {
          let val = this.password;
          if (!/^[A-Za-z0-9]{8,12}$/.test(val)) {
            if (!val.length) {
              this.regListTil.passwordTil = "";
            } else {
              this.regListTil.passwordTil = "请输入8-20位英文或数字";
            }
            this.validationResults.password = false;
          } else {
            this.validationResults.password = true;
            this.regListTil.passwordTil = "";
          }
        }
      });
    },

    login() {
      let data = {
        username: this.mobile,
        password: this.password
      };
      this.handleLogin(data)
        .then(res => {
          this.$toast({
            message: res.message,
            iconClass: "icon icon-success"
          });
          this.handleUserInfo()
            .then(res => {
              this.$toast({
                message: res.data.message,
                iconClass: "icon icon-success"
              });
              this.$router.push({
                name: "home"
              });
            })
            .catch(err => {
              this.$toast({
                message: res.data.message,
                iconClass: "icon icon-success"
              });
            });
        })
        .catch(err => {
          console.log(err);
          this.$toast({
            message: err.message,
            iconClass: "icon icon-success"
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
#login {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("../assets/img/BG.png");
  background-size: 100% 100%;
  padding: 186px 100px 0;
  box-sizing: border-box;
  overflow: hidden;
  .head-wrap {
    position: relative;
    .logo {
      width: 242px;
      height: 286px;
      background: url("../assets/img/icon_logo.png");
      background-size: 100% 100%;
      margin: 0 auto;
    }
    .talk {
      position: absolute;
      top: 320px;
      right: -90px;
      background: url("../assets/img/icon_kf.png");
      background-size: 100% 100%;
      width: 90px;
      height: 90px;
    }
  }
  .form-item-box {
    position: relative;
    &:first-of-type {
      margin-top: 130px;
      padding-bottom: 40px;
    }
    &:nth-of-type(2) {
      padding-bottom: 36px;
    }

    .form-item-wrap {
      display: flex;
      align-items: center;
      height: 56px;
      border-bottom: 1px solid #303241;
      &.active {
        border-bottom: 1px solid #00b07c;
      }
      .icon {
        width: 30px;
        height: 40px;
      }
      .icon-name {
        background: url("../assets/img/icon_name.png");
        background-size: 100% 100%;
      }
      .icon-name2 {
        background: url("../assets/img/icon_name2.png");
        background-size: 100% 100%;
      }
      .icon-private {
        background: url("../assets/img/icon_private.png");
        background-size: 100% 100%;
      }
      .icon-private2 {
        background: url("../assets/img/icon_private2.png");
        background-size: 100% 100%;
      }
      .minus {
        color: #7c818e;
        padding: 0 38px 0 30px;
        font-size: 16px;
      }
      .select-num {
        width: 51px;
        height: 33px;
        font-size: 24px;
        color: #c5c9e2;
      }
      .triangle-wrap {
        font-size: 0;
        padding: 31px 38px 29px 10px;
        .triangle {
          display: inline-block;
          width: 26px;
          height: 14px;
          background: url("../assets/img/icon_touch.png");
          background-size: 100% 100%;
        }
      }
      & > input {
        font-size: 24px;
        background: transparent;
        border: none;
        outline: none;
        color: #c5c9e2;
      }
      input::-webkit-input-placeholder {
        color: #4f4e60;
        font-size: 24px;
      }
    }
    .tip {
      position: absolute;
      bottom: 0px;
      font-size: 20px;
      left: 0;
      color: #00b07c;
    }
  }

  .form-item-bottom {
    display: flex;
    justify-content: space-between;
    height: 28px;
    line-height: 28px;
    color: #4f4e60;
    font-size: 20px;
    & > label {
      display: flex;
      align-items: center;
      & > input {
        display: none;
      }
      .box {
        width: 18px;
        height: 18px;
        border: 1px solid #4f4e60;
        border-radius: 2px;
        margin-right: 10px;
      }
      .checked-box {
        width: 18px;
        height: 18px;
        background: url("../assets/img/duigou.png");
        border: 1px solid #01b07d;
        border-radius: 2px;
        background-size: 100% 100%;
        margin-right: 10px;
      }
    }
  }
  .mint-button {
    margin-top: 112px;
    width: 550px;
    height: 80px;
    color: #c5c9e2;
    font-size: 24px;
    line-height: 80px;
    background: #212c33;
    border: 1px solid #00e7a3;
    &.active {
      color: #fff;
      background: #00b07c;
    }
  }

  .register {
    color: #7c7f8f;
    text-align: center;
    margin-top: 40px;
    font-size: 20px;
    .click-register {
      color: #01b07d;
      font-size: 20px;
      cursor: pointer;
      text-decoration: underline;
    }
  }
  .agreement {
    position: absolute;
    bottom: 40px;
    left: 0;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    color: #7c7f8f;
    font-size: 16px;
    & > span {
      color: #01b07d;
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
