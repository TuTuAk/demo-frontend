<template>
  <div class="followers-container">
    <el-card class="search-card">
      <el-input v-model="content" placeholder="search by name/email" />
      <el-button @click="search" type="primary" size="small">Search</el-button>
    </el-card>
    <el-card label="Search Results" name="Search Results" v-if="currentPageId === 'SearchResults' && user">
      <el-table v-if="user" :data="[user]" style="width: 100%">
        <el-table-column label="index">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="username"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
        <el-table-column label="action" v-if="user.id !== currentUser.id" >
          <template >
            <el-button @click="handleFollow(user.id)" type="primary" size="small">Follow</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-main class="right-content">
      <el-tabs v-model="currentPageId" @tab-click="handleClick" class="follows-tab">
        <el-tab-pane label="Following" name="Following">
          <div class="follow-list" style="overflow:hidden" v-if="currentPageId === 'Following'" >
            <el-card shadow="hover" class="follower-card" v-for="following in followingList" :key="following.id">
              {{ following.name }} | {{ following.email }}
              <Cancel @handleUnfollow="handleUnfollow" :id="following.id" />
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Followers" name="Followers">
          <div class="follow-list"  style="overflow:hidden" v-if="currentPageId === 'Followers'">
            <el-card shadow="hover" class="follower-card" v-for="follower in followersList" :key="follower.id">
              {{ follower.name }} | {{ follower.email }}
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>
<script>
import Cancel from './Unfollow.vue'

export default {
  data () {
    return {
      followingList: [],
      followersList: [],
      content: '',
      visible: false,
      user: {}
    }
  },
  components: {
    Cancel
  },
  props: {
    currentPageId: {
      type: String,
      default: 'Following'
    },
    currentUser: {}
  },
  methods: {
    async fetchFollowings () {
      this.followingList = []
      const id = window.sessionStorage.getItem('uid')
      const { data: followingsRes } = await this.$http.get('/api/follow/following/' + id)
      this.followingList = [...this.followingList, ...followingsRes]
    },
    async fetchFollowers () {
      this.followersList = []
      const id = window.sessionStorage.getItem('uid')
      const { data: followerRes } = await this.$http.get('/api/follow/follower/' + id)
      this.followersList = [...this.followersList, ...followerRes]
    },
    handleClick (tab, event) {
      this.$emit('handlePageChange', tab.paneName)
      if (tab.name === 'Following') {
        this.fetchFollowings()
      } else if (tab.name === 'Follower') {
        this.fetchFollowers()
      }
    },
    async search () {
      this.$emit('handlePageChange', 'SearchResults')
      const { data: user } = await this.$http.get('/api/user/' + this.content)
      this.user = user
    },
    async handleUnfollow (followedId) {
      await this.$http.delete('/api/unfollow', {
        data: {
          followedId: followedId
        }
      })
      this.$message({
        type: 'success',
        message: 'unfollow success'
      })
      const idx = this.followingList.findIndex(item => item.id === followedId)
      this.followingList.splice(idx, 1)
      this.visible = false
      this.$emit('refreshCurrentUser')
    },
    async handleFollow (followedId) {
      alert(followedId)
      await this.$http.post('/api/follow', {
        followedId: followedId
      })
      this.$message({
        type: 'success',
        message: 'follow success'
      })
      this.$emit('refreshCurrentUser')
    }
  }
}
</script>
<style lang="less" scoped>
  .followers-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 20px
  }
  .follower-card {
    margin-bottom: 10px;
  }
  .search-card {
    text-align: right;
    height: 128px;
    margin: 20px 0 0 0;
    .el-button {
      margin-top: 10px;
    }
  }
  .right-content {
    padding: 0;
    flex: 1;
    overflow: hidden;
    display: flex;
  }
</style>
<style lang="less">
  .follows-tab {
    background-color: #fff;
    padding: 0 20px;
    border-radius:0 0 4px 4px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .el-tabs__nav-wrap::after {
      background: transparent;
    }
    .el-tabs__content {
      flex: 1;
      overflow: auto;
    }
  }
</style>
