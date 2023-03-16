<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getSupplierId" class="demo-form-inline">
    <el-form-item label="联系人">
      <el-input v-model="getSupplierId.supplierName" placeholder="请输入联系人" />
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
      <el-table-column prop="SUPPLIERID" label="序号"  />
      <el-table-column prop="SUPPLIERNAME" label="联系人"  />
      <el-table-column prop="COMPANY" label="单位名称" />
      <el-table-column prop="ADDRESS" label="地址" />
      <el-table-column prop="PHONE" label="电话" />
      <el-table-column prop="MAIL" label="邮箱" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeSupplier(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteSupplier(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateSupplier" ref="formRef">
    <el-form-item label="联系人">
      <el-input v-model="getUpdateSupplier.supplierName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="单位名称" >
      <el-input v-model="getUpdateSupplier.company" autocomplete="off" />
    </el-form-item>
    <el-form-item label="电话" >
      <el-input v-model="getUpdateSupplier.phone" autocomplete="off" />
    </el-form-item>
    <el-form-item label="地址" >
      <el-input v-model="getUpdateSupplier.address" autocomplete="off" />
    </el-form-item>
    <el-form-item label="邮箱" >
      <el-input v-model="getUpdateSupplier.mail" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateSupplier()">更改    </el-button>
    </span>
  </template>
</el-dialog>
<el-dialog v-model="insertIsShow" title="新增供应商">
  <el-form :model="getNewSupplier" >
    <el-form-item label="联系人">
      <el-input v-model="getNewSupplier.supplierName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="单位名称">
      <el-input v-model="getNewSupplier.company" autocomplete="off" />
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="getNewSupplier.phone" autocomplete="off" />
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="getNewSupplier.address" autocomplete="off" />
    </el-form-item>
    <el-form-item label="邮箱" >
      <el-input v-model="getNewSupplier.mail" autocomplete="off" />
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
import { getSupplierList,getSupplierId,getNewSupplierInfo,deleteSupplierInfo,getUpdateSupplierInfo } from '@/api/api';
import {InitData,ListInt} from '@/type/supplier'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
        getSuppliers()
      })
      const getSuppliers=()=>{
          getSupplierList(data.token).then((res)=>{
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
      const getSupplierIdInfo = () =>{
        getSupplierId(data.getSupplierId).then((res)=>{console.log(res)})
      }
      const onSubmit = () =>{
        getSupplierIdInfo()
        let arr:any[]=[];
        if(data.getSupplierId.supplierName){
          arr = data.list.filter((value)=>{
            return value.SUPPLIERNAME.indexOf(data.getSupplierId.supplierName) !== -1
          })
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getSupplierId.supplierName],
       () => {
      if (data.getSupplierId.supplierName == "") {
          getSuppliers()
      }
});
      const changeSupplier=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateSupplier.supplierId=row.SUPPLIERID
          data.getUpdateSupplier.supplierName=row.SUPPLIERNAME
          data.getUpdateSupplier.company=row.COMPANY
          data.getUpdateSupplier.phone=row.PHONE
          data.getUpdateSupplier.address=row.ADDRESS
          data.getUpdateSupplier.mail=row.MAIL
          return data.getUpdateSupplier
      }
      const updateSupplier=()=>{
        getUpdateSupplierInfo(data.getUpdateSupplier).then((res)=>{
          // console.log(res)
        getSuppliers()
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
          getNewSupplierInfo(data.getNewSupplier).then((res)=>{
            console.log(res)
            getSuppliers()
          })
          
      }
      const deleteSupplier=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteSupplierInfo.supplierId=row.SUPPLIERID
        deleteSupplierInfo(data.deleteSupplierInfo).then((res) => {
          // console.log(res)
          getSuppliers()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeSupplier,save,updateSupplier,onInsert,insertConfirm,deleteSupplier}
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