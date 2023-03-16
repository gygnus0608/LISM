<template>
  <div class="contain-box">
      <div class="header-box">
        <div class="select-box">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="统计分析名称">
        <el-input v-model="selectData.analysisName" placeholder="请输入统计分析名称" />
      </el-form-item>
      <el-form-item label="样品模板名称">
        <el-input v-model="selectData.templateName" placeholder="请输入样品模板名称" />
      </el-form-item>
      <el-form-item label="委托单下属项目名称">
        <el-input v-model="selectData.orderTestName" placeholder="请输入委托单下属项目名称" />
      </el-form-item>
      <el-form-item>
        <el-button class="button" @click="onSubmit">查询</el-button>
      </el-form-item>
      
    </el-form>
      </div>
      <div class="new-box">
        <el-form-item>
          <el-button class="button" @click="onInsert">新增</el-button>
        </el-form-item>
      </div>
      </div>
      
      <el-table :data="dataList.comList" border height="400" style="width: 100% " >
        <el-table-column prop="analysisId" label="序号" />
        <el-table-column prop="analysisName" label="统计分析名称"  />
        <el-table-column prop="templateId" label="样品模板名称" />
        <el-table-column prop="orderTestId" label="委托单下属项目名称" />
        <el-table-column prop="analysisFile" label="下属检测项目图表文件地址" />
        <el-table-column prop="role" label="操作" >
        <template #default="scope">
          <el-button  @click="changeContent()"
            >编辑</el-button>
            <el-button type="danger"
             @click="deleteContent()"
            >删除</el-button>
        </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
    </div>
</template>

<script lang="ts">
import { onMounted,toRefs,reactive } from 'vue';
import {InitData,ListInt} from '@/type/analysis';
import { getAnalysisList } from '@/api/api';
export default defineComponent({
    setup(){
      const data = reactive(new InitData())
        onMounted(()=>{
          getAnalysis()
        })
      const getAnalysis=()=>{
        getAnalysisList(data.token).then((res)=>{
            console.log(res)
          });
      }
      const currenChange=(page:number)=>{
                  data.selectData.page=page
              }
      const sizeChange=(pagesize:number)=>{
          data.selectData.pagesize=pagesize
      }
      const dataList = reactive({
        comList:computed(()=>{
            return data.list.slice(
                (data.selectData.page-1)*data.selectData.pagesize,
                data.selectData.page*data.selectData.pagesize)
              })
          })
      const onSubmit = () =>{
          let arr:ListInt[]=[]//定义数组，用来接收查询后要展示的数据
          //判断是否有输入值
          if(data.selectData.analysisName ||data.selectData.orderTestName || data.selectData.templateName){
              if(data.selectData.analysisName){
                  arr = data.list.filter((value)=>{
                      return value.analysisName.indexOf(data.selectData.analysisName)!==-1
                  });
              }
              if(data.selectData.orderTestName){
                  arr = data.list.filter((value)=>{
                      return value.orderTestName.indexOf(data.selectData.orderTestName) !== -1
                  });
              }
              if(data.selectData.templateName){
                  arr = data.list.filter((value)=>{
                      return value.templateName.indexOf(data.selectData.templateName) !== -1
                  });
              }
          }else{
              arr=data.list
          }
          data.selectData.count=arr.length
          data.list=arr
      };
      watch([() => data.selectData.analysisName, () => data.selectData.orderTestName,() => data.selectData.templateName],
              () => {
              if (data.selectData.analysisName == "" && data.selectData.orderTestName == "" && data.selectData.templateName == "") {
                getAnalysis()
              }
      });
      const onInsert=()=>{

      }
      const changeContent=()=>{
        
      }
      const deleteContent=()=>{

}
      return {...toRefs(data),dataList,onSubmit,onInsert,changeContent,deleteContent,currenChange,sizeChange}
  }
})

</script>

<style lang="less" scoped>
.contain-box{
    width: 85%;
    .header-box{
        display: flex;
        justify-content: space-between;
        // margin:10px
    }
    .select-box{
        .button{
            background: rgba(0,64,255,0.36);
        }
        .el-form-item.asterisk-left{
            margin:10px;
            }
        }
    .new-box{
        margin-top: 10px;
    }
}
</style>