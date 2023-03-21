<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getReportId" class="demo-form-inline">
    <el-form-item label="报告单">
      <el-input v-model="getReportId.reportName" placeholder="请输入报告单" />
    </el-form-item>
    <el-form-item label="测试人员">
      <el-select  v-model="getUserId.userName" clearable placeholder="请选择测试人员">
        <el-option 
        v-model="getUserId.userName" 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
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
      <el-table-column prop="REPORTID" label="报告id"  />
      <el-table-column prop="REPORTNAME" label="报告单"  />
      <el-table-column prop="ENTRUSTMENTNAME" label="委托单" />
      <el-table-column prop="CIRCULATIONNAME" label="任务单" />
      <el-table-column prop="RESULTNAME" label="检测结果" />
      <el-table-column prop="USERNAME1" label="测试人员" />
      <el-table-column prop="SAMPLENAME" label="样品名称" />
      <el-table-column prop="STBATCH" label="样品型号" />
      <el-table-column prop="STMODE" label="样品批号" />
      <el-table-column prop="STNUM" label="样品数量" />
      <el-table-column prop="TESTRANK" label="测量编号" />
      <el-table-column prop="DATANAMEID" label="测量数据名称" />
      <el-table-column prop="TESTDATA" label="检测值" />
      <el-table-column prop="EQUIPMENTNAME" label="设备名称" />
      <el-table-column prop="TESTTIME" label="测试时间" />
      <el-table-column prop="TESTPLACE" label="测试地点" />
      <el-table-column prop="FILEPATH" label="报告文件地址" />
      <el-table-column prop="REMARK" label="备注" />
      <el-table-column prop="STATUS" label="状态" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeReport(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteReport(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateReport" ref="formRef">
    <el-form-item label="报告单">
      <el-input v-model="getUpdateReport.reportName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="委托单">
      <el-select  v-model="getUpdateReport.entrustmentName"  placeholder="请选择委托单">
        <el-option 
        v-for="item in entrustment"
        :key="item.ENTRUSTMENTID" 
        :label="item.ENTRUSTMENTNAME"
        :value="item.ENTRUSTMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品名称">
      <el-select  v-model="getUpdateReport.sampleName"  placeholder="请选择样品名称">
        <el-option 
        v-for="item in sample"
        :key="item.SAMPLEID" 
        :label="item.SAMPLENAME"
        :value="item.SAMPLENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测结果">
      <el-select  v-model="getUpdateReport.resultName"  placeholder="请选择检测结果">
        <el-option 
        v-for="item in result"
        :key="item.RESULTID" 
        :label="item.RESULTNAME"
        :value="item.RESULTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="设备名称">
      <el-select  v-model="getUpdateReport.equipmentName"  placeholder="请选择设备名称">
        <el-option 
        v-for="item in equipment"
        :key="item.EQUIPMENTID" 
        :label="item.EQUIPMENTNAME"
        :value="item.EQUIPMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="报告文件名称" >
      <el-select  v-model="getUpdateReport.fileName"  placeholder="请选择文件名称">
        <el-option 
        v-for="item in file"
        :key="item.FILEID" 
        :label="item.FILENAME"
        :value="item.FILENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="测试时间" >
      <el-date-picker
      v-model="getUpdateReport.testTime"
      type="date"
      placeholder="请选择日期"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="测试地点" >
      <el-input v-model="getUpdateReport.testPlace" autocomplete="off" />
    </el-form-item>
    <el-form-item label="备注说明" >
      <el-input v-model="getUpdateReport.remark" autocomplete="off" />
    </el-form-item>
    <el-form-item label="状态">
      <el-select  v-model="getUpdateReport.status" placeholder="请选择状态">
        <el-option label="未审核" value="未审核" />
        <el-option label="已审核" value="已审核" />
      </el-select>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateReport()">更改    </el-button>
    </span>
  </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增报告">
    <el-form :model="getNewReport" ref="formRef">
    <el-form-item label="报告单">
      <el-input v-model="getNewReport.reportName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="委托单">
      <el-select  v-model="getNewReport.entrustmentName"  placeholder="请选择委托单">
        <el-option 
        v-for="item in entrustment"
        :key="item.ENTRUSTMENTID" 
        :label="item.ENTRUSTMENTNAME"
        :value="item.ENTRUSTMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品名称">
      <el-select  v-model="getNewReport.sampleName"  placeholder="请选择样品名称">
        <el-option 
        v-for="item in sample"
        :key="item.SAMPLEID" 
        :label="item.SAMPLENAME"
        :value="item.SAMPLENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测结果">
      <el-select  v-model="getNewReport.resultName"  placeholder="请选择检测结果">
        <el-option 
        v-for="item in result"
        :key="item.RESULTID" 
        :label="item.RESULTNAME"
        :value="item.RESULTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="设备名称">
      <el-select  v-model="getNewReport.equipmentName"  placeholder="请选择设备名称">
        <el-option 
        v-for="item in equipment"
        :key="item.EQUIPMENTID" 
        :label="item.EQUIPMENTNAME"
        :value="item.EQUIPMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="报告文件名称" >
      <el-select  v-model="getNewReport.fileName"  placeholder="请选择文件名称">
        <el-option 
        v-for="item in file"
        :key="item.FILEID" 
        :label="item.FILENAME"
        :value="item.FILENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="测试时间" >
      <el-date-picker
      v-model="getNewReport.testTime"
      type="date"
      placeholder="请选择日期"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="测试地点" >
      <el-input v-model="getNewReport.testPlace" autocomplete="off" />
    </el-form-item>
    <el-form-item label="备注说明" >
      <el-input v-model="getNewReport.remark" autocomplete="off" />
    </el-form-item>
    <el-form-item label="状态">
      <el-select  v-model="getNewReport.status" placeholder="请选择状态">
        <el-option label="未审核" value="未审核" />
        <el-option label="已审核" value="已审核" />
      </el-select>
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
import { onMounted,toRefs,reactive} from 'vue';
import { getReportList,getReportId,getNewReportInfo,deleteReportInfo,getUpdateReportInfo,getResultList,getUserId,getUserList,getResultId,getSampleList,getSampleId,getDataNameList,getDataNameId,getEquipmentList,getEquipmentId,getEntrustmentList,getEntrustmentId,getCirculationList,getCirculationId,getFileList,getFileId} from '@/api/api';
import {InitData,ListInt} from '@/type/report'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
          getReports()
          getUser()
          getResult()
          getSample()
          getEquipment()
          getEntrustment()
          getCirculation()
          getFile()
          getDataName()
      })
      let arr:any[]=[]
      const getReports=()=>{
          getReportList(data.token).then((res1)=>{
            getCirculationList(data.circulationToken).then((res2)=>{
              for(let i=0;i<res1.data.length;i++){
                for(let j=0;j<res2.data.length;j++){
                  if(res1.data[i].CIRCULATIONID == res2.data[j].CIRCULATIONID){
                    const obj = Object.assign(res1.data[i],res2.data[j])
                    arr.push(obj)
                    data.list = arr
                    console.log(arr)
                  }
                }
              }
              
              // console.log(arr)
              
            })
          });
      }
      const getUser=()=>{
        getUserList(data.userToken).then((res)=>{
            // console.log(res)
            data.user = res.data
        })
        return data.user
      }
      const getResult=()=>{
        getResultList(data.resultToken).then((res)=>{
            // console.log(res)
            data.result = res.data
        })
        return data.result
      }
      const getDataName=()=>{
        getDataNameList(data.dataNameToken).then((res)=>{
            // console.log(res)
            data.dataName = res.data
        })
        return data.dataName
      }
      const getEquipment=()=>{
        getEquipmentList(data.equipmentToken).then((res)=>{
            // console.log(res)
            data.equipment = res.data
        })
        return data.equipment
      }
      const getEntrustment=()=>{
        getEntrustmentList(data.entrustmentToken).then((res)=>{
            // console.log(res)
            data.entrustment = res.data
        })
        return data.entrustment
      }
      const getCirculation=()=>{
        getCirculationList(data.circulationToken).then((res)=>{
            // console.log(res)
            data.circulation = res.data
        })
        return data.circulation
      }
      const getSample=()=>{
        getSampleList(data.sampleToken).then((res)=>{
            // console.log(res)
            data.sample = res.data
        })
        return data.sample
      }
      const getFile=()=>{
        getFileList(data.fileToken).then((res)=>{
            // console.log(res)
            data.file = res.data
        })
        return data.file
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
        // getReportIdInfo()
        // getUserIdInfo()
        let arr:any[]=[];
        if(data.getReportId.reportName || data.getUserId.userName){
          if(data.getReportId.reportName){
            if(data.getUserId.userName){
            arr = data.list.filter((value)=>{
              return value.REPORTNAME.indexOf(data.getReportId.reportName) !== -1 && value.USERNAME1.indexOf(data.getUserId.userName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.REPORTNAME.indexOf(data.getReportId.reportName) !== -1
            })
          }
          if(data.getUserId.userName){
            if(data.getReportId.reportName){
              arr = data.list.filter((value)=>{
              return value.REPORTNAME.indexOf(data.getReportId.reportName) !== -1 && value.USERNAME1.indexOf(data.getUserId.userName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.USERNAME1.indexOf(data.getUserId.userName) !== -1
            })
          }
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getReportId.reportName,() => data.getUserId.userName],
       () => {
      if (data.getReportId.reportName == "" || data.getUserId.userName == "") {
          getReports()
      }
});
      const changeReport=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateReport.reportId=row.REPORTID
          data.getUpdateReport.reportName=row.REPORTNAME
          data.getUpdateReport.entrustmentName=row.ENTRUSTMENTNAME
          data.getUpdateReport.sampleName=row.SAMPLENAME
          data.getUpdateReport.resultName=row.RESULTNAME
          data.getUpdateReport.equipmentName=row.EQUIPMENTNAME
          data.getUpdateReport.testTime=row.TESTTIME
          data.getUpdateReport.testPlace=row.TESTPLACE
          data.getUpdateReport.remark=row.REMARK
          data.getUpdateReport.status=row.STATUS
          data.getUpdateReport.fileName=row.FILENAME
          return data.getUpdateReport
      }
      const updateReport=()=>{
        getUpdateReportInfo(data.getUpdateReport).then((res)=>{
          // console.log(res)
        });
        getReports()
        data.updateIsShow=false
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
          getNewReportInfo(data.getNewReport).then((res)=>{
            // console.log(res)
            getReports()
            
          })
          
      }
      const deleteReport=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteReportInfo.reportId=row.REPORTID
          // console.log(data.deleteReportInfo)
        deleteReportInfo(data.deleteReportInfo).then((res) => {
          // console.log(res)
          getReports()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeReport,save,updateReport,onInsert,insertConfirm,deleteReport}
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