<template>
    <div class="contain-box">
      <div class="header-box">
        <div class="select-box">
        <el-form :inline="true" :model="getOrderTestItemId" class="demo-form-inline">
      <el-form-item label="项目名">
        <el-input v-model="getOrderTestItemId.orderTestName" placeholder="请输入项目名" />
      </el-form-item>
      <el-form-item label="委托单名称">
        <el-select  v-model="getEntrustmentId.entrustmentName" clearable placeholder="请选择委托单名称">
          <el-option 
          v-model="getEntrustmentId.entrustmentName" 
          v-for="item in entrustment"
          :key="item.ENTRUSTMENTID" 
          :label="item.ENTRUSTMENTNAME"
          :value="item.ENTRUSTMENTNAME" />
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
        <el-table-column prop="ORDERTESTID" label="项目id"  />
        <el-table-column prop="ORDERTESTNAME" label="项目名称"  />
        <el-table-column prop="ENTRUSTMENTNAME" label="委托单名称" />
        <el-table-column prop="SAMPLENAME" label="样品名称" />
        <el-table-column prop="SAMPLENUM" label="样品数量" />
        <el-table-column prop="ORDERMAX" label="最大值" />
        <el-table-column prop="ORDERMIN" label="最小值" />
        <el-table-column prop="ORDERSTANDARD" label="标准值" />
        <el-table-column prop="ORDERSTANDARDHOUR" label="标准工时" />
        <el-table-column prop="ORDERREMIND" label="是否提醒" />
        <el-table-column prop="ORDERMETHOD" label="测试方法" />
        <el-table-column prop="ORDERREQUIRE" label="测试要求" />
        <el-table-column prop="role" label="操作" min-width="300px">
        <template #default="scope">
          <el-button  @click="changeOrderTestItem(scope.row)"
          >编辑</el-button>
          <el-button type="danger" @click="deleteOrderTestItem(scope.row)"
          >删除</el-button>
          <el-button link @click="checkEntrustment(scope.row)"
          >查询对应委托单信息</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
    </div>
    <el-dialog v-model="updateIsShow" title="编辑信息">
    <el-form :model="getUpdateOrderTestItem" ref="formRef">
      <el-form-item label="项目名称">
        <el-input v-model="getUpdateOrderTestItem.orderTestName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="委托单名称">
        <el-select  v-model="getUpdateOrderTestItem.entrustmentName"  placeholder="请选择委托单名称">
          <el-option 
          v-for="item in entrustment"
          :key="item.ENTRUSTMENTID" 
          :label="item.ENTRUSTMENTNAME"
          :value="item.ENTRUSTMENTNAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品名称">
        <el-select  v-model="getUpdateOrderTestItem.sampleName"  placeholder="请选择样品名称">
          <el-option 
          v-for="item in sample"
          :key="item.SAMPLEID" 
          :label="item.SAMPLENAME"
          :value="item.SAMPLENAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="样品总数">
        <el-select  v-model="getUpdateOrderTestItem.sampleNum"  placeholder="请选择样品总数">
          <el-option 
          v-for="item in sample"
          :key="item.SAMPLEID" 
          :label="item.SAMPLENUM"
          :value="item.SAMPLENUM" />
        </el-select>
      </el-form-item>
      <el-form-item label="最大值">
        <el-input v-model="getUpdateOrderTestItem.orderMax" clearable allow-create filterable autocomplete="off" />
      </el-form-item>
      <el-form-item label="最小值">
        <el-input v-model="getUpdateOrderTestItem.orderMin" clearable allow-create filterable autocomplete="off" />
      </el-form-item>
      <el-form-item label="标准值">
        <el-input v-model="getUpdateOrderTestItem.orderStandard" clearable allow-create filterable autocomplete="off" />
      </el-form-item>
      <el-form-item label="标准工时">
        <el-input v-model="getUpdateOrderTestItem.orderStandardHour" clearable allow-create filterable autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否提醒">
        <el-radio v-model="getUpdateOrderTestItem.orderRemind" label=1>1</el-radio>
        <el-radio v-model="getUpdateOrderTestItem.orderRemind" label=0>0</el-radio>
      </el-form-item>

      <el-form-item label="测试方法" >
        <el-input v-model="getUpdateOrderTestItem.orderMethod" autocomplete="off" />
      </el-form-item>
      <el-form-item label="测试要求">
        <el-input v-model="getUpdateOrderTestItem.orderRequire" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button type="primary" @click="updateOrderTestItem()">更改    </el-button>
      </span>
    </template>
    </el-dialog>
    <el-dialog v-model="insertIsShow" title="新增项目">
      <el-form :model="getNewOrderTestItem" ref="formRef">
        <el-form-item label="项目名称">
          <el-input v-model="getNewOrderTestItem.orderTestName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="委托单名称">
          <el-select  v-model="getNewOrderTestItem.entrustmentName"  placeholder="请选择委托单名称">
            <el-option 
            v-for="item in entrustment"
            :key="item.ENTRUSTMENTID" 
            :label="item.ENTRUSTMENTNAME"
            :value="item.ENTRUSTMENTNAME" />
          </el-select>
        </el-form-item>
        <el-form-item label="样品名称">
          <el-select  v-model="getNewOrderTestItem.sampleName"  placeholder="请选择样品名称">
            <el-option 
            v-for="item in sample"
            :key="item.SAMPLEID" 
            :label="item.SAMPLENAME"
            :value="item.SAMPLENAME" />
          </el-select>
        </el-form-item>
        <el-form-item label="样品总数">
          <el-input-number v-model="getNewOrderTestItem.sampleNum" :min="0" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="最大值">
          <el-input-number v-model="getNewOrderTestItem.orderMax" :min="0" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="最小值">
          <el-input-number v-model="getNewOrderTestItem.orderMin" :min="0" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="标准值">
          <el-input-number v-model="getNewOrderTestItem.orderStandard" :min="0" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="标准工时">
          <el-input-number v-model="getNewOrderTestItem.orderStandardHour" :min="0" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="是否提醒">
          <el-radio v-model="getNewOrderTestItem.orderRemind" label=1>1</el-radio>
        <el-radio v-model="getNewOrderTestItem.orderRemind" label=0>0</el-radio>
        </el-form-item>
        <el-form-item label="测试方法" >
          <el-input v-model="getNewOrderTestItem.orderMethod" autocomplete="off" />
        </el-form-item>
        <el-form-item label="测试要求">
          <el-input v-model="getNewOrderTestItem.orderRequire" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="save">取消</el-button>
          <el-button type="primary" @click="insertConfirm()">新增    </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="checkIsShow" title="查询对应委托单">
      <el-table :data="entrustment1" border height="400" style="width: 100% " >
      <el-table-column prop="ENTRUSTMENTID" label="委托单id"  />
      <el-table-column prop="ENTRUSTMENTNAME" label="委托单名称"  />
      <el-table-column prop="DEPARTMENTNAME" label="委托部门" />
      <el-table-column prop="ENTRUSTMENTNUM" label="单据编号" />
      <el-table-column prop="SENDDATE" label="送样日期" />
      <el-table-column prop="SENDNUM" label="样品总数" />
      <el-table-column prop="GOAL" label="测试目的" />
      <el-table-column prop="DETAILNAME" label="样品处理方式" />
      <el-table-column prop="REPORTNAME" label="报告方式" />
      <el-table-column prop="TYPENAME" label="检测类型" />
      <el-table-column prop="USERNAME" label="送样人员" />
      <el-table-column prop="TYPENAME" label="检测类型" />
      <el-table-column prop="PHONE1" label="联系电话" />
      <el-table-column prop="MAIL1" label="邮箱地址" />
      <el-table-column prop="CONTRACTNAME" label="测试协议" />
      <el-table-column prop="ENTRUSTMARK" label="备注说明" />
      <el-table-column prop="REPORTFINAL" label="测试结果描述" />
      <el-table-column prop="STATUSX" label="提交状态" />
      <el-table-column prop="STATUSY" label="执行状态" />
      </el-table>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="checkConfirm()">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </template>

