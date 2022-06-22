<template>
  <div class="offical-container">
    <div class="list-type">
      <div class="listtype-img">
        <img :src="officialListDetailItem.coverImgUrl || cover" alt="">
      </div>
      <div class="listtype-title">
        <slot name="header"></slot>
        <table>
          <!-- 为 true 展示 tracks 否则展示 topSongs -->
          <tr v-for="(item, index) in ( officialListDetailItem.tracks && officialListDetailItem.tracks.slice(0, 5)) || (officialListDetailItem.topSongs && officialListDetailItem.topSongs.slice(0, 10)) || officialListDetailItem.songs" :key="index" @dblclick="handleRowDbClick(officialListDetailItem.id || item.id, index)">
            <td class="index">{{index + 1}}</td>
            <td class="musicName">{{item.name}}</td>
            <td class="singer">{{item.ar[0].name}}</td>
          </tr>
        </table>
        <div class="listtype-text" @click="loginForm">查看全部<i class="el-icon-arrow-right"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfficialRanking',
  props: {
    officialListDetailItem: {
      type: Object,
      default() {
        return {}
      }
    },
    cover: {
      type: String,
      default: ''
    },
    listId: {
      type: [Number, String],
      default: ''
    }
  },
  methods: {
    loginForm() {
      return alert('请登录后查看!\n😊😊😊')
    },

    // 对于 ranking 来说: 双击歌曲的回调 id
    // 对于 SingerDetailVue 来说: id 为歌曲 id, 歌单的 id 为 listId
    handleRowDbClick(id, index) {
      let listId = this.listId
      // console.log(id, index, listId)
      this.$emit('handleRowDbClick', { id, index, listId })
    }
  }
}
</script>

<style lang="less" scoped>
.offical-container {
  margin-top: 20px;
  .list-type {
    display: flex;
    margin-bottom: 75px;
    .listtype-img {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }
    .listtype-title {
      flex: 1;
      margin-left: 20px;
      h3 {
        margin: 0 0 10px 5px;
      }
      table {
        width: 100%;
        tr {
          height: 40px;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 14px;
          .index {
            width: 30px;
            text-align: center;
          }
          .musicName {
            width: 80%;
          }
          .index,
          .singer {
            color: #999;
          }
        }
        tr:nth-child(2n + 1) {
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        tr:hover {
          background-color: #efefef;
        }
      }
      .listtype-text {
        margin-top: 5px;
        color: #999;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>