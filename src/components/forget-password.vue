<template>
  <div id="register">
    <mt-header fixed title="忘记密码">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="form-wrap">
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 0}">
          <div class="title">手机号码</div>
          <div class="minus">-</div>
          <div class="select-num">{{form.mobileArea}}</div>
          <div class="triangle-wrap" @click="sheetVisible=true">
            <div class="triangle"></div>
          </div>
          <input
            placeholder="请输入注册手机号"
            :maxlength='11'
            @input='checkInput(1)'
            @focus="currentInput=0"
            @blur="currentInput=-1"
            ref='input1'
            v-model="form.mobile"/>
        </div>
        <div class="tip">{{ regListTil.usernameTil }}</div>
      </div>
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 1}">
          <div class="title">验证码</div>
          <div class="minus">-</div>
          <input
            placeholder="请输入验证码"
            @input='checkInput(2)'
            @focus="currentInput=1"
            @blur="currentInput=-1"
            v-model="form.verificationCode"/>
          <mt-button v-if='validate.countDown' @click="setCountDown" :disabled='disableBtn'>获取验证码</mt-button>
          <mt-button v-if='!validate.countDown' disabled>{{ validate.count }}s</mt-button>
        </div>
        <div class="tip">{{ regListTil.vercodeTil }}</div>
      </div>
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 2}">
          <div class="title">登录密码</div>
          <div class="minus">-</div>
          <input
            placeholder="请输入密码"
            @input='checkInput(3)'
            @focus="currentInput=2"
            @blur="currentInput=-1"
            :maxlength='20'
            v-model="form.pwd"/>
        </div>
        <div class="tip">{{ regListTil.passwordTil }}</div>
      </div>
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 3}">
          <div class="title">确认密码</div>
          <div class="minus">-</div>
          <input
            placeholder="请再次确认密码"
            @input='checkInput(4)'
            @focus="currentInput=3"
            @blur="currentInput=-1"
            :maxlength='20'
            v-model="checkpwd"/>
        </div>
        <div class="tip">{{ regListTil.verifyPasswordTil }}</div>
      </div>
      <mt-button :disabled="ableBtn" :class="{'active':!ableBtn}">确认</mt-button>
    </div>
    <mt-actionsheet
      :actions="actions"
      v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>

