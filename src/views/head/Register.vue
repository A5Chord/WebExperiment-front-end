<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title"> 注册 </div>

      <div class="left-panel">
        <el-form-item prop="username">
          <el-input placeholder="请输入用户名" v-model="formData.username"  size="large" type="text">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input placeholder="请输入密码" v-model="formData.password" size="large" type="text">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="请输入邮箱地址" v-model="formData.email" size="large" type="text">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-date-picker
            v-model="formData.birthday"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请选择出生日期"
            size="large"
            style="width: 100%"
        />

      </div>

      <div class="right-panel">
        <el-upload class="avatar-uploader"
                   :action="''"
                   :auto-upload="false"
                   :show-file-list="false"
                   :on-change="handleAvatarChangeIcon"
                   style="border: 5px solid #aaa; margin-left: -125px; width: 200px; height: 200px; display: flex; justify-content:
        center; align-items: center;">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" style="max-width: 100%; max-height: 100%;" alt=""/>
          <el-icon v-else class="avatar-uploader-icon" style="font-size: 40px;">
            <plus/>
          </el-icon>
        </el-upload>
      </div>

      <div class="login-bottom">
        <el-row :gutter="0" style="margin: 0; display: flex; justify-content: center;">
          <el-col :span="12">
            <el-button color="#D3D3D3" style="width: 80%;" size="large" @click="returnMenu"> 返回登录页面 </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" style="width: 80%;" size="large" @click="register"> 注 册 </el-button>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script>
import {ElMessage} from 'element-plus';
import {Plus} from '@element-plus/icons-vue'
import userApi from '@/api/userReq.js';
import router from "@/router/index.js";

export default {
  components: {Plus},
  data() {
    return {
      imageUrl: "",
      formData: {
        username: "",
        password: "",
        email: "",
        birthday: "",
        balance: 0.00,
        avatar: ""
      },
      dialogVisible: false,
    };
  },
  methods: {
    handleAvatarChangeIcon(file, fileList) {
      console.log(file)

      if (file.raw.type !== 'image/jpeg' && file.raw.type !== 'image/png') {
        ElMessage.error('头像文件必须是JPG或PNG格式！')
        return false
      } else if (file.raw.size / 1024 / 1024 > 3) {
        ElMessage.error('头像文件大小不能超过3MB！')
        return false
      } else {
        this.imageUrl = URL.createObjectURL(file.raw);//赋值图片的本地url，用于图片回显功能
        this.uploadImg(file)//调用上传文件api接口
      }
    },

    //文件上传操作
    uploadImg(file) {
      let formData = new FormData()
      formData.append('file', file.raw)
      userApi.upload(formData).then(response => {
        if (response.data.success === true) {
          this.imageUrl = response.data.data;//赋值图片的阿里云url，用于图片回显功能
          ElMessage.success("头像上传成功！")
        } else {
          ElMessage.error(response.data.msg);
        }
      })
          .catch(error => {
            // 处理上传头像失败的逻辑
            ElMessage.error('头像上传失败，连接服务器出错！');
            console.error('头像上传失败，连接服务器出错！', error);
          });
    },

    register() {
      // 判断用户名、密码、邮箱和生日是否为空
      if (!this.formData.username.trim()) {
        ElMessage.error('用户名不能为空！');
        return;
      }
      if (!this.formData.password.trim()) {
        ElMessage.error('密码不能为空！');
        return;
      }
      if (!this.formData.email.trim()) {
        ElMessage.error('邮箱不能为空！');
        return;
      }
      if (!this.formData.birthday) {
        ElMessage.error('生日不能为空！');
        return;
      }
      // 判断邮箱是否符合规范
      const emailPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!emailPattern.test(this.formData.email.trim())) {
        ElMessage.error('请输入正确的邮箱地址！');
        return;
      }
      if (!this.imageUrl)
        this.formData.avatar = "https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c"
      else
        this.formData.avatar = this.imageUrl;

      //发起注册请求
      userApi.register(this.formData)
          .then(response => {
            if (response.data.success === true) {
              // 处理注册成功的逻辑
              ElMessage.success('注册成功！');
              console.log(response.data);
              setTimeout(() => {
                router.push('/login');
              }, 200);
            } else {
              ElMessage.error(response.data.msg);
            }
          })
          .catch(error => {
            // 处理注册失败的逻辑
            ElMessage.error('注册失败，服务器异常！');
            console.error('注册失败，服务器异常！', error);
          });
    },

    returnMenu() {
      router.push({name: 'login'})
    }
  },
};
</script>

<style lang="scss" scoped>
.login-body {
  background: url("../../img/bg.jpg") no-repeat center center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;

  .login-panel {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25px;
    width: 40%;
    min-width: 350px;
    min-height: 350px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5%;
    box-shadow: 2px 2px 10px #ddd;

    .login-title {
      font-size: 22px;
      text-align: center;
      margin-bottom: 22px;
      font-weight: bold;
    }

    .left-panel, .right-panel {
      width: 100%;
      display: inline-block;
      vertical-align: top;
    }

    .left-panel {
      margin-bottom: 20px;
    }
    .right-panel{
      margin-left: 55.8%;
    }
    .login-bottom{
      margin-left: 5.2%;
      position: relative;
      bottom: -10px;
      width: 100%;
    }
    }
  @media screen and (min-width: 800px) {
    .login-panel {
      top: 35%;
      min-width: 450px;
      .left-panel{
        width: 45%;
        margin: 0;
      }
      .right-panel{
        width: 20%;
        margin: 0;
      }
      .left-panel {
        margin-left: 20px;
      }
      .right-panel {
        margin-left: 30%;
      }
      .login-bottom{
        bottom: -30px;
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
