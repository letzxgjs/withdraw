<template>
  <div id="historical-quiz">
    <mt-header fixed title="历史竞猜">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <tab :custom-bar-width="'30px'">
      <tab-item @on-item-click="handler" selected>未结算</tab-item>
      <tab-item @on-item-click="handler">已结算</tab-item>
    </tab>
    <div class="content">
      <div>
        <div v-if="records.length=='0'" class="no-records">
          <div class="tip">您还没有任何记录，去玩一把试试手气吧！</div>
          <mt-button>去下注</mt-button>
        </div>
        <ul v-else class="records">
          <li class="records-item" v-for="item in records" :key="item.id">
            <div class="records-header" :class="{'active':item.showDetail}">
              <div class="header-img">
                <img width="20" height="20" src="../assets/img/1550366120.jpg">
              </div>
              <div class="header-detail">
                <div class="detail-line1">
                  <span>{{item.betOrderDetails[0].groupName}}</span>
                  <!-- <span>IG让分-1.5</span> -->
                </div>
                <div class="detail-line2">
                  <span>{{item.updateTime}}</span>
                  <span>投注金额 {{item.amount}}</span>
                </div>
              </div>
              <div class="header-count">
                <span>预计返还</span>
                <span class="count-num">{{item.estimatedReward}}</span>
                <span class="arrow" @click="item.showDetail=!item.showDetail">
                  <span
                    v-show="item.showDetail===false"
                    class="iconfont icon-zelvxuanzefeiyongdaosanjiaoxingfandui"
                  ></span>
                  <span
                    v-show="item.showDetail===true"
                    class="iconfont icon-zelvxuanzefeiyongzhengsanjiaoxingzhichi"
                  ></span>
                </span>
              </div>
            </div>
            <div class="records-detail" v-show="item.showDetail">
              <div v-for="it in item.betOrderDetails[0].gameResultList" :key="it.id">
                <div class="detail-header" v-if="item.betOrderDetails[0].gameResultList.length>1">
                  <div class="header-img">
                    <img width="20" height="20" src="../assets/img/1550366120.jpg">
                  </div>
                  <div class="header-title">
                    <span>{{it.groupName}}</span>
                    <!-- <span>IG让分-1.5</span> -->
                  </div>
                </div>
                <div class="detail-content">
                  <div class="con-item">
                    <span>{{it.teams[0].abbr}} VS {{it.teams[1].abbr}}</span>
                    <span>全场 赛前</span>
                  </div>
                  <div class="con-item">比赛时间：{{it.startTime}}</div>
                  <div class="con-item">赔率：1.8</div>
                  <div class="result" v-if="item.winLose!='NOTOPEN'">
                    <img
                      v-if="item.winLose=='win'"
                      width="36"
                      height="42"
                      src="../assets/img/icon_中奖.png"
                    >
                    <img v-else width="36" height="42" src="../assets/img/icon_未中奖.png">
                  </div>
                </div>
              </div>

              <div class="detail-footer">
                <div class="dividing-line"></div>
                <div class="fo-item title">
                  <span v-if="item.betOrderDetails.length===1">单注</span>
                  <span v-else>{{item.betOrderDetails.length}}串1</span>
                </div>
                <div class="fo-item">投注金额：{{item.amount}}</div>
                <div class="fo-item">订单号：{{item.tenantOrderNo}}</div>
                <div class="result fail" v-if="item.status=='FAIL'">失败</div>
                <div class="result unsettled" v-if="item.status=='UNSETTLED'">未结算</div>
                <div class="result settled" v-if="item.status=='SETTLED'">已结算</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, TabItem } from "vux";
import { orderlist } from "@/api/data.js";
export default {
  name: "historical-quiz",
  data() {
    return {
      records: [],
      searchCount: "",
      currentIndex: 0
    };
  },
  computed: {},
  mounted() {
    this.orderlist(0);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    orderlist(val) {
      orderlist({ type: val }).then(res => {
        if (res.data.code === "0000") {
          res.data.data.records.map(item => {
            item.showDetail = false;
          });
          this.records = res.data.data.records;
          this.searchCount = res.data.data.searchCount;
        }
      });
    },
    handler(val) {
      this.orderlist(val);
      this.currentIndex = val;
    }
  },
  components: {
    Tab,
    TabItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" type="text/scss">
@import url("../assets/icon/iconfont.css");
#historical-quiz {
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
    height: calc(100% - 84px);
    box-sizing: border-box;
    overflow: auto;
    .no-records {
      text-align: center;
      .tip {
        text-align: center;
        font-size: 24px;
        margin: 90px 0;
        color: #7c7f8f;
      }
      & > .mint-button {
        width: 260px;
        height: 80px;
        color: #c5c9e2;
        font-size: 28px;
        background: #212c33;
        border: 1px solid #01b07d;
        border-radius: 4px;
      }
    }
    .records {
      .records-item {
        border-top: 1px solid #2b2d3b;
        box-sizing: border-box;
        font-size: 0;
        overflow: hidden;
        .records-header {
          display: flex;
          align-items: center;
          height: 120px;
          font-family: PingFangSC-Regular;
          background: #21222b;
          &.active {
            background: #17181f;
          }
          .header-img {
            width: 120px;
            text-align: center;
          }
          .header-detail {
            flex: 1;
            .detail-line1 {
              font-size: 24px;
              color: #c5c9e2;
              letter-spacing: 1.09px;
            }
            .detail-line2 {
              font-size: 18px;
              color: #7c7f8f;
              letter-spacing: 0.9px;
            }
          }
          .header-count {
            flex: 0 0 220px;
            width: 220px;
            font-size: 24px;
            color: #7c7f8f;
            letter-spacing: 0.77px;
            .count-num {
              color: #04be02;
            }
            .arrow {
              font-size: 0;
              overflow: hidden;
            }
          }
        }
        .records-detail {
          .detail-header {
            display: flex;
            align-items: center;
            height: 70px;
            font-family: PingFangSC-Regular;
            background: #1c1d25;
            .header-img {
              width: 120px;
              text-align: center;
            }
            .header-title {
              font-size: 24px;
              color: #c5c9e2;
              letter-spacing: 1.09px;
            }
          }
          .detail-content {
            position: relative;
            height: auto;
            padding: 20px 40px;
            .con-item {
              height: 30px;
              line-height: 30px;
              font-size: 20px;
              color: #7c7f8f;
              letter-spacing: 0.77px;
            }
            .result {
              position: absolute;
              right: 40px;
              top: 0;
            }
          }
          .detail-footer {
            position: relative;
            height: auto;
            padding: 20px 0;
            margin: 0 40px;
            .dividing-line {
              position: absolute;
              top: 0;
              height: 1px;
              width: 100%;
              border-top: 2px dashed #21222b;
            }
            .fo-item {
              height: 30px;
              line-height: 30px;
              font-size: 20px;
              color: #7c7f8f;
              letter-spacing: 0.77px;
              &.title {
                font-size: 20px;
                color: #c5c9e2;
                letter-spacing: 0.77px;
              }
            }
            .result {
              position: absolute;
              right: 0px;
              top: 20px;
              color: #7c7f8f;
              border: 1px solid #7c7f8f;
              font-size: 20px;
              width: 80px;
              height: 32px;
              line-height: 32px;
              text-align: center;
              &.settled {
                color: #04be02;
                border: 1px solid #04be02;
              }
            }
          }
        }
      }
    }
  }
}
</style>
