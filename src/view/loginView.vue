<template>
    <div class="login-box">
    <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="60px"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="userName">
      <el-input v-model="ruleForm.userName"  autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="userPwd">
      <el-input
        v-model="ruleForm.userPwd"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >登录</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
    </div>
</template>

<script lang="ts">
import {defineComponent,reactive,toRefs,ref} from 'vue';
import type { FormInstance } from 'element-plus';
import {login} from '../api/api'
import { useRouter } from 'vue-router';
export default defineComponent({
    setup(){
        const data=reactive({
            ruleForm:{
                userName:'',
                userPwd:''
            },
            rules:{
                username:[
                    {
                        required:true,
                        message:'请输入账号',
                        trigger:'blur',
                    }
                ],
                password:[
                    {
                        required:true,
                        message:'请输入密码',
                        trigger:'blur',
                    }
                ],
            }
        })
        // 登录
        const ruleFormRef = ref<FormInstance>()
        const router=useRouter()
        const submitForm = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    login(data.ruleForm).then((res)=>{
                        console.log(res)
                        // 将token进行保存
                        localStorage.setItem("token",res.token)
                        localStorage.setItem("username",res.userName)
                        // 跳转到首页
                        router.push('/')
                    })
                } else {
                console.log('error submit!')
                return false
                }
            })
        }
        // 重置
        const resetForm=()=>{
            data.ruleForm.userName = "";
            data.ruleForm.userPwd = "";
        }
        return{...toRefs(data),ruleFormRef,submitForm,resetForm}
    }
})
</script>

<style scoped lang="less">
.login-box{
    width: 100%;
    height: 100%;
    background: url("../assets/bg.jpg");
    padding: 1px;
    .demo-ruleForm{
        width: 400px;
        margin: 200px auto;
        background-color: #fff;
        padding: 40px;
        border-radius: 20px;
    }
}
</style>