<script>
  import { sendMessage } from "@/api/user";
  export default {
    name: "register",
    data() {
      return {
        form: {
          mobile: "",
          mobileArea: "+86",
          verificationCode: "",
          pwd: ""
        },
        checkpwd: "",
        validate: {
          countDown: true,
          count: 60
        },
        disableBtn: true,
        regListTil: {
          realName: "",
          usernameTil: "",
          passwordTil: "",
          verifyPasswordTil: "",
          vercodeTil: ""
        },
        sheetVisible: false,
        actions: [
          { name: "+86", method: this.selectMobileArea },
          { name: "+93", method: this.selectMobileArea }
        ],
        currentInput: -1
      };
    },
    computed: {
      ableBtn() {
        let assistNum = 0;
        if (
          this.form.mobile.length === 11 &&
          this.regListTil.usernameTil === ""
        ) {
          assistNum++;
        }
        if (this.form.pwd >= 8) {
          assistNum++;
        }
        if (this.checkpwd.length >= 8 && this.form.pwd === this.checkpwd) {
          assistNum++;
        }
        if (this.form.verificationCode.length === 6) {
          assistNum++;
        }
        if (assistNum === 4) {
          return false;
        } else {
          return true;
        }
      }
    },
    methods: {
      back() {
        this.$router.push({
          name: "login"
        });
      },
      // 检验手机号
      checkInput(value) {
        // value:1账号登录 2验证码登录
        this.$nextTick(function() {
          if (value === 0) {
            let val = this.form.realName;
            if (val) {
              this.regListTil.realName = "";
            } else {
              this.regListTil.realName = "请输入真实姓名";
            }
          }
          if (value === 1) {
            console.log(value);
            let val = this.form.mobile;
            if (!/^1[34578]\d{9}$/.test(val)) {
              this.disableBtn = true;
              console.log(2);
              if (!val.length) {
                this.regListTil.usernameTil = "请输入手机号";
              } else if (val.length >= 11) {
                this.registerList.username = val.slice(0, 11);
                this.disableBtn = false;
              } else {
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
              this.regListTil.usernameTil = "";
              this.disableBtn = false;
              //     this.assiantBtnNum1 = 1;
              //   } else {
              //     this.regListTil.usernameTil = res.message;
              //   }
              // });
            }
          }
          if (value === 2) {
            let val = this.form.verificationCode;
            if (val.length < 6) {
              this.regListTil.vercodeTil = "请输入短信验证码";
              // this.checkVarCodeDone = false;
            } else if (val.length > 6) {
              this.registerList.vercode = val.slice(0, 6);
              this.regListTil.vercodeTil = "";
            } else {
              this.regListTil.vercodeTil = "";
              //  this.checkVarcode()
            }
          }
          if (value === 3) {
            let val = this.form.pwd;
            if (!/^[A-Za-z0-9]{8,12}$/.test(val)) {
              if (!val.length) {
                this.regListTil.passwordTil = "";
              } else {
                this.regListTil.passwordTil = "请输入8-20位英文或数字";
              }
            } else {
              this.regListTil.passwordTil = "";
            }
          }
          if (value === 4) {
            let val1 = this.form.pwd;
            let val2 = this.checkpwd;
            let re = new RegExp(
              "[` {2}~!@#$^&*()=|{}':;',\\[\\].<·>/?~！@#￥……&*（）——|{}【《 》】‘；：”“'。，、？]"
            );
            if (val2) {
              if (val1 !== val2) {
                this.regListTil.verifyPasswordTil = "两次密码不一致";
              } else {
                this.regListTil.verifyPasswordTil = "";
              }
              if (re.test(val2)) {
                //                                this.registerList.verifyPassword = val2.slice(0, val2.length - 1);
              }
            } else {
              this.regListTil.verifyPasswordTil = "";
            }
          }
        });
      },
      // 发送验证码
      setCountDown() {
        // 获取验证码
        if (this.validate.countDown) {
          let data = {
            mobile: this.form.mobile,
            mobileArea: this.form.mobileArea.replace("+", "")
          };
          sendMessage(data).then(res => {
            if (res.code === "0000") {
              this.$toast({
                message: "操作成功",
                iconClass: "icon icon-success"
              });
            } else {
              this.$toast({
                message: "操作失败",
                iconClass: "icon icon-success"
              });
            }
          });
        }
        this.validate.countDown = false;
        setTimeout(() => {
          if (this.validate.count === 0) {
            this.validate.countDown = true;
            this.validate.count = 60;
            // if (!this.registerList.vercode) {
            //   this.regListTil.vercodeTil = "请输入验证码";
            // }
            return;
          } else {
            this.validate.count--;
          }
          this.setCountDown();
        }, 1000);
      },
      selectMobileArea(val) {
        this.form.mobileArea = val.name;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
  #register {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #21222b;
    background-size: 100% 100%;
    padding: 0 50px;
    box-sizing: border-box;
    overflow: hidden;
    .mint-header {
      background: #17181f;
      height: 88px;
      font-size: 30px;
      .mint-button{
        i{
          font-size: 40px;
          margin-left: 48px;
        }
      }
    }
    .form-wrap {
      .form-item-box {
        position: relative;
        &:first-of-type {
          margin-top: 130px;
        }
        padding-bottom: 50px;
        & > .form-item-wrap {
          display: flex;
          align-items: center;
          height: 72px;
          border-bottom: 1px solid #303241;
          .title {
            width: 100px;
            flex: 0 0 100px;
            font-size: 24px;
            color: #c5c9e2;
          }

          &.active {
            border-bottom: 1px solid #00b07c;
            .title {
              color: #00b07c;
            }
          }
          .minus {
            color: #7c818e;
            padding: 0 38px 0 30px;
            font-size: 16px;
          }
          .select-num {
            font-size: 24px;
            color: #c5c9e2;
          }
          .triangle-wrap {
            font-size: 0;
            padding: 1.3vw;
            .triangle {
              display: inline-block;
              width: 2.4vw;
              height: 1.3vw;
              background: url("../assets/img/icon_touch.png");
              background-size: 100% 100%;
            }
          }
          & > input {
            flex: 1;
            font-size: 30px;
            background: transparent;
            border: none;
            outline: none;
            color: #c5c9e2;
          }
          input::-webkit-input-placeholder {
            color: #4F4E60;
            font-size: 24px;
          }
          & > .mint-button {
            position: absolute;
            right: 0;
            bottom: 72px;
            font-size: 20px;
            width: 156px;
            height: 54px;
            background: transparent;
            border: 1px solid #01b07d;
            color: #c5c9e2;
          }
          .count-down {
            position: absolute;
            right: 0;
            bottom: 36px;
            font-size: 20px;
            width: 172px;
            height: 54px;
            line-height: 54px;
            text-align: center;
            // background: transparent;
            // border: 1px solid #01b07d;
            color: #c5c9e2;
          }
        }
        .tip {
          position: absolute;
          bottom: 0;
          font-size: 20px;
          left: 0;
          color: #00b07c;
        }
      }

      & > .mint-button {
        margin-top: 55px;
        margin-left: 50px;
        width: 550px;
        height: 80px;
        color: #c5c9e2;
        font-size: 28px;
        background: #212c33;
        border: 1px solid #01b07d;
        border-radius: 4px;
        &.active {
          color: #fff;
          background: #00e7a3;
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
        }
      }
    }
  }
</style>
