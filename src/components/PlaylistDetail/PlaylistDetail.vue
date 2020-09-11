<template>
  <div class="content">
    <el-row>
      <el-col :span="24">
        <el-card class="headerCard">
          <img :src="playlist.coverImgUrl">
          <div style="padding: 14px;">
            <h2>{{ playlist.name }}</h2>
            <div>
              <img class="avatarUrl" :src="playlist.creator.avatarUrl" alt="avatarUrl">
              <el-button type="warning" plain>{{playlist.creator.nickname}}</el-button>
              <el-button type="warning" plain>{{playlist.createTime | dateformat}}</el-button>
            </div>
            <div>
              <h4>标签:</h4>
              <el-tag
                v-for="tag in playlist.tags"
                :key="tag"
                type="success"
                closable>
                {{tag}}
              </el-tag>
              <p @click="openMessageBox">{{playlist.description}}</p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="song">
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
      <el-tab-pane label="评论" name="comment">
        <div v-if="hotComment[0]">
          <h3>精彩评论</h3>
          <el-card class="CommentCard"  v-for="item in hotComment" :key="item.commentId">
            <img :src="item.user.avatarUrl">
            <div class="content">
              <p>
                <el-button size="mini" type="primary" plain>{{ item.user.nickname }}</el-button>
                {{ item.content }}
              </p>
              <div v-if="item.beReplied[0]" class="beReplied">
                <div style="padding: 10px;">
                  <el-button size="mini" type="primary" plain>{{ item.beReplied[0].user.nickname }}</el-button>
                  <span>{{ item.beReplied[0].content }}</span>
                </div>
              </div>
              <p class="time">{{ item.time | dateformat }}</p>
            </div>
          </el-card>
          <el-pagination
            @size-change="hotHandleSizeChange"
            @current-change="hotHandleCurrentChange"
            :current-page="hotCurrentPage"
            :page-sizes="pageSizes"
            :page-size="hotPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="hotCount">
          </el-pagination>
        </div>
        <div v-if="comments[0]">
          <h3>最新评论</h3>
          <el-card class="CommentCard"  v-for="item in comments" :key="item.commentId">
            <img :src="item.user.avatarUrl">
            <div class="content">
              <p>
                <el-button size="mini" type="primary" plain>{{ item.user.nickname }}</el-button>
                {{ item.content }}
              </p>
              <div v-if="item.beReplied[0]" class="beReplied">
                <div style="padding: 10px;">
                  <el-button size="mini" type="primary" plain>{{ item.beReplied[0].user.nickname }}</el-button>
                  <span>{{ item.beReplied[0].content }}</span>
                </div>
              </div>
              <p class="time">{{ item.time | dateformat }}</p>
            </div>
          </el-card>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="commentsTotal">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'PlaylistDetail',
  data () {
    return {
      activeName: 'song',
      listId: this.$route.params.listId,
      playlist: {},
      type: 2,
      pageSizes: [10, 20, 50, 80, 100],
      hotPageSize: 10,
      hotCurrentPage: 1,
      hotComment: [],
      hotCount: 0,
      pageSize: 10,
      currentPage: 1,
      comments: [],
      commentsTotal: 0
    }
  },
  computed: {
    songsTable () {
      return this.playlist.tracks.map(item => {
        return {
          name: item.name,
          duration: item.dt,
          artists: item.ar[0].name,
          blurPicUrl: item.al.picUrl,
          albumName: item.al.name,
          id: item.id
        }
      })
    }
  },
  mounted () {
    this.getPlaylistDetail()
    this.getHotComments()
    this.getLatestComments()
  },
  methods: {
    ...mapMutations(['setMusicID']),
    openMessageBox () {
      this.$messagebox(this.playlist.description, '歌单简介', {
        confirmButtonText: '确定',
        customClass: 'messageBox'
      }).catch(() => {})
    },
    async getPlaylistDetail () {
      const result = await this.axios.get('/playlist/detail', {
        params: {
          id: this.listId
        }
      })
      console.log(result)
      this.playlist = result.data.playlist
    },
    async getHotComments () {
      const result = await this.axios.get('/comment/hot', {
        params: {
          id: this.listId,
          type: this.type,
          limit: this.hotPageSize,
          offset: (this.hotCurrentPage - 1) * this.hotPageSize
        }
      })
      console.log(result)
      this.hotComment = result.data.hotComments
      this.hotCount = result.data.total
    },
    async getLatestComments () {
      const result = await this.axios.get('/comment/playlist', {
        params: {
          id: this.listId,
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize
        }
      })
      console.log(result)
      this.commentsTotal = result.data.total
      this.comments = result.data.comments
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    playMusic (id) {
      console.log(id)
      this.setMusicID(id)
    },
    handleRowChange (row, event, column) {
      console.log(row, event, column)
      this.goSongDetails(row.id)
    },
    hotHandleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.hotPageSize = val
      this.getHotComments()
    },
    hotHandleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.hotCurrentPage = val
      this.getHotComments()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getLatestComments()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getLatestComments()
    },
    goSongDetails (id) {
      this.$router.push('/songdetails/' + id)
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
.headerCard{
  height: 350px;
  h4{
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
  }
  img{
    width: 300px;
    height: 300px;
    float: left;
  }
  .avatarUrl{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .el-button{
    margin-left: 20px;
    margin-top: 10px;
  }
  .el-tag{
    margin-left: 20px;
  }
  div{
    float: right;
    width: 800px;
    p{
      font-size: 16px;
      line-height: 20px;
      height: 90px;
      overflow: hidden;
    }
  }
}
.el-tabs{
  margin-top: 30px;
  .CommentCard{
    margin: 5px;
    img{
      width: 66px;
      height: 66px;
      border-radius: 50%;
      float: left;
      margin: 20px;
    }
    .content{
      width: 1000px;
    }
    .el-button{
      margin-right: 10px;
    }
    .beReplied{
      float: right;
      padding: 10px;
      background-color: #e6e5e6;
      border-radius: 5px;
    }
    .time{
      color: #bebebe;
      font-size: 14px;
    }
  }
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
