<template>
  <div class="content">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in catlists" :key="item.id" :label="item.content" :name="item.content">
        <el-table
          @row-click="handleRowChange"
          :data="songsTable"
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            width="100">
          </el-table-column>
          <el-table-column
            label="音乐图片"
            width="300">
            <template slot-scope="scope">
              <img class="img" :src="scope.row.blurPicUrl" alt="">
              <p @click="playMusic(scope.row.id)" class="iconfont icon-bofang_huaban imgP"></p>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="音乐标题"
            width="300">
          </el-table-column>
          <el-table-column
            prop="artists"
            label="歌手"
            width="200">
          </el-table-column>
          <el-table-column
            prop="albumName"
            label="专辑"
            width="200">
          </el-table-column>
          <el-table-column
            label="时长"
            width="100">
            <template slot-scope="scope">
              <p>{{scope.row.duration | timeformat}}</p>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'LatestSongs',
  data () {
    return {
      activeName: '全部',
      activeID: 0,
      catlists: [
        { content: '全部', id: 0 },
        { content: '华语', id: 7 },
        { content: '欧美', id: 96 },
        { content: '日本', id: 8 },
        { content: '韩国', id: 16 }],
      songsList: [],
      rLoading: ''
    }
  },
  computed: {
    ...mapState(['musicId']),
    songsTable () {
      return this.songsList.map(item => {
        return {
          name: item.name,
          duration: item.duration,
          artists: item.artists[0].name,
          blurPicUrl: item.album.blurPicUrl,
          albumName: item.album.name,
          id: item.id
        }
      })
    }
  },
  mounted () {
    this.findSongID()
    this.getSongList()
    this.rLoading = this.openLoading()
  },
  methods: {
    ...mapMutations(['setMusicID']),
    async getSongList () {
      const result = await this.axios.get('/top/song', {
        params: {
          type: this.activeID
        }
      })
      console.log(result)
      this.songsList = result.data.data
      this.rLoading.close()
    },
    findSongID () {
      const res = this.catlists.findIndex((item) => this.activeName === item.content)
      this.activeID = this.catlists[res].id
    },
    handleClick (tab, event) {
      this.findSongID()
      this.getSongList()
    },
    playMusic (id) {
      console.log(id)
      this.setMusicID(id)
    },
    handleRowChange (row, event, column) {
      console.log(row, event, column)
      this.playMusic(row.id)
    }
  }
}
</script>

<style scoped lang="less">
.content{
  width: 1200px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
}
.el-table{
  cursor: pointer!important;
  img{
    width: 100px;
    height: 100px;
    position: relative!important;
  }
  tr:hover{
    .imgP{
      display: block!important;
    }
  }
  .imgP{
    display: none!important;
    transition: all .2s ease-in-out!important;
    position: absolute;
    font-size:22px;
    top: 50%;
    left: 20%;
    width: 33px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    background: yellow;
    border-radius: 50%;
    transform: translate(-50%,-120%);
  }
}
</style>
