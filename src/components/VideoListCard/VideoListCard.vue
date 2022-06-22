<template>
  <div class="videolistcard-tontainer">
    <div class="cardItem-content" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-distance="300" :infinite-scroll-immediate="false" :infinite-scroll-delay="500">
      <div class="cardItem" v-for="(item, index) in videoList" :key="index">
        <div class="cardItem-img">
          <img :src="item.imgurl" alt="">
        </div>
        <div class="cardItem-name">
          {{item.name}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'VideoListCard',
  props: {
    videoList: {
      type: Array,
      default: []
    },
    // 是否触底加载
    isLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      disabled: true
    }
  },
  methods: {
    load() {
      this.$emit('bottomLoad')
      this.disabled = true
    }
  },
  watch: {
    // 数据更新后，再次运行触发load事件
    videoList() {
      if (this.isLoad === true) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.videolistcard-tontainer {
  width: 99%;
  .cardItem-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .cardItem {
      width: 23%;
      margin: 20px 10px;
      cursor: pointer;
      img {
        width: 100%;
        height: 150px;
        border-radius: 15px;
      }
    }
  }
}
</style>