<template>
  <el-aside style="width: 150px">
    <div class="my-home-btn" :class="currentPageId === 'index' ? 'active' : ''" @click="changePage('Index')" >{{currentUser.name}}</div>
    <div class="follow-content">
      <div class="follow-item" :class="currentPageId === 'Following' ? 'active' : ''" @click="changePage('Following')" >
        <el-button type="text">Following</el-button>
        <el-tag style="background: none; margin-left: 3px"  class="item">{{currentUser.followingCnt}}
        </el-tag>
      </div>
      <div class="follow-item" :class="currentPageId === 'Followers' ? 'active' : ''" @click="changePage('Followers')" >
        <el-button type="text">Followers</el-button>
        <el-tag style="background: none; margin-left: 3px" class="item">{{currentUser.followerCnt}}
        </el-tag>
      </div>
    </div>
  </el-aside>
</template>
<script>
export default {
  props: {
    currentPageId: {
      type: String,
      default: ''
    },
    currentUser: {}
  },
  methods: {
    changePage (pageId) {
      this.$emit('handlePageChange', pageId)
    }
  }
}
</script>
<style lang="less" scoped>

  .el-aside {
    z-index: 10;
    transform: translateZ(0px);
    position: relative;
    width: 150px;
    font-size: 14px;
    font-weight: 400;
  }
  .my-home-btn {
    height: 38px;
    width: 100px;
    line-height: 30px;
    color: #F9D97A;
    margin-top: 30px;
    padding-left: 30px;
    border: 1px solid;
    &:hover, &.active {
      cursor: pointer;
    }
  }

  .follow-content {
    display: flex;
    flex-direction: column;
    color: #606266;
  }
  .follow-item {
    height: 38px;
    width: 100px;
    line-height: 30px;
    padding-left: 30px;
    cursor: pointer;
    margin: 5px 0;
    border: 1px solid #F9D97A;
  }
  .item{
    height: 30px;
    padding: 0 10px;
    line-height: 30px;
    color: #303133;
    border-color: #F9D97A;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 50%;
    box-sizing: border-box;
    white-space: nowrap;
  }
</style>
