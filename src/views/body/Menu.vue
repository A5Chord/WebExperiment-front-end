<template>
  <el-container style="height: auto; border: 1px solid #eee">

    <el-header :style="{backgroundColor: themeColor2}" style="text-align: right ; font-size: 12px">
      <el-button type="danger" plain class="el-dropdown-link" @click="logout"> 退 出 </el-button>
    </el-header>

    <el-container>
      <div class="aside-panel">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
          <el-aside width="400px" class="aside">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <router-link :to="{ path: '/home' }">
                <el-menu-item :style="{backgroundColor: themeColor3}" index="1">
                  <el-icon>
                    <house/>
                  </el-icon>
                  <span>首页</span>
                </el-menu-item>
              </router-link>

              <el-divider style="margin: auto; background-color: #dddddd"/>

              <el-sub-menu index="2" :style="{backgroundColor: themeColor3}">
                <template #title>
                  <el-icon>
                    <circle-plus/>
                  </el-icon>
                  <span>功能菜单</span>
                </template>
                <router-link :to="{ path: '/user-table' }">
                  <el-menu-item index="2-1">作者管理</el-menu-item>
                </router-link>
                <router-link :to="{ path: '/404-inline' }">
                  <el-menu-item index="2-2">文章管理</el-menu-item>
                </router-link>
              </el-sub-menu>

              <el-divider style="margin: auto; background-color: #dddddd"/>

              <el-sub-menu index="3" :style="{backgroundColor: themeColor3}">
                <template #title>
                  <el-icon>
                    <circle-plus/>
                  </el-icon>
                  <span>主题设置</span>
                </template>
                <el-menu-item @click="changeTheme('#CCF7FF','#1E90FF','#00BFFF')" index="3-1">蓝色风格</el-menu-item>
                <el-menu-item @click="changeTheme('#FFFACD','#FFD700','#F0E68C')" index="3-2">黄色风格</el-menu-item>
              </el-sub-menu>

            </el-menu>
          </el-aside>
        </el-menu>
      </div>

      <el-main :style="{backgroundColor:themeColor1}">
        <router-view :style="{backgroundColor:themeColor1}"></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import {ElMessage} from 'element-plus';
import {CircleCheck, CircleClose, CirclePlus, House, Location} from "@element-plus/icons-vue";

export default {
  components: {Location, House, CircleCheck, CircleClose, CirclePlus},
  data() {
    return {
      index: "",
      isCollapse: true,
      dropdownVisible: false,
      themeColor1: '#CCF7FF', // 默认颜色
      themeColor2: '#1E90FF',
      themeColor3: '#00BFFF',
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeTheme(color1, color2, color3) {
      if (this.themeColor1 === color1 && this.themeColor2 === color2 && this.themeColor3 === color3)
        return
      this.themeColor1 = color1;
      this.themeColor2 = color2;
      this.themeColor3 = color3;
      ElMessage.success('主题切换成功！')
    },
    logout() {
      this.$router.push('/login');
    }
  }
}
</script>

<style>
.el-dropdown-link {
  margin-top: 15px;
  cursor: pointer;
  color: red;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

a {
  text-decoration: none;
}

@media screen and (max-width: 1000px) {
  .aside-panel {
    display: none;
  }
}
</style>