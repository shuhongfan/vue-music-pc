<template>
  <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
    <el-menu-item>
      <img src="./img/logo.png" alt="music" class="logo">
    </el-menu-item>
    <el-menu-item index="discover">发现音乐</el-menu-item>
    <el-menu-item index="recommend">推荐歌单</el-menu-item>
    <el-menu-item index="latestSongs">最新音乐</el-menu-item>
    <el-menu-item index="latestMVs">最新MV</el-menu-item>
    <el-menu-item class="search">
      <el-input placeholder="请输入音乐/歌单/MV/歌手" v-model="search" class="input-with-select" @keydown.enter.native="searchByName">
        <el-button @click="searchByName" slot="append" type="mini" icon="el-icon-search"></el-button>
      </el-input>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: 'discover',
      search: ''
    }
  },
  watch: {
    '$route.path': function (val) {
      val = val.slice(1)
      console.log(val)
      this.activeIndex = val
    },
    '$route.params.songName': function (val) {
      this.search = val
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key) {
        this.$router.push('/' + key)
      }
    },
    searchByName () {
      console.log(this.search)
      if (this.search === '' || this.search == null) {
        this.$message({
          message: '请输入音乐/歌单/MV/歌手',
          type: 'error'
        })
        return false
      }
      this.$router.push('/search/' + this.search)
    }
  }
}
</script>

<style scoped lang="less">
.logo{
  height: 60px;
}
.el-menu-item:first-child{
  border-bottom: none!important;
}
.el-menu-item:last-child{
  border-bottom: none!important;
}
.search{
  float: right!important;
}
</style>
