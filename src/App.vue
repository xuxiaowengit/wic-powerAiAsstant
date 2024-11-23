/**
 * App.vue - 应用程序主组件
 * 提供应用程序的主要布局和导航功能
 */

<script setup>
import { ref, computed } from 'vue';
import { ChatLineRound, Service } from '@element-plus/icons-vue';
import { useRoute } from 'vue-router';

// 导航菜单状态
const isCollapse = ref(false);
const route = useRoute();

// 计算当前激活的菜单项
const activeMenu = computed(() => route.path);

/**
 * 处理菜单折叠状态切换
 */
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<template>
  <el-container class="app-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="sidebar">
      <div class="logo-container">
        <img class="logo-img" src="@/assets/img/白色logo.png" alt="Logo">
        <!-- <span class="logo-text">X.AI</span> -->
      </div>
      <el-menu
        :collapse="isCollapse"
        class="sidebar-menu"
        :default-active="activeMenu"
        router
      >
        <el-menu-item index="/">
          <el-icon><Service /></el-icon>
          <template #title>X.AI聊天</template>
        </el-menu-item>
        <el-menu-item index="/chatgpt">
          <el-icon><ChatLineRound /></el-icon>
          <template #title>ChatGPT聊天</template>
        </el-menu-item>
      </el-menu>
      
      <!-- 折叠按钮 -->
      <div class="collapse-btn" @click="handleCollapse">
        <el-icon>
          <component :is="isCollapse ? 'Expand' : 'Fold'" />
        </el-icon>
      </div>
    </el-aside>

    <!-- 主要内容区域 -->
    <el-container>
      <el-main>
        <router-view />
      </el-main>
      
      <!-- 页脚 -->
      <el-footer height="40px" class="footer">
        <span> 2024 WIC Power - Professional Power Supply Manufacturer</span>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style>
/* 重置基础样式 */
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}

/* 全局滚动条设置 */
html {
  overflow: hidden;
}

/* 应用容器样式 */
.app-container {
  height: 100vh;
}

/* 侧边栏样式 */
.sidebar {
  background-color: #003366;
  position: relative;
  transition: width 0.3s;
}

.sidebar-menu {
  border-right: none;
  background-color: transparent;
}

.sidebar-menu :deep(.el-menu-item) {
  color: #ffffff;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  color: #42b983;
  background-color: #004080;
}

.sidebar-menu :deep(.el-menu-item:hover) {
  background-color: #004080;
}

/* 折叠按钮样式 */
.collapse-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #ffffff;
  background-color: #003366;
}

.collapse-btn:hover {
  background-color: #004080;
}

/* Logo区域样式 */
.logo-container {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #004080;
  overflow: hidden;
}

.logo-img {
  height: 40px;
  width: auto;
  margin-right: 10px;
  margin: 0 auto;
}

.logo-text {
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
}

/* 主内容区域样式 */
.el-main {
  padding: 20px;
  background-color: #f0f2f5;
  height: calc(100vh - 60px);
  overflow: hidden;
}

/* 页脚样式 */
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #003366;
  color: #fbfbfb;
  font-size: 14px;
  border-top: 1px solid #e4e7ed;
}
</style>
