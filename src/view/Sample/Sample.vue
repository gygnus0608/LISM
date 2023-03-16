<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="dataList" class="demo-form-inline">
    <el-form-item label="样品名称">
      <el-input v-model="getSampleId.sampleName" placeholder="请输入样品名称" />
    </el-form-item>
    <el-form-item label="供应商联系人">
        <el-select  v-model="getSupplierId.supplierName" clearable placeholder="请选择供应商联系人">
          <el-option 
        v-for="item in supplier"
        :key="item.SUPPLIERID" 
        :label="item.SUPPLIERNAME"
        :value="item.SUPPLIERNAME" />
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
    
    <el-table :data="dataList.comList" 
    :default-sort ="{prop:'EXPIRETIME',order:'descending'}"
    border height="400" style="width: 100% " >
      <el-table-column prop="SAMPLEID" label="样品id"  />
      <el-table-column prop="SAMPLENAME" label="样品名称"  />
      <el-table-column prop="TEMPLATENAME" label="样品模板名称" />
      <el-table-column prop="SUPPLIERNAME" label="供应商联系人" />
      <el-table-column prop="STBATCH" label="样品批号" />
      <el-table-column prop="STMODE" label="样品型号" />
      <el-table-column prop="LEVELNAME" label="样品档次" />
      <el-table-column prop="STNUM" label="样品数量" />
      <el-table-column prop="RECEIVENUM" label="接收数量" />
      <el-table-column prop="DISTRIBUTENUM" label="分发数量" />
      <el-table-column prop="BARCODE" label="标签条码" />
      <el-table-column prop="INBOUND" label="是否入库" />
      <el-table-column prop="OUTBOUND" label="是否出库" />
      <el-table-column prop="EXPIRETIME" sortable label="质保预警" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeSample(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteSample(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
    <el-form :model="getUpdateSample" ref="formRef">
      <el-form-item label="样品名称">
        <el-input v-model="getUpdateSample.sampleName"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="供应商联系人">
        <el-select  v-model="getUpdateSample.supplierName"  placeholder="请选择供应商联系人">
          <el-option 
          v-for="item in supplier"
          :key="item.SUPPLIERID" 
          :label="item.SUPPLIERNAME"
          :value="item.SUPPLIERNAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品模板名称">
        <el-select  v-model="getUpdateSample.templateName"  placeholder="请选择样品模板名称">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.TEMPLATENAME"
          :value="item.TEMPLATENAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品档次">
        <el-select  v-model="getUpdateSample.levelName"  placeholder="请选择样品档次">
          <el-option 
          v-for="item in level"
          :key="item.LEVELID" 
          :label="item.LEVELNAME"
          :value="item.LEVELNAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品批号">
        <el-select  v-model="getUpdateSample.stBatch"  placeholder="请选择样品批号">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.STBATCH"
          :value="item.STBATCH" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品型号">
        <el-select  v-model="getUpdateSample.stMode"  placeholder="请选择样品型号">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.STMODE"
          :value="item.STMODE" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品总数">
        <el-select  v-model="getUpdateSample.stNum"  placeholder="请选择样品总数">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.STNUM"
          :value="item.STNUM" />
        </el-select>
      </el-form-item>
      <el-form-item label="接收数量">
        <el-select  v-model="getUpdateSample.receiveNum"  placeholder="请选择接收数量">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.RECEIVENUM"
          :value="item.RECEIVENUM" />
        </el-select>
      </el-form-item>
      <el-form-item label="分发数量">
        <el-select  v-model="getUpdateSample.distributeNum"  placeholder="请选择分发数量">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.DISTRIBUTENUM"
          :value="item.DISTRIBUTENUM" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签条码" >
        <el-input v-model="getUpdateSample.barcode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否入库">
        <el-select  v-model="getUpdateSample.inbound" placeholder="是否入库">
          <el-option label=1 value=1 />
          <el-option label=0 value=0 />
        </el-select>
      </el-form-item>
      <el-form-item label="是否出库">
        <el-select  v-model="getUpdateSample.outbound" placeholder="是否出库">
          <el-option label=1 value=1 />
          <el-option label=0 value=0 />
        </el-select>
      </el-form-item>
      <el-form-item label="质保预警" >
        <el-date-picker
        v-model="getUpdateSample.expireTime"
        type="date"
        placeholder="请选择日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
      </el-form-item>
    </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateSample()">更改    </el-button>
    </span>
  </template>
</el-dialog>
<el-dialog v-model="insertIsShow" title="新增样品">
  <el-form :model="getNewSample" ref="formRef">
      <el-form-item label="样品名称">
        <el-input v-model="getNewSample.sampleName"  autocomplete="off" />
      </el-form-item>
      <el-form-item label="供应商联系人">
        <el-select  v-model="getNewSample.supplierName"  placeholder="请选择供应商联系人">
          <el-option 
          v-for="item in supplier"
          :key="item.SUPPLIERID" 
          :label="item.SUPPLIERNAME"
          :value="item.SUPPLIERNAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品模板名称">
        <el-select  v-model="getNewSample.templateName"  placeholder="请选择样品模板名称">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.TEMPLATENAME"
          :value="item.TEMPLATENAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品档次">
        <el-select  v-model="getNewSample.levelName"  placeholder="请选择样品档次">
          <el-option 
          v-for="item in level"
          :key="item.LEVELID" 
          :label="item.LEVELNAME"
          :value="item.LEVELNAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品批号">
        <el-select  v-model="getNewSample.stBatch"  placeholder="请选择样品批号">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.STBATCH"
          :value="item.STBATCH" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品型号">
        <el-select  v-model="getNewSample.stMode"  placeholder="请选择样品型号">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.STMODE"
          :value="item.STMODE" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品总数">
        <el-select  v-model="getNewSample.stNum"  placeholder="请选择样品总数">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.STNUM"
          :value="item.STNUM" />
        </el-select>
      </el-form-item>
      <el-form-item label="接收数量">
        <el-select  v-model="getNewSample.receiveNum"  placeholder="请选择接收数量">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.RECEIVENUM"
          :value="item.RECEIVENUM" />
        </el-select>
      </el-form-item>
      <el-form-item label="分发数量">
        <el-select  v-model="getNewSample.distributeNum"  placeholder="请选择分发数量">
          <el-option 
          v-for="item in sampleTemplate"
          :key="item.TEMPLATEID" 
          :label="item.DISTRIBUTENUM"
          :value="item.DISTRIBUTENUM" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签条码" >
        <el-input v-model="getNewSample.barcode" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否入库">
        <el-select  v-model="getNewSample.inbound" placeholder="是否入库">
          <el-option label=1 value=1 />
          <el-option label=0 value=0 />
        </el-select>
      </el-form-item>
      <el-form-item label="是否出库">
        <el-select  v-model="getNewSample.outbound" placeholder="是否出库">
          <el-option label=1 value=1 />
          <el-option label=0 value=0 />
        </el-select>
      </el-form-item>
      <el-form-item label="质保预警" >
        <el-date-picker
        v-model="getNewSample.expireTime"
        type="date"
        placeholder="请选择日期"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
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
import { getSampleList,getSampleId,getNewSampleInfo,getSupplierList,getSupplierId,getSampleTemplateList,getLevelList,deleteSampleInfo,getUpdateSampleInfo} from '@/api/api';
import {InitData,ListInt} from '@/type/sample'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
          getSample()
          getSupplier()
          getSampleTemplate()
          getLevel()
      })
      const getSample=()=>{
        // const token:any = localStorage.getItem('token')
          getSampleList(data.token).then((res)=>{
            // console.log(res)
          data.list=res.data
          data.selectData.count = res.data.length
          });
          dataList.comList.reverse()
      }
      const getSupplier=()=>{
        getSupplierList(data.supplierToken).then((res)=>{
            // console.log(res)
            data.supplier = res.data
        })
        return data.supplier
      }
      const getSampleTemplate=()=>{
        getSampleTemplateList(data.sampleTemplateToken).then((res)=>{
            // console.log(res)
            data.sampleTemplate = res.data
        })
        return data.sampleTemplate
      }
      const getLevel=()=>{
        getLevelList(data.levelToken).then((res)=>{
            // console.log(res)
            data.level = res.data
        })
        return data.sampleTemplate
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
      // const getSampleIdInfo = () =>{
      //   getSampleId(data.getSampleId).then((res)=>{
      //     // console.log(res)
      //   })
      // }
      // const getSupplierIdInfo = () =>{
      //   getSupplierId(data.getSupplierId).then((res)=>{
      //     // console.log(res)
      //   })
      // }
      const onSubmit = () =>{
        // getSampleIdInfo()
        // getSupplierIdInfo()
        // getSampleTemplateIdInfo()
        let arr:any[]=[];
        if(data.getSampleId.sampleName || data.getSupplierId.supplierName){
          if(data.getSampleId.sampleName){
            if(data.getSupplierId.supplierName){
            arr = data.list.filter((value)=>{
              return value.SAMPLENAME.indexOf(data.getSampleId.sampleName) !== -1 && value.SUPPLIERNAME.indexOf(data.getSupplierId.supplierName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.SAMPLENAME.indexOf(data.getSampleId.sampleName) !== -1
            })
          }
          if(data.getSupplierId.supplierName){
            if(data.getSampleId.sampleName){
              arr = data.list.filter((value)=>{
              return value.SAMPLENAME.indexOf(data.getSampleId.sampleName) !== -1 && value.SUPPLIERNAME.indexOf(data.getSupplierId.supplierName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.SUPPLIERNAME.indexOf(data.getSupplierId.supplierName) !== -1
            })
          }
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getSampleId.sampleName,() => data.getSupplierId.supplierName],
       () => {
      if (data.getSampleId.sampleName == "" || data.getSupplierId.supplierName == "") {
        getSample()
      }
});
      const changeSample=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateSample.sampleId=row.SAMPLEID
          data.getUpdateSample.sampleName=row.SAMPLENAME
          data.getUpdateSample.supplierName=row.SUPPLIERNAME
          data.getUpdateSample.templateName=row.TEMPLATENAME
          data.getUpdateSample.stBatch=row.STBATCH
          data.getUpdateSample.stMode=row.STMODE
          data.getUpdateSample.levelName=row.LEVELNAME
          data.getUpdateSample.stNum=row.STNUM
          data.getUpdateSample.receiveNum=row.RECEIVENUM
          data.getUpdateSample.distributeNum=row.DISTRIBUTENUM
          data.getUpdateSample.barcode=row.BARCODE
          data.getUpdateSample.inbound=row.INBOUND
          data.getUpdateSample.outbound=row.OUTBOUND
          data.getUpdateSample.expireTime=row.EXPIRETIME
          return data.getUpdateSample
      }
      const updateSample=()=>{
        getUpdateSampleInfo(data.getUpdateSample).then((res)=>{
          // console.log(res)
        });
        getSample()
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
          getNewSampleInfo(data.getNewSample).then((res)=>{
            // console.log(res)
            getSample()
          })
          
      }
      const deleteSample=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteSampleInfo.sampleId=row.SAMPLEID
          // console.log(data.deleteUserInfo)
        deleteSampleInfo(data.deleteSampleInfo).then((res) => {
          // console.log(res)
          getSample()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeSample,save,updateSample,onInsert,insertConfirm,deleteSample}
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