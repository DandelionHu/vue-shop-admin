<template>
  <div class="container">
    <div class="login-box">
      <div class="logo">
        <img src="../assets/images/logo.png" alt="">
      </div>
      <el-form class="login-form" label-width="0px" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <!--用户名-->
        <el-form-item prop="account">
          <el-input placeholder="请输入账号" prefix-icon="el-icon-user" v-model="loginForm.account"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-unlock" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!--登录按钮-->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="warning" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ShopApi from '@/api/shopApi'
export default {
  name: 'login',
  data () {
    return {
      // 表单数据绑定
      loginForm: {
        account: '',
        password: ''
      },
      // 表单校验规则
      loginFormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交
    submitForm () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const res = await ShopApi.loginAccount(this.loginForm)
        console.log(res)
      })
    },
    // 重置
    resetForm () {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
  .container{
    position: relative;
    width: 100%;
    height: 100%;
    background: @background-theme;
    .login-box{
      background: @background-write;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 500px;
      z-index: 10;
      height: 500px;
      margin-left: -250px;
      margin-top: -250px;
      .logo{
        width: 100%;
        height: 100px;
        text-align: center;
        padding: 40px 0px 50px;
        img{
          height: 100%;
          display: inline-block;
          width: auto;
        }
      }
      .login-form{
        padding: 0px 50px;
        box-sizing: border-box;
        .btns{
          text-align: center;
          button{
            width: 100%;
          }
        }
      }

    }
  }
</style>
