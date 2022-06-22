import Vue from 'vue'
import Vuex from 'vuex'
import music from '@/store/music.js'

// 挂载 Vuex，将 Vuex 安装为 Vue 的插件
Vue.use(Vuex)

const store = new Vuex.Store({
  // 挂载模块
  modules: {
    m_music: music
  }
})

export default store
