<template>
<div class="header-container">
  <div class="l-content">
    <el-button icon="el-icon-menu" size="small" @click="headMenu"></el-button>
<!--    <span class="text" >首页</span>-->
    <div class="text">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path: item.path}">{{item.label}}</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
  </div>
  <div class="r-content">
    <el-dropdown @command="handleClick">
  <span class="el-dropdown-link">
    <img  class="img" src="../assets/img/logo.png">
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>

      </el-dropdown-menu>
    </el-dropdown>
  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
import Cookie from "js-cookie";
export default {
  name: "CommonHeader",
  data(){
    return{}
  },
  methods:{
    headMenu(){
      this.$store.commit('collapseMenu')
    },
    handleClick(command){
      if(command==='logout'){
        //清除token
        // localStorage.removeItem('token')
        Cookie.remove('token')
        //跳转到登录页面
        this.$router.push('/login')
      }
    }
  },
  computed:{
    ...mapState({
        tags:state=>state.tab.tabsList
             })
  },
  mounted() {
    console.log(this.tags,'tags')
  }

}
</script>

<style lang="less" scoped>
.header-container{
  padding: 0 20px;
  background-color: #e2c69c;
  height:50px;
  display: flex;
  justify-content: space-between;//两端对齐
  align-items: center;
  .text{
    color:#ffffff;
    font-size: 14px;
    margin-left: 10px;
  }
  .r-content{
    .img{
      width:40px;
      height:40px;
      border-radius: 50%;
    }
  }
  .l-content{
    display: flex;
    align-items: center;
    ::v-deep .el-breadcrumb_item{
      .el-breadcrumb_inner{
        &.is-link{
          font-weight: lighter;
          color: #ffffff;
        }
      }
    }
  }
}

</style>
