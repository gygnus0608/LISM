<template>
  <div class="contain-box">
    <div class="header-box">
      <div class="select-box">
        <el-form :inline="true" :model="getFileId" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="getFileId.fileName" placeholder="请输入文件名" />
          </el-form-item>
          <el-form-item label="文件类型">
            <el-select
              v-model="getFileTypeId.fileTypeName"
              clearable
              placeholder="请选择文件类型"
            >
              <el-option
                v-model="getFileTypeId.fileTypeName"
                v-for="item in fileType"
                :key="item.FILETYPEID"
                :label="item.FILETYPENAME"
                :value="item.FILETYPENAME"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="button" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="new-box">
        <el-form-item>
          <el-button class="button" @click="onInsert">新增</el-button>
        </el-form-item>
      </div>
    </div>

    <el-table :data="dataList.comList" border height="400" style="width: 100%">
      <el-table-column prop="FILEID" label="文件id" />
      <el-table-column prop="FILENAME" label="文件名称" />
      <el-table-column prop="FILETYPENAME" label="文件类型" />
      <el-table-column prop="FILEPATH" label="文件路径" />
      <el-table-column prop="MODIFICATIONTIME" label="修改时间" />
      <el-table-column prop="REMARKS" label="备注说明" />
      <el-table-column prop="role" label="操作" min-width="180px">
        <template #default="scope">
          <el-button @click="changeFile(scope.row)">编辑</el-button>
          <a  @click="downLoad(scope.row)"
            >下载</a>
          <el-button type="danger" @click="deleteFile(scope.row)"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="currenChange"
      @size-change="sizeChange"
      layout="prev, pager, next"
      :total="selectData.count"
      :page-size="selectData.pagesize"
    />
  </div>
  <el-dialog v-model="updateIsShow" title="编辑信息">
    <el-form :model="getUpdateFile" ref="formRef">
      <el-form-item label="文件类型">
        <el-select
          v-model="getUpdateFile.fileTypeName"
          placeholder="请选择文件类型"
        >
          <el-option
            v-for="item in fileType"
            :key="item.FILETYPEID"
            :label="item.FILETYPENAME"
            :value="item.FILETYPENAME"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input v-model="getUpdateFile.remarks" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button type="primary" @click="updateFile()">更改 </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="insertIsShow" title="新增文件">
    <el-form :model="getNewFile">
      <el-form-item label="文件类型">
        <el-select
          v-model="getNewFile.fileTypeName"
          placeholder="请选择文件类型"
        >
          <el-option
            v-for="item in fileType"
            :key="item.FILETYPEID"
            :label="item.FILETYPENAME"
            :value="item.FILETYPENAME"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="文件路径">
        <el-upload action="#" :auto-upload="false" :on-change="handleChange">
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注说明">
        <el-input v-model="getNewFile.remarks" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="save">取消</el-button>
        <el-button class="ml-3 button"  @click="submitUpload"> 新增 </el-button>
        <!-- <el-button type="primary" @click="insertConfirm()">新增 </el-button> -->
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { onMounted, toRefs, reactive, ref } from "vue";
import {
  getFileTypeList,
  getFileTypeId,
  getFileList,
  getFileId,
  deleteFileInfo,
  getNewFileInfo,
  getUpdateFileInfo,
  downLoadFile
} from "@/api/api";
import { InitData, ListInt } from "@/type/fileService";
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/es/components/message-box/style/index";
import "element-plus/es/components/message/style/index";
// import type { UploadProps, UploadUserFile } from "element-plus";
import type { UploadProps, UploadRawFile } from 'element-plus'
import { ElUpload, ElButton } from 'element-plus'
import axios from "axios";
let file: UploadRawFile | undefined = undefined
const handleChange: UploadProps['onChange'] = ({ status, raw }) => {
  if (status === 'ready') {
    file = raw
  }
}
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getFiles();
      getFileType();
    });
    const getFiles = () => {
      getFileList(data.token).then((res) => {
        // console.log(res)
        data.list = res.data;
        data.selectData.count = res.data.length;
      });
    };
    const getFileType = () => {
      getFileTypeList(data.fileTypeToken).then((res) => {
        console.log(res)
        data.fileType = res.data;
      });
      return data.fileType;
    };
    const currenChange = (page: number) => {
      data.selectData.page = page;
    };
    const sizeChange = (pagesize: number) => {
      data.selectData.pagesize = pagesize;
    };
    const dataList = reactive({
      comList: computed(() => {
        return data.list.slice(
          (data.selectData.page - 1) * data.selectData.pagesize,
          data.selectData.page * data.selectData.pagesize
        );
      }),
    });

    const submitUpload = async () => {
      const token:any = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('myFile', file as Blob)
      formData.append('token',token )
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
    }
    const saveAs = (blob:any, filename:any)=>{
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, filename)
        } else {
          const url = window.URL.createObjectURL(blob)
          aDownload(url, filename)
          window.URL.revokeObjectURL(url)
        }
      }

      const aDownload=(url:any, filename:any) => {
        const a = document.createElement('a')
        const body = document.querySelector('body')
        a.href = url
        a.download = filename
        a.style.display = 'none'
        body.appendChild(a)
        a.click()
        body.removeChild(a)
      }

    const downLoad = async (row:ListInt)=>{
      const token:any = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('fileId', '5')
      formData.append('token',token )
      
      const { data, headers: { 'content-disposition': disposition }} = await axios.post('http://111.230.194.48/lism/LISM_fileService/Download', formData, {
        responseType: 'blob'
      })
      const filename = decodeURIComponent(disposition.split('filename=')[1])
      saveAs(data, filename)
      downLoadFile(data.downLoadFile).then((res)=>{
        console.log(res)
      })
    }













    // 文件上传
    // const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
    //   console.log(uploadFile, uploadFiles);
    //   data.getNewFile.input = uploadFile.name;
    //   console.log(fileList1.value);
    //   fileList1.value = [];
    //   fileList1.value.push(uploadFile);
    // };

    // const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
    //   console.log(rawFile.type);
    //   if (rawFile.size / 1024 / 1024 > 2) {
    //     ElMessage.error("Avatar picture size can not exceed 2MB!");
    //     return false;
    //   }
    //   return true;
    // };

    // const handleAvatarSuccess: UploadProps["onSuccess"] = (
    //   response,
    //   uploadFile
    // ) => {
    //   // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    // };

    const getFileIdInfo = () => {
      getFileId(data.getFileId).then((res) => {
        // console.log(res)
      });
    };
    const getFileTypeIdInfo = () => {
      getFileTypeId(data.getFileTypeId).then((res) => {
        // console.log(res)
      });
    };
    const onSubmit = () => {
      getFileIdInfo();
      getFileTypeIdInfo();
      let arr: any[] = [];
      if (data.getFileId.fileName || data.getFileTypeId.fileTypeName) {
        if (data.getFileId.fileName) {
          if (data.getFileTypeId.fileTypeName) {
            arr = data.list.filter((value) => {
              return (
                value.FILENAME.indexOf(data.getFileId.fileName) !== -1 &&
                value.FILETYPENAME.indexOf(data.getFileTypeId.fileTypeName) !==
                  -1
              );
            });
            console.log(arr);
            data.list = arr;
          }
          arr = data.list.filter((value) => {
            return value.FILENAME.indexOf(data.getFileId.fileName) !== -1;
          });
        }
        if (data.getFileTypeId.fileTypeName) {
          if (data.getFileId.fileName) {
            arr = data.list.filter((value) => {
              return (
                value.FILENAME.indexOf(data.getFileId.fileName) !== -1 &&
                value.FILETYPENAME.indexOf(data.getFileTypeId.fileTypeName) !==
                  -1
              );
            });
            console.log(arr);
            data.list = arr;
          }
          arr = data.list.filter((value) => {
            return (
              value.FILETYPENAME.indexOf(data.getFileTypeId.fileTypeName) !== -1
            );
          });
        }
      } else {
        arr = data.list;
      }
      data.selectData.count = arr.length;
      data.list = arr;
    };
    watch(
      [() => data.getFileId.fileName, () => data.getFileTypeId.fileTypeName],
      () => {
        if (
          data.getFileId.fileName == "" ||
          data.getFileTypeId.fileTypeName == ""
        ) {
          getFiles();
          getFileType();
        }
      }
    );
    const changeFile = (row: ListInt) => {
      data.updateIsShow = true;
      data.getUpdateFile.fileId = row.FILEID;
      data.getUpdateFile.fileTypeName = row.FILETYPENAME;
      data.getUpdateFile.remarks = row.REMARKS;
      return data.getUpdateFile;
    };
    const updateFile = () => {
      getUpdateFileInfo(data.getUpdateFile).then((res) => {
        // console.log(res)
      });
      getFiles();
      data.updateIsShow = false;
    };
    const save = () => {
      data.insertIsShow = false;
      data.updateIsShow = false;
    };
    const onInsert = () => {
      data.insertIsShow = true;
    };
    // const insertConfirm = () => {
    //   let fd = new FormData();
    //   fileList1.value.forEach((item: any) => {
    //     fd.append("myFile", item.raw);
    //     //文件信息中raw才是真的文件
    //     //console.log(item.raw)
    //   });
    //   fd.append("fileTypeName", data.getNewFile.fileTypeName);
    //   // fd.append("fileTypeName", 'word');
    //   fd.append("remarks", data.getNewFile.remarks);

    //   getNewFileInfo(fd).then((res) => {
    //     console.log(res);
    //     // getFiles();
    //   });
    // };
    const deleteFile = (row: ListInt) => {
      ElMessageBox.confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 确认删除
        .then(() => {
          //删除接口只需要传个id就行了 id是当前点击事件传过来的的id
          data.deleteFileInfo.fileId = row.FILEID;
          // console.log(data.deleteFileInfo)
          deleteFileInfo(data.deleteFileInfo).then((res) => {
            // console.log(res)
            getFiles();
          });
        })
        //取消删除
        .catch(() => {
          ElMessage({
            type: "info",
            message: "已取消删除",
          });
        });
    };
    return {
      ...toRefs(data),
      onSubmit,
      currenChange,
      sizeChange,
      dataList,
      // fileList,
      // fileList1,
      changeFile,
      save,
      updateFile,
      onInsert,
      // insertConfirm,
      deleteFile,
      handleChange,
      // beforeAvatarUpload,
      // handleAvatarSuccess,
      submitUpload,
      downLoad
    };
  },
});
</script>

<style lang="less" scoped>
.contain-box {
  width: 85%;
  .header-box {
    display: flex;
    justify-content: space-between;
    // margin:10px
  }
  .select-box {
    .button {
      background: rgba(0, 64, 255, 0.36);
    }
    .el-form-item.asterisk-left {
      margin: 10px;
    }
  }
  .new-box {
    margin-top: 10px;
  }
  .upload-demo {
    width: 50%;
  }
}
.downLoadButton {
      background: rgba(0, 64, 255, 0.36);
    }
</style>
