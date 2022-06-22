export default {
  // 开启空间命名
  namespaced: true,

  // 数据
  state: () => ({
    // 音乐id地址
    miusicId: '',
    // 播放状态
    isPlay: false,
    // 当前播放歌单的 id
    musicListId: '',
    // 当前播放的歌单
    musicList: []
  }),

  // 方法
  mutations: {
    // 更新歌曲的url
    updateMiusicId(state, miusicId) {
      state.miusicId = miusicId
    },
    // 更新歌曲的播放状态
    updatePlayState(state, isPlay) {
      state.isPlay = isPlay
      // console.log(state.isPlay)
    },
    // 更新歌单的列表和 id
    updateMusicList(state, payload) {
      // 歌单 id 发生变化
      if (state.musicListId != payload.id) {
        state.musicListId = payload.id
      }
      // 对歌单进行深拷贝再赋值 直接赋值是浅拷贝
      // 歌单是固定的死数据，而vuex中的musicList是动态的
      let musicList = payload.tracks.slice()
      state.musicList = musicList
    }
  },

  // 模块的 getters 属性
  getters: {
    // 监听 音乐id 值的变化
    getMusiId(state) {
      return state.miusicId
    }
  }
}
