<template>
  <div id="message">
    <mt-header fixed title="消息">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <div class="content">
      <divider>2018年1月8日 星期二</divider>
      <div class="box-wrap">
        <h3>新春大放送</h3>
        <div class="item-content">
          <div class="title">公告详情：</div>
          <div class="detail">
            <p>感谢广大用户对本平台的支持，为了回馈广大用户朋友。即日起平台每天为首次充值的用户准备了精美的礼品。</p>
            <p>欢迎前来领取。</p>
          </div>
          <div class="time">
            公告时间：2018年1月8日
          </div>
        </div>
      </div>
      <divider>2018年1月8日 星期二</divider>
      <div class="box-wrap">
        <h3>新春大放送</h3>
        <div class="item-content">
          <div class="title">公告详情：</div>
          <div class="detail">
            <p>感谢广大用户对本平台的支持，为了回馈广大用户朋友。即日起平台每天为首次充值的用户准备了精美的礼品。</p>
            <p>欢迎前来领取。</p>
          </div>
          <div class="time">
            公告时间：2018年1月8日
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Divider } from "vux";
export default {
  name: "message",
  data() {
    return {};
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  components: {
    Divider
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/scss">
#message {
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
  .content {
    .vux-divider {
      // height: 50px;
      // line-height: 50px;
      padding: 26px 170px;
      font-size: 18px;
      color: #7c7f8f;
      letter-spacing: 0.18px;
    }
    .box-wrap {
      width: 100%;
      background: #21222b;
      box-sizing: border-box;
      h3 {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #c5c9e2;
        letter-spacing: 0.24px;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #303241;
        padding: 0 51px;
      }
      .item-content {
        padding-bottom: 20px;
        & > div {
          font-size: 20px;
          color: #7c7f8f;
          letter-spacing: 0.2px;
          padding: 0 51px;
        }
        & > .title {
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          color: #c5c9e2;
          letter-spacing: 0.2px;
        }
        & > .detail {
          & > p {
            line-height: 30px;
          }
        }
        & > .time {
          height: 50px;
          line-height: 50px;
        }
      }
    }
  }
}
</style>
