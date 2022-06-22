<template>
  <div class="songlist-container">
    <!-- 精品歌单 -->
    <div class="songlist-products">
      <div class="products-content">
        <img :src="theFirstOfHighquality.coverImgUrl" alt="" class="products-bgimg">
        <div class="products-img">
          <img :src="theFirstOfHighquality.coverImgUrl" alt="">
        </div>
        <div class="products-text">
          <span>精品歌单</span>
          <div>{{theFirstOfHighquality.name}}</div>
        </div>
      </div>
    </div>
    <!-- 歌单列表 -->
    <div class="songlist-list">
      <div class="list-left">
        <sort-box :currentTag="currentTag" :sortList="sortList" @clickSortBoxItem="clickSortBoxItem"></sort-box>
      </div>
      <div class="list-right">
        <second-nav-bar :SecondNavBarData="hotTags" :currentTag="currentTag" @clickSecondBarItem="clickSecondBarItem"></second-nav-bar>
      </div>
    </div>
    <!-- 歌单数量 -->
    <list-card :listCardData="musicList.playlists" @sackplaylistset="sortedPlaylists"></list-card>
    <!-- 分页 -->
    <!-- 加上 v-if="musicList.playlists" 后就能将对应的第几页选上背景颜色，如果没有，那么选上背景颜色会消失 -->
    <div class="page" v-if="musicList.playlists">
      <el-pagination background layout="prev, pager, next" :total="musicList.total" :page-size="50" :current-page="page" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ListCard from '../ListCard/listCard.vue'
import SecondNavBar from '../SecondNavBar/secondNavBar.vue'
import SortBox from '../SortBox/sortBox.vue'

export default {
  name: 'SongList',
  data() {
    return {
      // 精品歌单
      theFirstOfHighquality: {},
      // 传值给 SortBox 的数据
      currentTag: {},
      // 歌单tag数据
      hotTags: [],
      // 分类 tag 数据
      sortList: [],
      // 歌单中所有的数量及数据
      musicList: {},
      page: 1
    }
  },
  created() {
    this.getTheFirstOfHighquality()
    this.getHotTag()
    this.getSortList()
    this.getMusicList()
  },
  methods: {
    // 获取精品歌单
    async getTheFirstOfHighquality() {
      const { data: res } = await this.$http('/api/top/playlist/highquality', { limit: 1 })
      if (res.code !== 200) return
      this.theFirstOfHighquality = res.playlists[0]
      // console.log(this.theFirstOfHighquality)
    },

    // 获取热门歌单tag数据
    async getHotTag() {
      const { data: res } = await this.$http('/api/playlist/hot')
      this.currentTag = res.tags[0]
      this.hotTags = res.tags
    },

    // 获取歌单分类数据（分类 tag 数据）
    async getSortList() {
      const { data: res } = await this.$http('/api/playlist/catlist')
      this.sortList = res.sub
      if (res.code !== 200) return
      // console.log(res)
    },

    // 请求歌单数据中的所有数量
    async getMusicList() {
      this.musicList = {}
      const { data: res } = await this.$http('/api/top/playlist', {
        cat: this.currentTag.name,
        offset: 50 * (this.page - 1)
      })
      if (res.code !== 200) return
      this.musicList = res
      console.log(res)
    },

    // 接收 sortBox 传过来的值
    clickSortBoxItem(item) {
      // console.log(item)
      this.currentTag = item
      this.page = 1
      this.getMusicList()
    },

    // 接收 SecondNavBar 组件传过来的数据
    clickSecondBarItem(index) {
      // console.log(this.hotTags[index])
      this.currentTag = this.hotTags[index]
      this.page = 1
      this.getMusicList()
    },

    // 接受来自 listCard 的回调
    sortedPlaylists(id) {
      // console.log(id)
      this.$router.push({ name: 'musicListDetail', params: { id } })
    },

    pageChange(page) {
      // console.log(e)
      this.page = page
      this.getMusicList()
      console.log(page)
    }
  },
  components: {
    SortBox,
    SecondNavBar,
    ListCard
  }
}
</script>

<style lang="less" scoped>
.songlist-container {
  display: flex;
  flex-direction: column;
  // 精品歌单
  .products-content {
    overflow: hidden;
    position: relative;
    display: flex;
    height: 180px;
    align-items: center;
    border-radius: 15px;
    z-index: -5;
    .products-bgimg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -999;
      // CSS3 filter(滤镜) 属性
      filter: blur(30px) brightness(70%);
    }
    .products-img {
      width: 150px;
      height: 150px;
      margin: 0 15px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
    .products-text {
      margin-left: 10px;
      color: #fff;
      margin-top: -30px;
      span {
        padding: 5px 20px;
        border: 1px solid #d59e54;
        border-radius: 15px;
        color: #d59e54;
      }
      div {
        font-size: 18px;
        margin-top: 20px;
        margin-left: -5px;
      }
    }
  }
  // 歌单列表
  .songlist-list {
    display: flex;
    margin: 20px 0 30px 0;
    justify-content: space-between;
  }
  // 分页
  .page {
    display: flex;
    justify-content: center;
  }
}
</style>