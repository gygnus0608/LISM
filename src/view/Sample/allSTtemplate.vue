<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getSampleTemplateId" class="demo-form-inline">
    <el-form-item label="模板名称">
      <el-input v-model="getSampleTemplateId.templateName" placeholder="请输入模板名称" />
    </el-form-item>
    <el-form-item label="样品档次">
      <el-select  v-model="getLevelId.levelName" clearable placeholder="请选择样品档次">
        <el-option 
        v-model="getLevelId.levelName" 
        v-for="item in level"
        :key="item.LEVELID" 
        :label="item.LEVELNAME"
        :value="item.LEVELNAME" />
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
      <el-table-column prop="TEMPLATEID" label="模板id"  />
      <el-table-column prop="TEMPLATENAME" label="模板名称"  />
      <el-table-column prop="LEVELNAME" label="样品档次" />
      <el-table-column prop="STBATCH" label="样品批号" />
      <el-table-column prop="STMODE" label="样品型号" />
      <el-table-column prop="STNUM" label="样品数量" />
      <el-table-column prop="RECEIVENUM" label="接收数量" />
      <el-table-column prop="DISTRIBUTENUM" label="分发数量" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeSampleTemplate(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteSampleTemplate(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateSampleTemplate" ref="formRef">
    <el-form-item label="模板名称">
      <el-input v-model="getUpdateSampleTemplate.templateName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="样品档次">
      <el-select  v-model="getUpdateSampleTemplate.levelName"  placeholder="请选择样品档次">
        <el-option 
        v-for="item in level"
        :key="item.LEVELID" 
        :label="item.LEVELNAME"
        :value="item.LEVELNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品批号" >
      <el-input v-model="getUpdateSampleTemplate.stBatch" autocomplete="off" />
    </el-form-item>
    <el-form-item label="样品型号" >
      <el-input v-model="getUpdateSampleTemplate.stMode" autocomplete="off" />
    </el-form-item>
    <el-form-item label="样品数量" >
      <el-input v-model="getUpdateSampleTemplate.stNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="接收数量" >
      <el-input v-model="getUpdateSampleTemplate.receiveNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="分发数量" >
      <el-input v-model="getUpdateSampleTemplate.distributeNum" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateSampleTemplate()">更改    </el-button>
    </span>
  </template>
</el-dialog>
<el-dialog v-model="insertIsShow" title="新增样品标签模板">
  <el-form :model="getNewSampleTemplate" >
    <el-form-item label="模板名称">
      <el-input v-model="getNewSampleTemplate.templateName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="模板档次">
      <el-select  v-model="getNewSampleTemplate.levelName" placeholder="请选择样品档次">
        <el-option 
        v-for="item in level"
        :key="item.LEVELID" 
        :label="item.LEVELNAME"
        :value="item.LEVELNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="样品批号">
      <el-input v-model="getNewSampleTemplate.stBatch" autocomplete="off" />
    </el-form-item>
    <el-form-item label="样品型号">
      <el-input v-model="getNewSampleTemplate.stMode" autocomplete="off" />
    </el-form-item>
    <el-form-item label="样品数量">
      <el-input v-model="getNewSampleTemplate.stNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="接收数量" >
      <el-input v-model="getNewSampleTemplate.receiveNum" autocomplete="off" />
    </el-form-item>
    <el-form-item label="分发数量" >
      <el-input v-model="getNewSampleTemplate.distributeNum" autocomplete="off" />
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
import { getSampleTemplateList,getSampleTemplateId,getNewSampleTemplateInfo,getLevelList,getLevelId,deleteSampleTemplateInfo,getUpdateSampleTemplateInfo } from '@/api/api';
import {InitData,ListInt} from '@/type/sampleTemplate'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
          getSampleTemplate()
          getLevel()
      })
      const getSampleTemplate=()=>{
          getSampleTemplateList(data.token).then((res)=>{
            console.log(res)
          data.list=res.data
          data.selectData.count = res.data.length
          });
      }
      const getLevel=()=>{
        getLevelList(data.levelToken).then((res)=>{
            // console.log(res)
            data.level = res.data
        })
        return data.level
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
      const getSampleTemplateIdInfo = () =>{
        getSampleTemplateId(data.getSampleTemplateId).then((res)=>{
        })
      }
      const getLevelIdInfo = () =>{
        getLevelId(data.getLevelId).then((res)=>{
        })
      }
      const onSubmit = () =>{
        getSampleTemplateIdInfo()
        getLevelIdInfo()
        let arr:any[]=[];
        if(data.getSampleTemplateId.templateName || data.getLevelId.levelName){
          if(data.getSampleTemplateId.templateName){
            if(data.getLevelId.levelName){
            arr = data.list.filter((value)=>{
              return value.TEMPLATENAME.indexOf(data.getSampleTemplateId.templateName) !== -1 && value.LEVELNAME.indexOf(data.getLevelId.levelName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.TEMPLATENAME.indexOf(data.getSampleTemplateId.templateName) !== -1
            })
          }
          if(data.getLevelId.levelName){
            if(data.getSampleTemplateId.templateName){
              arr = data.list.filter((value)=>{
              return value.TEMPLATENAME.indexOf(data.getSampleTemplateId.templateName) !== -1 && value.LEVELNAME.indexOf(data.getLevelId.levelName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.LEVELNAME.indexOf(data.getLevelId.levelName) !== -1
            })
          }
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getSampleTemplateId.templateName,() => data.getLevelId.levelName],
       () => {
      if (data.getSampleTemplateId.templateName == "" || data.getLevelId.levelName == "") {
          getSampleTemplate()
      }
});
      const changeSampleTemplate=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateSampleTemplate.templateId=row.TEMPLATEID
          data.getUpdateSampleTemplate.templateName=row.TEMPLATENAME
          data.getUpdateSampleTemplate.levelName=row.LEVELNAME
          data.getUpdateSampleTemplate.stBatch=row.STBATCH
          data.getUpdateSampleTemplate.stMode=row.STMODE
          data.getUpdateSampleTemplate.stNum=row.STNUM
          data.getUpdateSampleTemplate.receiveNum=row.RECEIVENUM
          data.getUpdateSampleTemplate.distributeNum=row.DISTRIBUTENUM
          return data.getUpdateSampleTemplate
      }
      const updateSampleTemplate=()=>{
        getUpdateSampleTemplateInfo(data.getUpdateSampleTemplate).then((res)=>{
        });
        getSampleTemplate()
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
          getNewSampleTemplateInfo(data.getNewSampleTemplate).then((res)=>{
            getSampleTemplate()
            
          })
          
      }
      const deleteSampleTemplate=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteSampleTemplateInfo.templateId=row.TEMPLATEID
          // console.log(data.deleteSampleTemplateInfo)
        deleteSampleTemplateInfo(data.deleteSampleTemplateInfo).then((res) => {
          getSampleTemplate()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeSampleTemplate,save,updateSampleTemplate,onInsert,insertConfirm,deleteSampleTemplate}
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