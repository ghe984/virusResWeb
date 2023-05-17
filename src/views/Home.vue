<template>
<div>
  <el-row>
    <el-col :span="10" style="padding-right: 10px">
      <el-card class="box-card">
        <div  class="user">
          <img src="../assets/img/logo.png">
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">系统管理员</p>
          </div>
        </div>
        <div class="login-info">
            <p>上次登录时间：<span>{{date}}</span></p>
            <p>上次登录地点：<span>杭州</span></p>
        </div>
      </el-card>
        <el-card >
          <div id="map">
            <div id="mychart2" style="width: 500px;height: 480px;text-align: center"></div>
          </div>
          <h5 style="color: darkkhaki;float: left">上述数据更新截止至{{dataTime}}</h5>
        </el-card>

    </el-col>
<!--    右侧-->
    <el-col :span="14" style="padding-left: 10px">
      <div class="num" >
       <el-card v-for="item in cardData" :key="item.name" :body-style="{display:'flex',padding:0}">
         <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
         <div class="detail">
           <p class="count">{{item.value}}</p>
           <p class="desc">{{item.name}}</p>
         </div>
       </el-card>
      </div>


<!--      //折线图-->
      <el-card style="height: 280px">
        <div ref="echart1" style="height: 280px">

        </div>
      </el-card>
<!--      下面两个图-->
      <div class="graphs">
        <el-card style="height: 300px">
          <div ref="echart2" style="height: 300px"></div>
        </el-card>
        <el-card style="height: 300px">
          <div ref="echart3" style="height: 300px"></div>
        </el-card>
      </div>
</el-col>
  </el-row>
</div>
</template>

<script>
import echarts from 'echarts';
import 'echarts/map/js/china';
import jsonp from'jsonp';
import {getData, resCount, serveCount, serverCount} from "@/api/api";
// import {getData} from "@/api";

const  option={
  title: {
    text: '中国疫情实时动态地图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['中国疫情图']
  },
  visualMap: {
    type: 'piecewise',
    pieces: [
      {min: 1000, max: 1000000, label: '大于等于1000人', color: '#372a28'},
      {min: 500, max: 999, label: '确诊500-999人', color: '#4e160f'},
      {min: 100, max: 499, label: '确诊100-499人', color: '#974236'},
      {min: 10, max: 99, label: '确诊10-99人', color: '#ee7263'},
      {min: 1, max: 9, label: '确诊1-9人', color: '#f5bba7'},
    ],
    color: ['#E0022B', '#E09107', '#A3E00B']
  },
  toolbox: {
    show: false,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      mark: {show: true},
      dataView: {show: true, readOnly: false},
      restore: {show: true},
      saveAsImage: {show: true}
    }
  },
  roamController: {
    show: true,
    left: 'right',
    mapTypeControl: {
      'china': true
    }
  },
  series: [
    {
      name: '确诊人数',
      type: 'map',
      mapType: 'china',
      roam: false,
      zoom:1.2,
      label: {
        normal:{
          show:true,
          color: 'rgba(249, 249, 249)',
          textStyle:{
            fontsize:8
          }
        }
      },
      //地图区域的多边形图形样式
      itemStyle:{
        normal:{
          areaColor:'rgba(0,255,236,0',
          borderColor:'rgba(0,0,0,0.2)',
        },
      },
      //高亮时多边形图形样式
      emphasis:{
        areaColor: 'rgba(255,180,0,0.8)',
        shadowOffsetX:0,
        shadowOffsetY:0,
        shadowBlur:20,
        borderWidth:0,
        shadowColor:'rgba(0,0,0,0.5)',
      },
      data: [],
    }
  ]
}

