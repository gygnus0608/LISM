<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getFileId" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="getFileId.fileName" placeholder="请输入文件名" />
    </el-form-item>
    <el-form-item label="文件类型">
      <el-select  v-model="getFileTypeId.fileTypeName" clearable placeholder="请选择文件类型">
        <el-option 
        v-model="getFileTypeId.fileTypeName" 
        v-for="item in fileType"
        :key="item.FILETYPEID" 
        :label="item.FILETYPENAME"
        :value="item.FILETYPENAME" />
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
      <el-table-column prop="FILEID" label="文件id"  />
      <el-table-column prop="FILENAME" label="文件名称"  />
      <el-table-column prop="FILETYPENAME" label="文件类型" />
      <el-table-column prop="FILEPATH" label="文件路径" />
      <el-table-column prop="MODIFICATIONTIME" label="修改时间" />
      <el-table-column prop="REMARKS" label="备注说明" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeFile(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteFile(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateFile" ref="formRef">
    <el-form-item label="文件类型" >
      <el-select  v-model="getUpdateFile.fileTypeName"  placeholder="请选择文件类型">
        <el-option 
        v-for="item in fileType"
        :key="item.FILETYPEID" 
        :label="item.FILETYPENAME"
        :value="item.FILETYPENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="文件路径">
      <el-upload
      v-model="getUpdateFile.myFile"
        class="upload-demo"
        action="/LISM_fileService/GetDataTable"
        :data="fileList"
        :headers="headers"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="备注说明" >
      <el-input v-model="getUpdateFile.remarks" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateFile()">更改    </el-button>
    </span>
  </template>
</el-dialog>
<el-dialog v-model="insertIsShow" title="新增文件">
  <el-form :model="getNewFile" >
    <el-form-item label="文件类型">
      <el-select  v-model="getNewFile.fileTypeName" placeholder="请选择文件类型">
        <el-option 
        v-for="item in fileType"
        :key="item.FILETYPEID" 
        :label="item.FILETYPENAME"
        :value="item.FILETYPENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="文件路径">
      <el-upload
       v-model="getNewFile.myFile"
        ref="uploadRef"
        class="upload-demo"
        action="http://111.230.194.48/lism/LISM_fileService/GetDataTable"
        :headers="headers"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item label="备注说明">
      <el-input v-model="getNewFile.remarks" autocomplete="off" />
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
import { onMounted,toRefs,reactive,ref} from 'vue';
import { getFileTypeList,getFileTypeId,getFileList,getFileId,deleteFileInfo,getNewFileInfo,getUpdateFileInfo } from '@/api/api';
import {InitData,ListInt} from '@/type/fileService'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadUserFile  } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
  setup(){
      const data = reactive(new InitData())
      const fileList = ref<UploadUserFile []>()
      onMounted(()=>{
          getFiles()
          getFileType()
      })
      const getFiles=()=>{
          getFileList(data.token).then((res)=>{
            // console.log(res)
          data.list=res.data
          data.selectData.count = res.data.length
          });
      }
      const getFileType=()=>{
        getFileTypeList(data.fileTypeToken).then((res)=>{
            // console.log(res)
            data.fileType = res.data
        })
        return data.fileType
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
      const getFileIdInfo = () =>{
        getFileId(data.getFileId).then((res)=>{
          // console.log(res)
        })
      }
      const getFileTypeIdInfo = () =>{
        getFileTypeId(data.getFileTypeId).then((res)=>{
          // console.log(res)
        })
      }
      const onSubmit = () =>{
        getFileIdInfo()
        getFileTypeIdInfo()
        let arr:any[]=[];
        if(data.getFileId.fileName || data.getFileTypeId.fileTypeName){
          if(data.getFileId.fileName){
            if(data.getFileTypeId.fileTypeName){
            arr = data.list.filter((value)=>{
              return value.FILENAME.indexOf(data.getFileId.fileName) !== -1 && value.FILETYPENAME.indexOf(data.getFileTypeId.fileTypeName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.FILENAME.indexOf(data.getFileId.fileName) !== -1
            })
          }
          if(data.getFileTypeId.fileTypeName){
            if(data.getFileId.fileName){
              arr = data.list.filter((value)=>{
              return value.FILENAME.indexOf(data.getFileId.fileName) !== -1 && value.FILETYPENAME.indexOf(data.getFileTypeId.fileTypeName) !== -1
              })
              console.log(arr)
              data.list = arr
            }
            arr = data.list.filter((value)=>{
              return value.FILETYPENAME.indexOf(data.getFileTypeId.fileTypeName) !== -1
            })
          }
        }
        else{
          arr = data.list
        }
        data.selectData.count = arr.length
        data.list=arr
      };
      watch([() => data.getFileId.fileName,() => data.getFileTypeId.fileTypeName],
       () => {
      if (data.getFileId.fileName == "" || data.getFileTypeId.fileTypeName == "") {
          getFiles()
      }
});
      const changeFile=(row:ListInt)=>{
          data.updateIsShow=true
          data.getUpdateFile.fileId=row.FILEID
          data.getUpdateFile.fileTypeName=row.FILETYPENAME
          data.getUpdateFile.remarks=row.REMARKS
          return data.getUpdateFile
      }
      const updateFile=()=>{
        getUpdateFileInfo(data.getUpdateFile).then((res)=>{
          // console.log(res)
        });
        getFiles()
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
          getNewFileInfo(data.getNewFile).then((res)=>{
            // console.log(res)
            getFiles()
            
          })
          
      }
      const deleteFile=(row:ListInt)=>{
        ElMessageBox.confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        // 确认删除
        .then(() => {
        //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
        data.deleteFileInfo.fileId=row.FILEID
          // console.log(data.deleteFileInfo)
        deleteFileInfo(data.deleteFileInfo).then((res) => {
          // console.log(res)
          getFiles()
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
      return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,fileList,changeFile,save,updateFile,onInsert,insertConfirm,deleteFile}
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