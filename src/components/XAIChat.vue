<!--
  XAIChat.vue - X.AI API聊天组件
  功能：
  1. 提供与X.AI API的实时对话界面
  2. 支持发送和接收消息
  3. 自动显示对话主题
  4. 支持消息历史记录和滚动
  5. 提供清除对话功能
-->
<template>
  <div class="chat-container">
    <el-card class="chat-card">
      <!-- 卡片头部：显示标题和清除按钮 -->
      <template #header>
        <div class="card-header">
          <span>X.AI Chat - {{ currentTopic || 'New Chat' }}</span>
          <el-button type="primary" :loading="loading" @click="handleClearChat">Clear Chat</el-button>
        </div>
      </template>
      
      <!-- 聊天记录区域 -->
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" 
             :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']">
          <!-- 用户/AI头像 -->
          <el-avatar :class="message.role">
            <component :is="message.role === 'user' ? UserFilled : Service" />
          </el-avatar>
          <!-- 消息内容 -->
          <div class="message-content">
            {{ message.content }}
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input">
        <el-input
          v-model="userInput"
          type="textarea"
          :rows="3"
          placeholder="Type your message here... (Press Enter to send, Shift + Enter for new line)"
          @keydown.enter.exact.prevent="handleSend"
          @keydown.shift.enter.exact="newLine"
        />
        <el-button 
          type="primary" 
          :loading="loading"
          @click="handleSend"
          :disabled="!userInput.trim()">
          Send
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { UserFilled, Service } from '@element-plus/icons-vue'
import { sendMessage as sendXAIMessage, createSystemMessage, createUserMessage } from '../services/xaiService';
import { ElMessage } from 'element-plus'

// 初始化状态
const messages = ref([
  createSystemMessage("I am a helpful assistant.")
]);
const userInput = ref('');
const loading = ref(false);
const messagesContainer = ref(null);

// 计算当前对话主题：使用第一条用户消息作为主题
const currentTopic = computed(() => {
  const userMessages = messages.value.filter(msg => msg.role === 'user');
  if (userMessages.length > 0) {
    const firstMessage = userMessages[0].content;
    return firstMessage.length > 10 ? firstMessage.slice(0, 10) + '...' : firstMessage;
  }
  return '';
});

// 滚动到消息底部
const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// 处理换行：Shift + Enter时在光标位置插入换行符
const newLine = (e) => {
  const cursorPosition = e.target.selectionStart;
  userInput.value = userInput.value.slice(0, cursorPosition) + '\n' + userInput.value.slice(cursorPosition);
};

// 处理发送消息
const handleSend = async () => {
  if (!userInput.value.trim() || loading.value) return;
  
  // 添加用户消息到对话列表
  const userMessage = createUserMessage(userInput.value);
  messages.value.push(userMessage);
  
  loading.value = true;
  userInput.value = '';
  
  try {
    // 发送消息到API并处理响应
    const response = await sendXAIMessage(messages.value);
    if (response.choices && response.choices[0]) {
      messages.value.push(response.choices[0].message);
      await scrollToBottom();
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    ElMessage.error('Failed to send message. Please try again.');
  } finally {
    loading.value = false;
  }
};

// 清除对话历史
const handleClearChat = () => {
  messages.value = [
    createSystemMessage("You are a helpful assistant.")
  ];
};

// 组件挂载时滚动到底部
onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
/* 聊天容器样式 */
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  height: 70vh;
  display: flex;
  flex-direction: column;
}

/* 聊天卡片样式 */
.chat-card {
  margin: 5px 0px;
  height: auto;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

/* 卡片头部样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-card__header {
  padding: 0px 5px;
}

/* 消息区域样式 */
.chat-messages {
  height: auto;
  max-height: 35vh;
  padding: 0px 5px 10px 5px;
  background-color: #f5f7fa;
  border-radius: 4px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #909399 #f4f4f5;
}

/* 自定义滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f4f4f5;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #909399;
  border-radius: 3px;
}

/* 消息样式 */
.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.message-content {
  margin-left: 10px;
  padding: 10px 5px;
  border-radius: 8px;
  max-width: 84%;
  word-wrap: break-word;
  font-size: 14px;
}

/* 用户消息样式 */
.user-message {
  flex-direction: row;
  
  .message-content {
    background-color: #e1f3ff;
  }
  
  .el-avatar {
    background-color: #409eff;
  }
}

/* AI消息样式 */
.ai-message {
  flex-direction: row;
  
  .message-content {
    background-color: #f0f2f5;
  }
  
  .el-avatar {
    background-color: #67c23a;
    max-width: 15%;
  }
}

/* 输入区域样式 */
.chat-input {
  margin-top: 20px;
  display: flex;
  gap: 10px;
  
  .el-input {
    flex: 1;
  }
  .el-textarea {
    max-width: 90%;
  }
}

/* Element Plus卡片样式覆盖 */
.el-card__header {
  padding: 0;
  margin: 0;
}

:deep(.el-card__body) {
  height: auto;
  min-height: 55%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>
