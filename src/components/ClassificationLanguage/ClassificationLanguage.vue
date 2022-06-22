<template>
  <div class="language-container">
    <div :class="['barItem', activeNum === index ? 'active': '']" v-for="(item, index) in SecondNavBarData" :key="index" @click="clickSecondBarItem(index)">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'ClassificationLanguage',
  props: {
    SecondNavBarData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      activeNum: 0
    }
  },
  methods: {
    clickSecondBarItem(index) {
      if (this.activeNum === index) return
      this.activeNum = index

      // 将点击事件发射出去 供使用改组件接收事件使用
      this.$emit('clickSecondBarItem', index)
    }
  }
}
</script>

<style lang="less" scoped>
.language-container {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 14px;
  .barItem {
    width: 50px;
    padding: 5px 3px;
    margin: 0 5px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    background-color: #fdf5f5;
    color: #ec4747;
    border-radius: 11px;
  }
}
</style>