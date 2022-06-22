<template>
  <div class="head-container">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="">
    </div>
    <div class="search">
      <div class="icon-left" @click="goAhead">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="icon-right" @click="drawBack">
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="input">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="请输入内容">
      </div>
    </div>
    <div class="login">
      <img src="@/assets/images/test.jpg" alt="">
      <div>点击头像登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
  methods: {
    goAhead() {
      this.$router.go(-1)
    },
    drawBack() {
      this.$router.go(1)
    }
  }
}
</script>

<style lang="less" scoped>
.head-container {
  width: 100%;
  height: 70px;
  background-color: #ec4141;
  display: flex;
  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ec4141;
    z-index: 9999;
    img {
      width: 140px;
      height: 35px;
    }
  }
  .search {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: #ec4141;
    z-index: 9999;
    .icon-left,
    .icon-right {
      width: 30px;
      height: 30px;
      background-color: #e13e3e;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5px;
      cursor: pointer;
      i {
        color: aliceblue;
      }
    }
    .input {
      width: 170px;
      height: 30px;
      background-color: #e13e3e;
      border-radius: 15px;
      display: flex;
      margin-left: 5px;
      color: #fff;
      i {
        width: 40px;
        text-align: center;
        line-height: 30px;
        margin-right: -10px;
      }
      input {
        width: 130px;
        border: 0;
        outline: none;
        background-color: #e13e3e !important;
        color: #fff;
      }
      // 改变 placeholder 的颜色
      input::-webkit-input-placeholder {
        color: #fff;
      }
    }
  }
  .login {
    flex: 3;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: rgba(255, 255, 255, 0.85);
    z-index: 999;
    background-color: #ec4141;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
    div {
      margin-right: 100px;
    }
  }
}
</style>