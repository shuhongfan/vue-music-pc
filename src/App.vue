<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <Aplayer class="aplayer" v-drag></Aplayer>
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
  },
  directives: {
    // vue跟随鼠标拖动指令
    drag (el, bindings) {
      el.onmousedown = function (e) {
        var disx = e.pageX - el.offsetLeft
        var disy = e.pageY - el.offsetTop
        document.onmousemove = function (e) {
          el.style.left = e.pageX - disx + 'px'
          el.style.top = e.pageY - disy + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.aplayer{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 450px;
}
</style>
