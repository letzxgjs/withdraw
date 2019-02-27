<template>
  <div id="modify-name">
    <mt-header fixed title="修改昵称">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
      <mt-button 
        :disabled="!form.name" 
        :class="{'active':form.name}"
        slot="right" 
        @click="back" 
        class="done">
      完成
      </mt-button>
    </mt-header>
    <div class="form-wrap">
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 1}">
          <input
            placeholder=""
            @focus="currentInput=1"
            @blur="currentInput=-1"
            :maxlength='20'
            v-model="form.name"/>
        </div>
        <div class="tip">好名字为你带来惊喜好运</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modify-name",
  data() {
    return {
      form: {
        name: ""
      },
      currentInput: -1
    };
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
#modify-name {
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
    .mint-button {
      i {
        font-size: 40px;
        margin-left: 48px;
      }
    }
    .done {
      padding: 0 30px;
      font-size: 26px;
      letter-spacing: 2.31px;
      text-align: center;
      color: #4f4e60;
    }
    .active {
      color: #00b07c;
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
        &.active {
          border-bottom: 1px solid #00b07c;
          .title {
            color: #00b07c;
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
          color: #4f4e60;
          font-size: 24px;
        }
      }
      .tip {
        position: absolute;
        bottom: 0;
        font-size: 20px;
        left: 0;
        color: #4f4e60;
        letter-spacing: 0.77px;
      }
    }
  }
}
</style>
