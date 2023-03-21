<template>
    <el-row :gutter="20">
    <el-col :span="4">
      
      <el-dropdown>
        <span class="el-dropdown-link">
          <span class="welcome">欢迎你，{{getUserName}}</span>
          <!-- <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon> -->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="personal">个人信息</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
    <el-col :span="16"><h1>LISM后台管理系统</h1></el-col>
    <el-col :span="4"><el-button link class="quit-login" @click="logOut()">退出登录</el-button></el-col>
  </el-row>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import {login,logout,getUserList} from '@/api/api'
  import {LogoutInitData} from '@/type/logout'
  import {LoginInitData} from '@/type/login'
  import { InitData } from '@/type/user';
  import { useRouter } from 'vue-router';
  import { ArrowDown } from '@element-plus/icons-vue'
  const router = useRouter()
  const data = reactive(new InitData())
  const data1 = reactive(new LogoutInitData())
  const data2 = reactive(new LoginInitData())
  onMounted(()=>{
    getUsers()
    // getLogin()
  })
  const logOut =()=>{
    logout(data1.token).then((res)=>{
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      router.push('/login')
    })
  }
  const getUsers=()=>{
    getUserList(data.token).then((res)=>{
      // console.log(res.data)
      data.list = res.data
    })
  }
  const getUserName = localStorage.getItem('username')

  const personal =()=> {
    router.push({
      name:'personal'
    })
  }
</script>

<style lang="less" scoped>
span,h1{
    text-align: center;
    height: 80px;
    line-height: 80px;
    color: #fff;
}
.el-col.el-col-4.is-guttered{
  display: flex;
  align-items: center;
  // font-size: 20px;

}
</style>