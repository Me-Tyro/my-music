<template>
  <div class="singersList-container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-distance="200" :infinite-scroll-immediate="false" :infinite-scroll-delay="500">
    <div class="singersList-content" v-for="(item, index) in listCardData" :key="index" @click="clickListCardItem(item.id)">
      <div class="singersList-img">
        <img :src="item.img1v1Url" alt="">
      </div>
      <span>{{item.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingersList',
  props: {
    listCardData: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否展示上拉触底事件
    isLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 无限滚动是否可用(flase为不禁止，true为禁止)
      disabled: true
    }
  },
  methods: {
    clickListCardItem(id) {
      // console.log(id)
      this.$emit('clickListCardItem', id)
    },

    load() {
      // console.log('666')
      this.$emit('bottomLoad')
    }
  },
  watch: {
    // 侦听每次更新数据，触发事件
    listCardData() {
      if (this.isLoad) {
        if (this.listCardData !== 0) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.singersList-container {
  display: flex;
  flex-wrap: wrap;
  .singersList-content {
    width: 20%;
    margin-bottom: 30px;
    cursor: pointer;
    .singersList-img {
      width: 180px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
  }
}
</style>