<template>
  <router-view/>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';

onMounted(()=>{
  const baseUrl="https://www.fastmock.site/mock/0c62ca2d24e66db31b4dc6869ebb94b8/api"
  axios.get(`${baseUrl}/allUser`).then(({data})=>{
    // console.log(data)
  })
})
</script>
<style lang="scss">
*{
  margin: 0px;
  padding: 0px;
}
html,body,#app{
  width: 100%;
  height: 100%;
}
</style>
