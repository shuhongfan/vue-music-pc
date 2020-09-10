import Vue from 'vue'
import VueRouter from 'vue-router'

import Discover from '../components/Discover/Discover'
import LatestMVs from '../components/LatestMVs/LatestMVs'
import LatestSongs from '../components/LatestSongs/LatestSongs'
import Recommend from '../components/Recommend/Recommend'
import Search from '../components/Search/Search'
import MVdetails from '@/components/MVdetails/MVdetails'
import PlaylistDetail from '@/components/PlaylistDetail/PlaylistDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'discover'
  },
  {
    path: '/discover',
    name: 'Discover',
    component: Discover
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/latestMVs',
    name: 'LatestMVs',
    component: LatestMVs
  },
  {
    path: '/latestSongs',
    name: 'LatestSongs',
    component: LatestSongs
  },
  {
    path: '/search/:songName',
    name: 'Search',
    component: Search
  },
  {
    path: '/mvdetails/:mvid',
    name: 'MVdetails',
    component: MVdetails
  },
  {
    path: '/playlistdetail/:listId',
    name: 'PlaylistDetail',
    component: PlaylistDetail
  }
]

const router = new VueRouter({
  routes
})

export default router
