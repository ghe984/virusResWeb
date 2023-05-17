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
        <el-form-item label="住户编号" prop="res_id" margin-bottom="0px" >
          <el-input placeholder="请输入住户编号" v-model="ruleForm.res_id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="res_name" :rules="[
      { required: true, message: '姓名不能为空'},]">
          <el-input placeholder="请输入姓名" v-model="ruleForm.res_name" ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="res_sex" :rules="[{ required: true, message: '性别不能为空'},]">
            <el-select v-model="ruleForm.res_sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="res_birth" :rules="[{ required: true, message: '年龄不能为空'},]">
          <el-date-picker
              v-model="ruleForm.res_birth"
              type="date"
              placeholder="选择日期"
          value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="社区门牌号" prop="res_address" :rules="[
      { required: true, message: '门牌号不能为空'},]">
          <el-input v-model.number="ruleForm.res_address"></el-input>
        </el-form-item>

        <el-form-item label="电话号码" prop="res_tel" margin-bottom="10px">
          <el-input placeholder="请输入电话号码" v-model="ruleForm.res_tel"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="res_password" margin-bottom="10px">
          <el-input v-model="ruleForm.res_password"></el-input>
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
      + 新增
    </el-button>
<!--    搜索区域-->
    <el-form  :inline="true" :model="userForm">
      <el-form-item>
        <el-input placeholder="请输入要搜索的编号或姓名" v-model="userForm.name"></el-input>
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
          style="width: 100%"
           max-height="500"
      height="500"
      >
        <el-table-column
            prop="res_id"
            label="住户编号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="res_name"
            label="姓名"
            width="150">
        </el-table-column>
                <el-table-column
                    prop="res_sex"
                    label="性别"
                    width="100">
                  <template slot-scope="scope">
                    <el-tag :type="scope.row.res_sex === 1 ? '':'danger'">{{scope.row.res_sex===1 ? '男':'女'}}</el-tag>
                  </template>
                </el-table-column>

                <el-table-column
                    prop="res_birth"
                    label="出生日期"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="res_address"
                    label="地址"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="res_tel"
                    label="联系电话"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="res_password"
                    label="登录密码"
                    width="150">
                </el-table-column>
        <el-table-column
                    width="150"
                    label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
import {deleteRes, getResidents, postRes, PuteditRes} from "@/api/api";

export default {
  name: "User",
  data(){
    return {
      dialogVisible:false,
      ruleForm:{},
      tableData:[],
      modalType:0,//0表示·新增的弹窗，1表示编辑
      total:0,//数据的总条数
      pageNum:1,//在第几页
      userForm:{
        name:''
      }
    }
  },
  methods: {
    getresidents(){
      //获取列表数据，增加复用
      ////从接口那里得到数据，赋值给tableData
      //赋值给total
      getResidents({page:this.pageNum}).then(response=>{
        this.tableData=response.data.results
        this.total=response.data.count
        console.log(response.data)
      })

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
            if(this.modalType===0){
              //调用新增API  post
              postRes(this.ruleForm).then(response=>{
                console.log("这是response"+response.data)
                this.getresidents()
              })


            }else{
              //调用编辑处理API
              PuteditRes(this.ruleForm.res_id,this.ruleForm.res_password,this.ruleForm.res_name,this.ruleForm.res_sex,this.ruleForm.res_address,
                  this.ruleForm.res_tel,this.ruleForm.res_birth)
                  .then(response=>{
                    console.log("这是response"+response.data)
                    this.getresidents()

                  })
            }
          //更新表单

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
    handleEdit(row){
      this.modalType=1
      this.dialogVisible=true
      //注意要对当前行数据进行深拷贝，否则会出错
      this.ruleForm=JSON.parse(JSON.stringify(row))
    },

    handleDelete(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRes(row.res_id).then({

        })
        this.$message({
          //调用删除API接口  参数里面有row，参数使用row.id即可
          type: 'success',
          message: '删除成功!',
        });
        this.getresidents()
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
      this.getresidents()
    },
    //列表查询
    onSearch(){
      //调用

    },

  },
  mounted() {
    this.getresidents()

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
