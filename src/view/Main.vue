<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <el-container>
        <CommonAside/>
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>
  
<script lang="ts">
import CommonHeader from '../components/CommonHeader.vue';
import CommonAside from '../components/CommonAside.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    components:{
        CommonHeader,
        CommonAside
    }
})
</script>

<style scoped lang="less">
  .el-header{
    height: 80px;
    background: rgba(0,64,255,0.36);
  }
</style>