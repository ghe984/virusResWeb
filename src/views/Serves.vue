<template>
  <div>
    <el-card class="box-card">
    <div class="manage">
      <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose">
        <!--    增加住户信息-->
        <div>
          <el-form :model="ruleForm"  ref="ruleForm" :inline="true" label-width="70px" class="demo-ruleForm">
            <el-form-item label="活动编号" prop="serve_id" :rules="[
      { required: true, message: '活动编号不能为空'},]">
              <el-input placeholder="请输入活动编号" v-model="ruleForm.serve_id" ></el-input>
            </el-form-item>
            <el-form-item label="参与人员账号" prop="res_id" :rules="[
      { required: true, message: '参与人员账号不能为空'},]">
              <el-input v-model="ruleForm.res_id"></el-input>
            </el-form-item>
            <el-form-item label="记录编号" prop="id" margin-bottom="10px">
              <el-input placeholder="请输入记录编号" v-model="ruleForm.id"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="cancel()">取 消</el-button>
    <el-button type="primary" @click="submitForm()">确 定</el-button>
  </span>
      </el-dialog>

      <div class="manage-header">
        <el-button type="primary" @click="handleAdd()">
          + 添加参与人员
        </el-button>
        <!--    搜索区域-->
        <el-form  :inline="true" :model="search">
          <el-form-item>
            <el-input placeholder="请输入活动编号或人员姓名" v-model="search"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div>
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="serve_id"
            label="活动编号"
            align="center"
            width="50">
        </el-table-column>
        <el-table-column
            prop="res_name"
            label="参与人员"
            align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="serve_title"
            label="活动名称"
            align="center"
            width="100">
<!--          <template slot-scope="scope">-->
<!--            <span>{{scope.row.res_sex===1 ? '男':'女'}}</span>-->
<!--          </template>-->
        </el-table-column>

        <el-table-column
            prop="serve_text"
            label="活动内容"
            align="center"
            width="150">
<!--          <template slot-scope="" >-->
<!--            <el-tooltip content="Top center" placement="top"></el-tooltip>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column
            prop="start_time"
            label="开始时间"
            align="center"
            width="200">
        </el-table-column>
        <el-table-column
            prop="span_time"
            label="志愿时长"
            align="center"
            width="150">
        </el-table-column>
        <el-table-column
            prop="adm_name"
            label="负责人"
            align="center"
            width="100">
        </el-table-column>

        <el-table-column
            prop="res_tel"
            label="人员电话"
            align="center"
            width="150">
        </el-table-column>
        <el-table-column
            width="150"
            align="center"
            label="操作">
          <template slot-scope="scope">
<!--            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>-->
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
</template>

<script>
import {deleteServeReg, getServe, postSerReg, searchSeverId, searchSeverName} from "@/api/api";

export default {
  name: "Serves",
  data(){
    return {
      dialogVisible:false,
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
    getdata(){
      //获取列表数据，增加复用
      ////从接口那里得到数据，赋值给tableData
      //赋值给total
      getServe({page:this.pageNum}).then(response=>{
        this.tableData=response.data
        // this.total=response.data.count
        console.log(response.data)
      })

    },
    onSearch(){
      var numReg = /^[0-9]*$/
      var numRe = new RegExp(numReg)
      if(!numRe.test(this.search)){
        searchSeverName(this.search).then(response=>{
          this.tableData=response.data
          console.log("已经进入searchname")
          console.log(response.data)
          // this.loadBooks()
        })
      }
      else{
        searchSeverId(this.search).then(response=>{
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
    handleClose(done) {
      this.$refs.ruleForm.resetFields()
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then( _ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch( _ => {});

    },
    submitForm(){
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          // 后续对表单数据的处理
            //调用新增API  post
          postSerReg(this.ruleForm).then(response=>{
              console.log("这是response"+response.data)
              this.getdata()
            })
          //更新表单
            this.getdata()
          //清空表单
          this.$refs.ruleForm.resetFields()
          //关闭弹窗
          this.dialogVisible=false
        }
      })
    },
    cancel(){
      this.$refs.ruleForm.resetFields()
      this.dialogVisible=false
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
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteServeReg(row.id).then(response=>{
          console.log(response)
          this.getdata()
        })
        this.$message({
          //调用删除API接口  参数里面有row，参数使用row.id即可
          type: 'success',
          message: '删除成功!',
        });
        this.getdata()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
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
    this.getdata()

  }
}
</script>

<style lang="less" scoped>
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
  height:90%;
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
