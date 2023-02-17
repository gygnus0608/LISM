<template>
    <div>
        我是home组件
    </div>
</template>

<script setup lang="ts">
import { onMounted,getCurrentInstance } from 'vue';
const {proxy} = getCurrentInstance as any
onMounted(()=>{
    allUser();
})
const allUser = async() =>{
    let res = await proxy.$api.allUser()
    console.log(res);
    
}
</script>

<style scoped>

</style>