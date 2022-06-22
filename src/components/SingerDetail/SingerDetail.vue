<template>
  <div class="SingerDetail-container">
    <div class="SingerDetail-info">
      <div class="info-img">
        <img :src="singerInfo.cover" alt="">
      </div>
      <div class="info-title">
        <h2>{{singerInfo.name}}</h2>
        <div class="infoTitle-btn">
          <el-button round>收藏</el-button>
          <el-button round>个人主页</el-button>
        </div>
        <div class="infoTitle-num">
          <span>单曲数：{{singerInfo.musicSize}}</span><span>&nbsp;&nbsp;&nbsp;专辑数：{{singerInfo.albumSize}}</span><span>&nbsp;&nbsp;&nbsp;MV数：{{singerInfo.mvSize}}</span>
        </div>
      </div>
    </div>
    <div class="SingerDetail-musicList">
      <el-tabs value="first">
        <el-tab-pane label="专辑" name="first">
          <div class="topSongs">
            <!-- vue导入图片必须要 require 哦 -->
            <!-- 热门歌曲中 没有 歌单 id，所以我们只好用 传过来的 路由 id 作为此歌单的 id  -->
            <official-ranking :officialListDetailItem="SingerTopSongs" :cover="require('/src/assets/images/topSongsLogo.png')" :listId="this.$route.params.id" @handleRowDbClick="handleRowDbClick">
              <!-- 具名插槽 放到组件中的 -->
              <template #header>
                <h3>热门50首</h3>
              </template>
            </official-ranking>
          </div>
          <div class="albumItem" v-for="(item, index) in singerAlbum" :key="index">
            <official-ranking :officialListDetailItem="item.songsObj" :cover="item.album.blurPicUrl" :listId="item.album.id" @handleRowDbClick="handleRowDbClick">
              <template #header>
                <h3>{{item.album.name}}</h3>
              </template>
            </official-ranking>
          </div>

        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
          <video-list-card :videoList="singerMvInfo" :isLoad="true" @bottomLoad="bottomLoad"></video-list-card>
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="third">
          <div class="singerDesc">{{singerInfo.briefDesc}}</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import OfficialRanking from '../OfficialRanking/OfficialRanking.vue'
import { ircTimes } from '@/utils/utils.js'
import { mapMutations, mapState } from 'vuex'
import VideoListCard from '../VideoListCard/VideoListCard.vue'

export default {
  components: { OfficialRanking, VideoListCard },
  name: 'SingerDetail',
  data() {
    return {
      // 歌手信息
      singerInfo: {},
      // 热门50首
      SingerTopSongs: {},
      // 专辑的页码数
      albumPage: 1,
      // 歌手专辑
      singerAlbum: [],
      // MV 页码数
      videoPage: 1,
      // MV
      singerMvInfo: []
    }
  },
  created() {
    this.getSingerInfo()
    this.getSingerTopSongs()
    this.getAlbumInfo()
    this.getSingerMv()
  },
  computed: {
    ...mapState('m_music', ['musicListId'])
  },
  methods: {
    ...mapMutations('m_music', ['updateMiusicId', 'updateMusicList']),

    // 获取歌手信息
    async getSingerInfo() {
      console.log(this.$route.params.id)
      const { data: res } = await this.$http('/api/artist/detail', {
        id: this.$route.params.id
      })
      if (res.code !== 200) return
      this.singerInfo = res.data.artist
      console.log(res)
    },

    // 请求歌手热门50首歌曲
    async getSingerTopSongs() {
      const { data: res } = await this.$http('/api/artist/top/song', {
        id: this.$route.params.id
      })
      if (res.code !== 200) return
      let topSongs = res.songs
      // 改变数据中的事件
      topSongs.forEach((item, index) => {
        topSongs[index].dt = ircTimes(item.dt)
      })
      // topSongs改成对象，并向里面添加isOpen属性，用于点击查看列表所有歌曲
      this.SingerTopSongs = { topSongs, isOpen: false }
      console.log(res)
    },

    // 请求 MV
    async getSingerMv() {
      const { data: res } = await this.$http('/api/artist/mv', {
        id: this.$route.params.id,
        limit: 20 * this.videoPage
      })
      this.singerMvInfo = res.mvs
      console.log(res)
    },

    // 请求专辑列表
    async getAlbumInfo() {
      const { data: res } = await this.$http('/api/artist/album', {
        id: this.$route.params.id,
        limit: 20,
        offset: (this.albumPage - 1) * 20
      })

      // 把专辑列表中的每个 id 传值给 getAlbumDetail() 函数
      res.hotAlbums.forEach(item => {
        this.getAlbumDetail(item.id)
        // console.log(item.id)
      })
      // console.log(res)
    },

    // 请求专辑详情信息
    async getAlbumDetail(id) {
      // console.log(id)
      const { data: res } = await this.$http('/api/album', { id })
      // console.log(res)
      let songs = res.songs
      songs.forEach((item, index) => {
        songs[index].dt = ircTimes(item.dt)
      })

      // 向 res 中添加一个对象 songs songsObj(为对象名)，目的是不让 数据变为 观察者（Observer）模式
      res.songsObj = { songs }
      // console.log(res)
      this.singerAlbum.push(res)
      // console.log(this.singerAlbum)
    },

    // 自定义事件 来自 OfficialRanking 组件
    handleRowDbClick({ id, index, listId }) {
      console.log(id, index, listId)
      // 判断是否 为 热门歌单
      if (listId != this.$route.params.id) {
        let musicIndex = this.singerAlbum.findIndex(item => item.album.id === listId)
        // console.log(musicIndex)
        this.updateMiusicId(id)
        // 当歌单id发生变化
        if (this.musicListId !== listId) {
          this.updateMusicList({
            id: listId,
            tracks: this.singerAlbum[musicIndex].songs
          })
        }
      } else {
        this.updateMiusicId(id)
        if (this.musicListId !== listId) {
          this.updateMusicList({
            id: this.$route.params.id,
            tracks: this.SingerTopSongs.topSongs
          })
        }
      }
    },

    // 来自 VideoListCard
    bottomLoad() {
      this.videoPage += 1
      this.getSingerMv()
    }
  }
}
</script>

<style lang="less" scoped>
.SingerDetail-container {
  padding: 0 30px;
  .SingerDetail-info {
    padding: 25px 10px;
    display: flex;
    .info-img {
      width: 180px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
    .info-title {
      margin-left: 20px;
      h2 {
        margin: 12px 0 20px 0;
      }
      /deep/ .el-button {
        padding: 10px 23px;
      }
      /deep/ .el-button:hover {
        background-color: #f1f1f1;
        color: #606266;
        border: 1px solid #dcdfe6;
      }
      .infoTitle-num {
        font-size: 13px;
        color: #666666;
        margin-top: 15px;
      }
    }
  }
  .singerDesc {
    color: #4f4f4f;
    line-height: 30px;
    font-size: 15px;
    text-indent: 2em;
  }
}
</style>