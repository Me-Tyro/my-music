<template>
  <div class="secondnavbar-container">
    <div :class="['barItem', active == index ? 'bgcolor' : '']" v-for="(item, index) in SecondNavBarData" :key="index" @click="clickSecondBarItem(index)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondNavBar',
  props: {
    SecondNavBarData: {
      type: Array,
      default: []
    },
    currentTag: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    clickSecondBarItem(index) {
      this.active = index
      this.$emit('clickSecondBarItem', index)
    }
  },
  watch: {
    // 侦听 currentTag 中值的变化
    currentTag(newVal) {
      // findIndex: 数组中满足提供的测试函数的第一个元素的索引, 没有找到对应元素则返回-1
      this.active = this.SecondNavBarData.findIndex(item => item.name == newVal.name)
    }
  }
}
</script>

<style lang="less" scoped>
.secondnavbar-container {
  display: flex;
  height: 100%;
  align-items: center;
  font-size: 14px;
  color: #999;
  .barItem {
    margin-right: 8px;
    padding: 5px 8px;
    cursor: pointer;
  }
  .bgcolor {
    background-color: #fdf5f5;
    border-radius: 15px;
  }
}
</style>