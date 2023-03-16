<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getTypeId" class="demo-form-inline">
    <el-form-item label="项目类型">
      <el-input v-model="getTypeId.typeName" placeholder="请输入类型名称" />
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
      <el-table-column prop="TYPEID" label="类型id"  />
      <el-table-column prop="TYPENAME" label="类型名称"  />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeType(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteType(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateType" ref="formRef">
    <el-form-item label="类型名称">
      <el-input v-model="getUpdateType.typeName" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateType()">更改    </el-button>
    </span>
  </template>
</el-dialog>
<el-dialog v-model="insertIsShow" title="新增类型">
  <el-form :model="getNewType" >
    <el-form-item label="类型名称">
      <el-input v-model="getNewType.typeName" autocomplete="off" />
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
import { getTypeList,getTypeId,getNewTypeInfo,deleteTypeInfo,getUpdateTypeInfo } from '@/api/api';
import {InitData,ListInt} from '@/type/contentType'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      onMounted(()=>{
        getTypes()
      })
      const getTypes=()=>{
          getTypeList(data.token).then((res)=>{
            // console.log(res)
            data.list=res.data
            console.log(data.list)
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
      const getTypeIdInfo = () =>{
        getTypeId(data.getTypeId).then((res)=>{
          // console.log(res)
        })
      }
      const onSubmit = () =>{
        getTypeIdInfo()
        let arr:any[]=[];
        if(data.getTypeId.typeName){
          arr = data.list.filter((value)=>{
            return value.TYPENAME.indexOf(data.getTypeId.typeName) !== -1
          })
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getTypeId.typeName],
       () => {
      if (data.getTypeId.typeName == "") {
          getTypes()
      }
});
      const changeType=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateType.typeId=row.TYPEID
          data.getUpdateType.typeName=row.TYPENAME
          return data.getUpdateType
      }
      const updateType=()=>{
        getUpdateTypeInfo(data.getUpdateType).then((res)=>{
          // console.log(res)
          data.updateIsShow=false
          getTypes()
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
          getNewTypeInfo(data.getNewType).then((res)=>{
            console.log(res)
            getTypes()
          })
          
      }
      const deleteType=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteTypeInfo.typeId=row.TYPEID
        deleteTypeInfo(data.deleteTypeInfo).then((res) => {
          // console.log(res)
          getTypes()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeType,save,updateType,onInsert,insertConfirm,deleteType}
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