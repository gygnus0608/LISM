<template>
    <div>
        登录页面
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
onMounted(()=>{
  const baseUrl="https://www.fastmock.site/mock/0c62ca2d24e66db31b4dc6869ebb94b8/api"
  let formData = new FormData();
  formData.append('username','黄小明');
  formData.append('password','123456');
  axios.post(`${baseUrl}/login`,formData).then(({data})=>{
    console.log(data)
    if(data.code === 0){
        if(data.data.success){
            console.log(data.data.msg)
        }else{
            console.log(data.data.msg)
        }
    }
  }).catch((err)=>{return err})
})
</script>

<style scoped>

</style>