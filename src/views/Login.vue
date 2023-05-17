<template>
<div>
  <el-card  class="box-card">
  <el-form label-width="70px" :inline="true" :model="loginForm" ref="loginForm" :rules="rules">
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-button @click="login()" style="margin-left:calc(50% - 35px);margin-top: 10px" type="primary">登录</el-button>
  </el-form>
  </el-card>



</div>
</template>

<script>
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
import {admLogin} from "@/api/api";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', message: "请输入用户名"}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'}
        ]
      },
    }
  },
  methods:{
    login(){
      this.$refs.loginForm.validate((valid)=>{
        if(valid){
          //得到token 后端的接口要写的
          admLogin(this.loginForm).then(res=>{
            console.log(res)
            if(res.data['code']===200){
              const token=res['adm_id']
              //将token信息存入cookie,
              Cookie.set('token',token)

              //跳转到首页
              this.$router.push('/')
              this.$message.success('登录成功')
            }else{
              this.$message.error('用户名或密码错误');
            }
          })

        }
      })


    }
  }
}
</script>

<style lang="less" scoped>
.box-card{
  width: 350px;
  border:1px solid #eaeaea;
  margin:180px auto;
  box-sizing: border-box;
  .login_title{
    text-align: center;
    margin-bottom: 40px;

  }
}
.el-input{
  width: 200px;
  height: 10px;
}
</style>
