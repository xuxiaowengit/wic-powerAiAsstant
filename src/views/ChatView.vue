/**
 * ChatView.vue - ChatGPT聊天页面
 */

<script setup>
import ChatGPT from '@/components/ChatGPT.vue';
</script>

<template>
  <div class="chat-view">
    <ChatGPT />
  </div>
</template>

<style scoped>
.chat-view {
  padding: 5px  10px;
  height: calc(100vh - 100px); /* 减去头部和底部的高度 */
}
</style>
