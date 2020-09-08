<template>
  <aplayer
    :autoplay='true'
    v-if="Lyric"
    ref="player"
    :showLrc="true"
    repeat="repeat-one"
    :music="{
        title: this.songName,
        artist: this.songArtist,
        src: this.musicUrl,
        pic: this.songPicUrl,
        lrc: this.Lyric
      }"
  />
</template>

<script>
import { mapState } from 'vuex'
import aplayer from 'vue-aplayer'
export default {
  name: 'Aplayer',
  data () {
    return {
      musicUrl: '',
      songName: '',
      songPicUrl: '',
      songArtist: '',
      Lyric: ''
    }
  },
  components: {
    aplayer
  },
  computed: {
    ...mapState(['musicId'])
  },
  async mounted () {
    await this.getMusic()
    await this.getSongDetail()
    await this.getLyric()
  },
  watch: {
    '$store.state.musicId': function (val) {
      if (val) {
        this.getMusic()
        this.getSongDetail()
        this.getLyric()
        return val
      }
    }
  },
  methods: {
    async getMusic () {
      const result = await this.axios.get('/song/url', {
        params: {
          id: this.musicId
        }
      })
      console.log(result)
      this.musicUrl = result.data.data[0].url
    },
    async getSongDetail () {
      const result = await this.axios.get('/song/detail', {
        params: {
          ids: this.musicId
        }
      })
      console.log(result)
      this.songName = result.data.songs[0].name
      this.songPicUrl = result.data.songs[0].al.picUrl
      this.songArtist = result.data.songs[0].ar[0].name
    },
    async getLyric () {
      const result = await this.axios.get('/lyric', {
        params: {
          id: this.musicId
        }
      })
      console.log(result)
      this.Lyric = result.data.lrc.lyric
    }
  }
}
</script>

<style scoped>

</style>
