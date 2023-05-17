<template>
  <div>
    <div class="card1">
      <el-card class="box-card">
        <div>
          <el-form :model="ruleForm"  ref="ruleForm" :inline="true" label-width="120px" class="demo-ruleForm">
            <el-form-item label="编号" prop="res" :rules="[
      { required: true, message: '编号不能为空'},]">
              <el-input v-model="ruleForm.res" placeholder="请输入编号"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="res_name" >
              <el-input style="width: 400px" placeholder="请输入姓名" v-model="ruleForm.res_name" ></el-input>
            </el-form-item>
            <el-form-item label="目的地" prop="access_adr" margin-bottom="10px" :rules="[
      { required: true, message: '目的地不能为空'},]">
              <el-input style="width: 200px" placeholder="请输入目的地" v-model="ruleForm.access_adr"></el-input>
            </el-form-item>
            <el-form-item label="登记者编号" prop="reg" margin-bottom="10px">
              <el-input style="width: 200px" placeholder="请输入登记者编号" v-model="ruleForm.reg"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">立即创建</el-button>
              <el-button @click="cancel()" >重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="card2">
      <el-card class="box-card">
        <div class="manage">
          <div class="manage-header">
            <!--    搜索区域-->
            <el-form  :inline="true" :model="search">
              <el-form-item>
                <el-input placeholder="请输入编号或人员姓名" v-model="search"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch()">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div>
          <div v-if="tableData !== undefined">
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                max-height="400"
                height="400">
              <el-table-column
                  prop="id"
                  label="序号"
                  align="center"
                  width="80">
              </el-table-column>
              <el-table-column
                  prop="res_id"
                  label="住户编号"
                  align="center"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="res_name"
                  label="姓名"
                  align="center"
                  width="100">
              </el-table-column>
              <el-table-column
                  prop="access_adr"
                  label="目的地"
                  align="center"
                  header-align="center"
                  show-overflow-tooltip
                  width="180">
              </el-table-column>

              <el-table-column
                  prop="access_time"
                  label="时间"
                  align="center"
                  header-align="center"
                  width="200">
              </el-table-column>
              <el-table-column
                  prop="res_tel"
                  label="联系电话"
                  align="center"
                  header-align="center"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="reg_id"
                  label="登记人编号"
                  align="center"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="adm_name"
                  label="登记人姓名"
                  align="center"
                  width="120">
              </el-table-column>
              <el-table-column
                  width="100"
                  label="操作">
                <template slot-scope="scope">
                  <!--            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>-->
                  <el-link type="primary" @click="handleDelete(scope.row)">删除</el-link>
                  <!--                <el-button type="danger" size="mini" >删除</el-button>-->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <span class="is-null" v-else>暂无数据</span>
        </div>
        <div class="pager">
          <el-pagination
              background
              layout="prev, pager, next"
              :total=total
              @current-change="handlePage">
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {deleteInout, getInout, postInout, searchAbnoID, searchAbnoName} from "@/api/api";

export default {
  name: "Outin",
  data(){
    return {
      ruleForm:{},
      tableData:[],
      search:'',
      // modalType:0,//0表示·新增的弹窗，1表示编辑
      total:0,//数据的总条数
      pageNum:1,//在第几页
      userForm:{
        name:''
      }
    }
  },
  methods: {
    getData(){
      getInout().then(res=>{
        console.log(res,'res')
        this.tableData=res.data
      })
    },
    onSearch(){
      var numReg = /^[0-9]*$/
      var numRe = new RegExp(numReg)
      if(!numRe.test(this.search)){
        searchAbnoName(this.search).then(response=>{
          this.tableData=response.data
          console.log("已经进入searchname")
          console.log(response.data)
          // this.loadBooks()
        })
      }
      else{
        searchAbnoID(this.search).then(response=>{
          this.tableData=response.data
          console.log("已经进入searchsid")
          console.log(response.data)
        })
      }
    },
    handleAdd(){
      this.dialogVisible=true
      this.modalType=0
    },
    //弹窗关闭时触发
    submitForm(){
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          // 后续对表单数据的处理
          //调用新增API  post
          postInout(this.ruleForm).then(response=>{
            console.log("这是response"+response)
            this.$message({
              type:'success',
              message:'登记成功!',
            })
          })
          //更新表单
          this.getData()
          //清空表单
          this.$refs.ruleForm.resetFields()
        }
      })
    },
    cancel(){
      this.$refs.ruleForm.resetFields()
    },

    //表格
    tableRowClassName({ rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    // handleEdit(row){
    //   this.modalType=1
    //   this.dialogVisible=true
    //   //注意要对当前行数据进行深拷贝，否则会出错
    //   this.ruleForm=JSON.parse(JSON.stringify(row))
    // },

    handleDelete(row){
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log('rowid',row.id,row.abnormal_id)
        deleteInout(row.id).then(response=>{
          console.log(response)
          this.getData()
        })
        this.$message({
          //调用删除API接口  参数里面有row，参数使用row.id即可
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
    //分页
    handlePage(val){
      console.log('page',val)
      this.pageNum=val
      this.getdata()
    },
    //列表查询

  },
  mounted() {
    this.getData()

  }
}
</script>

<style lang="less" scoped>
.card1{
  height: 200px;
}
.card2{
  height: 300px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.manage{
  .manage-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  height:50px;
  //.common-table{
  //  position: relative;
  //  //height: (cal(100%-62px));
  //  .pager{
  //    //position: absolute;
  //    bottom: 0;
  //    right: 20px;
  //  }
  //}
}
.el-table__body-wrapper is-scrolling-right{
  height: 360px;
}
</style>
