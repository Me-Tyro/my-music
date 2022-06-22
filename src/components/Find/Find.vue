<template>
  <div class="find-container">
    <div class="find-top">
      <ul class="find-top-ul">
        <li :class="current == 1 ? 'current': ''" @click="clickFInd(1)">
          <router-link to="/home/find/individuality">个性推荐</router-link>
        </li>
        <li :class="current == 2 ? 'current': ''" @click="clickFInd(2)">
          <router-link to="/home/find/songlist">歌单</router-link>
        </li>
        <li :class="current == 3 ? 'current': ''" @click="clickFInd(3)">
          <router-link to="/home/find/ranking">排行榜</router-link>
        </li>
        <li :class="current == 4 ? 'current': ''" @click="clickFInd(4)">
          <router-link to="/home/find/singer">歌手</router-link>
        </li>
      </ul>
    </div>
    <div class="find-bottom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Find',
  data() {
    return {
      current: 1
    }
  },
  methods: {
    clickFInd(index) {
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
.find-container {
  padding-top: 80px;
  .find-top {
    width: 100%;
    padding: 5px 0 5px 35px;
    line-height: 45px;
    position: fixed;
    top: 70px;
    z-index: 999;
    background-color: #fff;

    a {
      display: block;
    }
    .current {
      font-size: 20px;
      font-weight: 700;
      border-bottom: 3px solid #e13e3e;
    }

    .find-top-ul {
      display: flex;
      width: 600px;

      li {
        padding: 0 10px;
      }
    }
  }
  .find-bottom {
    width: 93%;
    padding: 5px 35px 5px 35px;
  }
}
</style>