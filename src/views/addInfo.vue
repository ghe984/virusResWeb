<template>
<div>
<el-card>
  <div>
    <el-form :model="ruleForm"  ref="ruleForm"  label-width="70px" class="demo-ruleForm">
      <el-form-item label="类型" prop="info_type" :rules="[
      { required: true, message: '通知类型不能为空'},]">
          <el-select v-model="ruleForm.info_type" placeholder="请选择类型">
            <el-option label="社区通知" :value="2"></el-option>
            <el-option label="疫情防控" :value="1"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="inform_title" :rules="[
      { required: true, message: '标题不能为空'},]">
        <el-input v-model="ruleForm.inform_title" placeholder="请输入通知标题">
        </el-input>
      </el-form-item>
      <el-form-item label="摘要" prop="info_abstract">
        <el-input v-model="ruleForm.info_abstract" placeholder="请输入通知摘要">
        </el-input>
      </el-form-item>
      <el-form-item label="内容" prop="inform_text" :rules="[
      { required: true, message: '内容不能为空'},]">
        <div>
          <mavon-editor v-model="ruleForm.inform_text"/>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="butt">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button type="primary"  @click="cancel()">重置</el-button>
        </div>

      </el-form-item>
    </el-form>
  </div>
</el-card>
</div>
</template>

<script>
import { postInfo} from "@/api/api";

export default {
  name: "addInfo",
  data(){
    return{
      ruleForm:{},
    }
  },
  methods:{
    onSubmit(){
      this.$refs.ruleForm.validate((valid)=>{
        if(valid){
          // 后续对表单数据的处理
          //调用新增API  post
          postInfo(this.ruleForm).then(response=>{
            console.log("这是response"+response.data)
            this.$message({
              type:'success',
              message:'创建成功!',
            })
          })
          //清空表单
          this.$refs.ruleForm.resetFields()
        }
      })
    },
    cancel(){
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped>

</style>
