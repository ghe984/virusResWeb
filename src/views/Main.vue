<template>
<div>
  <el-container>
    <el-aside width="auto">
      <commonAside/>
    </el-aside>
    <el-container>
      <el-header>
        <common-header/>
      </el-header>
<!--      <common-tag/>-->
      <el-main>
        <!--  子路由的路由出口-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</div>
</template>

<script>
import commonAside from '../components/CommonAside'
//import CommonHeader from '../components/CommonHeader'
import CommonHeader from "@/components/CommonHeader";
// import CommonTag from "../components/CommonTag";
export default {
  name: "Main",
  components:{
    CommonHeader,
    commonAside,
    // CommonTag,
  }
}
</script>

<style scoped>
.el-header{
  padding: 0;
}
</style>
