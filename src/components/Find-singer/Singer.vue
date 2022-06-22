<template>
  <div class="singer-container">
    <div class="singer-content">
      <!-- 语种 -->
      <div class="selectors">
        <div class="selectorItem">
          <div class="title">语种:</div>
          <classification-language :SecondNavBarData="languageSort" @clickSecondBarItem="areaItem"></classification-language>
        </div>
        <div class="selectorItem">
          <div class="title">分类:</div>
          <classification-language :SecondNavBarData="typeSort" @clickSecondBarItem="typeItem"></classification-language>
        </div>
        <div class="selectorItem">
          <div class="title">筛选:</div>
          <classification-language :SecondNavBarData="initialSort" @clickSecondBarItem="initialSortItem"></classification-language>
        </div>
      </div>
      <!-- 歌手列表 -->
      <div class="listCardContainer">
        <singers-list :listCardData="singerList" isLoad @bottomLoad="bottomLoad" @clickListCardItem="clickListCardItem"></singers-list>
      </div>
    </div>
  </div>
</template>

<script>
import ClassificationLanguage from '../ClassificationLanguage/ClassificationLanguage.vue'
import SingersList from '../SingersList/SingersList.vue'
export default {
  components: { ClassificationLanguage, SingersList },
  name: 'Singer',
  data() {
    return {
      languageSort: [
        { area: -1, name: '全部' },
        { area: 7, name: '华语' },
        { area: 96, name: '欧美' },
        { area: 8, name: '日本' },
        { area: 16, name: '韩国' },
        { area: 0, name: '其它' }
      ],
      typeSort: [
        { type: -1, name: '全部' },
        { type: 1, name: '男歌手' },
        { type: 2, name: '女歌手' },
        { type: 3, name: '乐队' }
      ],
      initialSort: [
        { initial: -1, name: '热门' },
        { initial: 'a', name: 'A' },
        { initial: 'b', name: 'B' },
        { initial: 'c', name: 'C' },
        { initial: 'd', name: 'D' },
        { initial: 'e', name: 'E' },
        { initial: 'f', name: 'F' },
        { initial: 'g', name: 'G' },
        { initial: 'h', name: 'H' },
        { initial: 'i', name: 'I' },
        { initial: 'j', name: 'J' },
        { initial: 'k', name: 'K' },
        { initial: 'l', name: 'L' },
        { initial: 'm', name: 'M' },
        { initial: 'n', name: 'N' },
        { initial: 'o', name: 'O' },
        { initial: 'p', name: 'P' },
        { initial: 'q', name: 'Q' },
        { initial: 'r', name: 'R' },
        { initial: 's', name: 'S' },
        { initial: 't', name: 'T' },
        { initial: 'u', name: 'U' },
        { initial: 'v', name: 'V' },
        { initial: 'w', name: 'W' },
        { initial: 'x', name: 'X' },
        { initial: 'y', name: 'Y' },
        { initial: 'z', name: 'Z' },
        { initial: 0, name: '#' }
      ],
      area: -1,
      type: -1,
      initial: -1,
      // 当前所在的页面
      currentPage: 1,
      // 歌手数据
      singerList: [],
      // 是否还有更多数据
      isMore: false
    }
  },
  created() {
    this.getSingerList()
  },
  methods: {
    // 请求歌手列表数据
    async getSingerList() {
      const { data: res } = await this.$http('/api/artist/list', {
        type: this.type,
        area: this.area,
        initial: this.initial,
        offset: (this.currentPage - 1) * 30
      })
      // 每次向 singerList 中添加新数据（用扩展运算符），而不是直接赋值，直接赋值会导致页面数据一直刷新，而不是添加
      this.singerList.push(...res.artists)
      this.isMore = res.more
      console.log(res)
    },

    // 接收来自 语种 组件的数据
    areaItem(index) {
      console.log(this.languageSort[index].area)
      this.area = this.languageSort[index].area

      // 清空 singerList 中的数据
      this.singerList = []
      // 页数 为 1
      this.currentPage = 1
      // 再次调用 getSingerList 函数
      this.getSingerList()
    },

    // 接受来自 歌手 组件的回调
    typeItem(index) {
      console.log(this.typeSort[index].type)
      this.type = this.typeSort[index].type
      this.singerList = []
      this.currentPage = 1
      this.getSingerList()
    },

    // 接收来自 筛选 组件的回调
    initialSortItem(index) {
      console.log(this.initialSort[index].initial)
      this.initial = this.initialSort[index].initial
      this.singerList = []
      this.currentPage = 1
      this.getSingerList()
    },

    // 接收来自 歌手封面的 id 并跳转
    clickListCardItem(id) {
      this.$router.push({ name: 'SingerDetail', params: { id } })
    },

    // 上拉触底事件
    bottomLoad() {
      console.log('触底')
      if (this.isMore) {
        this.currentPage += 1
        this.getSingerList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.selectors {
  margin-bottom: 30px;
  .selectorItem {
    display: flex;
    color: #676767;
    margin: 0 0 10px 0;
    .title {
      width: 40px;
      line-height: 33px;
    }
  }
}
</style>