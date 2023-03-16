<template>
    <el-row :gutter="20">
    <el-col :span="4"><span class="welcome">欢迎你，{{data.list}}</span></el-col>
    <el-col :span="16"><h1>LISM后台管理系统</h1></el-col>
    <el-col :span="4"><el-button link class="quit-login" @click="logOut()">退出登录</el-button></el-col>
  </el-row>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue';
  import {logout,getUserList} from '@/api/api'
  import {LogoutInitData} from '@/type/logout'
  import { InitData } from '@/type/user';
  import { useRouter } from 'vue-router';
  const router = useRouter()
  const data = reactive(new InitData())
  const data1 = reactive(new LogoutInitData())
  onMounted(()=>{
    getUsers()
  })
  const logOut =()=>{
    logout(data1.token).then((res)=>{
      // console.log(res)
      router.push('/login')
    })
  }
  const getUsers=()=>{
    getUserList(data.token).then((res)=>{
      // console.log(res.data)
      data.list = res.data
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
  font-size: 20px;

}
</style>