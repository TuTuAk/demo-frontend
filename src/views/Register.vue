<template>
  <div class="register_container">
    <div class="register_box">
      <div>
        <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px" class="register_form">
          <el-form-item prop="name">
            <el-input v-model="registerForm.name" placeholder="Name"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="registerForm.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="registerForm.password" placeholder="Password" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input v-model="registerForm.repassword" placeholder="Password Confirmation" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="register">Register</el-button>
            <router-link to="/login">Login</router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const repeatValidate = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('Passwords do not match'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        repassword: ''
      },
      registerFormRules: {
        name: [
          {
            required: true,
            message: 'please enter username',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: 'characters length should be between 2 and 10',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: 'please enter email',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 30,
            message: 'characters length should be between 6 and 30',
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
        ],
        repassword: [
          {
            required: true,
            message: 'please enter password again',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 20,
            message: 'characters length should be between 6 and 20',
            trigger: 'blur'
          },
          {
            validator: repeatValidate,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    register: function () {
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) return false
        await this.$http.post('/api/user/register', this.registerForm)
        this.$message.success('register success')
        await this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .register_container {
    height: 100%;
  }

  .register_box {
    width: 550px;
    height: 400px;
    background-color: #fff;
    border: 1px solid #000;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    background-color: #fff;
  }

  .register_form {
    position: absolute;
    bottom: 1px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
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
