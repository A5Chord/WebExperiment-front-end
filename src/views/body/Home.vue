<template>
  <el-main
      style="display: flex; background-color: #f0f9ff; justify-content: space-between; align-items: flex-start;">
    <div
        style="position: absolute; top: -25px; left: 50%; transform: translateX(-50%); text-align: center; font-size: xx-large">
      <h1 style="color: white">欢迎~</h1>
    </div>
    <div style="max-width: 100%; position: relative; margin-left: 2%; margin-right: 5%;">
      <!--      用户头像展示-->
      <div class="avatar-bg">
        <img :src="userData.avatar" class="avatar-show"/>
      </div>

      <!--      用户信息展示-->
      <div style="min-width: 30%; position: relative; margin-top: 50px;">
        <el-descriptions
            title="用户信息"
            direction="vertical"
            :column="4"
            size=large
            border
            class="el-descriptions-body"
        >

          <el-descriptions-item prop="username" label="用户名"><img src="../../assets/author.png"
                                                                    style="margin: auto 5px -5px auto; max-width: 20px">
            <el-tag> {{ userData.username }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item prop="email" label="邮箱"><img src="../../assets/email.png"
                                                               style="margin: auto 5px -5px auto; max-width: 20px">
            {{ userData.email }}
          </el-descriptions-item>
          <el-descriptions-item prop="balance" label="余额"><img src="../../assets/balance.png"
                                                                 style="margin: auto 5px -5px auto; max-width: 20px">
            {{ userData.balance }}
          </el-descriptions-item>
          <el-descriptions-item prop="birthday" label="生日"><img src="../../assets/birthday.png"
                                                                  style="margin: auto 5px -5px auto; max-width: 20px">
            {{ userData.birthday }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <el-calendar class="calendar" style="max-width: 60%; margin-left: 100px;"></el-calendar>
  </el-main>
</template>

<script>
import userApi from '@/api/userReq.js';
import {ElMessage} from "element-plus";

export default {
  data() {
    return {
      userData: {}
    };
  },
  methods: {
    getUserData() {
      const username = JSON.parse(sessionStorage.getItem('username'));
      if (!username) {
        console.error("用户数据回写失败，用户名为空！");
        ElMessage.error("用户数据回写失败，用户名为空！");
        return;
      }
      userApi.query(username)
          .then(response => {
            if (response.data.success === true) {
              this.userData = response.data.data; // 将后端返回的用户数据赋值给 userData
            } else {
              ElMessage.error(response.data.msg);
            }
          })
          .catch(error => {
            ElMessage.error("用户数据回写失败，服务器异常！");
            console.error("用户数据回写失败，服务器异常！", error);
          });
    }
  },
  created() {
    this.getUserData();
  }
}
</script>

<style scoped>
.el-descriptions-body {
  margin-top: 20px;
  min-width: 120%;
}

.avatar-show {
  min-width: 400px;
  max-width: 500px;
  margin: 10% 10%;
  height: auto;
  display: block;
}

.avatar-bg {
  background-color: #fff;
  padding: 1px 10px 1px 10px;
  margin: auto;
  min-width: 118%
}

@media screen and (max-width: 1440px) {
  .avatar-show {
    min-width: 200px;
    max-width: 300px;
    margin: 10% 8%;
  }

  .avatar-bg {
    background-color: #fff;
    padding: 1px 10px 1px 10px;
    margin: auto;
    min-width: 80%;
  }

  .el-descriptions-body {
    margin-top: 20px;
    min-width: 105%;
  }
}

@media screen and (max-width: 1280px) {
  .calendar {
    visibility: hidden;
  }
}
</style>