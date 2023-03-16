<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
      <el-form :inline="true" :model="getContentId" class="demo-form-inline">
    <el-form-item label="项目名称">
      <el-input v-model="getContentId.contentName" placeholder="请输入项目名称" />
    </el-form-item>
    <el-form-item label="项目类型">
      <el-select  v-model="getTypeId.typeName" clearable placeholder="请选择项目类型">
        <el-option 
        v-model="getTypeId.typeName" 
        v-for="item in type"
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
      <el-table-column prop="CONTENTID" label="序号"  />
      <el-table-column prop="CONTENTNAME" label="检测项目"  />
      <el-table-column prop="TYPENAME" label="项目类型" />
      <el-table-column prop="TEMPMAX" label="最大值" />
      <el-table-column prop="TEMPMIN"  label="最小值" />
      <el-table-column prop="TEMPSTANDARD"  label="标准值" />
      <el-table-column prop="TEMPSTANDARDHOUR"  label="标准工时" />
      <el-table-column prop="TEMPREMIND"  label="是否提醒" />
      <el-table-column prop="TEMPMETHOD"  label="测试方法" />
      <el-table-column prop="TEMPREQUIRE"  label="测试要求" />
      <el-table-column prop="role" label="操作" min-width="180px">
      <template #default="scope">
        <el-button  @click="changeContent(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteContent(scope.row)"
          >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
  <el-form :model="getUpdateContent" ref="formRef">
    <el-form-item label="项目名称">
      <el-input v-model="getUpdateContent.contentName" autocomplete="off" />
    </el-form-item>
    <el-form-item label="项目类型">
      <el-select  v-model="getUpdateContent.typeName"  placeholder="请选择类型">
        <el-option 
        v-for="item in type"
        :key="item.TYPEID" 
        :label="item.TYPENAME"
        :value="item.TYPENAME" />
      </el-select>
    </el-form-item>
    <el-form-item label="最大值">
      <el-select  v-model="getUpdateContent.tempMax" clearable allow-create filterable placeholder="请选择最大值">
        <el-option 
        v-for="item in list"
        :key="item.TEMPLATEID" 
        :label="item.TEMPMAX"
        :value="item.TEMPMAX" />
      </el-select>
    </el-form-item>
    <el-form-item label="最小值">
      <el-select  v-model="getUpdateContent.tempMin" clearable allow-create filterable placeholder="请选择最小值">
        <el-option 
        v-for="item in list"
        :key="item.TEMPLATEID" 
        :label="item.TEMPMIN"
        :value="item.TEMPMIN" />
      </el-select>
    </el-form-item>
    <el-form-item label="标准值">
      <el-select  v-model="getUpdateContent.tempStandard" clearable allow-create filterable placeholder="请选择标准值">
        <el-option 
        v-for="item in list"
        :key="item.TEMPLATEID" 
        :label="item.TEMPSTANDARD"
        :value="item.TEMPSTANDARD" />
      </el-select>
    </el-form-item>
    <el-form-item label="标准工时">
      <el-select  v-model="getUpdateContent.tempStandardHour" clearable allow-create filterable placeholder="请选择标准工时">
        <el-option 
        v-for="item in list"
        :key="item.TEMPLATEID" 
        :label="item.TEMPSTANDARDHOUR"
        :value="item.TEMPSTANDARDHOUR" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否提醒">
      <el-radio v-model="getUpdateContent.tempRemind" label=1>1</el-radio>
      <el-radio v-model="getUpdateContent.tempRemind" label=0>0</el-radio>
    </el-form-item>
    <el-form-item label="测试方法">
      <el-select  v-model="getUpdateContent.tempMethod" clearable allow-create filterable placeholder="请选择测试方法">
        <el-option 
        v-for="item in list"
        :key="item.TEMPLATEID" 
        :label="item.TEMPMETHOD"
        :value="item.TEMPMETHOD" />
      </el-select>
    </el-form-item>
    <el-form-item label="测试要求">
      <el-select  v-model="getUpdateContent.tempRequire" clearable allow-create filterable placeholder="请选择测试要求">
        <el-option 
        v-for="item in list"
        :key="item.TEMPLATEID" 
        :label="item.TEMPREQUIRE"
        :value="item.TEMPREQUIRE" />
      </el-select>
    </el-form-item>
  </el-form>
  <template #footer>
    <span class="dialog-footer">
      <el-button @click="save">取消</el-button>
      <el-button type="primary" @click="updateContent()">更改    </el-button>
    </span>
  </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增项目">
    <el-form :model="getNewContent" ref="formRef">
      <el-form-item label="项目名称">
        <el-input v-model="getNewContent.contentName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="项目类型">
        <el-select  v-model="getNewContent.typeName"  placeholder="请选择类型">
          <el-option 
          v-for="item in type"
          :key="item.TYPEID" 
          :label="item.TYPENAME"
          :value="item.TYPENAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="最大值">
        <el-select  v-model="getNewContent.tempMax"  clearable allow-create filterable placeholder="请选择最大值">
          <el-option 
          v-for="item in list"
          :key="item.TEMPLATEID" 
          :label="item.TEMPMAX"
          :value="item.TEMPMAX" />
        </el-select>
      </el-form-item>
      <el-form-item label="最小值">
        <el-select  v-model="getNewContent.tempMin" clearable allow-create filterable placeholder="请选择最小值">
          <el-option 
          v-for="item in list"
          :key="item.TEMPLATEID" 
          :label="item.TEMPMIN"
          :value="item.TEMPMIN" />
        </el-select>
      </el-form-item>
      <el-form-item label="标准值">
        <el-select  v-model="getNewContent.tempStandard" clearable allow-create filterable placeholder="请选择标准值">
          <el-option 
          v-for="item in list"
          :key="item.TEMPLATEID" 
          :label="item.TEMPSTANDARD"
          :value="item.TEMPSTANDARD" />
        </el-select>
      </el-form-item>
      <el-form-item label="标准工时">
        <el-select  v-model="getNewContent.tempStandardHour" clearable allow-create filterable placeholder="请选择标准工时">
          <el-option 
          v-for="item in list"
          :key="item.TEMPLATEID" 
          :label="item.TEMPSTANDARDHOUR"
          :value="item.TEMPSTANDARDHOUR" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否提醒">
        <el-radio v-model="getNewContent.tempRemind" label=1>1</el-radio>
        <el-radio v-model="getNewContent.tempRemind" label=0>0</el-radio>
      </el-form-item>
      <el-form-item label="测试方法">
        <el-select  v-model="getNewContent.tempMethod" clearable allow-create filterable placeholder="请选择测试方法">
          <el-option 
          v-for="item in list"
          :key="item.TEMPLATEID" 
          :label="item.TEMPMETHOD"
          :value="item.TEMPMETHOD" />
        </el-select>
      </el-form-item>
      <el-form-item label="测试要求">
        <el-select  v-model="getNewContent.tempRequire" clearable allow-create filterable placeholder="请选择测试要求">
          <el-option 
          v-for="item in list"
          :key="item.TEMPLATEID" 
          :label="item.TEMPREQUIRE"
          :value="item.TEMPREQUIRE" />
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
import { getContentList,getContentId,getTypeList,getTypeId,getTemplateList,getNewContentInfo,deleteContentInfo,getUpdateContentInfo } from '@/api/api';
import {InitData,contentListInt} from '@/type/testTemplate'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
    setup(){
        const data = reactive(new InitData())
        onMounted(()=>{
            getContent()
            getType()
            getTemplate()
        })
        const getContent=()=>{
          // const token:any = localStorage.getItem('token')
            getContentList(data.token).then((res)=>{
              // console.log(res)
            data.content=res.data
            data.selectData.count = res.data.length
            });
        }
        const getType=()=>{
          getTypeList(data.typeToken).then((res)=>{
              // console.log(res)
              data.type = res.data
          })
          return data.type
        }
        const getTemplate=()=>{
          getTemplateList(data.token).then((res)=>{
              // console.log(res)
              data.list = res.data
          })
          return data.list
        }
        const currenChange=(page:number)=>{
            data.selectData.page=page
        }
        const sizeChange=(pagesize:number)=>{
            data.selectData.pagesize=pagesize
        }
        const dataList = reactive({
            comList:computed(()=>{
                return data.content.slice(
                    (data.selectData.page-1)*data.selectData.pagesize,
                    data.selectData.page*data.selectData.pagesize)
            })
        })
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
          getContentIdInfo()
          getTypeIdInfo()
          let arr:any[]=[];
          if(data.getContentId.contentName || data.getTypeId.typeName){
            if(data.getContentId.contentName){
              if(data.getTypeId.typeName){
              arr = data.content.filter((value)=>{
                return value.CONTENTNAME.indexOf(data.getContentId.contentName) !== -1 && value.TYPENAME.indexOf(data.getTypeId.typeName) !== -1
                })
                console.log(arr)
                data.content = arr
              }
              arr = data.content.filter((value)=>{
                return value.CONTENTNAME.indexOf(data.getContentId.contentName) !== -1
              })
            }
            if(data.getTypeId.typeName){
              if(data.getContentId.contentName){
                arr = data.content.filter((value)=>{
                return value.CONTENTNAME.indexOf(data.getContentId.contentName) !== -1 && value.TYPENAME.indexOf(data.getTypeId.typeName) !== -1
                })
                console.log(arr)
                data.content = arr
              }
              arr = data.content.filter((value)=>{
                return value.TYPENAME.indexOf(data.getTypeId.typeName) !== -1
              })
            }
          }
          else{
            arr = data.content
          }
          data.selectData.count = arr.length
          data.content=arr
        };
        watch([() => data.getContentId.contentName,() => data.getTypeId.typeName],
         () => {
        if (data.getContentId.contentName == "" || data.getTypeId.typeName == "") {
            getContent()
        }
});
        const changeContent=(row:contentListInt)=>{
            data.updateIsShow=true
            data.getUpdateContent.contentId=row.CONTENTID
            data.getUpdateContent.contentName=row.CONTENTNAME
            data.getUpdateContent.typeName=row.TYPENAME
            data.getUpdateContent.tempMax=row.TEMPMAX
            data.getUpdateContent.tempMin=row.TEMPMIN
            data.getUpdateContent.tempStandard=row.TEMPSTANDARD
            data.getUpdateContent.tempStandardHour=row.TEMPSTANDARDHOUR
            data.getUpdateContent.tempRemind=row.TEMPREMIND
            data.getUpdateContent.tempMethod=row.TEMPMETHOD
            data.getUpdateContent.tempRequire=row.TEMPREQUIRE
            return data.getUpdateContent
        }
        const updateContent=()=>{
          getUpdateContentInfo(data.getUpdateContent).then((res)=>{
            getContent()
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
            // const dt = new Date(data.getNewContent.birthday)
            // const year = dt.getFullYear()
            // const m = dt.getMonth()+1
            // const month = dt.getMonth()+1<10?'0'+m:m
            // const d = dt.getDate()
            // const date = dt.getDate()<10?'0'+d:d
            // data.getNewContent.birthday = `${year}-${month}-${date}`
            getNewContentInfo(data.getNewContent).then((res)=>{
              // console.log(res)
              getContent()
              
            })
            
        }
        const deleteContent=(row:contentListInt)=>{
          ElMessageBox.confirm("确定删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          // 确认删除
          .then(() => {
          //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
          data.deleteContentInfo.contentId=row.CONTENTID
            // console.log(data.deleteContentInfo)
          deleteContentInfo(data.deleteContentInfo).then((res) => {
            // console.log(res)
            getContent()
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
        return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeContent,save,updateContent,onInsert,insertConfirm,deleteContent}
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