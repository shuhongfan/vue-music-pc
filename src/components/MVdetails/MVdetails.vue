<template>
  <div class="content">
    <el-row>
      <el-col :span="20">
        <div class="left">
          <h2>MV详情</h2>
          <videoPlayer></videoPlayer>
          <div class="main">
            <img :src="artistsDetail.picUrl" alt="">
            <h4>{{MVDetail.artistName}}</h4>
            <h1>{{MVDetail.name}}</h1>
            <p class="publishTime">发布: {{MVDetail.publishTime}}  播放: {{MVDetail.playCount}}</p>
            <p>{{MVDetail.desc}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="right">
          <h2>相关推荐</h2>
          <el-row :gutter="12">
            <el-col :span="24" v-for="item in SimiMV" :key="item.id" @click.native="goMvDetails(item.id)">
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
        </div>
      </el-col>
    </el-row>
    <div class="comments">
      <div v-if="hotComments[0]">
        <h2>精彩评论</h2>
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
      </div>
      <div v-if="MVComments[0]">
        <h2>最新评论</h2>
        <el-card class="CommentCard"  v-for="item in MVComments" :key="item.commentId">
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
      </div>
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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import videoPlayer from '@/components/vueVideoPlayer/vueVideoPlayer'
export default {
  name: 'MVdetails',
  data () {
    return {
      mvid: this.$route.params.mvid,
      currentPage: 1,
      pageSizes: [10, 20, 50, 80, 100],
      pageSize: 10,
      total: 0,
      SimiMV: [],
      MVDetail: {},
      MVComments: [],
      hotComments: [],
      artistsId: 0,
      artistsDetail: []
    }
  },
  components: {
    videoPlayer
  },
  computed: {
    ...mapState(['MVid'])
  },
  watch: {
    '$route.params.mvid': function (val) {
      console.log(val)
      this.clearMVID()
      this.cleanMusicID()
      this.setMVID(val)
      this.getSimiMV()
      this.getMVDetail()
      this.getMVComments()
    }
  },
  methods: {
    ...mapMutations(['setMVID', 'cleanMusicID', 'clearMVID']),
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getMVComments()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getMVComments()
    },
    async getSimiMV () {
      const result = await this.axios.get('/simi/mv', {
        params: {
          mvid: this.MVid
        }
      })
      console.log(result)
      this.SimiMV = result.data.mvs
    },
    async getMVDetail () {
      const result = await this.axios.get('/mv/detail', {
        params: {
          mvid: this.MVid
        }
      })
      console.log(result)
      this.MVDetail = result.data.data
      this.artistsId = result.data.data.artistId
      this.getArtistsDetail()
    },
    async getArtistsDetail () {
      const result = await this.axios.get('/artists', {
        params: {
          id: this.artistsId
        }
      })
      console.log(result)
      this.artistsDetail = result.data.artist
    },
    async getMVComments () {
      const result = await this.axios.get('/comment/mv', {
        params: {
          id: this.MVid,
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize
        }
      })
      console.log(result)
      this.MVComments = result.data.comments
      if (this.currentPage === 1) {
        this.hotComments = result.data.hotComments
      }
      this.total = result.data.total
    },
    goMvDetails (id) {
      this.$router.push('/mvdetails/' + id)
    }
  },
  mounted () {
    this.clearMVID()
    this.setMVID(this.mvid)
    this.cleanMusicID()
    this.getSimiMV()
    this.getMVDetail()
    this.getMVComments()
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
  .left{
    .main{
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        float: left;
        margin: 20px;
      }
      h4{
        float: left;
        margin: 20px;
        line-height: 50px;
      }
      h1{
        clear: both;
        padding: 0px 20px;
      }
      p{
        text-indent: 2em;
      }
      .publishTime{
        text-indent: 0em;
        color: #bebebe;
        font-size: 14px;
        margin: 20px;
      }
    }
  }
  .right{
    margin-left: 20px;
    width: 200px;
    .latestMVsCard{
      position: relative;
      margin: 5px;
      img{
        width: 200px;
        height: 100px;
      }
      p{
        font-size: 12px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
      p:nth-child(2){
        color: gray;
        font-size: 8px;
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
.el-pagination{
  margin: auto;
  margin-top: 50px;
}
</style>
