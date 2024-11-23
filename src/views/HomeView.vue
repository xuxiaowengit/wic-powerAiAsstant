/**
 * HomeView.vue - 首页视图组件
 */

<template>
  <div class="home-view">
    <el-row justify="center">
      <el-col :span="24">
        <h1 class="text-center">X.AI Chat</h1>
        <XAIChat />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import XAIChat from '@/components/XAIChat.vue';
</script>

<style scoped>
.home-view {
  padding:0  10px  20px  10px;
}

.text-center {
  text-align: center;
  margin-bottom: 30px;
  padding: 10px 0;
  margin: 0 auto;
}
</style>
