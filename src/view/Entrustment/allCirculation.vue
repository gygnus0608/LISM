<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getCirculationId" class="demo-form-inline">
    <el-form-item label="任务单">
      <el-input v-model="getCirculationId.circulationName" placeholder="请输入任务单名称" />
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
    
    <el-table :default-sort ="{prop:'ASSIGNDATE',order:'descending'}" :data="dataList.comList" border height="400" style="width: 100% " >
      <el-table-column prop="CIRCULATIONID" label="任务单id"  />
      <el-table-column prop="CIRCULATIONNAME" label="任务单名称"  />
      <el-table-column prop="ENTRUSTMENTNAME" label="委托单名称" />
      <el-table-column prop="ORDERTESTNAME" label="委托单下属项目" />
      <el-table-column prop="SAMPLENAME" label="样品名称" />
      <el-table-column prop="NODENAME1" label="当前节点" />
      <el-table-column prop="NODENAME" label="下一节点" />
      <el-table-column prop="USERNAME1" label="当前节点人员" />
      <el-table-column prop="USERNAME" label="下一节点人员" />
      <el-table-column prop="ASSIGNDATE" sortable label="指派日期" />
      <el-table-column prop="CONFIRMIT" label="当前任务是否接收" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeCirculation(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteCirculation(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateCirculation" ref="formRef">
    <el-form-item label="任务单名称">
      <el-input v-model="getUpdateCirculation.circulationName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="委托单名称">
      <el-select  v-model="getUpdateCirculation.entrustmentName"  placeholder="请选择委托单名称">
        <el-option 
        v-for="item in entrustment"
        :key="item.ENTRUSTMENTID" 
        :label="item.ENTRUSTMENTNAME"
        :value="item.ENTRUSTMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="委托单下属项目">
      <el-select  v-model="getUpdateCirculation.orderTestName"  placeholder="请选择项目名称">
        <el-option 
        v-for="item in orderTestItem"
        :key="item.ORDERTESTID" 
        :label="item.ORDERTESTNAME"
        :value="item.ORDERTESTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品名称">
      <el-select  v-model="getUpdateCirculation.sampleName"  placeholder="请选择样品名称">
        <el-option 
        v-for="item in sample"
        :key="item.SAMPLETID" 
        :label="item.SAMPLENAME"
        :value="item.SAMPLENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="当前节点">
      <el-select  v-model="getUpdateCirculation.lastNodeName"  placeholder="请选择当前节点">
        <el-option 
        v-for="item in node"
        :key="item.NODEID" 
        :label="item.NODENAME"
        :value="item.NODENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="下一节点">
      <el-select  v-model="getUpdateCirculation.nextNodeName"  placeholder="请选择下一节点">
        <el-option 
        v-for="item in node"
        :key="item.NODEID" 
        :label="item.NODENAME"
        :value="item.NODENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="当前节点人员">
      <el-select  v-model="getUpdateCirculation.lastUserName"  placeholder="请选择当前节点人员">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="下一节点人员">
      <el-select  v-model="getUpdateCirculation.nextUserName"  placeholder="请选择下一节点人员">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="指定日期" >
      <el-date-picker
      v-model="getUpdateCirculation.assignDate"
      type="date"
      placeholder="请选择日期"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="当前节点是否接收">
      <el-select  v-model="getUpdateCirculation.confirmIt" placeholder="是否接收">
        <el-option label=1 value=1 />
        <el-option label=0 value=0 />
      </el-select>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button class="button" @click="updateCirculation()">更改    </el-button>
    </span>
  </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增任务">
    <el-form :model="getNewCirculation" ref="formRef">
    <el-form-item label="任务单名称">
      <el-input v-model="getNewCirculation.circulationName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="委托单名称">
      <el-select  v-model="getNewCirculation.entrustmentName"  placeholder="请选择委托单名称">
        <el-option 
        v-for="item in entrustment"
        :key="item.ENTRUSTMENTID" 
        :label="item.ENTRUSTMENTNAME"
        :value="item.ENTRUSTMENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="委托单下属项目">
      <el-select  v-model="getNewCirculation.orderTestName"  placeholder="请选择项目名称">
        <el-option 
        v-for="item in orderTestItem"
        :key="item.ORDERTESTID" 
        :label="item.ORDERTESTNAME"
        :value="item.ORDERTESTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品名称">
      <el-select  v-model="getNewCirculation.sampleName"  placeholder="请选择样品名称">
        <el-option 
        v-for="item in sample"
        :key="item.SAMPLETID" 
        :label="item.SAMPLENAME"
        :value="item.SAMPLENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="当前节点">
      <el-select  v-model="getNewCirculation.lastNodeName"  placeholder="请选择当前节点">
        <el-option 
        v-for="item in node"
        :key="item.NODEID" 
        :label="item.NODENAME"
        :value="item.NODENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="下一节点">
      <el-select  v-model="getNewCirculation.nextNodeName"  placeholder="请选择下一节点">
        <el-option 
        v-for="item in node"
        :key="item.NODEID" 
        :label="item.NODENAME"
        :value="item.NODENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="当前节点人员">
      <el-select  v-model="getNewCirculation.lastUserName"  placeholder="请选择当前节点人员">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="下一节点人员">
      <el-select  v-model="getNewCirculation.nextUserName"  placeholder="请选择下一节点人员">
        <el-option 
        v-for="item in user"
        :key="item.USERID" 
        :label="item.USERNAME"
        :value="item.USERNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="指定日期" >
      <el-date-picker
      v-model="getNewCirculation.assignDate"
      type="date"
      placeholder="请选择日期"
      format="YYYY-MM-DD"
      value-format="YYYY-MM-DD"
    />
    </el-form-item>
    <el-form-item label="当前节点是否接收">
      <el-select  v-model="getNewCirculation.confirmIt" placeholder="是否接收">
        <el-option label=1 value=1 />
        <el-option label=0 value=0 />
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
import { getCirculationList,getNewCirculation,deleteCirculationInfo,getUpdateCirculation,getUserList,getNodeList,getEntrustmentList,getOrderTestItemList,getSampleList } from '@/api/api';
import {InitData,ListInt} from '@/type/circulation'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
          getCirculations()
          getEntrustment()
          getNode()
          getUser()
          getOrderTestItem()
          getSample()
      })
      const getCirculations=()=>{
          getCirculationList(data.token).then((res)=>{
            console.log(res.data)
          data.list=res.data
          data.selectData.count = res.data.length
          });
      }
      let arr:any[]=[];
      const getEntrustment=()=>{
        getEntrustmentList(data.entrustmentToken).then((res)=>{
          arr = res.data.filter((value:any)=>{
              return value.STATUSX == '已提交'
            })
            console.log(arr)
            data.entrustment = arr
        })
        return data.entrustment
      }
      const getNode=()=>{
        getNodeList(data.nodeToken).then((res)=>{
            data.node = res.data
        })
        return data.node
      }
      const getUser=()=>{
        getUserList(data.nodeToken).then((res)=>{
            data.user = res.data
        })
        return data.user
      }
      const getOrderTestItem=()=>{
        getOrderTestItemList(data.orderTestToken).then((res)=>{
            data.orderTestItem = res.data
        })
        return data.orderTestItem
      }
      const getSample=()=>{
        getSampleList(data.sampleToken).then((res)=>{
            data.sample = res.data
        })
        return data.sample
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
            if(data.getCirculationId.circulationName){
            arr = data.list.filter((value)=>{
              return value.CIRCULATIONNAME.indexOf(data.getCirculationId.circulationName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getCirculationId.circulationName],
       () => {
      if (data.getCirculationId.circulationName == "") {
          getCirculations()
      }
});
      const changeCirculation=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateCirculation.circulationId=row.CIRCULATIONID
          data.getUpdateCirculation.circulationName=row.CIRCULATIONNAME
          data.getUpdateCirculation.entrustmentName=row.ENTRUSTMENTNAME
          data.getUpdateCirculation.orderTestName=row.ORDERTESTNAME
          data.getUpdateCirculation.sampleName=row.SAMPLENAME
          data.getUpdateCirculation.nextNodeName=row.NODENAME
          data.getUpdateCirculation.lastNodeName=row.NODENAME1
          data.getUpdateCirculation.nextUserName=row.USERNAME
          data.getUpdateCirculation.lastUserName=row.USERNAME1
          data.getUpdateCirculation.assignDate=row.ASSIGNDATE
          data.getUpdateCirculation.confirmIt=row.CONFIRMIT
          return data.getUpdateCirculation
      }
      const updateCirculation=()=>{
        getUpdateCirculation(data.getUpdateCirculation)
        getCirculations()
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
          getNewCirculation(data.getNewCirculation).then((res)=>{
            console.log(res)
            getCirculations()
          })
          
      }
      const deleteCirculation=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteCirculationInfo.circulationId=row.CIRCULATIONID
          // console.log(data.deleteCirculationInfo)
        deleteCirculationInfo(data.deleteCirculationInfo).then((res) => {
          // console.log(res)
          getCirculations()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeCirculation,save,updateCirculation,onInsert,insertConfirm,deleteCirculation}
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