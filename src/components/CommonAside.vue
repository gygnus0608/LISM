<template>
  
    <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        router
      >
      <!-- <vue-scroll :ops="scrollSettings" style="width: 100%;height: 100%;"> -->
      <div class="scroll" >
      <el-sub-menu :index="item.path" v-for="item in list" :key="item.path">
        <!-- <div>
          
        </div> -->
          <template #title>
          <span>{{item.meta.title}}</span>
          </template>
        
          <!-- 如果有二级菜单就显示  别动这个标签el--sub-menu，改了会报错-->
          <el--sub-menu  v-for="item2 in item.children" :key="item2.path">
          <el-sub-menu :index="item2.path" v-if="item2.children" >
            <template #title>{{item2.meta.title}}</template>
            <el-menu-item :index="item3.path" v-for="item3 in item2.children" :key="item3.path">{{item3.meta.title}}</el-menu-item>
          </el-sub-menu>
        <!-- 如果没有二级菜单就显示 -->
          <el-menu-item :index="item2.path"  v-else>{{item2.meta.title}}</el-menu-item>
          </el--sub-menu>
        
      </el-sub-menu>
    </div>
    </el-menu>

</template>

<script lang="ts" setup>

import {useRouter} from 'vue-router';
import {getUserList} from '@/api/api'
import { InitData } from '@/type/user';
const list = useRouter().getRoutes().filter(v=>v.meta.isShow&&(v.path.match(/\//g))?.length===1)
// const data1 = reactive(new InitData())
// onMounted(()=>{
//     getUsers()
//   })

  // const getUsers=()=>{
  //   getUserList(data1.token).then((res)=>{
  //     console.log(res.data)
      // data.list = res.data
      // const arr = res.data.filter(v=>v.USERNAME==res1.data.username)
      // if (arr[0].USERROLE == '4'){ 
        // const list = useRouter().getRoutes().filter(v=>v.meta.isShow&&(v.path.match(/\//g))?.length===1)
      //  }else{
        // const list = useRouter().getRoutes().filter(v=>v.meta.isShow&&(v.path.match(/\//g))?.length===1)
      // }
  //   })
  // }

const data = {
  scrollSettings:{
    vuescroll:{},
    scrollPanel:{},
    rall:{
      keepShow:true
    },
    bar:{
      hoverStyle:true,
      onlyShowBarOnScroll:false,
      background:'red',
      opacity:0.5,
      'overflow-x':'hidden'
    }
  }
}

</script>

<style lang="less" scoped>
.el-menu{
  height: calc(100vh - 80px);
  width: 200px;
  .scroll{
    overflow-y: scroll; 
    height: calc(100vh - 80px);
  }
}
</style>