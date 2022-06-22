<template>
  <!-- 左侧导航栏 -->
  <div class="aside-container">
    <div @click="clickAside(1)" :class="current == 1 ? 'current': ''">
      <router-link to="/home/find">发现音乐</router-link>
    </div>
    <div @click="clickAside(2)" :class="current == 2 ? 'current': ''">
      <router-link to="/home/video">视频</router-link>
    </div>
    <div @click="clickAside(3)" :class="current == 3 ? 'current': ''">
      <router-link to="/home/collect">收藏</router-link>
    </div>
    <div @click="clickAside(4)" :class="current == 4 ? 'current': ''">
      <router-link to="/home/recommend">每日推荐</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data() {
    return {
      current: 1
    }
  },
  methods: {
    clickAside(current) {
      this.current = current
    }
  }
}
</script>

<style lang="less" scoped>
.aside-container {
  div {
    line-height: 45px;
    padding-left: 30px;
    margin: 5px 0;
    transition: all 0.5s;
    cursor: pointer;
  }
  a {
    display: block;
  }
  .current {
    background-color: #f6f6f7;
    font-weight: 700;
  }
  div:hover {
    background-color: #f6f6f7;
  }
}
</style>