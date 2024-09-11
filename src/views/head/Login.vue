<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title"> 登录 </div>

      <div class="left-panel">
        <el-form-item prop="qq">
          <el-button type="danger" style="width: 100%; text-align: left;" @click="QQ()" size="large">
            <img src="../../assets/QQ.png"
                 style="margin-right: 10px; max-width: 20px"/> QQ登录
          </el-button>
        </el-form-item>
        <el-form-item prop="vx">
          <el-button type="success" style="width: 100%; text-align: left;" @click="VX()" size="large">
            <img src="../../assets/VX.png"
                 style="margin-right: 10px; max-width: 20px"/> 微信登录
          </el-button>
        </el-form-item>
        <el-form-item prop="zfb">
          <el-button type="primary" style="width: 100%;text-align: left;" @click="ZFB()" size="large">
            <img src="../../assets/alipay.png"
                 style="margin-right: 10px; max-width: 20px"/> 支付宝登录
          </el-button>
        </el-form-item>
      </div>

      <div class="right-panel">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" v-model="formData.username" size="large" type="text">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="formData.password" size="large" type="password"
                    @keyup.enter.native="login()">
            <template #prefix>
              <el-icon></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" style="width: 100%;" @click="login()" size="large"> 登 录 </el-button>
        </el-form-item>
      </div>

      <div class="login-bottom">
        <el-row :gutter="0" style="margin: 0; display: flex; justify-content: center;">
          <el-col :span="12">
            <el-button color="#626aef" style="width: 100%;" size="large" @click="register()"> 注 册 </el-button>
          </el-col>
          <el-col :span="12">
            <el-button color="#626aef" style="width: 100%;" size="large" @click="findPassWord()"> 修 改 密 码 </el-button>
          </el-col>
        </el-row>
      </div>

    </div>
  </div>
</template>

<script setup>

import {ref, reactive} from 'vue'
import {useRouter} from 'vue-router';
import userApi from '@/api/userReq.js';
import {ElMessage} from "element-plus";

let formData = reactive({
  username: "",
  password: ""
});

const router = useRouter();

const login = () => {
  if (!formData.username || !formData.password) {
    ElMessage.error("用户名和密码不能为空");
    return;
  }
  let userInfo = {
    username: formData.username,
    password: formData.password
  }
  userApi.login(userInfo)
      .then(response => {
        if (response.data.success === true) {
          // 处理登录成功的逻辑
          ElMessage.success('登录成功！');
          console.log(response.data);
          sessionStorage.setItem('username', JSON.stringify(userInfo.username));
          setTimeout(() => {
            router.push('/home');
          }, 200);
        } else {
          ElMessage.error(response.data.msg);
        }
      })
      .catch(error => {
        // 处理登录失败的逻辑
        ElMessage.error('登录失败，服务器异常！');
        console.error('登录失败，服务器异常！', error);
      });
};

const QQ = () => {
  router.push({path: '/404-page'});
};
const VX = () => {
  router.push({path: '/404-page'});
};
const ZFB = () => {
  router.push({path: '/404-page'});
};
const register = () => {
  router.push({name: 'register'});
};
const findPassWord = () => {
  router.push({name: 'change-pwd'})
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
    width: 35%;
    min-width: 320px;
    min-height: 320px;
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
      margin-bottom: 20px; // 添加底部间距
    }
    .login-bottom{
      position: relative;
      width: 100%;
    }
    }
  @media screen and (min-width: 800px) {
    .login-panel{
      top: 35%;
      min-width: 450px;
      .left-panel, .right-panel {
        width: 45%;
        margin: 0;
      }
      .left-panel {
        margin-left: 1%;
        margin-right: 4%;
      }
      .right-panel {
        margin-left: 4%;
      }
      .login-bottom{
        bottom: -50px;
      }
    }
  }
}
</style>
