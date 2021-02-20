<template>
  <el-container class="layout-container">
    <el-header class="header">
      <div class="left">
        <i
          @click="isCollapse = !isCollapse"
          class="el-icon-s-fold setheight"
        ></i>
        <img src="@/assets/img/layout_icon.png" class="marginlr" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right" v-if="userInfo">
        <img :src="avatar" alt="" />
        <span class="name">{{ userInfo.username }} 欢迎您</span>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <el-menu-item index="/layout/chart">
            <i class="el-icon-pie-chart"></i>
            <template v-slot:title>数据预览</template>
          </el-menu-item>
          <el-menu-item index="/layout/user">
            <i class="el-icon-user"></i>
            <template v-slot:title>用户列表</template>
          </el-menu-item>
          <el-menu-item index="/layout/enterprise">
            <i class="el-icon-office-building"></i>
            <template v-slot:title>企业列表</template>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <template v-slot:title>题库列表</template>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <template v-slot:title>学科列表</template>
          </el-menu-item>
          <!-- 动态渲染 -->
          <!-- <el-menu-item
            v-for="(item, index) in $router.options.routes[1].children"
            :key="index"
            :index="item.meta.path"
            v-show="item.meta.roles.includes(userInfo.role)"
          >
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- 嵌套的路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { getUserInfo, logout } from '@/api/user'
import { removeToken } from '@/utils/token'
import { Vue } from 'vue-class-component'
export default class Layout extends Vue {
  userInfo = null
  avatar = ''
  $confirm: any

  data () {
    return {
      isCollapse: false, // 是否展开
      userInfo: null,
      avatar: ''
    }
  }

  mounted () {
    this.getUserInfoData()
  }

  async getUserInfoData () {
    const res: any = await getUserInfo()

    if (res.code === 200) {
      this.userInfo = res.data
      this.avatar = process.env.VUE_APP_BASEURL + '/' + res.data.avatar
    }
  }

  logout () {
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const res: any = await logout()
        if (res.code === 200) {
          // 清空token
          removeToken()

          // 调回登录页面
          this.$router.push('/login')
        }
      })
      .catch(() => {
        console.log('cancel')
      })
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  height: 100%;
  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(249, 249, 249);
    .left {
      display: flex;
      align-items: center;
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        color: rgb(73, 161, 255);
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
        border-radius: 50%;
      }
      .name {
        margin-right: 38px;
      }
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .main {
    background-color: #e8e9ec;
  }
}
</style>
