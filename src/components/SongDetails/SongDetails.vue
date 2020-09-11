<template>
  <div class="content">
    <el-row>
      <el-col :span="24">
        <el-card class="headerCard">
          <img :src="songs.al.picUrl">
          <div style="padding: 14px;">
            <h2>{{ songs.name }}</h2>
            <div>
              <img class="avatarUrl" :src="songs.al.picUrl" alt="avatarUrl">
              <h4 type="warning" plain>歌手:  {{songs.ar[0].name}}</h4>
              <h4 v-if="songs.ar[1]" type="warning" plain>{{songs.ar[1] && songs.ar[1].name}}</h4>
              <h4 type="warning" plain>时长: {{songs.dt | timeformat}}</h4>
              <el-button @click="playMusic(songs.id)" round type="success" plain>立即播放</el-button>
              <el-button @click="goMVdetail(songs.mv)" round v-if="songs.mv" type="primary" plain>去看MV</el-button>
              <p @click="openMessageBox" v-html="showLyric"></p>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-if="hotComments[0]">
      <h3>热门评论</h3>
      <el-card class="CommentCard"  v-for="item in hotComments" :key="item.commentId">
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
        :total="total">
      </el-pagination>
    </div>
    <h1 v-else>没有热门评论</h1>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'SongDetails',
  data () {
    return {
      songid: this.$route.params.songid,
      hotComments: [],
      total: 0,
      songs: {},
      Lyric: '',
      showLyric: '',
      currentPage: 1,
      pageSizes: [10, 20, 50, 80, 100],
      pageSize: 10,
      hotCurrentPage: 1
    }
  },
  watch: {
    '$route.params.songid': function (val) {
      console.log(val)
    },
    Lyric (val) {
      this.showLyric = val.replace(/\[.*?\]/g, '<br />')
    }
  },
  methods: {
    ...mapMutations(['setMusicID']),
    openMessageBox () {
      this.$alert(this.showLyric, this.songs.name + '歌词', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true,
        customClass: 'messageBoxLyric',
        closeOnClickModal: true
      }).catch(() => {})
    },
    async getSongDetail () {
      const result = await this.axios.get('/song/detail', {
        params: {
          ids: this.songid
        }
      })
      console.log(result)
      this.songs = result.data.songs[0]
    },
    async getSongComment () {
      const result = await this.axios.get('/comment/hot', {
        params: {
          id: this.songid,
          type: 0,
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize
        }
      })
      console.log(result)
      this.hotComments = result.data.hotComments
      this.total = result.data.total
    },
    async getLyric () {
      const result = await this.axios.get('/lyric', {
        params: {
          id: this.songid
        }
      })
      console.log(result)
      this.Lyric = result.data.lrc.lyric
    },
    goMVdetail (id) {
      this.$router.push('/mvdetails/' + id)
    },
    playMusic (id) {
      console.log(id)
      this.setMusicID(id)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getSongComment()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getSongComment()
    }
  },
  created () {
    this.getSongDetail()
    this.getSongComment()
    this.getLyric()
  }
}
</script>

<style scoped lang="less">
.content {
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

</style>
<style>
.el-message-box.messageBoxLyric{
  height: 500px!important;
  overflow: auto!important;
}
</style>
