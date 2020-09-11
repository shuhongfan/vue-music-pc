<template>
    <div class="content">
      <el-tabs v-model="area" @tab-click="handleClick">
        <el-tab-pane disabled label="地区:"></el-tab-pane>
        <el-tab-pane label="全部" name="全部"></el-tab-pane>
        <el-tab-pane label="内地" name="内地"></el-tab-pane>
        <el-tab-pane label="港台" name="港台"></el-tab-pane>
        <el-tab-pane label="欧美" name="欧美"></el-tab-pane>
        <el-tab-pane label="日本" name="日本"></el-tab-pane>
        <el-tab-pane label="韩国" name="韩国"></el-tab-pane>
      </el-tabs>
      <el-tabs v-model="type" @tab-click="handleClick">
        <el-tab-pane disabled label="类型:"></el-tab-pane>
        <el-tab-pane label="全部" name="全部"></el-tab-pane>
        <el-tab-pane label="官方版" name="官方版"></el-tab-pane>
        <el-tab-pane label="原声" name="原声"></el-tab-pane>
        <el-tab-pane label="现场版" name="现场版"></el-tab-pane>
        <el-tab-pane label="网易出品" name="网易出品"></el-tab-pane>
      </el-tabs>
      <el-tabs v-model="order" @tab-click="handleClick">
        <el-tab-pane disabled label="排序:"></el-tab-pane>
        <el-tab-pane label="上升最快" name="上升最快"></el-tab-pane>
        <el-tab-pane label="最热" name="最热"></el-tab-pane>
        <el-tab-pane label="最新" name="最新"></el-tab-pane>
      </el-tabs>
      <el-row :gutter="12">
        <el-col :span="6" v-for="item in mvLists" :key="item.id" @click.native="goMvDetails(item.id)">
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.currentPage"
        :page-sizes="this.pageSizes"
        :page-size="this.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
</template>

<script>
export default {
  name: 'LatestMVs',
  data () {
    return {
      area: '全部',
      type: '全部',
      order: '最热',
      currentPage: 1,
      pageSizes: [10, 20, 50, 80, 100],
      pageSize: 20,
      total: 0,
      mvLists: []
    }
  },
  mounted () {
    this.getMVs()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
      this.getMVs()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getMVs()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getMVs()
    },
    async getMVs () {
      const result = await this.axios.get('/mv/all', {
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize
        }
      })
      console.log(result)
      if (this.currentPage === 1) {
        this.total = result.data.count
      }
      this.mvLists = result.data.data
    },
    goMvDetails (id) {
      this.$router.push('/mvdetails/' + id)
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
