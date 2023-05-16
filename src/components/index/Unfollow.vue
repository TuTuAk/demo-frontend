<template>
  <el-popover placement="top" width="160" v-model="visible">
    <p>Are you sure to unfollow this person？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">cancel</el-button>
      <el-button type="primary" size="mini" @click="handleUnfollow">sure</el-button>
    </div>
    <el-button slot="reference" type="text">unfollow</el-button>
  </el-popover>
</template>
<script>
export default {
  data () {
    return {
      visible: false
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    async handleUnfollow () {
      this.$emit('handleUnfollow', this.id)
      this.visible = false
    }
  }
}
</script>
