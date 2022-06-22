<template>
  <div class="sortbox-container">
    <el-popover placement="bottom-start" width="350" trigger="click" :visible-arrow="false" popper-class="sortPop" v-model="isShow">
      <div class="sortbox-title" slot="reference">
        {{currentTag.name}}<i class="el-icon-arrow-right"></i>
      </div>
      <div class="sortList">
        <div :class="['sortItme', currentTag.name == item.name ? 'current' : '']" v-for="(item, index) in sortList" :key="index" @click="clickItem(item)">{{item.name}}</div>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'SortBox',
  props: {
    currentTag: {
      type: Object,
      default: {}
    },
    sortList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // 是否展示
      isShow: false
    }
  },
  methods: {
    clickItem(item) {
      // console.log(item)
      this.$emit('clickSortBoxItem', item)
      this.isShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.sortbox-title {
  border: 1px solid #ddd;
  font-size: 14px;
  color: #999;
  padding: 5px 15px;
  border-radius: 15px;
  cursor: pointer;
}
.sortList {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  .sortItme {
    width: 25%;
    font-size: 12px;
    padding: 5px 0;
    margin: 5px 0;
    text-align: center;
    cursor: pointer;
  }
  .current {
    border-radius: 15px;
    background-color: #fcebeb;
  }
}
</style>