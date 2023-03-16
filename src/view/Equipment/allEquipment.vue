<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getEquipmentId" class="demo-form-inline">
    <el-form-item label="设备名称">
      <el-input v-model="getEquipmentId.equipmentName" placeholder="请输入设备名称" />
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
      <el-table-column prop="EQUIPMENTID" label="设备id"  />
      <el-table-column prop="EQUIPMENTNAME" label="设备名称"  />
      <el-table-column prop="CHANNELNUM" label="通道数量" />
      <el-table-column prop="EQUIPMENTMODEL" label="品牌型号" />
      <el-table-column prop="REMARKS" label="备注说明" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeEquipment(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteEquipment(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateEquipment" ref="formRef">
    <el-form-item label="设备名称">
      <el-input v-model="getUpdateEquipment.equipmentName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="通道数量" >
      <el-input v-model="getUpdateEquipment.channelNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="品牌型号" >
      <el-input v-model="getUpdateEquipment.equipmentModel" autocomplete="off" />
    </el-form-item>
    <el-form-item label="备注说明" >
      <el-input v-model="getUpdateEquipment.remarks" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateEquipment()">更改    </el-button>
    </span>
  </template>
</el-dialog>
<el-dialog v-model="insertIsShow" title="新增设备">
  <el-form :model="getNewEquipment" >
    <el-form-item label="设备名称">
      <el-input v-model="getNewEquipment.equipmentName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="通道数量">
      <el-input v-model="getNewEquipment.channelNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="品牌型号">
      <el-input v-model="getNewEquipment.equipmentModel" autocomplete="off" />
    </el-form-item>
    <el-form-item label="备注说明">
      <el-input v-model="getNewEquipment.remarks" autocomplete="off" />
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
import { getEquipmentList,getEquipmentId,getNewEquipmentInfo,deleteEquipmentInfo,getUpdateEquipmentInfo } from '@/api/api';
import {InitData,ListInt} from '@/type/equipment'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
        getEquipments()
      })
      const getEquipments=()=>{
          getEquipmentList(data.token).then((res)=>{
            console.log(res)
            data.list=res.data
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
      const getEquipmentIdInfo = () =>{
        getEquipmentId(data.getEquipmentId).then((res)=>{console.log(res)})
      }
      const onSubmit = () =>{
        getEquipmentIdInfo()
        let arr:any[]=[];
        if(data.getEquipmentId.equipmentName){
          arr = data.list.filter((value)=>{
            return value.EQUIPMENTNAME.indexOf(data.getEquipmentId.equipmentName) !== -1
          })
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getEquipmentId.equipmentName],
       () => {
      if (data.getEquipmentId.equipmentName == "") {
          getEquipments()
      }
});
      const changeEquipment=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateEquipment.equipmentId=row.EQUIPMENTID
          data.getUpdateEquipment.equipmentName=row.EQUIPMENTNAME
          data.getUpdateEquipment.channelNum=row.CHANNELNUM
          data.getUpdateEquipment.equipmentModel=row.EQUIPMENTMODEL
          data.getUpdateEquipment.remarks=row.REMARKS
          return data.getUpdateEquipment
      }
      const updateEquipment=()=>{
        getUpdateEquipmentInfo(data.getUpdateEquipment).then((res)=>{
          console.log(res)
        });
        getEquipments()
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
          getNewEquipmentInfo(data.getNewEquipment).then((res)=>{
            console.log(res)
            getEquipments()
          })
          
      }
      const deleteEquipment=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteEquipmentInfo.equipmentId=row.EQUIPMENTID
        deleteEquipmentInfo(data.deleteEquipmentInfo).then((res) => {
          // console.log(res)
          getEquipments()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeEquipment,save,updateEquipment,onInsert,insertConfirm,deleteEquipment}
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