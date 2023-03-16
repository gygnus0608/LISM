<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getEntrustmentId" class="demo-form-inline">
    <el-form-item label="委托单名称">
      <el-input v-model="getEntrustmentId.entrustmentName" placeholder="请输入委托单名称" />
    </el-form-item>
    <el-form-item label="检测类型">
      <el-select  v-model="getTypeId.typeName" clearable placeholder="请选择类型">
        <el-option 
        v-model="getTypeId.typeName" 
        v-for="item in testType"
        :key="item.TYPEID" 
        :label="item.TYPENAME"
        :value="item.TYPENAME" />
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
      <el-table-column prop="ENTRUSTMENTID" label="委托单id"  />
      <el-table-column prop="ENTRUSTMENTNAME" label="委托单名称"  />
      <el-table-column prop="DEPARTMENTNAME" label="委托部门" />
      <el-table-column prop="ENTRUSTMENTNUM" label="单据编号" />
      <el-table-column prop="SENDDATE" label="送样日期" />
      <el-table-column prop="SENDNUM" label="样品总数" />
      <el-table-column prop="GOAL" label="测试目的" />
      <el-table-column prop="DETAILNAME" label="样品处理方式" />
      <el-table-column prop="REPORTNAME" label="报告方式" />
      <el-table-column prop="TYPENAME" label="检测类型" />
      <el-table-column prop="USERNAME" label="送样人员" />
      <el-table-column prop="TYPENAME" label="检测类型" />
      <el-table-column prop="PHONE1" label="联系电话" />
      <el-table-column prop="MAIL1" label="邮箱地址" />
      <el-table-column prop="CONTRACTNAME" label="测试协议" />
      <el-table-column prop="ENTRUSTMARK" label="备注说明" />
      <el-table-column prop="REPORTFINAL" label="测试结果描述" />
      <el-table-column prop="STATUSX" label="提交状态" />
      <el-table-column prop="STATUSY" label="执行状态" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeEntrustment(scope.row)"
        >编辑</el-button>
        <el-button type="danger" @click="deleteEntrustment(scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateEntrustment" ref="formRef">
    <el-form-item label="委托单名称">
      <el-input v-model="getUpdateEntrustment.entrustmentName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="委托单部门">
      <el-select  v-model="getUpdateEntrustment.departmentName"  placeholder="请选择部门">
        <el-option 
        v-for="item in department"
        :key="item.DEPARTMENTID" 
        :label="item.DEPARTMENTNAME"
        :value="item.DEPARTMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="单据编号">
      <el-input v-model="getUpdateEntrustment.entrustmentNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="送样日期">
      <el-date-picker
        v-model="getUpdateEntrustment.sendDate"
        type="date"
        placeholder="请选择日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="样品总数">
      <el-input v-model="getUpdateEntrustment.sendNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="测试目标">
      <el-input v-model="getUpdateEntrustment.goal" autocomplete="off" />
    </el-form-item>
    <el-form-item label="处理方式">
      <el-select  v-model="getUpdateEntrustment.detailName"  placeholder="请选择处理方式">
        <el-option 
        v-for="item in sampleDetail"
        :key="item.DETAILID" 
        :label="item.DETAILNAME"
        :value="item.DETAILNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="报告方式">
      <el-select  v-model="getUpdateEntrustment.reportName"  placeholder="请选择报告方式">
        <el-option 
        v-for="item in reportMethod"
        :key="item.REPORTID" 
        :label="item.REPORTNAME"
        :value="item.REPORTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测类型">
      <el-select  v-model="getUpdateEntrustment.typeName"  placeholder="请选择检测类型">
        <el-option 
        v-for="item in testType"
        :key="item.TYPEID" 
        :label="item.TYPENAME"
        :value="item.TYPENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="送样人员">
      <el-select  v-model="getUpdateEntrustment.userName"  placeholder="请选择送样人员">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-select  v-model="getUpdateEntrustment.phone"  placeholder="请选择联系电话">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.PHONE"
        :value="item.PHONE" />
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱地址">
      <el-select  v-model="getUpdateEntrustment.mail"  placeholder="请选择邮箱地址">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.MAIL"
        :value="item.MAIL" />
      </el-select>
    </el-form-item>
    <el-form-item label="测试协议">
      <el-select  v-model="getUpdateEntrustment.contractName"  placeholder="请选择测试协议">
        <el-option 
        v-for="item in contract"
        :key="item.CONTRACTID" 
        :label="item.CONTRACTNAME"
        :value="item.CONTRACTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="备注说明">
      <el-input v-model="getUpdateEntrustment.entrustMark" autocomplete="off" />
    </el-form-item>
    <el-form-item label="测试结果描述">
      <el-input type="text" v-model="getUpdateEntrustment.reportFinal" autocomplete="off" />
    </el-form-item>
    <el-form-item label="提交状态">
      <el-select  v-model="getUpdateEntrustment.statusx" placeholder="请选择提交状态">
        <el-option label="未提交" value="未提交" />
        <el-option label="已提交" value="已提交" />
      </el-select>
    </el-form-item>
    <el-form-item label="执行状态">
      <el-select  v-model="getUpdateEntrustment.statusy" placeholder="请选择提交状态">
        <el-option label="未开始" value="未开始" />
        <el-option label="已开始" value="已开始" />
        <el-option label="已完成" value="已完成" />
      </el-select>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateEntrustment()">更改    </el-button>
    </span>
  </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增委托单">
  <el-form :model="getNewEntrustment" ref="formRef">
    <el-form-item label="委托单名称">
      <el-input v-model="getNewEntrustment.entrustmentName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="委托单部门">
      <el-select  v-model="getNewEntrustment.departmentName"  placeholder="请选择部门">
        <el-option 
        v-for="item in department"
        :key="item.DEPARTMENTID" 
        :label="item.DEPARTMENTNAME"
        :value="item.DEPARTMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="单据编号">
      <el-input v-model="getNewEntrustment.entrustmentNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="送样日期">
      <el-date-picker
        v-model="getNewEntrustment.sendDate"
        type="date"
        placeholder="请选择日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="样品总数">
      <el-input v-model="getNewEntrustment.sendNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="测试目标">
      <el-input v-model="getNewEntrustment.goal" autocomplete="off" />
    </el-form-item>
    <el-form-item label="处理方式">
      <el-select  v-model="getNewEntrustment.detailName"  placeholder="请选择处理方式">
        <el-option 
        v-for="item in sampleDetail"
        :key="item.DETAILID" 
        :label="item.DETAILNAME"
        :value="item.DETAILNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="报告方式">
      <el-select  v-model="getNewEntrustment.reportName"  placeholder="请选择报告方式">
        <el-option 
        v-for="item in reportMethod"
        :key="item.REPORTID" 
        :label="item.REPORTNAME"
        :value="item.REPORTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测类型">
      <el-select  v-model="getNewEntrustment.typeName"  placeholder="请选择检测类型">
        <el-option 
        v-for="item in testType"
        :key="item.TYPEID" 
        :label="item.TYPENAME"
        :value="item.TYPENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="送样人员">
      <el-select  v-model="getNewEntrustment.userName"  placeholder="请选择送样人员">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-select  v-model="getNewEntrustment.phone"  placeholder="请选择联系电话">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.PHONE"
        :value="item.PHONE" />
      </el-select>
    </el-form-item>
    <el-form-item label="邮箱地址">
      <el-select  v-model="getNewEntrustment.mail"  placeholder="请选择邮箱地址">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.MAIL"
        :value="item.MAIL" />
      </el-select>
    </el-form-item>
    <el-form-item label="测试协议">
      <el-select  v-model="getNewEntrustment.contractName"  placeholder="请选择测试协议">
        <el-option 
        v-for="item in contract"
        :key="item.CONTRACTID" 
        :label="item.CONTRACTNAME"
        :value="item.CONTRACTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="备注说明">
      <el-input v-model="getNewEntrustment.entrustMark" autocomplete="off" />
    </el-form-item>
    <el-form-item label="测试结果描述">
      <el-input type="text" v-model="getNewEntrustment.reportFinal" autocomplete="off" />
    </el-form-item>
    <el-form-item label="提交状态">
      <el-select  v-model="getNewEntrustment.statusx" placeholder="请选择提交状态">
        <el-option label="未提交" value="未提交" />
        <el-option label="已提交" value="已提交" />
      </el-select>
    </el-form-item>
    <el-form-item label="执行状态">
      <el-select  v-model="getNewEntrustment.statusy" placeholder="请选择提交状态">
        <el-option label="未开始" value="未开始" />
        <el-option label="已开始" value="已开始" />
        <el-option label="已中断" value="已中断" />
        <el-option label="已完成" value="已完成" />
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
import { getEntrustmentList,getEntrustmentId,deleteEntrustmentInfo,getNewEntrustmentInfo,getUpdateEntrustmentInfo,getTypeList,getTypeId,getDetailList,getReportMethodList,getDepartmentList,getContractList,getUserList} from '@/api/api';
import {InitData,ListInt} from '@/type/entrustment'
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const router=useRouter()
      const data = reactive(new InitData())
      onMounted(()=>{
          getEntrustments()
          getType()
          getDepartment()
          getDetail()
          getReportMethod()
          getUser()
          getContract()
      })
      const getEntrustments=()=>{
          getEntrustmentList(data.token).then((res)=>{
          data.list=res.data
          data.selectData.count = res.data.length
          });
      }
      const getType=()=>{
        getTypeList(data.testTypeToken).then((res)=>{
            data.testType = res.data
        })
        return data.testType
      }
      const getDepartment=()=>{
        getDepartmentList(data.departmentToken).then((res)=>{
            data.department = res.data
        })
        return data.department
      }
      const getDetail=()=>{
        getDetailList(data.detailToken).then((res)=>{
            data.sampleDetail = res.data
        })
        return data.sampleDetail
      }
      const getReportMethod=()=>{
        getReportMethodList(data.reportMethodToken).then((res)=>{
            data.reportMethod = res.data
        })
        return data.reportMethod
      }
      const getUser=()=>{
        getUserList(data.userToken).then((res)=>{
            data.user = res.data
        })
        return data.user
      }
      const getContract=()=>{
        getContractList(data.contractToken).then((res)=>{
            data.contract = res.data
        })
        return data.contract
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
      const getEntrustmentIdInfo = () =>{
        getEntrustmentId(data.getEntrustmentId).then((res)=>{
          // console.log(res)
        })
      }
      const getTypeIdInfo = () =>{
        getTypeId(data.getTypeId)
      }
      
      const onSubmit = () =>{
        getEntrustmentIdInfo()
        getTypeIdInfo()
        let arr:any[]=[];
        if(data.getEntrustmentId.entrustmentName || data.getTypeId.typeName){
          if(data.getEntrustmentId.entrustmentName){
            if(data.getTypeId.typeName){
            arr = data.list.filter((value)=>{
              return value.ENTRUSTMENTNAME.indexOf(data.getEntrustmentId.entrustmentName) !== -1 && value.TYPENAME.indexOf(data.getTypeId.typeName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.ENTRUSTMENTNAME.indexOf(data.getEntrustmentId.entrustmentName) !== -1
            })
          }
          if(data.getTypeId.typeName){
            if(data.getEntrustmentId.entrustmentName){
              arr = data.list.filter((value)=>{
              return value.ENTRUSTMENTNAME.indexOf(data.getEntrustmentId.entrustmentName) !== -1 && value.TYPENAME.indexOf(data.getTypeId.typeName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.TYPENAME.indexOf(data.getTypeId.typeName) !== -1
            })
          }
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getEntrustmentId.entrustmentName,() => data.getTypeId.typeName],
       () => {
      if (data.getEntrustmentId.entrustmentName == "" || data.getTypeId.typeName == "") {
          getEntrustments()
      }
});
      const changeEntrustment=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateEntrustment.entrustmentId=row.ENTRUSTMENTID
          data.getUpdateEntrustment.entrustmentName=row.ENTRUSTMENTNAME
          data.getUpdateEntrustment.departmentName=row.DEPARTMENTNAME
          data.getUpdateEntrustment.entrustmentNum=row.ENTRUSTMENTNUM
          data.getUpdateEntrustment.sendDate=row.SENDDATE
          data.getUpdateEntrustment.sendNum=row.SENDNUM
          data.getUpdateEntrustment.goal=row.GOAL
          data.getUpdateEntrustment.detailName=row.DETAILNAME
          data.getUpdateEntrustment.reportName=row.REPORTNAME
          data.getUpdateEntrustment.typeName=row.TYPENAME
          data.getUpdateEntrustment.userName=row.USERNAME
          data.getUpdateEntrustment.phone=row.PHONE1
          data.getUpdateEntrustment.mail=row.MAIL1
          data.getUpdateEntrustment.contractName=row.CONTRACTNAME
          data.getUpdateEntrustment.entrustMark=row.ENTRUSTMARK
          data.getUpdateEntrustment.reportFinal=row.REPORTFINAL
          data.getUpdateEntrustment.statusx=row.STATUSX
          data.getUpdateEntrustment.statusy=row.STATUSY
          return data.getUpdateEntrustment
      }
      const updateEntrustment=()=>{
        getUpdateEntrustmentInfo(data.getUpdateEntrustment).then((res)=>{
        getEntrustments()
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
          getNewEntrustmentInfo(data.getNewEntrustment).then((res)=>{
            // console.log(res)
            getEntrustments()
            
          })
          
      }
      const deleteEntrustment=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteEntrustmentInfo.entrustmentId=row.ENTRUSTMENTID
          // console.log(data.deleteEntrustmentInfo)
        deleteEntrustmentInfo(data.deleteEntrustmentInfo).then((res) => {
          // console.log(res)
          getEntrustments()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeEntrustment,save,updateEntrustment,onInsert,insertConfirm,deleteEntrustment}
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