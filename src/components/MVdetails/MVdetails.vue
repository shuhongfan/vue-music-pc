<template>
  <div>
    <videoPlayer></videoPlayer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import videoPlayer from '@/components/vueVideoPlayer/vueVideoPlayer'
export default {
  name: 'MVdetails',
  data () {
    return {
      mvid: this.$route.params.mvid
    }
  },
  components: {
    videoPlayer
  },
  computed: {
    ...mapState(['MVId'])
  },
  methods: {
    ...mapMutations(['setMVID', 'cleanMusicID'])
  },
  created () {
    this.setMVID(this.mvid)
    this.cleanMusicID()
  }
}
</script>

<style scoped lang="less">

</style>
