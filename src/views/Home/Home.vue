<template>
  <div class="home-container">

    <Head></Head>
    <div class="home-body">
      <!-- 左侧导航栏 -->
      <div class="home-left">
        <Aside></Aside>
      </div>
      <!-- 右侧内容区 -->
      <div class="home-right">
        <Main></Main>
      </div>
    </div>
    <bottom-play></bottom-play>
  </div>
</template>

<script>
import Head from '@/components/Head/Head.vue'
import Aside from '@/views/Aside/Aside.vue'
import Main from '@/views/Main/Main.vue'
import BottomPlay from '@/views/BottomPlay/BottomPlay.vue'

export default {
  name: 'Home',
  components: {
    Head,
    Aside,
    Main,
    BottomPlay
  }
}
</script>

<style lang="less" scoped>
.home-body {
  display: flex;
  .home-left,
  .home-right {
    float: left;
  }
  .home-left {
    width: 200px;
  }
  .home-right {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    height: 435px;
    border-left: 1px solid #ccc;
  }
}
</style>