<template>
    <div class="contain-box">
      <div class="header-box">
        <div class="select-box">
        <el-form :inline="true" :model="getUserId" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="getUserId.userName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="部门">
        <el-select  v-model="getDepartmentId.departmentName" clearable placeholder="请选择部门">
          <el-option 
          v-model="getDepartmentId.departmentName" 
          v-for="item in department"
          :key="item.DEPARTMENTID" 
          :label="item.DEPARTMENTNAME"
          :value="item.DEPARTMENTNAME" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="button" @click="onSubmit">查询</el-button>
      </el-form-item>
      
    </el-form>
      </div>
      <div class="new-box" >
        <el-form-item>
          <el-button class="button"  @click="onInsert">新增</el-button>
        </el-form-item>
      </div>
      </div>
      
      <el-table :data="dataList.comList" border height="400" style="width: 100% " >
        <el-table-column prop="USERID" label="用户id"  />
        <el-table-column prop="USERNAME" label="姓名"  />
        <el-table-column prop="GENDER" label="性别" />
        <el-table-column prop="DEPARTMENTNAME" label="部门" />
        <el-table-column prop="BIRTHDAY" label="生日" />
        <el-table-column prop="ADDRESS" label="地址" />
        <el-table-column prop="PHONE" label="电话" />
        <el-table-column prop="MAIL" label="邮箱" />
        <el-table-column prop="USERROLE" label="角色" />
        <el-table-column prop="role"  label="操作" min-width="180px">
        <template #default="scope">
          <el-button  @click="changeUser(scope.row)"
            >编辑</el-button>
            <el-button type="danger" @click="deleteUser(scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination @current-change="currenChange" @size-change="sizeChange" layout="prev, pager, next" :total="selectData.count" :page-size="selectData.pagesize"/>
    </div>
    <el-dialog v-model="updateIsShow" title="编辑信息">
    <el-form :model="getUpdateUser" ref="formRef">
      <el-form-item label="姓名">
        <el-input v-model="getUpdateUser.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别" >
        <el-radio v-model="getUpdateUser.gender" label="男">男</el-radio>
        <el-radio v-model="getUpdateUser.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="部门">
        <el-select  v-model="getUpdateUser.departmentName"  placeholder="请选择部门">
          <el-option 
          v-for="item in department"
          :key="item.DEPARTMENTID" 
          :label="item.DEPARTMENTNAME"
          :value="item.DEPARTMENTNAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="生日" >
        <el-date-picker
        v-model="getUpdateUser.birthday"
        type="date"
        placeholder="请选择生日"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
      />
      </el-form-item>
      <el-form-item label="地址" >
        <el-input v-model="getUpdateUser.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话" >
        <el-input v-model="getUpdateUser.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" >
        <el-input v-model="getUpdateUser.userPwd" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model="getUpdateUser.mail" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select  v-model="getUpdateUser.userRole" placeholder="请选择角色">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button type="primary" @click="updateUser()">更改    </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增用户">
    <el-form :model="getNewUser" >
      <el-form-item label="姓名">
        <el-input v-model="getNewUser.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="getNewUser.gender" label="男">男</el-radio>
        <el-radio v-model="getNewUser.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="部门">
        <el-select  v-model="getNewUser.departmentName" placeholder="请选择部门">
          <el-option 
          v-for="item in department"
          :key="item.DEPARTMENTID" 
          :label="item.DEPARTMENTNAME"
          :value="item.DEPARTMENTNAME" />
        </el-select>
      </el-form-item>
      <el-form-item label="生日">
        <el-date-picker
        v-model="getNewUser.birthday"
        type="date"
        placeholder="请选择生日"
      />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="getNewUser.address" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="getNewUser.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="getNewUser.userPwd" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" >
        <el-input v-model="getNewUser.mail" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select  v-model="getNewUser.userRole" placeholder="请选择角色">
          <el-option label="1" value="1" />
          <el-option label="2" value="2" />
          <el-option label="3" value="3" />
          <el-option label="4" value="4" />
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
import { onMounted,onBeforeMount,toRefs,reactive} from 'vue';
import { getUserList,getUserId,getNewUserInfo,getDepartmentList,getDepartmentId,deleteUserInfo,getUpdateUserInfo } from '@/api/api';
import {InitData,ListInt} from '@/type/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/index'
import 'element-plus/es/components/message/style/index'
export default defineComponent({
    setup(){
        const data = reactive(new InitData())
        onMounted(()=>{
            getUsers()
            getDepartment()
        })
        const getUsers=()=>{
            getUserList(data.token).then((res)=>{
              console.log(res.data)
            data.list=res.data
            data.selectData.count = res.data.length
            });
        }
        const getDepartment=()=>{
          getDepartmentList(data.departmentToken).then((res)=>{
              // console.log(res)
              data.department = res.data
          })
          return data.department
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
            }),
            // roleList:computed(()=>{
            //   return data.list.filter((value:any)=>{
            //   return value.USERNAME == localStorage.getItem('username')
            //   })
            // })
        })
            
        const getUserIdInfo = () =>{
          getUserId(data.getUserId).then((res)=>{
            // console.log(res)
          })
        }
        const getDepartmentIdInfo = () =>{
          getDepartmentId(data.getDepartmentId).then((res)=>{
            // console.log(res)
          })
        }
        const onSubmit = () =>{
          getUserIdInfo()
          getDepartmentIdInfo()
          let arr:any[]=[];
          if(data.getUserId.userName || data.getDepartmentId.departmentName){
            if(data.getUserId.userName){
              if(data.getDepartmentId.departmentName){
              arr = data.list.filter((value)=>{
                return value.USERNAME.indexOf(data.getUserId.userName) !== -1 && value.DEPARTMENTNAME.indexOf(data.getDepartmentId.departmentName) !== -1
                })
                // console.log(arr)
                data.list = arr
              }
              arr = data.list.filter((value)=>{
                return value.USERNAME.indexOf(data.getUserId.userName) !== -1
              })
            }
            if(data.getDepartmentId.departmentName){
              if(data.getUserId.userName){
                arr = data.list.filter((value)=>{
                return value.USERNAME.indexOf(data.getUserId.userName) !== -1 && value.DEPARTMENTNAME.indexOf(data.getDepartmentId.departmentName) !== -1
                })
                // console.log(arr)
                data.list = arr
              }
              arr = data.list.filter((value)=>{
                return value.DEPARTMENTNAME.indexOf(data.getDepartmentId.departmentName) !== -1
              })
            }
          }
          else{
            arr = data.list
          }
          data.selectData.count = arr.length
          data.list=arr
        };
        watch([() => data.getUserId.userName,() => data.getDepartmentId.departmentName],
         () => {
        if (data.getUserId.userName == "" || data.getDepartmentId.departmentName == "") {
            getUsers()
        }
});
        const changeUser=(row:ListInt)=>{
            data.updateIsShow=true
            data.getUpdateUser.userId=row.USERID
            data.getUpdateUser.userName=row.USERNAME
            data.getUpdateUser.gender=row.GENDER
            data.getUpdateUser.departmentName=row.DEPARTMENTNAME
            data.getUpdateUser.birthday=row.BIRTHDAY
            data.getUpdateUser.address=row.ADDRESS
            data.getUpdateUser.phone=row.PHONE
            data.getUpdateUser.userPwd=row.USERPWD
            data.getUpdateUser.mail=row.MAIL
            data.getUpdateUser.userRole=row.USERROLE
            return data.getUpdateUser
        }
        const updateUser=()=>{
          getUpdateUserInfo(data.getUpdateUser).then((res)=>{
          getUsers()
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
            // const dt = new Date(data.getNewUser.birthday)
            // const year = dt.getFullYear()
            // const m = dt.getMonth()+1
            // const month = dt.getMonth()+1<10?'0'+m:m
            // const d = dt.getDate()
            // const date = dt.getDate()<10?'0'+d:d
            // data.getNewUser.birthday = `${year}-${month}-${date}`
            getNewUserInfo(data.getNewUser).then((res)=>{
              // console.log(res)
              getUsers()
              
            })
            
        }
        const deleteUser=(row:ListInt)=>{
          ElMessageBox.confirm("确定删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          // 确认删除
          .then(() => {
          //删除接口只需要传个id就行了 id是当前点击事件传过来的的id 
          data.deleteUserInfo.userId=row.USERID
            // console.log(data.deleteUserInfo)
          deleteUserInfo(data.deleteUserInfo).then((res) => {
            // console.log(res)
            getUsers()
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
        return {...toRefs(data),onSubmit,currenChange,sizeChange,dataList,changeUser,save,updateUser,onInsert,insertConfirm,deleteUser}
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