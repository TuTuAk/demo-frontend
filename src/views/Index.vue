<template>
  <div class="home-container">
    <Header />
    <el-container class="bottom-container">
      <LeftSider @handlePageChange="changePage" :currentPageId.sync="currentPageId" :currentUser="currentUser"/>
      <Container :currentUser="currentUser" v-if="currentPageId === 'Index'" @refreshCurrentUser="getCurrentUser"/>
      <RightSider :currentPageId.sync="currentPageId" @handlePageChange="changePage" @refreshCurrentUser="getCurrentUser" v-else/>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/index/Header'
import LeftSider from '@/components/index/LeftSider'
import Container from '@/components/index/Container'
import RightSider from '@/components/index/RightSider.vue'

export default {
  data () {
    return {
      loading: false,
      currentUser: {},
      currentPageId: 'Index'
    }
  },
  components: {
    Header,
    LeftSider,
    Container,
    RightSider
  },
  created () {
    this.getCurrentUser()
  },
  methods: {
    async getCurrentUser () {
      const { data: res } = await this.$http.get('/api/user')
      this.currentUser = res
    },
    changePage (pageId) {
      this.currentPageId = pageId
    }
  }
}
</script>

<style lang="less" scope>
  .home-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .bottom-container {
    width: 760px;
    margin: 0 auto;
    color: #333;
    background-color: rgba(255, 255, 255, 0.25);
    overflow: auto;
  }
</style>