export default {
  // name: "Home",
  data(){
    return{
      dataTime:'',
      date:'',
      cardData:[
        {
          name:"社区总人数",
          value:12,
          icon:"s-custom",
          color:"#2ec7c9",
        },
        {
          name:"参与志愿人数",
          value:34,
          icon:"s-claim",
          color:"#2ec7c9",
        },
        {
          name:"今日异常登记人数",
          value:2,
          icon:"s-release",
          color:"#2ec7c9",
        },
        {
          name:"今日出入次数",
          value:32,
          icon:"s-promotion",
          color:"#2ec7c9",
        },

        {
          name:"今日物资申请人数",
          value:2,
          icon:"s-cooperation",
          color:"#2ec7c9",
        },
        {
          name:"发布志愿总数",
          value:34,
          icon:"success",
          color:"#2ec7c9",
        },
      ],

    }
  },
  methods:{
    getNewData(){
      jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json' ,{},(err,data)=>{
        if(!err){
          console.log(data)
          let list=data.data.list.map(item=>{
            return {
              name:item.name,
              value:item.econNum,
            }
          })
          option.series[0].data=list
          this.myEchart.setOption(option);
          this.dataTime=data.data.cachetime;
        }
      })
    }
  },
  mounted() {
    getData().then(({data})=>{
      console.log(data)
      const echart1=echarts.init(this.$refs.echart1)
      var option1={}
      const {orderData,serveData,ageData}=data.data
      const xAxis=Object.keys(orderData.data[0])
      const xAxisData={
        data:xAxis
      }
      option1.xAxis={
        data:orderData.date
      }
      option1.yAxis={}
      option1.legend=xAxisData
      option1.series=[]
      xAxis.forEach(key=>{
        option1.series.push({
          name:key,
          data:orderData.data.map(item=>item[key]),
          type:'line'
        })
      })
      option1.tooltip={}
      echart1.setOption(option1)

      // 柱状图
      const echart2=echarts.init(this.$refs.echart2)
      var option2={
        legend:{
          textStyle: {
            color:"#333",
          }
        },
        grid:{
          left:"20%",
        },
        tooltip:{
          trigger: "axis",
        },
        xAxis:{
          type:"category",
          data:serveData.map(item=>item.data),
          axisLine:{
            lineStyle:{
              color:"#17b3a3",
            },
          },
          axisLabel:{
            interval:0,
            color:"#333",
          },
        },
        yAxis:[
          {
            type:"value",
            axisLine:{
              lineStyle:{
                color:"#17b3a3",
              },
            },
          },
        ],
        color:["#2ec7c9","#b6a2de"],
        series:[
          {
            name:"新增住户",
            data:serveData.map(item=>item.new),
            type:'bar'
          },
          {
            name:"平台活跃住户",
            data:serveData.map(item=>item.active),
            type:'bar',
          }
        ],
      }
      echart2.setOption(option2)

       //饼状图
      const echart3=echarts.init(this.$refs.echart3)
      var option3={
        tooltip:{
          trigger:"item",
        },
        color:[
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
        ],
        series:[
          {
            data:ageData,
            type:'pie'
          }
        ],
      }
      echart3.setOption(option3)
    });
    resCount().then(res=>{
      console.log(res,'cardvalue')
      this.cardData[0].value=res.data['count']
      this.date=res.data['date']
    })
    serverCount().then(res=>{
      // console.log(res,'cardvalue')
      this.cardData[1].value=res.data['count']
    })
    serveCount().then(res=>{
      this.cardData[5].value=res.data['count']
    })

    this.getNewData();
    this.myEchart=echarts.init(document.getElementById('mychart2'));
    this.myEchart.setOption(option);

  },
  created() {
    this.getNewData();
  }

}
</script>

<style lang="less" scoped>
.user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img{
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;

  }
  .user-info{
    .name{
      font-size: 32px;
      margin-bottom: 10px;

    }
    .access{
      color:#999999;
    }
  }

  }
.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span{
      color:#666666;
      margin-left: 60px;
    }
  }
}
.num{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon{
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #ffffff;
  }
  .detail{
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .count{
      font-size: 30px;
      margin-bottom:10px;
      line-height: 30px;
      height: 30px;
    }
    .desc{
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
  .el-card{
    width: 32%;
    margin-bottom: 20px;
  }
}
.graphs{
  margin-top: 20px;
  display: flex;//弹性布局
  justify-content: space-between;//靠两边
  .el-card{
    width: 48%;
  }
}
</style>
