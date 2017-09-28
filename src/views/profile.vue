<template>
  <div>
    <!-- <div class="row">
       <div class="col-lg-6">
         <div class="ibox float-e-margins">
           <div class="ibox-content">
           </div>
         </div>
       </div>
     </div>-->

    <div class="row">
      <div class="col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2">
        <div class="widget-head-color-box navy-bg p-lg text-center">
          <div class="m-b-md">
            <h2 class="font-bold no-margins">
              Alex Smith
            </h2>
            <small>Founder of Groupeq</small>
          </div>
          <!-- <el-upload
             :headers="userToken"
             class="avatar-uploader"
             action="/api/user/qiniuUpload"
             :show-file-list="false"
             :on-success="handleAvatarSuccess"
             :before-upload="beforeAvatarUpload">
             <img v-if="imageUrl" :src="imageUrl" class="img-circle circle-border m-b-md" alt="profile">
             <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           </el-upload>-->
          <a @click="openUpload"><img :src="imageUrl" class="img-circle circle-border m-b-md" alt="profile"></a>
          <div>
            <span>100 Tweets</span> |
            <span>350 Following</span> |
          </div>
        </div>
        <div class="widget-text-box">
        </div>
      </div>
    </div>

    <Modal :transfer="false" :mask-closable="false" v-model="uploadVisible" title="头像设置" :loading="loding">
      <!--<div>
        <el-upload
          :headers="userToken"
          class="avatar-uploader"
          action="/api/user/qiniuUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>-->
      <div>
        <Upload
          :before-upload="handleUpload"
          action="/api/user/qiniuUpload">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传头像</Button>
        </Upload>
        <!--<div v-if="file !== null">待上传文件：{{ file.name }}
          <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
        </div>-->
      </div>
      <div slot="footer">
        <Button @click="uploadVisible = false">取 消</Button>
        <Button type="primary" @click="doSave">确 定</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  export default {
    name: '用户资料',
    data() {
      return {

        dialogImageUrl: '',
        dialogVisible: false,
        userToken: {'Authorization': sessionStorage.getItem('userToken')},
        imageUrl: 'http://ow1prafcd.bkt.clouddn.com/hejinyo.jpg',
        uploadVisible: false,
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      openUpload() {
        this.uploadVisible = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="scss">
  .el-upload__input {
    display: none !important;
    width: 100px;
  }

  /*.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }*/

</style>
