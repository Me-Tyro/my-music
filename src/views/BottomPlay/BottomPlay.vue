<template>
  <div class="play-container">
    <!-- 音乐 -->
    <audio :src="musicUrl" ref="audioPlayer" autoplay @play="PlayingState(true)" @pause="PlayingState(false)" @timeupdate="timeupdate" @ended="changeMusic('next')"></audio>
    <!-- 图片 -->
    <div class="play-left">
      <img src="@/assets/images/test.jpg" alt="" v-if="musicLists.length === 0">
      <img :src="musicDetail.al.picUrl" alt="" v-else>
      <div class="play-left-text">
        <h4>{{musicDetail.name}}</h4>
        <template v-if="musicDetail && musicDetail.name">
          <span>{{musicDetail.ar[0].name}}</span>
        </template>
      </div>
    </div>
    <!-- 播放器 -->
    <div class="play-audio">
      <div class="audio-icon">
        <!-- 上一首 -->
        <span @click="musicLists.length != 0 ? changeMusic('pre') : ''"><i class="el-icon-caret-left"></i></span>
        <span @click="changePlayState">
          <i class="el-icon-video-play" v-if="!isPlay"></i>
          <i class="el-icon-video-pause" v-else></i>
        </span>
        <!-- 下一首 -->
        <span @click="musicLists.length != 0 ? changeMusic('next') : ''"><i class="el-icon-caret-right"></i></span>
      </div>
      <div class="audio-jdt">
        <span class="demonstration">{{currentTime | ircTimes}}</span>
        <el-slider class="progressSlider" v-model="currentTime" :show-tooltip="false" :disabled="musicLists.length == 0" :max="durationNum" @change="changeProgress"></el-slider>
        <span class="demonstration">{{duration}}</span>
      </div>
    </div>
    <!-- 免责说明 -->
    <div class="play-right">
      <div class="mouseinstruction" v-if="flag">本站为仿网易云音乐展示项目，仅供学习使用，不可用于盈利，违者必究！</div>
      <a href="javascript:;" @mouseenter="instructionSet" @mouseleave="foursSet">本人免责申明</a>
    </div>
  </div>
</template>

<script>
import { createLogger, mapGetters, mapMutations, mapState } from 'vuex'
import { ircTimes, intervalSeconds } from '@/utils/utils.js'

