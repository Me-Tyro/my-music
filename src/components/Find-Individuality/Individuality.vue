<template>
  <div class="individuality-container">
    <!-- 轮播图 -->
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in bannerData" :key="index">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend-songlist">
      <h2>推荐歌单<i class="el-icon-arrow-right"></i></h2>
      <div class="resong-body">
        <ul>
          <li v-for="(item, index) in musicList" :key="index" @click="dimenSions(item.id)">
            <img :src="item.picUrl" alt="">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Individuality',
  data() {
    return {
      // 轮播图
      bannerData: [],
      // 推荐歌单封面
      musicList: []
    }
  },
  created() {
    this.getBannerData()
    this.getMusicList()
  },
  methods: {
    // 获取轮播图数据
    async getBannerData() {
      const { data: res } = await this.$http('/api/banner')
      if (res.code !== 200) return
      this.bannerData = res.banners
    },
    // 获取推荐歌单封面数据
    async getMusicList() {
      const { data: res } = await this.$http('/api/personalized', { limit: 10 })
      this.musicList = res.result
    },

    // 点击回调歌单
    dimenSions(id) {
      // 跳转到 某个页面
      this.$router.push({ name: 'musicListDetail', params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 15px;
}
.el-icon-arrow-right {
  font-weight: 700;
}
.recommend-songlist {
  .resong-body {
    margin-top: 10px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        flex: 1;
        margin: 0 10px 15px 0;
        cursor: pointer;
        img {
          width: 180px;
          height: 170px;
          border-radius: 15px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
}
</style>