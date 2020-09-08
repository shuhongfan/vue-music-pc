<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Aplayer v-if="musicId" class="aplayer"></Aplayer>
      </el-footer>
    </el-container>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Aplayer from './components/Aplayer/Aplayer'
export default {
  name: 'app',
  components: {
    Header,
    Footer,
    Aplayer
  },
  computed: {
    ...mapState(['musicId'])
  }
}
</script>

<style scoped lang="less">
.el-footer{
  z-index: 99999;
  position: fixed;
  bottom: 30px;
  left: 50%;
  margin-left: -620px;
  .aplayer{
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
