<template>
    <div class="contain-box">
      <div class="header-box">
        <div class="select-box">
        <el-form :inline="true" :model="getResultId" class="demo-form-inline">
      <el-form-item label="检测结果">
        <el-input v-model="getResultId.resultName" placeholder="请输入检测结果" />
      </el-form-item>
      <el-form-item label="任务单">
        <el-select  v-model="getCirculationId.circulationName" clearable placeholder="请选择任务单">
            <el-option 
          v-model="getCirculationId.circulationName" 
          v-for="item in circulation"
          :key="item.CIRCULATIONID" 
          :label="item.CIRCULATIONNAME"
          :value="item.CIRCULATIONNAME" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="button" @click="onSubmit">查询</el-button>
      </el-form-item>
      
    </el-form>
      </div>
      <div class="new-box" >
        <el-form-item>
          <el-button class="button"  @click="onInsert">新增</el-button>
        </el-form-item>
      </div>
      </div>
      
      <el-table :data="dataList.comList" border height="400" style="width: 100% " >
        <el-table-column prop="RESULTID" label="结果表id"  />
        <el-table-column prop="RESULTNAME" label="检测结果"  />
        <el-table-column prop="CIRCULATIONNAME" label="任务单"  />
        <el-table-column prop="TESTRANK" label="测量编号" />
        <el-table-column prop="TESTDATA" label="检测值" />
        <el-table-column prop="TESTFIRST" label="是否初始测量" />
        <el-table-column prop="TESTCYCLE" label="第几次循环" />
        <el-table-column prop="DATANAMENAME" label="检测数据名称" />
        <el-table-column prop="role"  label="操作" min-width="180px">
        <template #default="scope">
          <el-button  @click="changeResult(scope.row)"
            >编辑</el-button>
            <el-button type="danger" @click="deleteResult(scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
    </div>
    <el-dialog v-model="updateIsShow" title="编辑信息">
    <el-form :model="getUpdateResult" ref="formRef">
      <el-form-item label="检测结果">
        <el-input v-model="getUpdateResult.resultName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="任务单">
        <el-input v-model="getUpdateResult.circulationName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="测量编号">
        <el-input v-model="getUpdateResult.testRank" autocomplete="off" />
      </el-form-item>
      <el-form-item label="检测值">
        <el-input v-model="getUpdateResult.testData" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否初始测量">
        <el-radio v-model="getUpdateResult.testFirst" label=1>1</el-radio>
        <el-radio v-model="getUpdateResult.testFirst" label=0>0</el-radio>
      </el-form-item>
      <el-form-item label="第几次循环">
        <el-input v-model="getUpdateResult.testCycle" autocomplete="off" />
      </el-form-item>
      <el-form-item label="检测数据名称">
        <el-input v-model="getUpdateResult.dataNameName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button type="primary" @click="updateResult()">更改    </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增用户">
    <el-form :model="getNewResult" ref="formRef">
      <el-form-item label="检测结果">
        <el-input v-model="getNewResult.resultName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="任务单">
        <el-input v-model="getNewResult.circulationName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="测量编号">
        <el-input v-model="getNewResult.testRank" autocomplete="off" />
      </el-form-item>
      <el-form-item label="检测值">
        <el-input v-model="getNewResult.testData" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否初始测量">
        <el-radio v-model="getNewResult.testFirst" label=1>1</el-radio>
        <el-radio v-model="getNewResult.testFirst" label=0>0</el-radio>
      </el-form-item>
      <el-form-item label="第几次循环">
        <el-input v-model="getNewResult.testCycle" autocomplete="off" />
      </el-form-item>
      <el-form-item label="检测数据名称">
        <el-input v-model="getNewResult.dataNameName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button type="primary" @click="insertConfirm()">新增    </el-button>
      </span>
    </template>
  </el-dialog>
  </template>

