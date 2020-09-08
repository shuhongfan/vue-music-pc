<template>
    <div>Search---{{this.$route.params.songName}}</div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      songName: this.$route.params.songName
    }
  }
}
</script>

<style scoped>

</style>
