<template>
  <div class="listcard-container">
    <div class="listcard-content" v-for="(item, index) in listCardData" :key="index" @click="clickListCardItem(item.id)">
      <div class="listcard-img">
        <img :src="item.coverImgUrl" alt="">
      </div>
      <span class="listcard-text">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListCard',
  props: {
    listCardData: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取, 不这样写会警告, 具体可以看 vue手册
      default: function () {
        return []
      }
    }
  },
  methods: {
    clickListCardItem(id) {
      this.$emit('sackplaylistset', id)
    }
  }
}
</script>

<style lang="less" scoped>
.listcard-container {
  display: flex;
  flex-wrap: wrap;
  .listcard-content {
    width: 20%;
    margin-bottom: 20px;
    cursor: pointer;
    .listcard-img {
      width: 175px;
      height: 175px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
    span {
      display: block;
      width: 175px;
      font-size: 14px;
    }
  }
}
</style>