export default {
  name: 'BottomPlay',
  computed: {
    ...mapState('m_music', ['isPlay', 'musicList', 'miusicId']),
    ...mapGetters('m_music', ['getMusiId'])
  },
  data() {
    return {
      flag: false,
      // 本首歌的内容
      musicDetail: {},
      // 歌曲 url 地址
      musicUrl: '',
      // 歌曲索引
      index: null,
      // 歌单
      musicLists: [],
      // 当前播放时间
      currentTime: 0,
      // 进度条位置
      timeProgress: 0,
      // 音乐总时长
      duration: '00:00',
      // 节流中的变量
      lastSecond: 0,
      // 总秒数，将作用于滑块
      durationNum: 0
    }
  },
  methods: {
    ...mapMutations('m_music', ['updatePlayState', 'updateMiusicId']),

    // 请求歌曲的 url
    async getMusicDetail(id) {
      // 这里本来要写成 id: id，根据 ES6 语法，可以简写为 id
      const { data: res } = await this.$http('/api/song/url', { id })
      if (res.data[0].url === null) return this.$message.error('该歌曲暂无版权，将为您播放下一首歌曲')
      if (res.code !== 200) return
      this.musicUrl = res.data[0].url
      // console.log(this.musicUrl)
    },

    // 播放音乐
    playMusic() {
      this.$refs.audioPlayer.play()
    },
    // 暂停音乐
    pauseMusic() {
      this.$refs.audioPlayer.pause()
    },

    // 一开始 audio 播放和暂停的回调，传至到 vuex 中改变状态
    PlayingState(state) {
      // console.log(state)
      this.updatePlayState(state)
    },

    // 点击播放键的回调
    changePlayState() {
      !this.isPlay ? this.playMusic() : this.pauseMusic()
    },

    // 根据id找到 musicList中对应的 musicDetail, 并获得总时长
    getMusicDetailFromMusicList() {
      this.musicLists
        .filter(item => item.id === this.miusicId)
        .forEach((item, index) => {
          this.duration = item.dt
          this.musicDetail = item
        })
      // console.log(this.duration)
      // console.log(this.musicDetail)
      this.durationNum = intervalSeconds(this.duration)
      console.log(this.durationNum)

      this.musicList.forEach((item, index) => {
        if (item.id === this.miusicId) {
          this.index = index
          // console.log(this.index)
          // console.log(this.musicLists[this.index].id)
        }
      })
    },

    // 上一首/下一首（切换歌曲）
    changeMusic(type) {
      if (type == 'next') {
        if (this.index >= 9) {
          this.index = 9
          alert('登录后查看以下歌曲')
        } else {
          this.index += 1
        }
        // 实际上 在我切换歌曲的时候，this.index 也运行了一步，也就是我们为什么下面的this.index的判断不能写成 this.index-- 了
        this.updateMiusicId(this.musicLists[this.index].id)
      }
      if (type == 'pre') {
        if (this.index <= 0) {
          this.index = 0
        } else {
          this.index -= 1
        }
        this.updateMiusicId(this.musicLists[this.index].id)
      }
    },

    // 当前播放时间
    timeupdate(e) {
      // 使用节流
      let time = this.$refs.audioPlayer.currentTime
      // 向下取整赋值给 time
      time = Math.floor(time)
      // 此方法很不错，用判断来进行节流，time会执行很多次，但遇到判断后 currentTime = time 只会执行一次后并跳出，以此来达到节流的目的
      if (time !== this.lastSecond) {
        this.lastSecond = time
        this.currentTime = time
        // console.log(this.currentTime)
        this.timeProgress = time
      }
    },

    // 拖拽鼠标滑块触发
    changeProgress(e) {
      // 将滑动的秒数赋值给 currentTime(当前播放时间)
      this.currentTime = e
      // console.log(this.currentTime)
      // 在赋值给 音乐的 播放时间，如果不赋值的话，那么滑动的模块将不起作用，因为你当前的播放时间还是会赋值给currentTime
      this.$refs.audioPlayer.currentTime = this.currentTime
    },

    // 免责说明
    // 获得焦点
    instructionSet() {
      this.flag = true
    },
    // 失去焦点
    foursSet() {
      this.flag = false
    }
  },

  watch: {
    // 监听 vuex 中 music 的变化
    getMusiId(id) {
      // 先暂停当前音乐播放
      this.pauseMusic()
      // console.log('vuex中的id发生了变化' + id)
      this.getMusicDetail(id)
      // 将 vuex 中的 歌单赋值给 musicLists
      this.musicLists = this.musicList
      // console.log(this.musicLists)
      // 调用总时长
      this.getMusicDetailFromMusicList()
      // console.log(this.musicLists)
    }
  },

  filters: {
    ircTimes
  }
}
</script>

<style lang="less" scoped>
.play-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 999;
  background-color: #fff;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  .play-left {
    width: 210px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      margin-left: 20px;
    }
    .play-left-text {
      margin-left: 10px;
      h4 {
        font-weight: normal;
      }
      span {
        font-size: 14px;
      }
    }
  }
  .play-audio {
    display: flex;
    flex-direction: column;
    width: 500px;
    align-items: center;
    margin-left: -95px;
    .audio-icon {
      display: flex;
      justify-content: center;
      margin-top: 5px;
      i {
        cursor: pointer;
        font-size: 34px;
        margin: 0 20px;
      }
    }
    .audio-jdt {
      display: flex;
      align-items: center;
      .progressSlider {
        width: 300px;
      }
      .demonstration {
        margin-right: 5px;
        font-size: 12px;
        color: #aaadbd;
      }
      span {
        margin: 0 10px;
      }
      span:nth-child(1) {
        margin-right: 15px;
      }
    }
  }
  .play-right {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin: 0 5px 10px 0;
    font-size: 12px;
    a {
      color: #909399;
      text-decoration: underline;
    }
    .mouseinstruction {
      position: absolute;
      top: 20px;
      left: -153px;
      width: 150px;
      height: 50px;
      background-color: #313131;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>