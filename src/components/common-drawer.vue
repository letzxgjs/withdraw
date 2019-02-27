<template>
  <drawer
    width="500px;"
    :drawer-style="{'background-color':'#2b2d3b'}"
    :show.sync="drawerVisibility"
  >
    <div slot="drawer" class="drawer-content">
      <div class="drawer-head">
        <div class="top">
          <div class="avatar">
            <img src="../assets/img/icon_头像.png">
          </div>
          <div class="name">
            {{realName}}
            <span @click="goPersonal">
              <img src="../assets/img/icon_bianji.png">&nbsp;修改
            </span>
          </div>
          <div class="over">
            余额
            <span class="line"></span>
            <span class="money">{{coin}}</span>
          </div>
        </div>
        <div class="btn-wrap">
          <x-button>提款</x-button>
          <x-button>存款</x-button>
        </div>
      </div>
      <div class="drawer-list">
        <ul>
          <li @click="goAccountDetails">
            <span class="placeholder"></span>
            <img src="../assets/img/icon_账户明细.png">
            <span>账户明细</span>
            <badge v-if="0"></badge>
          </li>
          <li @click="goHistoricalQuiz">
            <span class="placeholder"></span>
            <img src="../assets/img/icon_进行中.png">
            <span>历史竞猜</span>
            <badge v-if="0"></badge>
          </li>
          <li>
            <span class="placeholder"></span>
            <img src="../assets/img/icon_活动.png">
            <span>活动</span>
            <badge v-if="hasActive"></badge>
          </li>
          <li @click="goMessage">
            <span class="placeholder"></span>
            <img src="../assets/img/icon_消息.png">
            <span>消息</span>
            <badge v-if="hasMessage"></badge>
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="icon-wrap">
          <div class="icon-item">
            <div class="icon-item-wrap">
              <img src="../assets/img/icon_成为代理.png">
            </div>
            <div class="icon-name">成为代理</div>
          </div>
          <div class="icon-item">
            <div class="icon-item-wrap">
              <img src="../assets/img/icon_关于我们.png">
            </div>
            <div class="icon-name">关于我们</div>
          </div>
          <div class="icon-item">
            <div class="icon-item-wrap">
              <img src="../assets/img/icon_联系客服.png">
            </div>
            <div class="icon-name">联系客服</div>
          </div>
        </div>
        <div class="rule">
          <span class="placeholder"></span>
          <span>用户条款与玩法规则&nbsp;</span>
          <img src="../assets/img/icon_touch_right.png">
        </div>
      </div>
    </div>
    <slot></slot>
  </drawer>
</template>

<script>
import { XButton, Badge } from "vux";
import { mapState } from "vuex";
export default {
  data: function() {
    // 页面数据
    return {
      drawerVisibility: true,
      showMenu: true
    };
  },
  components: { XButton, Badge },
  // js 初始化完毕
  created: function() {},
  // html 初始化完毕
  mounted: function() {
    console.log(this.realName);
  },
  computed: {
    ...mapState({
      realName: state => state.user.realName,
      coin: state => state.user.coin,
      hasActive: state => state.user.hasActive,
      hasMessage: state => state.user.hasMessage
    })
  },
  methods: {
    showDrawer() {
      this.drawerVisibility = true;
    },
    goAccountDetails() {
      this.$router.push({
        name: "account-details"
      });
    },
    goHistoricalQuiz() {
      this.$router.push({
        name: "historical-quiz"
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
.vux-drawer {
  background: #2b2d3b;
  & > .vux-drawer-content {
    background: #2b2d3b;
  }
  .drawer-content {
    width: 500px;
    background: #2b2d3b;
    .drawer-head {
      width: 100%;
      height: 440px;
      background: #21222b;
      .top {
        height: 321px;
        background: #17181f;
        border-bottom-right-radius: 50% 15%;
        border-bottom-left-radius: 50% 15%;
        overflow: hidden;
        .avatar {
          width: 85px;
          height: 85px;
          margin: 112px auto 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          line-height: 50px;
          height: 50px;
          color: #c5c9e2;
          letter-spacing: 1.2px;
          text-align: center;
          span {
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #6d6f7b;
            letter-spacing: 1.54px;
            img {
              width: 12.4px;
              height: 12.4px;
            }
          }
        }
        .over {
          font-family: PingFangSC-Regular;
          font-size: 22px;
          line-height: 50px;
          height: 50px;
          color: #c5c9e2;
          letter-spacing: 1.1px;
          text-align: center;
          .money {
            font-size: 22px;
            color: #00e7a3;
            letter-spacing: 1.1px;
          }
          .line {
            display: inline-block;
            width: 1px;
            height: 13px;
            background: #4f4e60;
            margin: 0 10px;
          }
        }
      }
      .btn-wrap {
        height: 119px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 30px;
        button.weui-btn,
        input.weui-btn {
          width: 156px;
          height: 54px;
          border: 1px solid #2b2d3b;
          border-radius: 4px;
          font-size: 24px;
          line-height: 54px;
          color: #c5c9e2;
          background: transparent;
          padding: 0;
          margin: 0;
        }
      }
    }
    .drawer-list {
      padding: 10px 30px;
      ul {
        width: 100%;
        li {
          width: 100%;
          height: 100px;
          line-height: 100px;
          border-bottom: 1px solid #373949;
          &:last-of-type {
            border-bottom: none;
          }
          img {
            width: 34px;
            height: 34px;
            vertical-align: middle;
          }
          span {
            font-size: 26px;
            color: #c5c9e2;
            letter-spacing: 1px;
            vertical-align: middle;
          }
          .vux-badge {
            margin-top: -30px;
            margin-left: -15px;
            width: 4px;
            height: 4px;
          }
        }
      }
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      .icon-wrap {
        display: flex;
        justify-content: space-around;
        padding: 0 30px;
        .icon-item {
          .icon-item-wrap {
            text-align: center;
            img {
              width: 70px;
              height: 70px;
            }
          }
        }
      }
      .icon-name {
        font-size: 20px;
        color: #c5c9e2;
        letter-spacing: 0.77px;
      }
      .rule {
        height: 100px;
        line-height: 100px;
        font-size: 20px;
        color: #6d6f7b;
        letter-spacing: 0.77px;
        text-align: center;
        margin-top: 40px;
        & > img {
          width: 12px;
          height: 20px;
          vertical-align: middle;
        }
        & > span {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