<script lang="ts">
import { onMounted,toRefs,reactive} from 'vue';
import { getOrderTestItemList,getOrderTestItemId,getNewOrderTestItemInfo,getEntrustmentList,getEntrustmentId,getSampleList,deleteOrderTestItemInfo,getUpdateOrderTestItemInfo,selectEntrustment } from '@/api/api';
import {InitData,ListInt} from '@/type/orderTestItem'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
    setup(){
        const data = reactive(new InitData())
        onMounted(()=>{
            getOrderTestItems()
            getEntrustment()
            getSample()
        })
        const getOrderTestItems=()=>{
          // const token:any = localStorage.getItem('token')
            getOrderTestItemList(data.token).then((res)=>{
              // console.log(res)
            data.list=res.data
            data.selectData.count = res.data.length
            });
        }
        const getEntrustment=()=>{
          getEntrustmentList(data.entrustmentToken).then((res)=>{
              // console.log(res.data)
              data.entrustment = res.data
          })
          return data.entrustment
        }
        const getSample=()=>{
          getSampleList(data.sampleToken).then((res)=>{
              // console.log(res)
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
        const getOrderTestItemIdInfo = () =>{
          getOrderTestItemId(data.getOrderTestItemId).then((res)=>{
            // console.log(res)
          })
        }
        const getEntrustmentIdInfo = () =>{
          getEntrustmentId(data.getEntrustmentId).then((res)=>{
            // console.log(res)
          })
        }
        const onSubmit = () =>{
          getOrderTestItemIdInfo()
          getEntrustmentIdInfo()
          let arr:any[]=[];
          if(data.getOrderTestItemId.orderTestName || data.getEntrustmentId.entrustmentName){
            if(data.getOrderTestItemId.orderTestName){
              if(data.getEntrustmentId.entrustmentName){
              arr = data.list.filter((value)=>{
                return value.ORDERTESTNAME.indexOf(data.getOrderTestItemId.orderTestName) !== -1 && value.ENTRUSTMENTNAME.indexOf(data.getEntrustmentId.entrustmentName) !== -1
                })
                console.log(arr)
                data.list = arr
              }
              arr = data.list.filter((value)=>{
                return value.ORDERTESTNAME.indexOf(data.getOrderTestItemId.orderTestName) !== -1
              })
            }
            if(data.getEntrustmentId.entrustmentName){
              if(data.getOrderTestItemId.orderTestName){
                arr = data.list.filter((value)=>{
                return value.ORDERTESTNAME.indexOf(data.getOrderTestItemId.orderTestName) !== -1 && value.ENTRUSTMENTNAME.indexOf(data.getEntrustmentId.entrustmentName) !== -1
                })
                console.log(arr)
                data.list = arr
              }
              arr = data.list.filter((value)=>{
                return value.ENTRUSTMENTNAME.indexOf(data.getEntrustmentId.entrustmentName) !== -1
              })
            }
          }
          else{
            arr = data.list
          }
          data.selectData.count = arr.length
          data.list=arr
        };
        watch([() => data.getOrderTestItemId.orderTestName,() => data.getEntrustmentId.entrustmentName],
         () => {
        if (data.getOrderTestItemId.orderTestName == "" || data.getEntrustmentId.entrustmentName == "") {
            getOrderTestItems()
        }
});
        const changeOrderTestItem=(row:ListInt)=>{
            data.updateIsShow=true
            data.getUpdateOrderTestItem.orderTestId=row.ORDERTESTID
            data.getUpdateOrderTestItem.orderTestName=row.ORDERTESTNAME
            data.getUpdateOrderTestItem.entrustmentName=row.ENTRUSTMENTNAME
            data.getUpdateOrderTestItem.sampleName=row.SAMPLENAME
            data.getUpdateOrderTestItem.sampleNum=row.SAMPLENUM
            data.getUpdateOrderTestItem.orderMax=row.ORDERMAX
            data.getUpdateOrderTestItem.orderMin=row.ORDERMIN
            data.getUpdateOrderTestItem.orderStandard=row.ORDERSTANDARD
            data.getUpdateOrderTestItem.orderStandardHour=row.ORDERSTANDARDHOUR
            data.getUpdateOrderTestItem.orderRemind=row.ORDERREMIND
            data.getUpdateOrderTestItem.orderMethod=row.ORDERMETHOD
            data.getUpdateOrderTestItem.orderRequire=row.ORDERREQUIRE
            return data.getUpdateOrderTestItem
        }
        const updateOrderTestItem=()=>{
          getUpdateOrderTestItemInfo(data.getUpdateOrderTestItem).then((res)=>{
          getOrderTestItems()
          data.updateIsShow=false
          });
        }
        const save = ()=>{
            data.insertIsShow=false
            data.updateIsShow=false
            data.checkIsShow=false
        }
        const onInsert=()=>{
            data.insertIsShow=true
        }
        const insertConfirm=()=>{
            data.insertIsShow=false
            getNewOrderTestItemInfo(data.getNewOrderTestItem).then((res)=>{
              // console.log(res)
              getOrderTestItems()
              
            })
            
        }
        const deleteOrderTestItem=(row:ListInt)=>{
            ElMessageBox.confirm("确定删除?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
            // 确认删除
            .then(() => {
            //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
            data.deleteOrderTestItemInfo.orderTestId=row.ORDERTESTID
              // console.log(data.deleteOrderTestItemInfo)
            deleteOrderTestItemInfo(data.deleteOrderTestItemInfo).then((res) => {
              // console.log(res)
              getOrderTestItems()
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
        let arr:any[]=[];
        const checkEntrustment=(row:ListInt)=>{
          data.checkIsShow=true
          data.entrustmentInfo.entrustmentId=row.ENTRUSTMENTID
          selectEntrustment(data.entrustmentInfo).then((res)=>{
            arr.push(res.data)
            data.entrustment1 = arr
            arr = []
          })
        }
        const checkConfirm=()=>{
          data.checkIsShow=false
        }
        return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeOrderTestItem,save,updateOrderTestItem,onInsert,insertConfirm,deleteOrderTestItem,checkEntrustment,checkConfirm}
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
// .el-input{
//   width:250px
// }

</style>