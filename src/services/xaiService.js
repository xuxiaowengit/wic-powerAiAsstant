/**
 * xaiService.js - X.AI API服务
 * 提供与X.AI API的通信功能
 */

import axios from 'axios';

// API配置
const XAI_API_URL = 'https://api.x.ai/v1/chat/completions';
const XAI_API_KEY = import.meta.env.VITE_XAI_API_KEY;

/**
 * 创建X.AI API实例
 */
const xaiApi = axios.create({
  baseURL: XAI_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${XAI_API_KEY}`
  }
});

/**
 * 发送消息到X.AI API
 * @param {Array} messages - 消息历史数组
 * @param {string} [model='grok-beta'] - 模型名称
 * @param {number} [temperature=0] - 温度值
 * @returns {Promise} API响应
 */
export const sendMessage = async (messages, model = 'grok-beta', temperature = 0) => {
  try {
    const response = await xaiApi.post('', {
      messages,
      model,
      stream: false,
      temperature
    });
    return response.data;
  } catch (error) {
    console.error('X.AI API Error:', error);
    throw error;
  }
};

/**
 * 创建系统消息对象
 * @param {string} content - 系统消息内容
 * @returns {Object} 系统消息对象
 */
export const createSystemMessage = (content) => ({
  role: 'system',
  content
});

/**
 * 创建用户消息对象
 * @param {string} content - 用户消息内容
 * @returns {Object} 用户消息对象
 */
export const createUserMessage = (content) => ({
  role: 'user',
  content
});

/**
 * 创建助手消息对象
 * @param {string} content - 助手消息内容
 * @returns {Object} 助手消息对象
 */
export const createAssistantMessage = (content) => ({
  role: 'assistant',
  content
});