<script lang="ts">
import { onMounted,onBeforeMount,toRefs,reactive} from 'vue';
import { getResultList,getResultId,getNewResult,getDataNameList,getDataNameId,deleteResultInfo,getUpdateResult,getCirculationList,getCirculationId } from '@/api/api';
import {InitData,ListInt} from '@/type/testResult'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
    setup(){
        const data = reactive(new InitData())
        onMounted(()=>{
            getResults()
            getCirculation()
            getDataName()
        })
        const getResults=()=>{
            getResultList(data.token).then((res)=>{
              console.log(res.data)
              data.list=res.data
              data.selectData.count = res.data.length
            });
        }
        const getCirculation=()=>{
          getCirculationList(data.circulationToken).then((res)=>{
              // console.log(res)
              data.circulation = res.data
          })
          return data.circulation
        }
        const getDataName=()=>{
          getDataNameList(data.dataNameToken).then((res)=>{
              // console.log(res)
              data.dataName = res.data
          })
          return data.dataName
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
          let arr:any[]=[];
          if(data.getResultId.resultName || data.getCirculationId.circulationName){
            if(data.getResultId.resultName){
              if(data.getCirculationId.circulationName){
              arr = data.list.filter((value)=>{
                return value.RESULTNAME.indexOf(data.getResultId.resultName) !== -1 && value.CIRCULATIONNAME.indexOf(data.getCirculationId.circulationName) !== -1
                })
                // console.log(arr)
                data.list = arr
              }
              arr = data.list.filter((value)=>{
                return value.RESULTNAME.indexOf(data.getResultId.resultName) !== -1
              })
            }
            if(data.getCirculationId.circulationName){
              if(data.getResultId.resultName){
                arr = data.list.filter((value)=>{
                return value.RESULTNAME.indexOf(data.getResultId.resultName) !== -1 && value.CIRCULATIONNAME.indexOf(data.getCirculationId.circulationName) !== -1
                })
                // console.log(arr)
                data.list = arr
              }
              arr = data.list.filter((value)=>{
                return value.CIRCULATIONNAME.indexOf(data.getCirculationId.circulationName) !== -1
              })
            }
          }
          else{
            arr = data.list
          }
          data.selectData.count = arr.length
          data.list=arr
        };
        watch([() => data.getResultId.resultName,() => data.getCirculationId.circulationName],
         () => {
        if (data.getResultId.resultName == "" || data.getCirculationId.circulationName == "") {
            getResults()
        }
});
        const changeResult=(row:ListInt)=>{
            data.updateIsShow=true
            data.getUpdateResult.resultId=row.RESULTID
            data.getUpdateResult.resultName=row.RESULTNAME
            data.getUpdateResult.testRank=row.TESTRANK
            data.getUpdateResult.circulationName=row.CIRCULATIONNAME
            data.getUpdateResult.dataNameName=row.DATANAMENAME
            data.getUpdateResult.testData=row.TESTDATA
            data.getUpdateResult.testFirst=row.TESTFIRST
            data.getUpdateResult.testCycle=row.TESTCYCLE
            return data.getUpdateResult
        }
        const updateResult=()=>{
            getUpdateResult(data.getUpdateResult).then((res)=>{
            getResults()
            data.updateIsShow=false
          });
        }
        const save = ()=>{
            data.insertIsShow=false
            data.updateIsShow=false
        }
        const onInsert=()=>{
            data.insertIsShow=true
        }
        const insertConfirm=()=>{
            data.insertIsShow=false
            getNewResult(data.getNewResult).then((res)=>{
              // console.log(res)
              getResults()
              
            })
            
        }
        const deleteResult=(row:ListInt)=>{
          ElMessageBox.confirm("确定删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          // 确认删除
          .then(() => {
          //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
          data.deleteResultInfo.resultId=row.RESULTID
            // console.log(data.deleteResultInfo)
          deleteResultInfo(data.deleteResultInfo).then((res) => {
            // console.log(res)
            getResults()
          });
        })
        //取消删除
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
        }
        return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeResult,save,updateResult,onInsert,insertConfirm,deleteResult}
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