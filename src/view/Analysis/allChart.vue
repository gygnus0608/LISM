<template>
  <div class="contain-box">
      <div class="header-box">
        <div class="select-box">
        <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="图表名称">
        <el-input v-model="selectData.chartTypeName" placeholder="请输入图表名称" />
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
        <el-table-column prop="chartTypeId" label="序号" />
        <el-table-column prop="chartTypeName" label="图表名称"  />
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
import {InitData,ListInt} from '@/type/chart';
import { getChartList } from '@/api/api';
export default defineComponent({
    setup(){
      const data = reactive(new InitData())
        onMounted(()=>{
          getChart()
        })
      const getChart=()=>{
        getChartList(data.token).then((res)=>{
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
          if(data.selectData.chartTypeName){
                  arr = data.list.filter((value)=>{
                      return value.chartTypeName.indexOf(data.selectData.chartTypeName)!==-1
                  });
          }else{
              arr=data.list
          }
          data.selectData.count=arr.length
          data.list=arr
      };
      watch([() => data.selectData.chartTypeName],
              () => {
              if (data.selectData.chartTypeName == "") {
                getChart()
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