/** @format */

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  metadata?: Record<string, any>
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  error?: string
}

export interface ChatMessageInput {
  message: string
  context?: Record<string, any>
}

export interface MastraAgentResponse {
  id: string
  content: string
  role: 'assistant'
  timestamp: string
  agentId?: string
  metadata?: Record<string, any>
}

export interface SendMessageToMastraResponse {
  sendMessageToMastra: {
    success: boolean
    response?: MastraAgentResponse
    error?: string
  }
}

export interface ChatWithAgentResponse {
  chatWithAgent: {
    id: string
    content: string
    role: 'assistant'
    timestamp: string
    metadata?: Record<string, any>
  }
}
