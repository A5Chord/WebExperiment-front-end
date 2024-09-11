<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title"> 修改密码 </div>

      <div class="left-panel">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" v-model="formData.username" size="large" type="text">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password0">
          <el-input placeholder="请输入旧密码" v-model="formData.oldPassword" size="large" type="password">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </div>

      <div class="right-panel">
        <el-form-item prop="password1">
          <el-input placeholder="请输入新密码" v-model="formData.newPassword" size="large" type="password">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input placeholder="请再次输入新密码" v-model="confirmPassword.password" size="large" type="password">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </div>

      <div class="login-bottom">
        <el-row :gutter="0" style="margin: 0; display: flex; justify-content: center;">
          <el-col :span="12">
            <el-button color="#D3D3D3" style="width: 80%;" size="large" @click="returnMenu"> 返回登录页面 </el-button>
          </el-col>
          <el-col :span="12">
            <el-button type="primary" style="width: 80%; align-content: center;" size="large" @click="changePwd"> 确 认 </el-button>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useRouter} from 'vue-router';
import userApi from "@/api/userReq.js";
import {ElMessage} from "element-plus";

let formData = reactive({
  username: "",
  oldPassword: "",
  newPassword: "",
});
let confirmPassword = reactive({
  password: ""
});

const router = useRouter();

const returnMenu = () => {
  router.push({name: 'login'})
}
const changePwd = () => {
  if (!formData.username.trim()) {
    ElMessage.error('用户名不能为空！');
    return;
  }
  if (!formData.newPassword) {
    ElMessage.error('新密码不能为空！');
    return;
  }
  if (formData.newPassword !== confirmPassword.password) {
    ElMessage.error('两次输入的新密码不一致！');
    return;
  }
  userApi.changePwd(formData)
      .then(response => {
        if (response.data.success === true) {
          ElMessage.success('修改密码成功！');
          setTimeout(() => {
            router.push('/login');
          }, 200);
        } else {
          ElMessage.error(response.data.msg);
        }
      })
      .catch(error => {
        // 处理修改密码失败的逻辑
        ElMessage.error('修改密码失败，服务器异常！');
        console.error('修改密码失败，服务器异常！', error);
      });
}

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
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 25px;
    width: 40%;
    min-width: 320px;
    min-height: 270px;
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

    .login-bottom{
      margin-left: 5.2%;
      position: relative;
      bottom: -10px;
      width: 100%;
    }
    }
  @media screen and (min-width: 800px) {
    .login-panel{
      top: 35%;
      max-width: 800px;
      .left-panel, .right-panel {
        width: 45%;
        margin: 20px auto auto auto;
      }
      .left-panel {
        margin-left: 1%;
        margin-right: 4%;
      }

      .right-panel {
        margin-left: 4%;
      }
      .login-bottom{
        bottom: -30px;
      }
    }
  }
}
</style>
