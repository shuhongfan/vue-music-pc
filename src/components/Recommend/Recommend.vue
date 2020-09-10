<template>
    <div class="content">
      <el-row>
        <el-col :span="24">
          <el-card class="headerCard">
            <img :src="highquality.coverImgUrl">
            <div style="padding: 14px;">
              <el-button type="warning" plain disabled>精品歌单</el-button>
              <p>{{highquality.description}}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item in catlists" :key="item" :label="item" :name="item">
          <el-row :gutter="12">
            <el-col :span="4" v-for="item in playlists" :key="item.id" @click.native="goPlaylistDeltail(item.id)">
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
      </el-tabs>
      <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
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
export default {
  name: 'Recommend',
  data () {
    return {
      activeName: '全部',
      catlists: ['全部', '欧美', '华语', '流行', '说唱', '摇滚', '民谣', '电子', '轻音乐', '影视原声', 'ACG', '怀旧', '治愈', '旅行'],
      highquality: {},
      playlists: [],
      total: 0,
      pageSize: 30,
      pageSizes: [18, 30, 48, 100, 200, 300, 400],
      currentPage: 1
    }
  },
  mounted () {
    this.highQuality()
    this.playLists()
  },
  methods: {
    async highQuality () {
      const result = await this.axios.get('/top/playlist/highquality', {
        params: {
          limit: 1
        }
      })
      console.log(result)
      this.highquality = result.data.playlists[0]
    },
    async playLists () {
      const result = await this.axios.get('/top/playlist/', {
        params: {
          cat: this.activeName,
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize
        }
      })
      console.log(result)
      this.playlists = result.data.playlists
      this.total = result.data.total
    },
    handleClick (tab, event) {
      this.currentPage = 1
      this.playLists()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.playLists()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.playLists()
    },
    goPlaylistDeltail (id) {
      console.log(id)
      this.$router.push('/playlistdetail/' + id)
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
  height: 250px;
  img{
    width: 200px;
    height: 200px;
    float: left;
  }
  div{
    float: right;
    width: 900px;
    p{
      line-height: 22px;
      height: 130px;
      overflow: hidden;
    }
  }
}
.el-tabs{
  margin-top: 30px;
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
.el-pagination{
  margin: auto;
  margin-top: 50px;
}
</style>
