<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" />
        <span>电商管理后台系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主题区域 -->
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isClappase? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse = "isClappase"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/'+subItem.path+''"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click = "saveNavState('/'+subItem.path+'')"
            >
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view>
          </router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isClappase: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      //   window.sessionStorage.clear()
      window.sessionStorage.setItem('token', null)
      // 重定向到登录页
      this.$router.push('/login')
    },
    // 获取所有的菜单项
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
    },
    // 点击切换按钮  切换菜单的折叠
    toggleCollapse() {
      this.isClappase = !this.isClappase
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  border-right: 0;
}

.el-main {
  background-color: #cccccc;
}

.toggle-button{
  background-color:#4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #FFF;
  letter-spacing: 0.2em;
  text-align: center;
  cursor: pointer;
}
</style>
