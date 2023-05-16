<template>
  <el-header>
    <div class="title" >
      <span style="width: 100%; align-items: center">Moi Kittos</span>
    </div>
    <el-button style="width: 100px" @click="logout" type="primary" size="small">Logout</el-button>
  </el-header>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>
  .title {
    font-size: 25px;
    color: #333;
  }

  .el-header {
    width: 100%;
    height: 48px;
    box-shadow: 0 0 1px 0px rgba(0,0,0,0.15);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logout {
    font-size: 14px;
    cursor: pointer;
  }
</style>
