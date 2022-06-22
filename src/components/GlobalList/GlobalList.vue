<template>
  <div class="globalList-container">
    <div class="globalList-content" v-for="(item, index) in globalList" :key="index" @click="clearPlaylist(item.id)">
      <div class="globalList-img">
        <img :src="item.coverImgUrl" alt="">
      </div>
      <span class="globalList-text">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalList',
  props: {
    globalList: {
      type: Array,
      default: []
    }
  },
  methods: {
    clearPlaylist(id) {
      // console.log(id)
      this.$emit('clearPlaylist', id)
    }
  }
}
</script>

<style lang="less" scoped>
.globalList-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  .globalList-content {
    width: 20%;
    margin-bottom: 20px;
    cursor: pointer;
    .globalList-img {
      width: 180px;
      height: 180px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
  }
}
</style>