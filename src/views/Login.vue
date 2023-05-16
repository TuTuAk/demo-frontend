<template>
  <div class="login_container">
    <div class="login_box">
      <el-header>
        <div class="title" >
          <span style="width: 100%; align-content: center">Moi Kittos</span>
        </div>
      </el-header>
      <div>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
          <el-form-item prop="name">
            <el-input v-model="loginForm.name" placeholder="Name/Email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="Password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="login-button">
            <el-button type="primary" @click="login">login</el-button>
            <router-link to="/register">register</router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginFormRules: {
        name: [
          {
            required: true,
            message: 'please enter username or email',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: 'characters length must between 2 and 10',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'please enter password',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: 'characters length should be between 6 and 20',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login: function () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/user/login', this.loginForm)
        this.$message.success('login success!')
        window.sessionStorage.setItem('token', res.token)
        window.sessionStorage.setItem('uid', res.user.id)
        await this.$router.push('/index')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login_container {
    height: 100%;
  }

  .title {
    font-size: 25px;
    color: #333;
    margin-left: 150px;
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
  .login_box {
    width: 550px;
    height: 360px;
    border: 1px solid #000;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    background-color: #fff;
  }
  .login_form {
    position: absolute;
    bottom: 40px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .login-button {
    display: flex;
    justify-content: center;
    a {
      text-decoration: none;
      color: #aaa;
      font-size: 15px;
      margin-left: 10px;
    }
    a:hover {
      color: rgb(249, 217, 123);
    }
  }

  .info {
    font-size: 13px;
    margin: 10px 15px;
  }
</style>
