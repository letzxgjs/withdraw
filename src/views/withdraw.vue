<template>
  <div id="bindbanks">
    <mt-header fixed title="绑定银行卡">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="form-wrap">
      <div class="form-header"><span>持卡人姓名</span><span class="client-name">三千水</span></div>
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 1}">
          <div class="title">卡号</div>
          <div class="minus">-</div>
          <input
          @click="currentInput=1"
          >
        </div>
        <!-- <div class="tip">{{ regListTil.oldPasswordTil }}</div> -->
      </div>
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 2}">
          <div class="title">选择银行</div>
          <div class="minus">-</div>
          <input
            readonly
            placeholder="请选择客户银行"
            @click="currentInput=2"
            v-model="bankSelected"
          >
          <div class="select-bank" @click="show">
            <img src="../assets/img/icon_touch_right.png">
          </div>
        </div>
        <!-- <div class="tip">{{ regListTil.passwordTil }}</div> -->
      </div>
      <mt-button :disabled="ableBtn" :class="{'active':!ableBtn}" @click="confirm">确认</mt-button>
      <div class="attention">*持卡人姓名必须和当前绑定的银行卡名字一致</div>
    </div>
    <div  @click="selecting">
      <popup-radio class="popup" ref="showPopUp" :options="options" v-model="option">
        <p slot="popup-header" class="popup-header vux-1px-b demo3-slot">
          <span class="pleaseSelect">请选择开户银行</span>  
        </p>
      </popup-radio>
    </div>
  </div>
</template>

<script>
import { mPassword } from "@/api/user.js";
import { mapState } from "vuex";
import { PopupRadio } from 'vux'
export default {
  name: "bindbanks",
  data() {
    return {
      form: {
        oldpwd: "",
        pwd: ""
      },
      checkpwd: "",
      disableBtn: true,
      regListTil: {
        oldPasswordTil: "",
        passwordTil: "",
        verifyPasswordTil: ""
      },
      currentInput: -1, 
      // showBanks: false, 
      bankSelected: '', 
      options: ['中国建设银行', '中国民生银行', '中国农业银行', '中国邮政储蓄银行'], 
      option: ''
    };
  },
  components: {
    PopupRadio
  }, 
  computed: {
    ...mapState({
      token: state => state.user.token
    }),
    ableBtn() {
      let assistNum = 0;
      if (this.form.oldpwd >= 8) {
        assistNum++;
      }
      if (this.form.pwd >= 8) {
        assistNum++;
      }
      if (this.checkpwd.length >= 8 && this.form.pwd === this.checkpwd) {
        assistNum++;
      }
      if (assistNum === 3) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    show() {
      this.$refs.showPopUp.show()
    }, 
    hide() {
      this.$refs.showPopUp.hide()
    }, 
    selecting() {
      console.log(this.$refs.showPopUp.value)
      this.bankSelected = this.$refs.showPopUp.value
    },
    back() {
      this.$router.go(-1);
    },
    // 检验表单
    checkInput(value) {
      this.$nextTick(function() {
        if (value === 2) {
          let val = this.form.oldpwd;
          if (!/^[A-Za-z0-9]{8,12}$/.test(val)) {
            if (!val.length) {
              this.regListTil.oldPasswordTil = "";
            } else {
              this.regListTil.oldPasswordTil = "请输入8-20位英文或数字";
            }
          } else {
            this.regListTil.oldPasswordTil = "";
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
              //this.registerList.verifyPassword = val2.slice(0, val2.length - 1);
            }
          } else {
            this.regListTil.verifyPasswordTil = "";
          }
        }
      });
    },
    confirm() {
      let data = {
        beforePassword: this.form.oldpwd,
        newPassword: this.form.pwd,
        surePassword: this.checkpwd,
        authorization: this.token
      };
      mPassword(data).then(res => {
        console.log(res.data);
        if (res.data.code === "0000") {
          this.$toast({
            message: res.data.message,
            iconClass: "icon icon-success"
          });
        } else {
          this.$toast({
            message: res.data.message,
            iconClass: "icon icon-error"
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
#bindbanks {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #21222b;
  background-size: 100% 100%;
  // padding: 0 50px;
  box-sizing: border-box;
  overflow: hidden;
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
  .form-wrap {
    position: relative;
    top: 88px;
    margin: 10px;
    margin-bottom: 0;
    border-radius: 10px;
    .form-header {
      position: relative;
      // margin-top: 130px;
      padding: 0 40px;
      height: 96px;
      line-height: 96px;
      background: #17181f;
      font-family: "PingFangSC-Regular";
      font-size: 24px;
      color: #C5C9E2;
      letter-spacing: 1px;
      // border: 1px #17181f solid;
      .client-name {
        display: inline-block;
        margin-left: 60px;
        color: #ffffff;
        letter-spacing: 2.48px;
      }
    }
    .form-item-box {
      position: relative;
      margin-top: 20px;
      // padding-bottom: 50px;
      background: #21222B;
      & > .form-item-wrap {
        margin: 0 40px;
        display: flex;
        align-items: center;
        height: 96px;
        line-height: 56px;
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
          display: inline-block;
          height: 56px;
          line-height: 56px;
        }
        input::-webkit-input-placeholder {
          color: #4f4e60;
          font-size: 24px;
        }
        .select-bank {
          position: absolute;
          right: 52px;
          top: 22px;
          width: 48px;
          height: 48px;
          border: 1px;
          img {
            position: absolute;
            height: 24px;
            top: 12px;
            right: 12px;
            // line-height: 100%;
            // vertical-align: center;
          }
          // .banksToSelect {
          //   position: fixed;
          //   bottom: 0;
          // }
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
      margin-left: 90px;
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
    .attention {
      margin-top: 20px;
      height: 30px;
      line-height: 30px;
      font-size: 22px;
      color: #4F4E60;
      letter-spacing: 0.92px;
      text-align: center;
    }
  }
  .popup {
    .vux-cell-value {
      display: none;
    }
  }
  .banksToSelect {
            position: fixed;
            bottom: 0;
          }
}
.vux-popup-dialog {
  background: #2B2D3B !important;
  .popup-header {
    height: 80px;
    line-height: 80px;
    padding: 0 30px;
    font-size: 24px;
    color: #7C7F8F;
    letter-spacing: 1px;
    border-bottom: 1px solid #404358;
  }
  .weui-cell {
    height: 80px;
    line-height: 80px;
    padding: 0 30px;
    border: 0 !important;
    font-size: 26px;
    color: #C5C9E2;
  }
}
</style>
