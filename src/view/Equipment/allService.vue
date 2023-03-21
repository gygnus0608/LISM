<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getServiceId" class="demo-form-inline">
    <el-form-item label="记录表名称">
      <el-input v-model="getServiceId.serviceName" placeholder="请输入记录表名称" />
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
    
    <el-table :data="dataList.comList" :default-sort ="{prop:'SPONSORTIME,IMPLEMENTTIME,FINISHTIME',order:'descending'}" border height="400" style="width: 100% " >
      <el-table-column prop="SERVICEID" label="记录表id"  />
      <el-table-column prop="SERVICENAME" label="记录表名称"  />
      <el-table-column prop="SERVICETYPE" label="类型" />
      <el-table-column prop="STATUS" label="状态" />
      <el-table-column prop="USERNAME" label="发起人员" />
      <el-table-column prop="USERNAME1" label="执行人员" />
      <el-table-column prop="SPONSORTIME" sortable label="发起时间" />
      <el-table-column prop="IMPLEMENTTIME" sortable label="执行时间" />
      <el-table-column prop="FINISHTIME" sortable label="完成时间" />
      <el-table-column prop="REMARKS" label="备注说明" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeService(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteService(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateService" ref="formRef">
    <el-form-item label="记录表名称">
      <el-input v-model="getUpdateService.serviceName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="类型" >
      <el-select  v-model="getUpdateService.serviceType" placeholder="请选择类型">
        <el-option label="维修" value="维修" />
        <el-option label="保养" value="保养" />
        <el-option label="校准" value="校准" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select  v-model="getUpdateService.status" placeholder="请选择状态">
        <el-option label="发起" value="发起" />
        <el-option label="执行" value="执行" />
      </el-select>
    </el-form-item>
    <el-form-item label="发起人员">
      <el-select  v-model="getUpdateService.spUserName" clearable placeholder="请选择发起人员">
        <el-option 
        v-model="getUserId.userName" 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="执行人员">
      <el-select  v-model="getUpdateService.imUserName" clearable placeholder="请选择执行人员">
        <el-option 
        v-model="getUserId.userName" 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="发起时间" >
      <el-date-picker
      v-model="getUpdateService.sponsorTime"
      type="date"
      placeholder="请选择发起时间"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="执行时间" >
      <el-date-picker
      v-model="getUpdateService.implementTime"
      type="date"
      placeholder="请选择执行时间"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="完成时间" >
      <el-date-picker
      v-model="getUpdateService.finishTime"
      type="date"
      placeholder="请选择完成时间"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="备注" >
      <el-input v-model="getUpdateService.remarks" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateService()">更改    </el-button>
    </span>
  </template>
</el-dialog>
<el-dialog v-model="insertIsShow" title="新增设备服务记录">
  <el-form :model="getNewService" >
    <el-form-item label="记录表名称">
      <el-input v-model="getNewService.serviceName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="类型">
      <el-select  v-model="getUpdateService.serviceType" placeholder="请选择类型">
        <el-option label="维修" value="维修" />
        <el-option label="保养" value="保养" />
        <el-option label="校准" value="校准" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select  v-model="getNewService.status" placeholder="请选择状态">
        <el-option label="发起" value="发起" />
        <el-option label="执行" value="执行" />
      </el-select>
    </el-form-item>
    <el-form-item label="发起人员">
      <el-select  v-model="getNewService.spUserName" clearable placeholder="请选择发起人员">
        <el-option 
        v-model="getUserId.userName" 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="执行人员">
      <el-select  v-model="getNewService.imUserName" clearable placeholder="请选择执行人员">
        <el-option 
        v-model="getUserId.userName" 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="发起时间" >
      <el-date-picker
      v-model="getNewService.sponsorTime"
      type="date"
      placeholder="请选择发起时间"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="执行时间" >
      <el-date-picker
      v-model="getNewService.implementTime"
      type="date"
      placeholder="请选择执行时间"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="完成时间" >
      <el-date-picker
      v-model="getNewService.finishTime"
      type="date"
      placeholder="请选择完成时间"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="备注" >
      <el-input v-model="getNewService.remarks" autocomplete="off" />
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
import { getServiceList,getServiceId,getNewServiceInfo,getUserList,getUserId,deleteServiceInfo,getUpdateServiceInfo } from '@/api/api';
import {InitData,ListInt} from '@/type/equipmentService'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
          getServices()
          getUser()
      })
      const getServices=()=>{
        // const token:any = localStorage.getItem('token')
          getServiceList(data.token).then((res)=>{
            console.log(res)
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
      const getServiceIdInfo = () =>{
        getServiceId(data.getServiceId).then((res)=>{
          // console.log(res)
        })
      }
      const getUserIdInfo = () =>{
        getUserId(data.getUserId).then((res)=>{
          // console.log(res)
        })
      }
      const onSubmit = () =>{
        getServiceIdInfo()
        let arr:any[]=[];
        if(data.getServiceId.serviceName){
          arr = data.list.filter((value)=>{
            return value.SERVICENAME.indexOf(data.getServiceId.serviceName) !== -1 
          })
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getServiceId.serviceName,() => data.getUserId.userName],
       () => {
      if (data.getServiceId.serviceName == "" || data.getUserId.userName == "") {
          getServices()
      }
});
      const changeService=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateService.serviceId=row.SERVICEID
          data.getUpdateService.serviceName=row.SERVICENAME
          data.getUpdateService.serviceType=row.SERVICETYPE
          data.getUpdateService.status=row.STATUS
          data.getUpdateService.spUserName=row.SPUSERNAME
          data.getUpdateService.imUserName=row.IMUSERNAME
          data.getUpdateService.sponsorTime=row.SPONSORTIME
          data.getUpdateService.implementTime=row.IMPLEMENTTIME
          data.getUpdateService.finishTime=row.FINISHTIME
          data.getUpdateService.remarks=row.REMARKS
          return data.getUpdateService
      }
      const updateService=()=>{
        getUpdateServiceInfo(data.getUpdateService).then((res)=>{
          getServices()
          data.updateIsShow=false
          // console.log(res)
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
          getNewServiceInfo(data.getNewService)
          getServices()
          
      }
      const deleteService=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteServiceInfo.serviceId=row.SERVICEID
          // console.log(data.deleteServiceInfo)
        deleteServiceInfo(data.deleteServiceInfo).then((res) => {
          // console.log(res)
          getServices()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeService,save,updateService,onInsert,insertConfirm,deleteService}
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