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
      <el-table-column prop="USERNAME" label="测试人员" />
      <el-table-column prop="STBATCH1" label="样品型号" />
      <el-table-column prop="STMODE" label="样品批号" />
      <el-table-column prop="STNUM" label="样品数量" />
      <el-table-column prop="LEVELNAME" label="样品档次" />
      <el-table-column prop="TESTRANK1" label="测量编号" />
      <el-table-column prop="TESTDATA1" label="测量数据名称" />
      <el-table-column prop="DATANAMENAME" label="检测值" />
      <el-table-column prop="EQUIPMENTNAME" label="设备名称" />
      <el-table-column prop="TESTTIME" label="测试时间" />
      <el-table-column prop="TESTPLACE" label="测试地点" />
      <el-table-column prop="REPORTFILE" label="报告文件地址" />
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
    <el-form-item label="测试人员">
      <el-select  v-model="getUpdateReport.userName"  placeholder="请选择测试人员">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品批号">
      <el-select  v-model="getUpdateReport.stBatch"  placeholder="请选择样品批号">
        <el-option 
        v-for="item in template"
        :key="item.TEMPLATEID" 
        :label="item.STBATCH1"
        :value="item.STBATCH1" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品型号">
      <el-select  v-model="getUpdateReport.stModel"  placeholder="请选择样品型号">
        <el-option 
        v-for="item in template"
        :key="item.TEMPLATEID" 
        :label="item.STMODE"
        :value="item.STMODE" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品数量">
      <el-select  v-model="getUpdateReport.stNum"  placeholder="请选择样品数量">
        <el-option 
        v-for="item in template"
        :key="item.TEMPLATEID" 
        :label="item.STNUM"
        :value="item.STNUM" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品档次">
      <el-select  v-model="getUpdateReport.levelName"  placeholder="请选择样品档次">
        <el-option 
        v-for="item in level"
        :key="item.lEVELID" 
        :label="item.LEVELNAME"
        :value="item.LEVELNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="测量编号">
      <el-select  v-model="getUpdateReport.testRank"  placeholder="请选择测量编号">
        <el-option 
        v-for="item in result"
        :key="item.RESULTID" 
        :label="item.TESTRANK1"
        :value="item.TESTRANK1" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测数据名称">
      <el-select  v-model="getUpdateReport.dataNameName"  placeholder="请选择检测数据名称">
        <el-option 
        v-for="item in dataName"
        :key="item.DATANAMEID" 
        :label="item.DATANAMENAME"
        :value="item.DATANAMENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测值">
      <el-select  v-model="getUpdateReport.testData"  placeholder="请选择检测值">
        <el-option 
        v-for="item in result"
        :key="item.RESULTID" 
        :label="item.TESTDATA1"
        :value="item.TESTDATA1" />
      </el-select>
    </el-form-item>
    <el-form-item label="设备名称">
      <el-select  v-model="getUpdateReport.testData"  placeholder="请选择设备名称">
        <el-option 
        v-for="item in equipment"
        :key="item.EQUIPMENTID" 
        :label="item.EQUIPMENTNAME"
        :value="item.EQUIPMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="报告文件地址" >
      <el-input v-model="getUpdateReport.reportFile" autocomplete="off" />
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
    <el-form-item label="测试人员">
      <el-select  v-model="getNewReport.userName"  placeholder="请选择测试人员">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品批号">
      <el-select  v-model="getNewReport.stBatch"  placeholder="请选择样品批号">
        <el-option 
        v-for="item in template"
        :key="item.TEMPLATEID" 
        :label="item.STBATCH1"
        :value="item.STBATCH1" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品型号">
      <el-select  v-model="getNewReport.stModel"  placeholder="请选择样品型号">
        <el-option 
        v-for="item in template"
        :key="item.TEMPLATEID" 
        :label="item.STMODE"
        :value="item.STMODE" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品数量">
      <el-select  v-model="getNewReport.stNum"  placeholder="请选择样品数量">
        <el-option 
        v-for="item in template"
        :key="item.TEMPLATEID" 
        :label="item.STNUM"
        :value="item.STNUM" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品档次">
      <el-select  v-model="getNewReport.levelName"  placeholder="请选择样品档次">
        <el-option 
        v-for="item in level"
        :key="item.lEVELID" 
        :label="item.LEVELNAME"
        :value="item.LEVELNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="测量编号">
      <el-select  v-model="getNewReport.testRank"  placeholder="请选择测量编号">
        <el-option 
        v-for="item in result"
        :key="item.RESULTID" 
        :label="item.TESTRANK1"
        :value="item.TESTRANK1" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测数据名称">
      <el-select  v-model="getNewReport.dataNameName"  placeholder="请选择检测数据名称">
        <el-option 
        v-for="item in dataName"
        :key="item.DATANAMEID" 
        :label="item.DATANAMENAME"
        :value="item.DATANAMENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测值">
      <el-select  v-model="getNewReport.testData"  placeholder="请选择检测值">
        <el-option 
        v-for="item in result"
        :key="item.RESULTID" 
        :label="item.TESTDATA1"
        :value="item.TESTDATA1" />
      </el-select>
    </el-form-item>
    <el-form-item label="设备名称">
      <el-select  v-model="getNewReport.testData"  placeholder="请选择设备名称">
        <el-option 
        v-for="item in equipment"
        :key="item.EQUIPMENTID" 
        :label="item.EQUIPMENTNAME"
        :value="item.EQUIPMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="报告文件地址" >
      <el-input v-model="getNewReport.reportFile" autocomplete="off" />
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
import { getReportList,getReportId,getNewReportInfo,deleteReportInfo,getUpdateReportInfo,getUserList,getUserId,getResultList,getResultId,getSampleTemplateList,getSampleTemplateId,getLevelList,getLevelId,getDataNameList,getDataNameId,getEquipmentList,getEquipmentId,getEntrustmentList,getEntrustmentId} from '@/api/api';
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
          getTemplate()
          getLevel()
          getDataName()
          getEquipment()
          getEntrustment()
      })
      const getReports=()=>{
        // const token:any = localStorage.getItem('token')
          getReportList(data.token).then((res)=>{
            // console.log(res)
          data.list=res.data
          data.selectData.count = res.data.length
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
        getUserList(data.resultToken).then((res)=>{
            // console.log(res)
            data.result = res.data
        })
        return data.result
      }
      const getTemplate=()=>{
        getSampleTemplateList(data.templateToken).then((res)=>{
            // console.log(res)
            data.template = res.data
        })
        return data.template
      }
      const getLevel=()=>{
        getLevelList(data.levelToken).then((res)=>{
            // console.log(res)
            data.level = res.data
        })
        return data.level
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
      // const getReportIdInfo = () =>{
      //   getReportId(data.getReportId)
      // }
      // const getUserIdInfo = () =>{
      //   getUserId(data.getUserId).then((res)=>{
      //     // console.log(res)
      //   })
      // }
      const onSubmit = () =>{
        // getReportIdInfo()
        // getUserIdInfo()
        let arr:any[]=[];
        if(data.getReportId.reportName || data.getUserId.userName){
          if(data.getReportId.reportName){
            if(data.getUserId.userName){
            arr = data.list.filter((value)=>{
              return value.REPORTNAME.indexOf(data.getReportId.reportName) !== -1 && value.USERNAME.indexOf(data.getUserId.userName) !== -1
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
              return value.REPORTNAME.indexOf(data.getReportId.reportName) !== -1 && value.USERNAME.indexOf(data.getUserId.userName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.USERNAME.indexOf(data.getUserId.userName) !== -1
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
          data.getUpdateReport.reportId=row.ReportID
          data.getUpdateReport.reportName=row.ReportNAME
          data.getUpdateReport.userName=row.GENDER
          data.getUpdateReport.resultName=row.UserNAME
          data.getUpdateReport.templateName=row.BIRTHDAY
          data.getUpdateReport.stModel=row.ADDRESS
          data.getUpdateReport.stBatch=row.PHONE
          data.getUpdateReport.levelName=row.ReportPWD
          data.getUpdateReport.dataNameName=row.MAIL
          data.getUpdateReport.testRank=row.ReportROLE
          data.getUpdateReport.testData=row.ReportROLE
          data.getUpdateReport.testTime=row.ReportROLE
          data.getUpdateReport.testPlace=row.ReportROLE
          data.getUpdateReport.sampleNumber=row.STNUM
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
          // const dt = new Date(data.getNewReport.birthday)
          // const year = dt.getFullYear()
          // const m = dt.getMonth()+1
          // const month = dt.getMonth()+1<10?'0'+m:m
          // const d = dt.getDate()
          // const date = dt.getDate()<10?'0'+d:d
          // data.getNewReport.birthday = `${year}-${month}-${date}`
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
        data.deleteReportInfo.ReportId=row.ReportID
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