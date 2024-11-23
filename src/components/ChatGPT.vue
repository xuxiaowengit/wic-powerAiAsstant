/**
 * ChatGPT.vue - ChatGPT聊天组件
 * 提供与OpenAI ChatGPT API的聊天界面
 */

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { ChatDotRound, ChatLineRound, Service, User, Position, Loading } from '@element-plus/icons-vue';

// ChatGPT API配置信息
const API_URL = 'https://api.openai.com/v1/chat/completions';
const CHATGPT_API_KEY = import.meta.env.VITE_CHATGPT_API_KEY;
// 组件状态
const messages = ref([]); // 聊天消息历史
const inputMessage = ref(''); // 用户输入
const loading = ref(false); // 加载状态
const messageContainerRef = ref(null); // 消息容器引用
const chatTopic = ref(''); // 当前聊天主题

// 添加延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 发送消息到ChatGPT API
 * @param {string} content - 用户输入的消息内容
 */
const handleSendMessage = async (content) => {
  if (!content.trim()) return;

  try {
    loading.value = true;
    
    // 添加1秒延迟
    await delay(1000);

    // 添加用户消息
    const userMessage = { role: 'user', content };
    messages.value.push(userMessage);

    // 更新聊天主题
    if (messages.value.length === 1) {
      chatTopic.value = content.slice(0, 10) + (content.length > 10 ? '...' : '');
    }

    // 准备API请求
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATGPT_API_KEY}`,
        'OpenAI-Organization': 'org-V1eeO5s5FK77gUpmd15QWBFX',
        'OpenAI-Project': 'proj_ch470KuMjFHtSR4SnWZGFNmZ'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '你是一个友好的AI助手，可以帮助用户解决问题。' },
          ...messages.value
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('Error Response:', errorData);
      
      // 根据具体错误类型显示不同的错误信息
      let errorMessage = '请求失败，请重试';
      if (response.status === 429) {
        errorMessage = '请求过于频繁，请稍后再试';
      } else if (errorData.error?.code === 'insufficient_quota') {
        errorMessage = 'API 配额不足，请联系管理员或稍后再试';
      } else if (errorData.error?.message) {
        errorMessage = errorData.error.message;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('ChatGPT Response:', data); // 打印成功响应

    // 添加AI回复
    if (data.choices && data.choices[0]) {
      messages.value.push(data.choices[0].message);
    }

    // 清空输入框
    inputMessage.value = '';

    // 滚动到底部
    await nextTick();
    scrollToBottom();
  } catch (error) {
    ElMessage.error(error.message || '发送消息失败，请重试');
    console.error('发送消息错误:', error);
  } finally {
    loading.value = false;
  }
};

/**
 * 处理键盘事件
 * @param {Event} event - 键盘事件对象
 */
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    handleSendMessage(inputMessage.value);
  }
};

/**
 * 滚动消息容器到底部
 */
const scrollToBottom = () => {
  if (messageContainerRef.value) {
    messageContainerRef.value.scrollTop = messageContainerRef.value.scrollHeight;
  }
};

// 组件挂载时初始化
onMounted(() => {
  if (messageContainerRef.value) {
    messageContainerRef.value.scrollTop = messageContainerRef.value.scrollHeight;
  }
});
</script>

<template>
  <div class="chat-container">
    <!-- 聊天主题 -->
    <div v-if="chatTopic" class="chat-topic">
      <el-icon><ChatDotRound /></el-icon>
      <span>当前话题: {{ chatTopic }}</span>
    </div>

    <!-- 消息列表 -->
    <div ref="messageContainerRef" class="message-container">
      <template v-if="messages.length === 0">
        <div class="welcome-message">
          <el-icon><Service /></el-icon>
          <h2>欢迎使用ChatGPT助手</h2>
          <p>我可以帮助你回答问题、编写代码、解决问题等。</p>
          <p>请在下方输入你的问题，按Enter发送。</p>
        </div>
      </template>
      <template v-else>
        <div v-for="(message, index) in messages" 
             :key="index" 
             :class="['message', message.role === 'user' ? 'user-message' : 'ai-message']">
          <div class="message-avatar">
            <el-icon :size="36">
              <component :is="message.role === 'user' ? User : Service" />
            </el-icon>
          </div>
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-time">{{ new Date().toLocaleTimeString() }}</div>
          </div>
        </div>
      </template>
    </div>

    <!-- 输入区域 -->
    <div class="input-container">
      <el-input
        v-model="inputMessage"
        type="textarea"
        :rows="3"
        :placeholder="loading ? '正在思考中...' : '输入消息，按Enter发送，Shift+Enter换行'"
        @keydown="handleKeyPress"
        :disabled="loading"
        resize="none"
      >
        <template #prefix>
          <el-icon><ChatLineRound /></el-icon>
        </template>
      </el-input>
      <el-button 
        type="primary" 
        @click="handleSendMessage(inputMessage)"
        :loading="loading"
        :disabled="!inputMessage.trim() || loading"
      >
        <el-icon v-if="!loading"><Position /></el-icon>
        <el-icon v-else><Loading /></el-icon>
        <span>{{ loading ? '思考中...' : '发送' }}</span>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.el-main{
  padding: 5px ;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding:10px 1rem;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-topic {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  background-color: #f5f7fa;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #606266;
}
.chat-view{
  padding-top: 5px;
}
.message-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
}

.welcome-message {
  text-align: center;
  padding: 2rem;
  color: #606266;
}

.welcome-message h2 {
  margin: 1rem 0;
  color: #303133;
}

.welcome-message p {
  margin: 0.5rem 0;
  color: #909399;
}

.message {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-width: 85%;
}

.user-message {
  margin-left: auto;
  flex-direction: row-reverse;
}

.ai-message {
  margin-right: auto;
}

.message-avatar {
  flex-shrink: 0;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 5px;
  /* line-height: 0%; */
  font-size: 12px;
}

.message-text {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  line-height: 1;
  white-space: pre-wrap;
}

.user-message .message-text {
  background-color: #409eff;
  color: white;
  font-size: 0.8rem;
}

.ai-message .message-text {
  background-color: #f5f7fa;
  color: #303133;
}

.message-time {
  font-size: 0.8rem;
  color: #909399;
  text-align: right;
}

.input-container {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.input-container :deep(.el-input__wrapper) {
  background-color: #fff;
}

.input-container :deep(.el-textarea__inner) {
  min-height: 60px !important;
  resize: none;
}

.input-container .el-button {
  height: auto;
  max-height: 82px;
  min-height: 40px;
  padding: 0 2rem;
}

/* 滚动条样式 */
.message-container::-webkit-scrollbar {
  width: 6px;
}

.message-container::-webkit-scrollbar-thumb {
  background-color: #dcdfe6;
  border-radius: 3px;
}

.message-container::-webkit-scrollbar-track {
  background-color: #f5f7fa;
}
</style>
