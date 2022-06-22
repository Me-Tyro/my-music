<template>
  <div class="musiclistdetail-container" v-if="musicListDetail">
    <!-- 歌曲内容 -->
    <div class="mdetail-label">
      <!-- 图片 -->
      <div class="label-img">
        <img :src="musicListDetail.coverImgUrl" alt="" />
      </div>
      <!-- 标签 -->
      <div class="label-text">
        <div class="text-num">
          <span>歌单</span>
          <h1>{{ musicListDetail.name }}</h1>
        </div>
        <div class="text-num">
          <div><img :src="musicListDetail.creator.avatarUrl" alt="" /></div>
          <span>{{ musicListDetail.creator.nickname }}</span>
          <i>2019-12-23创建</i>
        </div>
        <div class="text-num">
          <el-button type="danger" round>播放全部</el-button>
          <el-button round>收藏</el-button>
          <el-button round>分享</el-button>
        </div>
        <div class="text-num">
          <span>标签:</span>
          <template v-if="musicListDetail.tags.length !== 0">
            <span v-for="(item, index) in musicListDetail.tags" :key="index">&nbsp;{{ item }}&nbsp;</span>
          </template>
          <span v-else>暂无标签</span>
        </div>
        <div class="text-num">
          <span>歌曲：{{ musicListDetail.trackCount }}&nbsp;&nbsp;</span><span>播放：{{ musicListDetail.playCount | playCount }}万</span>
        </div>
        <div class="text-num text-nums" v-if="musicListDetail.description">
          {{ musicListDetail.description }}
        </div>
        <div class="text-num" v-else>暂无简介</div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="mdetail-list">
      <el-tabs value="first">
        <el-tab-pane label="歌曲列表" name="first">
          <el-table :data="musicListDetail.tracks" style="width: 100%" size="mini" stripe @row-dblclick="clickRow">
            <el-table-column type="index" :index="indexMethod" width="120"></el-table-column>
            <el-table-column prop="name" label="音乐标题" width="400"> </el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" width="130"> </el-table-column>
            <el-table-column prop="al.name" label="专辑" width="260"> </el-table-column>
            <el-table-column prop="dt" label="时长"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">暂无评论</el-tab-pane>
        <el-tab-pane label="收藏者" name="third">暂无收藏记录</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 登录详情 -->
    <div class="mdetail-more">登录获取更多歌曲</div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { ircTimes } from '@/utils/utils.js'

export default {
  name: 'MusiclistDetail',
  data() {
    return {
      // 歌单
      musicListDetail: null
    }
  },
  computed: {
    ...mapState('m_music', ['musicListId'])
  },
  created() {
    this.getMusicListDetail()
  },
  methods: {
    ...mapMutations('m_music', ['updateMiusicId', 'updateMusicList']),

    // 获取歌单
    async getMusicListDetail() {
      const { data: res } = await this.$http('/api/playlist/detail', {
        id: this.$route.params.id
      })
      // console.log(res)
      if (res.code !== 200) return

      // console.log(res.playlist.tracks)

      // 每次用 循环 去解决时间戳问题
      res.playlist.tracks.forEach((item, index) => {
        res.playlist.tracks[index].dt = ircTimes(item.dt)
      })
      this.musicListDetail = res.playlist
      // console.log(this.musicListDetail)
    },
    // 歌曲索引
    indexMethod(index) {
      index += 1
      if (index < 10) {
        return '0' + index
      } else {
        return index
      }
    },
    // 时间戳
    // handleMusicTime(time) {
    //   // 判断 时长是否 大于 10000，大于就说明是 毫秒，否则就是秒
    //   if (time > 10000) {
    //     // time / 1000 是算出秒数
    //     time = Math.floor(time / 1000)
    //   } else {
    //     time = Math.floor(time)
    //   }
    //   // 求出 分
    //   let m = parseInt((time / 60) % 60)
    //   // 求出 秒
    //   let s = parseInt(time % 60)
    //   m = m < 10 ? '0' + m : m
    //   s = s < 10 ? '0' + s : s
    //   return `${m}:${s}`
    // },
    // 双击歌曲触发事件
    clickRow(row) {
      // console.log(row.id)
      this.updateMiusicId(row.id)
      // 当当前歌单的 id 与 vuex中的 id 不一致时
      if (this.musicListDetail.id !== this.musicListId) {
        this.updateMusicList(this.musicListDetail)
      }
    }
  },
  filters: {
    // 播放人数
    playCount(e) {
      let a = e / 10000
      return a.toFixed(1)
    }
  }
}
</script>

<style lang="less" scoped>
.musiclistdetail-container {
  width: 100%;
  height: 100%;
  padding: 30px 0 0 35px;
  display: flex;
  flex-direction: column;
  .mdetail-label {
    display: flex;
    .label-img {
      width: 180px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
    .label-text {
      width: 560px;
      margin-left: 20px;
      font-size: 13px;
      color: #898989;
      .text-num {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .text-num:nth-child(1) {
        span {
          border: 1px solid #f56c6c;
          color: #f56c6c;
          border-radius: 3px;
          padding: 0 2px;
          margin-right: 10px;
        }
        h1 {
          font-size: 24px;
          color: #373737;
        }
      }
      .text-num:nth-child(2) {
        margin: 10px 0;
        :nth-child(n) {
          margin-right: 10px;
        }
        div {
          width: 30px;
          height: 30px;
          background-color: #898989;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
        span {
          font-size: 16px;
          color: #a0c5e8;
        }
        i {
          font-style: normal;
        }
      }
      .text-num:nth-child(3) {
        button {
          height: 35px;
          line-height: 10px;
        }
      }
      .text-num:nth-child(4) {
        span:nth-child(n + 2) {
          color: #a0c5e8;
        }
      }
      .text-nums {
        // 这里设置 block 是因为，前面设置了 flex，使得 文字溢出省略号不起效
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .mdetail-more {
    text-align: center;
    margin: 20px auto;
    font-size: 14px;
    color: #ddd;
  }
}
</style>
