<template>
  <div class="followers-container">
    <el-card class="search-card">
      <el-input v-model="content" placeholder="search by name/email" />
      <el-button @click="search" type="primary" size="small">Search</el-button>
    </el-card>
    <el-main class="right-content">
      <el-tabs v-model="currentPageId" @tab-click="handleClick" class="follows-tab">
        <el-tab-pane label="Following" name="Following">
          <div class="infinite-list" style="overflow:hidden" v-if="currentPageId === 'Following'" >
            <el-card shadow="hover" class="follower-card" v-for="item in followingList" :key="item.id">
              {{item.name}} | {{item.email}}
              <Cancel @handleUnfollow="handleUnfollow" :id="item.id" />
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Followers" name="Followers">
          <div class="infinite-list"  style="overflow:hidden" v-if="currentPageId === 'Followers'">
            <el-card shadow="hover" class="follower-card" v-for="item in followersList" :key="item.id">
              {{item.name}} | {{item.email}}
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
      visible: false
    }
  },
  components: {
    Cancel
  },
  props: {
    currentPageId: {
      type: String,
      default: 'Following'
    }
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
      } else {
        this.fetchFollowers()
      }
    },
    async search () {
      console.log('search', this.content)
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
