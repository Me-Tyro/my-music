import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home/Home.vue'
import Find from '@/components/Find/Find.vue'
import Video from '@/components/video/video.vue'
import Collect from '@/components/Collect/Collect.vue'
import Recommend from '@/components/Recommend/Recommend.vue'
import individuality from '@/components/Find-Individuality/Individuality.vue'
import SongList from '@/components/Find-songList/SongList.vue'
import Ranking from '@/components/Find-ranking/ranking.vue'
import Singer from '@/components/Find-singer/Singer.vue'
import MusicListDetail from '@/components/Musiclist-detail/musiclistDetail.vue'
import SingerDetail from '@/components/SingerDetail/SingerDetail.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    component: Home,
    redirect: '/home/find',
    children: [
      {
        path: 'find',
        component: Find,
        redirect: '/home/find/individuality',
        children: [
          { path: 'individuality', component: individuality },
          { path: 'songlist', component: SongList },
          { path: 'ranking', component: Ranking },
          { path: 'singer', component: Singer }
        ]
      },
      {
        path: 'video',
        component: Video
      },
      {
        path: 'collect',
        component: Collect
      },
      { path: 'recommend', component: Recommend },
      { path: 'musiclistdetail/:id', name: 'musicListDetail', component: MusicListDetail },
      { path: 'singerdetail/:id', name: 'SingerDetail', component: SingerDetail }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
