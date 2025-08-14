/** @format */

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  threadId?: string
  metadata?: Record<string, any>
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  error?: string
}
