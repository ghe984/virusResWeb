import Vue from 'vue'
import VueRouter from "vue-router"
import Home from'../views/Home'
import Main from'../views/Main'
import Residents from '../views/Residents'
import Abnormals from '../views/Abnormals'
import Outin from '../views/Outin'
import Materials from '../views/Materials'
import Informs from '../views/Informs'
import Serves from "@/views/Serves";
import Login from '../views/Login'

import Cookie from 'js-cookie'
import serveInfo from "@/views/serveInfo";
import addInfo from "@/views/addInfo";



Vue.use(VueRouter)

//创建路由组件

const routes=[
   // {path:'/home',component:Home},
   // {path:'/',redirect:'/home'},
    {
        path:'/',
        component: Main,
        redirect:'/home',
        children:[
            {path:'residents',name:"residents" ,component:Residents},
            {path:'home',name:"home", component:Home},
            {path:'abnormals',name:"abnormals", component:Abnormals},
            {path:'outin',name:"outin", component:Outin},
            {path:'materials',name:"materials", component:Materials},
            {path:'infoList',name:"informs", component:Informs},
            {path:'addInfo',name:"addInfo", component:addInfo},
            {path:'serves',name:"serves", component:Serves},
            {path:'serveinfo',name:"servesInfo", component:serveInfo},

        ]
    },
    {
        path:'/login',
        name:"login",
        component: Login,
    }

]

const router=new VueRouter({
    routes
})
router.beforeEach((to,from,next)=>{
    const token=Cookie.get('token')
    if(!token && to.name!=='login'){
        next({name:'login'})
    }else if(token&&to.name==='login'){
        next({name:'home'})
    }else{
        next()
    }
})
export default router

