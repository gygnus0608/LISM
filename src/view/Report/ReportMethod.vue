<template>
    <div class="contain-box">
      <div class="header-box">
        <div class="select-box">
        <el-form :inline="true" :model="getReportMethodId" class="demo-form-inline">
      <el-form-item label="报告方式">
        <el-input v-model="getReportMethodId.reportName" placeholder="请输入报告方式名称" />
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
        <el-table-column prop="REPORTID" label="报告方式id"  />
        <el-table-column prop="REPORTNAME" label="报告方式名称"  />
        <el-table-column prop="role" label="操作" min-width="180px">
        <template #default="scope">
          <el-button  @click="changeReportMethod(scope.row)"
            >编辑</el-button>
            <el-button type="danger" @click="deleteReportMethod(scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
    </div>
    <el-dialog v-model="updateIsShow" title="编辑信息">
    <el-form :model="getUpdateReportMethod" ref="formRef">
      <el-form-item label="报告方式名称">
        <el-input v-model="getUpdateReportMethod.reportName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button ReportMethod="primary" @click="updateReportMethod()">更改    </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增报告方式">
    <el-form :model="getNewReportMethod" >
      <el-form-item label="报告方式名称">
        <el-input v-model="getNewReportMethod.reportName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button ReportMethod="primary" @click="insertConfirm()">新增    </el-button>
      </span>
    </template>
  </el-dialog>
  </template>
  
  <script lang="ts">
  import { onMounted,toRefs,reactive} from 'vue';
  import { getReportMethodList,getReportMethodId,deleteReportMethodInfo,getNewReportMethodInfo,getUpdateReportMethodInfo} from '@/api/api';
  import {InitData,ListInt} from '@/type/reportMethod'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import 'element-plus/es/components/message-box/style/index'
  import 'element-plus/es/components/message/style/index'
  export default defineComponent({
    setup(){
        const data = reactive(new InitData())
        onMounted(()=>{
          getReportMethods()
        })
        const getReportMethods=()=>{
            getReportMethodList(data.token).then((res)=>{
              // console.log(res)
              data.list=res.data
              console.log(data.list)
              data.selectData.count = res.data.length
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
        const getReportMethodIdInfo = () =>{
          getReportMethodId(data.getReportMethodId).then((res)=>{console.log(res)})
        }
        const onSubmit = () =>{
          getReportMethodIdInfo()
          let arr:any[]=[];
          if(data.getReportMethodId.reportName){
            arr = data.list.filter((value)=>{
              return value.REPORTNAME.indexOf(data.getReportMethodId.reportName) !== -1
            })
          }
          else{
            arr = data.list
          }
          data.selectData.count = arr.length
          data.list=arr
        };
        watch([() => data.getReportMethodId.reportName],
         () => {
        if (data.getReportMethodId.reportName == "") {
            getReportMethods()
        }
  });
        const changeReportMethod=(row:ListInt)=>{
            data.updateIsShow=true
            data.getUpdateReportMethod.reportId=row.REPORTID
            data.getUpdateReportMethod.reportName=row.REPORTNAME
            return data.getUpdateReportMethod
        }
        const updateReportMethod=()=>{
          getUpdateReportMethodInfo(data.getUpdateReportMethod).then((res)=>{
            console.log(res)
          });
          data.updateIsShow=false
          getReportMethods()
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
            getNewReportMethodInfo(data.getNewReportMethod).then((res)=>{
              console.log(res)
              getReportMethods()
            })
            
        }
        const deleteReportMethod=(row:ListInt)=>{
          ElMessageBox.confirm("确定删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          // 确认删除
          .then(() => {
          //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
          data.deleteReportMethodInfo.reportId=row.REPORTID
          deleteReportMethodInfo(data.deleteReportMethodInfo).then((res) => {
            // console.log(res)
            getReportMethods()
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
        return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeReportMethod,save,updateReportMethod,onInsert,insertConfirm,deleteReportMethod}
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