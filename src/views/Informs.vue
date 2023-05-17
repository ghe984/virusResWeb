<template>
  <div>
    <el-card>
    <div>
      <div v-if="tableData !== undefined">
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="500"
            height="500">
          <el-table-column
              prop="info_id"
              label="序号"
              align="center"
              width="100">
          </el-table-column>
          <el-table-column
              prop="info_type"
              label="类型"
              align="center"
              width="100">
            <template slot-scope="scope">
              <el-tag :type="scope.row.info_type === 1 ? '':'success'">
              {{scope.row.info_type === 1 ? '疫情防控':'社区通知'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="inform_title"
              label="标题"
              align="center"
              header-align="center"
              show-overflow-tooltip
              width="200">
          </el-table-column>

          <el-table-column
              prop="info_abstract"
              label="摘要"
              align="center"
              header-align="center"
              show-overflow-tooltip
              width="200">
          </el-table-column>
          <el-table-column
              prop="inform_text"
              label="内容"
              align="center"
              show-overflow-tooltip
              header-align="center"
              width="400">
          </el-table-column>
          <el-table-column
              prop="inform_time"
              label="发布日期"
              align="center"
              header-align="center"
              width="180">
          </el-table-column>

          <el-table-column
              v-slot="scope"
              label="是否发布"
              width="90"
              align="center"
              header-align="center"
          >
            <el-switch
                :disabled="scope.row.ispubliced === 0"
                v-model="scope.row.ispubliced"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="changeState(scope.row)"
            >
            </el-switch>
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
    </el-card>
  </div>
</template>

<script>
import {deleteInfo, getinfo, putInfo} from "@/api/api";

export default {
  name: "Informs",
  data(){
    return{
      tableData:[],
    }
  },
  methods:{
    getData(){
      getinfo().then(res=>{
        console.log(res,'info_res')
        this.tableData=res.data
      })
    },
    changeState(row){
      this.$confirm('此操作将使该通知不发布, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log('rowid',row.id,row.abnormal_id)
        putInfo(row.info_id).then(response=>{
          console.log(response)
          this.getData()
        })
        this.$message({
          //调用删除API接口  参数里面有row，参数使用row.id即可
          type: 'success',
          message: '更改成功!',
        });
        this.getData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
        this.getData()
      });
    },
    handleDelete(row){
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log('rowid',row.id,row.abnormal_id)
        deleteInfo(row.info_id).then(response=>{
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
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>

</style>
