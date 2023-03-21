<template>
    <div class="contain-box">
      <div class="header-box">
        <div class="select-box">
        <el-form :inline="true" :model="getContractId" class="demo-form-inline">
      <el-form-item label="测试协议">
        <el-input v-model="getContractId.contractName" placeholder="请输入协议名称" />
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
        <el-table-column prop="CONTRACTID" label="协议id"  />
        <el-table-column prop="CONTRACTNAME" label="协议名称"  />
        <el-table-column prop="role" label="操作" min-width="180px">
        <template #default="scope">
          <el-button  @click="changeContract(scope.row)"
            >编辑</el-button>
            <el-button type="danger" @click="deleteContract(scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
    </div>
    <el-dialog v-model="updateIsShow" title="编辑信息">
    <el-form :model="getUpdateContract" ref="formRef">
      <el-form-item label="协议名称">
        <el-input v-model="getUpdateContract.contractName" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button contract="primary" @click="updateContract()">更改    </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增协议">
    <el-form :model="getNewContract" >
      <el-form-item label="协议名称">
        <el-input v-model="getNewContract.contractName" autocomplete="off" />
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
  import { getContractList,getContractId,getNewContractInfo,deleteContractInfo,getUpdateContractInfo } from '@/api/api';
  import {InitData,ListInt} from '@/type/testContract'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import 'element-plus/es/components/message-box/style/index'
  import 'element-plus/es/components/message/style/index'
  export default defineComponent({
    setup(){
        const data = reactive(new InitData())
        onMounted(()=>{
          getContracts()
        })
        const getContracts=()=>{
            getContractList(data.token).then((res)=>{
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
        const getContractIdInfo = () =>{
          getContractId(data.getContractId).then((res)=>{console.log(res)})
        }
        const onSubmit = () =>{
          getContractIdInfo()
          let arr:any[]=[];
          if(data.getContractId.contractName){
            arr = data.list.filter((value)=>{
              return value.CONTRACTNAME.indexOf(data.getContractId.contractName) !== -1
            })
          }
          else{
            arr = data.list
          }
          data.selectData.count = arr.length
          data.list=arr
        };
        watch([() => data.getContractId.contractName],
         () => {
        if (data.getContractId.contractName == "") {
            getContracts()
        }
  });
        const changeContract=(row:ListInt)=>{
            data.updateIsShow=true
            data.getUpdateContract.contractId=row.CONTRACTID
            data.getUpdateContract.contractName=row.CONTRACTNAME
            return data.getUpdateContract
        }
        const updateContract=()=>{
          getUpdateContractInfo(data.getUpdateContract).then((res)=>{
            console.log(res)
          data.updateIsShow=false
          getContracts()
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
            getNewContractInfo(data.getNewContract).then((res)=>{
              console.log(res)
              getContracts()
            })
            
        }
        const deleteContract=(row:ListInt)=>{
          ElMessageBox.confirm("确定删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          // 确认删除
          .then(() => {
          //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
          data.deleteContractInfo.contractId=row.CONTRACTID
          deleteContractInfo(data.deleteContractInfo).then((res) => {
            console.log(res)
            getContracts()
          });
          getContracts()
        })
        //取消删除
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
        }
        return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeContract,save,updateContract,onInsert,insertConfirm,deleteContract}
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