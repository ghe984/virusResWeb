<template>
<div class="aside"  style="
    background-color: #dcb170;
">
  <el-row class="tac">
    <el-col :span="12">

      <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :unique-opened="true"
          router
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse">
        <h3 >{{isCollapse ? '后台':'社区疫情防控系统'}}</h3>
<!--        background-color="#545c64"-->
<!--        text-color="#fff"-->
<!--        active-text-color="#ffd04b"-->

        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.path" :index="item.path" >
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :key="item.label"  :index="item.label+''">
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group @click="clickMenu(subItem)"  v-for="subItem  in item.children" :key="subItem.path">
            <template slot="title"></template>
            <el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
<!--        <el-menu-item index="/" >-->
<!--          <i class="el-icon-s-home"></i>-->
<!--          <span slot="title">首页</span>-->
<!--        </el-menu-item>-->
<!--        <el-submenu index="1">-->
<!--          <template slot="title">-->
<!--            <i class="el-icon-location"></i>-->
<!--            <span>登记管理</span>-->
<!--          </template>-->
<!--          <el-menu-item-group>-->
<!--            <template slot="title"></template>-->
<!--            <el-menu-item index="/abnormals">异常登记</el-menu-item>-->
<!--            <el-menu-item index="/outin">出入登记</el-menu-item>-->
<!--&lt;!&ndash;            <el-menu-item index="/vaccinations">接种记录</el-menu-item>&ndash;&gt;-->
<!--          </el-menu-item-group>-->
<!--        </el-submenu>-->
<!--        <el-menu-item index="/residents">-->
<!--          <i class="el-icon-menu"></i>-->
<!--          <span slot="title">住户信息管理</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/materials" >-->
<!--          <i class="el-icon-s-order"></i>-->
<!--          <span slot="title">物资申请管理</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item index="/serves">-->
<!--          <i class="el-icon-s-cooperation"></i>-->
<!--          <span slot="title">志愿服务管理</span>-->
<!--        </el-menu-item>-->

<!--        <el-menu-item index="/informs">-->
<!--          <i class="el-icon-s-tools"></i>-->
<!--          <span slot="title">通知发布管理</span>-->
<!--        </el-menu-item>-->

      </el-menu>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: "CommonAside",
  data(){
    return{
    //  isCollapse: false,
      menuData:[
        {
          path:'/',
          name:'home',
          label:"首页",
          icon:'s-home',
          url:"",
        },
        {

          name:'informs',
          path:'/informs',
          label:"通知发布管理",
          icon:'s-tools',
          url:"",
          children: [
            {
              path:'/addInfo',
              name:'addInfo',
              label: "发布通知"
            },
            {
              path:'/infoList',
              name:'infoList',
              label: "通知列表"
            },

          ],
        },
        {
          label:"登记管理",
          icon:'location',
          children:[
            {
              path:'/abnormals',
              name:'abnormal',
              label:"异常登记",
              icon:'s-home',
              url:"",
            },
            {
              path:'/outin',
              name:'outin',
              label:"出入登记",
              icon:'s-home',
              url:"",
            },
          ]
        },
        {
          path:'/residents',
          name:'residents',
          label:"住户信息管理",
          icon:'menu',
          url:"",
        },
        {
          path:'/serves',
          name:'serves',
          label:"志愿服务管理",
          icon:'s-cooperation',
          children: [
            {
              path:'/serveinfo',
              name:'serveInfo',
              label: "创建志愿活动"
            },
            {
              path:'/serves',
              name:'serves',
              label: "志愿活动参与表"
            },

          ],

        },
        {
          path:'/materials',
          name:'material',
          label:"物资申请管理",
          icon:'s-order',
          url:"",
        },

      ],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
      console.log(item,'item')
      if(this.$route.path!==item.path &&!(this.$route.path==='/home'&&(item.path==='/'))){
        this.$router.push(item.path)
      }
      //面包屑的修改
      this.$store.commit('selectMenu',item)
    }
  },
computed:{
    noChildren(){
      return this.menuData.filter(item=>!item.children)
    },
    hasChildren(){
      return this.menuData.filter(item=>item.children)
    },
  isCollapse(){
      return this.$store.state.tab.isCollapse
  }
}
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-col-12 {
  width: 100%;
}

.el-menu{
  background-color: #dcb170;
  height: 100vh;
  border-right: none;

}
h3{
  color: #f0f9eb;
  text-align: center;
  line-height: 48px;
  font-size: 20px;
  font-weight: 400;
  white-space: nowrap;
}
</style>
