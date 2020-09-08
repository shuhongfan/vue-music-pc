<template>
  <div>
    {{$route.params.mvid}}
    <videoPlayer></videoPlayer>
  </div>
</template>

<script>
import videoPlayer from '@/components/vueVideoPlayer/vueVideoPlayer'
export default {
  name: 'MVdetails',
  components: {
    videoPlayer
  }
}
</script>

<style scoped>

</style>
