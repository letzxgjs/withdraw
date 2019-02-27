<template>
  <div id="account-details">
    <mt-header fixed title="账户明细">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <tab :custom-bar-width="'30px'">
      <tab-item @on-item-click="handler" selected>全部</tab-item>
      <tab-item @on-item-click="handler">存款</tab-item>
      <tab-item @on-item-click="handler">提款</tab-item>
      <tab-item @on-item-click="handler">优惠</tab-item>
    </tab>
    <div class="content">
      <div class="box-wrap">
        <h3>2018年12月25日 星期三</h3>
        <ul>
          <li class="line1">
            <span>存款-支付宝</span>
            <span>200.00</span>
          </li>
          <li>2018/12/26 16:08:01</li>
          <li>
            <span>订单号：273617382482472</span>
            <span class="status">待存款</span>
          </li>
        </ul>
      </div>
      <div class="box-wrap">
        <h3>2018年12月24日 星期二</h3>
        <ul>
          <li class="line1">
            <span>存款-微信</span>
            <span>200.00</span>
          </li>
          <li>2018/12/24 16:08:01</li>
          <li>
            <span>订单号：273617382482472</span>
            <span class="status">成功</span>
          </li>
        </ul>
      </div>
      <div class="box-wrap">
        <h3>2018年12月24日 星期二</h3>
        <ul>
          <li class="line1">
            <span>提款</span>
            <span>200.00</span>
          </li>
          <li>2018/12/24 16:08:01</li>
          <li>
            <span>订单号：273617382482472</span>
            <span class="status">提款中</span>
          </li>
        </ul>
      </div>
      <div class="box-wrap">
        <h3>2018年12月25日 星期三</h3>
        <ul>
          <li class="line1">
            <span>存款-支付宝</span>
            <span>200.00</span>
          </li>
          <li>2018/12/26 16:08:01</li>
          <li>
            <span>订单号：273617382482472</span>
            <span>已失效</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
export default {
  name: "account-details",
  data() {
    return {};
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    handler() {}
  },
  components: {
    Tab,
    TabItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/scss">
#account-details {
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
  .vux-tab-wrap {
    height: 80px;
    padding-top: 0;
    .vux-tab-container {
      height: 80px;
      .vux-tab {
        background: #17181f;
        height: 80px;
        .vux-tab-item {
          height: 80px;
          line-height: 80px;
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #ffffff;
          letter-spacing: 2.13px;
          text-align: center;
        }
      }
    }
  }
  .content {
    padding: 10px;
    .box-wrap {
      width: 100%;
      height: 240px;
      margin-bottom: 10px;
      background: #21222b;
      border-radius: 10px;
      padding: 0 25px;
      box-sizing: border-box;
      h3 {
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #7c7f8f;
        letter-spacing: 1px;
        text-align: center;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #303241;
      }
      ul {
        li {
          display: flex;
          justify-content: space-between;
          width: 100%;
          line-height: 40px;
          height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #7c7f8f;
          letter-spacing: 0.77px;
          .status {
            font-family: PingFangSC-Regular;
            font-size: 20px;
            color: #00e7a3;
            letter-spacing: 0.77px;
            text-align: right;
          }
        }
        .line1 {
          font-family: PingFangSC-Regular;
          font-size: 26px;
          line-height: 60px;
          height: 60px;
          color: #c5c9e2;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>
