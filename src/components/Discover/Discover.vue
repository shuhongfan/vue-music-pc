<template>
    <div class="content">
<!--      轮播图-->
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in banners" :key="item.imageUrl">
          <img class="bannerImg" :src="item.imageUrl" alt="">
        </el-carousel-item>
      </el-carousel>
<!--      推荐歌单-->
      <el-tabs v-model="activeRecommend">
        <el-tab-pane label="推荐歌单" name="Recommend">
          <el-row :gutter="12">
            <el-col :span="4" v-for="item in personalized" :key="item.id" @click.native="goPlaylistDeltail(item.id)">
              <el-card class="RecommendCard" :body-style="{ padding: '0px' }">
                <img :src="item.picUrl" class="image">
                <div>
                  <span>{{item.name}}</span>
                </div>
                <p class="iconfont icon-bofang_huaban"></p>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
<!--      最新音乐-->
      <el-tabs v-model="activeLatestSongs">
        <el-tab-pane label="最新音乐" name="LatestSongs">
          <el-row :gutter="12">
            <el-col :span="12" v-for="item in latestSongs" :key="item.id" @click.native="goSongDetails(item.id)">
              <el-card class="LatestSongsCard">
                <img :src="item.picUrl" class="image" @click.native="playMusic(item.id)">
                <div>
                  <p>{{item.name}}</p>
                  <p>{{item.song.artists[0].name}}</p>
                  <p>{{item.song.duration|timeformat}}</p>
                </div>
                <span class="iconfont icon-bofang_huaban"></span>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
<!--      最新MV-->
      <el-tabs v-model="activeLateMVs">
        <el-tab-pane label="最新音乐" name="LateMVs">
          <el-row :gutter="12">
            <el-col :span="6" v-for="item in latestMVs" :key="item.id" @click.native="goMvDetails(item.id)">
              <el-card class="latestMVsCard" :body-style="{ padding: '0px' }">
                <img :src="item.picUrl" class="image">
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
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Discover',
  data () {
    return {
      banners: [],
      activeRecommend: 'Recommend',
      activeLatestSongs: 'LatestSongs',
      activeLateMVs: 'LateMVs',
      personalized: [],
      latestSongs: [],
      latestMVs: []
    }
  },
  computed: {
    ...mapState(['musicId'])
  },
  created () {
    this.getBanner()
    this.getPersonalized()
    this.getLatestSongs()
    this.getLatestMVs()
  },
  methods: {
    ...mapMutations(['setMusicID']),
    async getBanner () {
      const result = await this.axios.get('/banner')
      console.log(result)
      this.banners = result.data.banners
    },
    async getPersonalized () {
      const result = await this.axios.get('/personalized', {
        params: {
          limit: 12
        }
      })
      console.log(result)
      this.personalized = result.data.result
    },
    async getLatestSongs () {
      const result = await this.axios.get('/personalized/newsong')
      console.log(result)
      this.latestSongs = result.data.result
    },
    async getLatestMVs () {
      const result = await this.axios.get('/personalized/mv')
      console.log(result)
      this.latestMVs = result.data.result
    },
    playMusic (id) {
      console.log(id)
      this.setMusicID(id)
    },
    goPlaylistDeltail (id) {
      console.log(id)
      this.$router.push('/playlistdetail/' + id)
    },
    goMvDetails (id) {
      this.$router.push('/mvdetails/' + id)
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
.bannerImg{
  height: 200px;
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
.LatestSongsCard{
  position: relative;
  margin: 5px;
  padding-left: 30px;
  img{
    width: 100px;
    height: 100px;
  }
  div{
    width: 200px;
    float: right;
    p:nth-child(2),p:nth-child(3){
      color: gray;
    }
  }
  span{
    display: none;
  }
}
.LatestSongsCard:hover{
  cursor: pointer;
  background-color: rgba(0,0,0,.1);
  span{
    transition: all .2s ease-in-out!important;
    display: block!important;
    position: absolute;
    font-size: 20px;
    top: 50%;
    left: 15%;
    width: 33px;
    height: 33px;
    line-height: 33px;
    text-align: center;
    background: yellow;
    border-radius: 50%;
    transform: translate(0,-50%);
  }
}
.latestMVsCard{
  position: relative;
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
</style>
