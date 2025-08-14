# My Mastra Client

一个基于 React + TypeScript + Tailwind CSS + GraphQL 的 Mastra AI 客户端应用。

## 技术栈

- **React** - 用户界面库
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Apollo Client** - GraphQL 客户端
- **GraphQL** - API 查询语言

## 功能特性

- 🤖 AI 聊天对话界面
- 💬 实时消息发送和接收
- 🎨 现代化的 UI 设计
- 📱 响应式布局
- 🔄 加载状态和错误处理

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并配置你的 Mastra 服务端点：

```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
REACT_APP_MASTRA_ENDPOINT=http://localhost:3000/graphql
REACT_APP_DEFAULT_AGENT_ID=your-agent-id
```

### 3. 启动 Mastra 服务

确保你的 Mastra agent 服务正在运行：
```bash
# 在你的 Mastra 项目目录中
npm run dev
```

### 4. 启动前端开发服务器

```bash
npm run dev
```

### 5. 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── ChatInterface.tsx
│   ├── ChatMessage.tsx
│   └── ChatInput.tsx
├── hooks/              # 自定义 Hooks
│   └── useChat.ts
├── graphql/            # GraphQL 相关
│   ├── client.ts
│   └── mutations.ts
├── types/              # TypeScript 类型定义
│   └── index.ts
└── pages/              # 页面组件
```

## Mastra Agent 集成

应用通过 GraphQL 与 Mastra agent 集成。支持以下 mutations：

### 主要 Mutation
```graphql
mutation SendMessageToMastra($input: ChatMessageInput!) {
  sendMessageToMastra(input: $input) {
    success
    response {
      id
      content
      role
      timestamp
      agentId
    }
    error
  }
}
```

### 备用 Mutation
```graphql
mutation ChatWithAgent($message: String!) {
  chatWithAgent(message: $message) {
    id
    content
    role
    timestamp
    metadata
  }
}
```

## 特性

- 🤖 **多 Agent 支持** - 可以选择不同的 Mastra agents
- 🔄 **自动重试** - 如果主要接口失败，自动尝试备用接口
- 📱 **响应式设计** - 适配桌面和移动设备
- ⚡ **实时交互** - 流畅的聊天体验
- 🛠️ **TypeScript** - 完整的类型安全
