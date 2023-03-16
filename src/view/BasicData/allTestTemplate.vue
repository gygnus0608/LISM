<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getTemplateId" class="demo-form-inline">
    <el-form-item label="模板名称">
      <el-input v-model="getTemplateId.templateName" placeholder="请输入模板名称" />
    </el-form-item>
    <el-form-item label="检测项目">
      <el-select  v-model="getContentId.contentName" clearable placeholder="请选择检测项目">
        <el-option 
        v-model="getContentId.contentName" 
        v-for="item in content"
        :key="item.CONTENTID" 
        :label="item.CONTENTNAME"
        :value="item.CONTENTNAME" />
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
      <el-table-column prop="TYPENAME" label="检测类型" />
      <el-table-column prop="CONTENTNAME" label="检测项目" />
      <el-table-column prop="TEMPMAX" label="最大值" />
      <el-table-column prop="TEMPMIN" label="最小值" />
      <el-table-column prop="TEMPSTANDARD" label="标准值" />
      <el-table-column prop="TEMPSTANDARDHOUR" label="标准工时" />
      <el-table-column prop="TEMPREMIND" label="是否提醒" />
      <el-table-column prop="TEMPMETHOD" label="测试方法" />
      <el-table-column prop="TEMPREQUIRE" label="测试要求" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeTemplate(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteTemplate(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateTemplate" ref="formRef">
    <el-form-item label="模板名称">
      <el-input v-model="getUpdateTemplate.templateName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="检测项目">
      <el-select  v-model="getUpdateTemplate.contentName"  placeholder="请选择检测项目">
        <el-option 
        v-for="item in content"
        :key="item.CONTENTID" 
        :label="item.CONTENTNAME"
        :value="item.CONTENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测类型" >
      <el-select  v-model="getUpdateTemplate.typeName" placeholder="请选择检测类型">
        <el-option 
        v-for="item in type"
        :key="item.TYPEID" 
        :label="item.TYPENAME"
        :value="item.TYPENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="最大值">
      <el-input v-model="getUpdateTemplate.tempMax" clearable allow-create filterable autocomplete="off" />
    </el-form-item>
    <el-form-item label="最小值">
      <el-input v-model="getUpdateTemplate.tempMin"  clearable allow-create filterableautocomplete="off" />
    </el-form-item>
    <el-form-item label="标准值">
      <el-input v-model="getUpdateTemplate.tempStandard" clearable allow-create filterable autocomplete="off" />
    </el-form-item>
    <el-form-item label="标准工时">
      <el-input v-model="getUpdateTemplate.tempStandardHour" clearable allow-create filterable autocomplete="off" />
    </el-form-item>
    <el-form-item label="是否提醒" >
      <el-radio v-model="getUpdateTemplate.tempRemind" label=1>1</el-radio>
      <el-radio v-model="getUpdateTemplate.tempRemind" label=0>0</el-radio>
      </el-form-item>
    <el-form-item label="测试方法">
      <el-input v-model="getUpdateTemplate.tempMethod" autocomplete="off" />
    </el-form-item>
    <el-form-item label="测试要求">
      <el-input v-model="getUpdateTemplate.tempRequire" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateTemplate()">更改    </el-button>
    </span>
  </template>
</el-dialog>
<el-dialog v-model="insertIsShow" title="新增模板">
  <el-form :model="getNewTemplate" >
    <el-form-item label="模板名称">
      <el-input v-model="getNewTemplate.templateName" clearable  allow-create filterable autocomplete="off" />
    </el-form-item>
    <el-form-item label="检测项目" >
      <el-select  v-model="getNewTemplate.contentName" clearable placeholder="请选择检测项目">
        <el-option 
        v-for="item in content"
        :key="item.CONTENTID" 
        :label="item.CONTENTNAME"
        :value="item.CONTENTNAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="检测类型" >
      <el-select  v-model="getNewTemplate.typeName" clearable placeholder="请选择检测类型">
        <el-option 
        v-for="item in type"
        :key="item.TYPEID" 
        :label="item.TYPENAME"
        :value="item.TYPENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="最大值">
      <el-input v-model="getNewTemplate.tempMax" clearable allow-create filterable autocomplete="off" />
    </el-form-item>
    <el-form-item label="最小值">
      <el-input v-model="getNewTemplate.tempMin"  clearable allow-create filterableautocomplete="off" />
    </el-form-item>
    <el-form-item label="标准值">
      <el-input v-model="getNewTemplate.tempStandard" clearable allow-create filterable autocomplete="off" />
    </el-form-item>
    <el-form-item label="标准工时">
      <el-input v-model="getNewTemplate.tempStandardHour" clearable allow-create filterable autocomplete="off" />
    </el-form-item>
    <el-form-item label="是否提醒" >
      <el-radio v-model="getNewTemplate.tempRemind" label=1>1</el-radio>
      <el-radio v-model="getNewTemplate.tempRemind" label=0>0</el-radio>
      </el-form-item>
    <el-form-item label="测试方法">
      <el-input v-model="getNewTemplate.tempMethod" autocomplete="off" />
    </el-form-item>
    <el-form-item label="测试要求">
      <el-input v-model="getNewTemplate.tempRequire" autocomplete="off" />
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
import { getContentList,getContentId,getTypeList,getTypeId,getTemplateList,getTemplateId,deleteTemplateInfo,getNewTemplateInfo,getUpdateTemplateInfo } from '@/api/api';
import {InitData,ListInt} from '@/type/testTemplate'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
          getTemplate()
          getContent()
          getType()
      })
      const getTemplate=()=>{
        // const token:any = localStorage.getItem('token')
          getTemplateList(data.token).then((res)=>{
            console.log(res)
          data.list=res.data
          data.selectData.count = res.data.length
          });
      }
      const getContent=()=>{
        getContentList(data.contentToken).then((res)=>{
            console.log(res)
            data.content = res.data
        })
        return data.content
      }
      const getType=()=>{
        getTypeList(data.typeToken).then((res)=>{
            console.log(res)
            data.type = res.data
        })
        return data.type
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
      const getTemplateIdInfo = () =>{
        getTemplateId(data.getTemplateId).then((res)=>{
          // console.log(res)
        })
      }
      const getContentIdInfo = () =>{
        getContentId(data.getContentId).then((res)=>{
          // console.log(res)
        })
      }
      const getTypeIdInfo = () =>{
        getTypeId(data.getTypeId).then((res)=>{
          // console.log(res)
        })
      }
      const onSubmit = () =>{
        getTemplateIdInfo()
        getContentIdInfo()
        let arr:any[]=[];
        if(data.getContentId.contentName || data.getTemplateId.templateName){
            if(data.getTemplateId.templateName){
              if(data.getContentId.contentName){
                arr = data.list.filter((value)=>{
                  return value.CONTENTNAME.indexOf(data.getContentId.contentName) !== -1 && value.TEMPLATENAME.indexOf(data.getTemplateId.templateName) !== -1
                })
                // console.log(arr)
                data.list = arr
              }
              arr = data.list.filter((value)=>{
                value.TEMPLATENAME.indexOf(data.getTemplateId.templateName) !== -1
              })
            }
            if(data.getContentId.contentName){
              if(data.getTemplateId.templateName){
              arr = data.list.filter((value)=>{
                return value.CONTENTNAME.indexOf(data.getContentId.contentName) !== -1 && value.TEMPLATENAME.indexOf(data.getTemplateId.templateName) !== -1
                })
                // console.log(arr)
                data.list = arr
              }
              arr = data.list.filter((value)=>{
                return value.CONTENTNAME.indexOf(data.getContentId.contentName) !== -1
              })
            }
          }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getTemplateId.templateName,() => data.getContentId.contentName],
       () => {
      if (data.getTemplateId.templateName == "" || data.getContentId.contentName == "") {
          getTemplate()
      }
});
      const changeTemplate=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateTemplate.templateId=row.TEMPLATEID
          data.getUpdateTemplate.templateName=row.TEMPLATENAME
          data.getUpdateTemplate.contentName=row.CONTENTNAME
          data.getUpdateTemplate.typeName=row.TYPENAME
          data.getUpdateTemplate.tempMax=row.TEMPMAX
          data.getUpdateTemplate.tempMin=row.TEMPMIN
          data.getUpdateTemplate.tempStandard=row.TEMPSTANDARD
          data.getUpdateTemplate.tempStandardHour=row.TEMPSTANDARDHOUR
          data.getUpdateTemplate.tempRemind=row.TEMPREMIND
          data.getUpdateTemplate.tempMethod=row.TEMPMETHOD
          data.getUpdateTemplate.tempRequire=row.TEMPREQUIRE
          return data.getUpdateTemplate
      }
      const updateTemplate=()=>{
        getUpdateTemplateInfo(data.getUpdateTemplate).then((res)=>{
        data.updateIsShow=false
        getTemplate()
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
          getNewTemplateInfo(data.getNewTemplate).then((res)=>{
            // console.log(res)
            getTemplate()
            
          })
          
      }
      const deleteTemplate=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteTemplateInfo.templateId=row.TEMPLATEID
        deleteTemplateInfo(data.deleteTemplateInfo).then((res) => {
          // console.log(res)
          getTemplate()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeTemplate,save,updateTemplate,onInsert,insertConfirm,deleteTemplate}
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