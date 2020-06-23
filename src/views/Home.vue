<template>
  <div class="container">
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
import { removeToken } from '@/config/token'
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    logout () {
      removeToken('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    background: #eee;
  }
</style>
