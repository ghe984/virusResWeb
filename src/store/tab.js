export default {
    state:{
        isCollapse:false,
        //面包屑数据
        tabsList:[
            {
                path:'/',
                name:'home',
                label:"首页",
                icon:'s-home',
                url:"",
            },
        ],
    },
    mutations:{
        //修改菜单方法
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state,val){
            console.log(val,'val')
            if(val.name!=='home'){
                const index = state.tabsList.findIndex(item=>item.name===val.name)
                if(index===-1){
                    state.tabsList.push(val)
                }
            }
            console.log(state.tabsList,'tabsList_tab')

        }
    }
}
