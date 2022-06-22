<template>
  <div class="ranking-container">
    <div class="ranking">
      <div class="offical">
        <div class="title">官方榜</div>
        <official-ranking v-for="(item, index) in officialListDetail" :key="index" :officialListDetailItem="item" @handleRowDbClick="handleRowDbClick"></official-ranking>
      </div>
      <div class="global">
        <div class="title">全球榜</div>
        <global-list :globalList="globalList" @clearPlaylist="clearPlaylist"></global-list>
      </div>
    </div>
  </div>
</template>

<script>
import OfficialRanking from '../OfficialRanking/OfficialRanking.vue'
import GlobalList from '../GlobalList/GlobalList.vue'
import { ircTimes } from '@/utils/utils.js'
import { mapMutations, mapState } from 'vuex'

export default {
  components: { OfficialRanking, GlobalList },
  name: 'Ranking',
  data() {
    return {
      // 前4个榜单
      officialList: [],
      // 传过去的 4个 榜单信息
      officialListDetail: [],
      // 全球榜
      globalList: []
    }
  },
  created() {
    this.getAllRankings()
  },
  computed: {
    ...mapState('m_music', ['musicListId'])
  },
  methods: {
    ...mapMutations('m_music', ['updateMiusicId', 'updateMusicList']),

    // 请求 所有榜单
    async getAllRankings() {
      const { data: res } = await this.$http('/api/toplist')
      // console.log(res)
      if (res.code !== 200) return
      this.officialList = res.list.slice(0, 4)
      // console.log(this.officialList)
      this.officialList.forEach(item => {
        this.getMusicListDetail(item.id)
      })
      this.globalList = res.list.slice(4)
      console.log(this.globalList)
    },

    // 请求榜单信息
    async getMusicListDetail(id) {
      const { data: res } = await this.$http('/api/playlist/detail', { id })
      // console.log(res.playlist)
      res.playlist.tracks.forEach((item, index) => {
        res.playlist.tracks[index].dt = ircTimes(item.dt)
      })
      // console.log(res)
      this.officialListDetail.push(res.playlist)
      console.log(this.officialListDetail)
    },

    // 双击自定义事件的回调
    handleRowDbClick({ id, index }) {
      console.log(id)
      console.log(index)
      let num = this.officialListDetail.findIndex(item => item.id === id)
      console.log(num)
      this.updateMiusicId(this.officialListDetail[num].tracks[index].id)

      // 将歌单的 id 及 歌单中的歌曲 传入 vuex
      if (id !== this.musicListId) {
        this.updateMusicList({
          id,
          tracks: this.officialListDetail[num].tracks
        })
      }
    },

    // 接收来自全球榜歌单的回调
    clearPlaylist(id) {
      this.$router.push({ name: 'musicListDetail', params: { id } })
    }
  }
}
</script>

<style lang="less" scoped>
.ranking {
  display: flex;
  flex-direction: column;
  .offical {
    margin-bottom: 30px;
    .title {
      font-size: 22px;
      color: #999;
    }
  }
  .global {
    .title {
      font-size: 22px;
      color: #999;
    }
  }
}
</style>