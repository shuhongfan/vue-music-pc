<template>
    <div class="content">
      <div class="search_header">
        <el-input placeholder="请输入内容" v-model="keywords" class="input-with-select" @keydown.enter.native="searchByName" >
          <el-button slot="append" icon="el-icon-search" @click="searchByName"></el-button>
        </el-input>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲" name="songs">
          <el-table
            :data="songsTabLists"
            stripe
            @row-click="handleRowChange"
            style="width: 100%">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              label="音乐图片"
              width="300">
              <template slot-scope="scope">
                <img class="img" :src="scope.row.img" alt="">
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
              prop="album"
              label="专辑">
            </el-table-column>
            <el-table-column
              width="100"
              label="时长">
              <template slot-scope="scope">
                <p>{{scope.row.duration | timeformat}}</p>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="songLists">
          <el-row :gutter="12">
            <el-col :span="4" v-for="item in playlists" :key="item.id">
              <el-card class="RecommendCard" :body-style="{ padding: '0px' }">
                <img :src="item.coverImgUrl" class="image">
                <div>
                  <span>{{item.name}}</span>
                </div>
                <p class="iconfont icon-bofang_huaban"></p>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="MV" name="mvLists">
          <el-row :gutter="12">
            <el-col :span="6" v-for="item in mvs" :key="item.id" @click.native="goMvDetails(item.id)">
              <el-card class="latestMVsCard"  :body-style="{ padding: '0px' }">
                <img :src="item.cover" class="image">
                <div>
                  <p>{{item.name}}</p>
                  <p>{{item.artistName}}</p>
                </div>
                <span class="iconfont icon-bofang_huaban"></span>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Search',
  data () {
    return {
      type: 1,
      currentPage: 1,
      // total: 0,
      pageSizes: [20, 50, 100, 200, 300, 400],
      pageSize: 30,
      keywords: this.$route.params.songName,
      songsList: [],
      playlists: [],
      mvs: [],
      songCount: 0,
      playlistCount: 0,
      mvCount: 0,
      activeName: 'songs'
    }
  },
  watch: {
    '$route.params.songName': function (newVal) {
      console.log(newVal)
      this.keywords = newVal
      this.getSearch()
    },
    activeName: function (newVal, oldVal) {
      console.log(newVal)
      if (newVal === 'songs') {
        this.type = 1
      } else if (newVal === 'songLists') {
        this.type = 1000
      } else if (newVal === 'mvLists') {
        this.type = 1004
      }
    }
  },
  mounted () {
    this.getSearch()
  },
  computed: {
    ...mapState(['musicId', 'MVid']),
    songsTabLists () {
      if (this.type === 1 && this.songsList) {
        return this.songsList.map(item => {
          return {
            id: item.id,
            name: item.name,
            artists: item.artists[0].name,
            album: item.album.name,
            duration: item.duration,
            img: item.album.artist.img1v1Url
          }
        })
      }
      return null
    },
    total () {
      if (this.type === 1) {
        return this.songCount
      } else if (this.type === 1000) {
        return this.playlistCount
      } else if (this.type === 1004) {
        return this.mvCount
      }
      return this.songCount
    }
  },
  methods: {
    ...mapMutations(['setMusicID', 'setMVID']),
    async getSearch () {
      const res = await this.axios.get('/search', {
        params: {
          keywords: this.keywords,
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize,
          type: this.type
        }
      })
      console.log(res)
      this.songsList = res.data.result.songs
      this.songCount = res.data.result.songCount
      this.playlists = res.data.result.playlists
      this.playlistCount = res.data.result.playlistCount
      this.mvs = res.data.result.mvs
      this.mvCount = res.data.result.mvCount
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getSearch()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getSearch()
    },
    handleClick (tab, event) {
      console.log(tab, event)
      this.currentPage = 1
      this.pageSize = 30
      setTimeout(() => {
        this.getSearch()
      }, 100)
    },
    playMusic (id) {
      console.log(id)
      this.setMusicID(id)
    },
    handleRowChange (row, event, column) {
      console.log(row, event, column)
      this.playMusic(row.id)
    },
    goMvDetails (id) {
      this.$router.push('/mvdetails/' + id)
    },
    searchByName () {
      this.$router.push('/search/' + this.keywords)
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
.search_header{
  width: 1200px;
  height: 250px;
  position: relative;
  background: url("./img/searchBg.png") center center;
  .el-input{
    width: 700px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
.el-tabs{
  margin-top: 20px;
  cursor: pointer;
  tr:hover{
    .imgP{
      display: block!important;
    }
  }
  img{
    width: 100px;
    height: 100px;
    position: relative;
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
.RecommendCard{
  position: relative;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 180px;
    height: 180px;
  }
  div{
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-align: center;
    span{
      font-size: 14px;
    }
  }
  p{
    display: none;
  }
}
.el-col .RecommendCard:hover{
  cursor: pointer;
  .RecommendCard{
    background-color: rgba(0,0,0,.5);
    img{
      transform: scaleX(1.2);
      transition: all .3s;
      opacity: 0.6;
    }
  }
  p{
    transition: all .2s ease-in-out!important;
    display: block!important;
    position: absolute;
    font-size: 50px;
    top: 50%;
    left: 50%;
    width: 66px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    background: yellow;
    border-radius: 50%;
    transform: translate(-50%,-120%);
  }
}
.latestMVsCard{
  position: relative;
  margin: 5px;
  img{
    width: 400px;
    height: 200px;
  }
  p{
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
  p:nth-child(2){
    color: gray;
    font-size: 12px;
  }
  span{
    display: none;
  }
}
.latestMVsCard:hover{
  cursor: pointer;
  background-color: rgba(0,0,0,.1)!important;
  img{
    transform: scaleX(1.1);
    transition: all .3s;
  }
  span{
    transition: all .2s ease-in-out!important;
    display: block!important;
    position: absolute;
    font-size: 50px;
    top: 60%;
    left: 50%;
    width: 66px;
    height: 66px;
    line-height: 66px;
    text-align: center;
    background: yellow;
    border-radius: 50%;
    transform: translate(-50%,-120%);
  }
}
.el-pagination{
  margin: auto;
  margin-top: 50px;
}
</style>
