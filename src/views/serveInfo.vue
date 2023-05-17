<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-form :model="ruleForm"  ref="ruleForm"  label-width="70px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="serve_title" :rules="[
      { required: true, message: '活动名称不能为空'},]">
            <el-input placeholder="请输入活动名称" v-model="ruleForm.serve_title" ></el-input>
          </el-form-item>
          <el-form-item label="服务内容" prop="res_sex">
            <el-input v-model="ruleForm.serve_text" placeholder="请输入服务内容">
            </el-input>
          </el-form-item>
          <el-form-item label="开始时间" prop="start_time" :rules="[{ required: true, message: '开始时间不能为空'},]">
            <el-date-picker
                v-model="ruleForm.start_time"
                type="datetime"
                placeholder="选择开始时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="志愿时长" prop="span_time" :rules="[
      { required: true, message: '志愿时长不能为空'},]">
            <el-input v-model.number="ruleForm.span_time"></el-input>
          </el-form-item>
          <el-form-item label="负责人编号" prop="manager" margin-bottom="10px">
            <el-input placeholder="请输入负责人编号" v-model="ruleForm.manager"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="butt">
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
              <el-button type="info" icon="el-icon-message" @click="dialogVisible = true">志愿活动列表</el-button>
            </div>

          </el-form-item>
        </el-form>
      </div>
      <div class="manage">
        <el-dialog
            title="活动列表"
            :visible.sync="dialogVisible"
            width="58%"
            :before-close="handleClose">
          <!--    展示通知列表-->
          <div>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%"
                max-height="800"
                height="400">
              <el-table-column
                  prop="serve_id"
                  label="活动编号"
                  align="center"
                  width="50">
              </el-table-column>
              <el-table-column
                  prop="serve_title"
                  label="活动名称"
                  align="center"
                  width="100">
              </el-table-column>

              <el-table-column
                  prop="serve_text"
                  label="活动内容"
                  align="center"
                  show-overflow-tooltip
                  width="150">
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
                  v-slot="scope"
                  label="报名中"
                  width="90"
                  align="center"
                  header-align="center"
              >
                <el-switch
                    :disabled="scope.row.isend === 1"
                    v-model="scope.row.isend"
                    active-color="#13ce66"
                    :active-value="0"
                    :inactive-value="1"
                    @change="changeState(scope.row)"
                >
                </el-switch>
              </el-table-column>
              <el-table-column
                  width="150"
                  label="操作">
                <template slot-scope="scope">
                  <!--            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>-->
                  <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">返回</el-button>
<!--    <el-button type="primary" @click="submitForm()">确 定</el-button>-->
  </span>
        </el-dialog>
      </div>

    </el-card>
  </div>

</template>

<script>
import {deleteServeInfo, getServeInfo, postServeInfo,putServeInfo} from "@/api/api";

export default {
  name: "serveInfo",
  data(){
    return{
      ruleForm:{},
      dialogVisible:false,
      tableData:[],
    }
  },
  methods:{
    getdata(){
      getServeInfo().then(response=>{
        this.tableData=response.data
        console.log(response.data,'Serveinfo')
      })
    },
    handleClose(done){
      this.$refs.ruleForm.resetFields()
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then( _ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch( _ => {});
      this.getdata()
    },
    onSubmit(){
      this.$refs.ruleForm.validate((valid)=> {
      if(valid){
        postServeInfo(this.ruleForm).then(response=>{
          console.log('data',response.data)
          this.getdata()
        })
      }
      })
    },
    changeState(row){
      this.$confirm('此操作将使该志愿停止报名, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log('rowid',row.id,row.abnormal_id)
        putServeInfo(row.serve_id).then(response=>{
          console.log(response)
          this.getdata()
        })
        this.$message({
          //调用删除API接口  参数里面有row，参数使用row.id即可
          type: 'success',
          message: '更改成功!',
        });
        this.getdata()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
        this.getdata()
      });
    },
    handleDelete(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteServeInfo(row.serve_id).then(response=>{
          console.log(response)
          this.getdata()
        })
        this.$message({
          //调用删除API接口  参数里面有row，参数使用row.id即可
          type: 'success',
          message: '删除成功!',
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

  },
  mounted() {
    this.getdata()
  }
}
</script>

<style scoped>
.butt{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
