<template>
  <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">
      <img src="./logo.png" alt="music" class="logo">
    </el-menu-item>
    <el-menu-item index="discover">发现音乐</el-menu-item>
    <el-menu-item index="recommend">推荐歌单</el-menu-item>
    <el-menu-item index="latestSongs">最新音乐</el-menu-item>
    <el-menu-item index="latestMVs">最新MV</el-menu-item>
    <el-menu-item class="search">
      <el-input placeholder="请输入歌曲" v-model="search" class="input-with-select">
        <el-button @click="searchByName" slot="append" icon="el-icon-search">搜索</el-button>
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
      this.$router.push('/search/' + this.search)
    }
  }
}
</script>

<style scoped lang="less">
.logo{
  height: 40px;
}
.search{
  float: right!important;
}
</style>
