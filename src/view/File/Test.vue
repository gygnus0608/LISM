<template>
  <el-upload action="#" :auto-upload="false" :on-change="handleChange">
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>
  </el-upload>
  <el-button class="ml-3" type="success" @click="submitUpload"> 新增 </el-button>
</template>
<script lang="ts" setup>
import type { UploadProps, UploadRawFile } from 'element-plus'
import { ElUpload, ElButton } from 'element-plus'
import axios from 'axios'
let file: UploadRawFile | undefined = undefined
const handleChange: UploadProps['onChange'] = ({ status, raw }) => {
  if (status === 'ready') {
    file = raw
  }
}
const submitUpload = async () => {
  const formData = new FormData()
  formData.append('myFile', file as Blob)
  formData.append('token', 'F35A89AF519C205786DF9B25')
  formData.append('fileTypeName', 'word')
  formData.append('remarks', 'docx文件')
  const { data } = await axios.post(
    `http://111.230.194.48/lism/LISM_fileService/Insert?rnd=${Math.random()}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  console.log(data)
}
</script>
