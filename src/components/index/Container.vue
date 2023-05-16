<template>
  <el-container class="containers">
    <el-card class="box-card">
      <el-input v-model="content" type="textarea" :autosize="{ minRows: 2, maxRows: 2}" placeholder="Type something here" />
      <el-button style="width: 100px" @click="createFeed" type="primary" size="small">Post</el-button>
    </el-card>
    <el-main class="right-content">
      <div class="infinite-list" @loadFeeds="loadFeeds" style="overflow:hidden" >
        <el-col v-for="(feed,index) in feeds" :key="index" style="margin-bottom:10px">
          <el-card shadow="hover" class="feed-card" v-if="feed.userId === currentUser.id" body-style="display:flex;justify-content:flex-end;align-items:center;">
            <div class="content">{{feed.content || '--'}}</div>
            <el-tooltip effect="light" :content="feed.name" placement="top">
              <div class="user-info" style="margin-left:20px">
                <span class="name">{{feed.userName || '--'}}</span>
              </div>
            </el-tooltip>
          </el-card>
          <el-card shadow="hover" class="feed-card" body-style="display:flex;align-items:center;" v-else>
            <el-tooltip effect="light" :content="feed.name" placement="top">
              <div class="user-info" style="margin-right:20px">
                <span class="name">{{feed.userName || '--'}}</span>
                <el-button @click="handleFollow(feed.userId)">follow</el-button>
              </div>
            </el-tooltip>
            <div class="content">{{feed.content || '--'}}</div>
          </el-card>
        </el-col>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      loading: false,
      feeds: '',
      content: ''
    }
  },
  props: {
    currentUser: {}
  },
  created () {
    this.loadFeeds()
  },
  methods: {
    async loadFeeds () {
      const { data: res } = await this.$http.get('/api/feed')
      this.feeds = [...this.feeds, ...res]
    },
    async createFeed () {
      if (!this.content) {
        this.$message({
          message: 'Type something here',
          type: 'warning'
        })
        return
      }
      const { data } = await this.$http.post('/api/feed', {
        content: this.content
      })
      this.$message({
        type: 'success',
        message: 'send post success'
      })
      this.content = ''
      this.feeds.unshift(data)
    },
    async handleFollow (followedId) {
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
<style lang="less"  scoped>
.containers {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
}
.box-card {
  text-align: right;
  margin: 20px 0 15px 0;
  height: 128px;
  .el-button {
    margin-top: 10px;
  }
}
.feed-card {
  .user-info {
    display: flex;
    flex-direction: column;
    .name {
      width: 100px;
      height: 40px;
      border: 1px solid #F9D97A;
      //background-color: rgb(249, 217, 123);
      font-size: 15px;
      font-weight: 400;
      text-align: center;
      line-height: 40px;
      overflow: hidden;
      display: inline-block;
    }
    .el-button {
      padding: 0;
      font-size: 12px;
      margin-top: 5px;
    }
  }

  .el-card__body {
    display: flex;
  }
  .content {
    max-width: 450px;
  }
}
.right-content {
  padding: 0;
  flex: 1;
}
</style>
