/** @format */

import { useState, useCallback } from 'react'
import { MastraClient } from '@mastra/client-js'
import type { Message, ChatState } from '../types'

export const mastraClient = new MastraClient({
  baseUrl: import.meta.env.VITE_MATRAS_SERVER_API || 'xxxx'
})

const weatherAgent = await mastraClient.getAgent('weatherAgent')

// 生成当前的threadId，memory用的
let mastraRandomID = localStorage.getItem('mwacId') || ''
if (!mastraRandomID) {
  const tid = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  mastraRandomID = tid
  localStorage.setItem('mwacId', tid)
}

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false
  })

  const [currentMessage, setCurrentMessage] = useState<Message>({
    id: Date.now().toString(),
    content: '',
    role: 'user',
    timestamp: new Date().toISOString()
  })
  const [isStreaming, setIsStreaming] = useState<boolean>(false)

  function resetCurrentMessage() {
    setCurrentMessage({
      id: '',
      timestamp: new Date().toISOString(),
      role: 'assistant',
      content: ''
    })
    setIsStreaming(false)
  }

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString()
    }
    // 用户信息加入到聊天消息队列
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: undefined
    }))

    // 本地变量累积流式内容
    let streamedContent = ''
    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      content: '',
      role: 'assistant',
      timestamp: new Date().toISOString()
    }

    try {
      const stream = await weatherAgent.stream({
        messages: [userMessage],
        threadId: `thread_${mastraRandomID}`,
        resourceId: `user_${mastraRandomID}`
      })

      await stream.processDataStream({
        onTextPart: (text: string) => {
          setIsStreaming(true)
          streamedContent += text

          // 更新当前消息用于实时显示
          setCurrentMessage({
            ...assistantMessage,
            content: streamedContent
          })
        },
        onFinishMessagePart() {
          // 使用累积的完整内容创建最终消息
          const finalMessage: Message = {
            ...assistantMessage,
            content: streamedContent
          }

          setChatState((prev) => ({
            ...prev,
            messages: [...prev.messages, finalMessage],
            isLoading: false
          }))

          resetCurrentMessage()
        },
        onErrorPart(error) {
          resetCurrentMessage()
          setChatState((prev) => ({
            ...prev,
            isLoading: false,
            error: error || 'Unable to connect to Mastra agent'
          }))
        }
      })
    } catch (error) {
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to connect to Mastra agent'
      }))
    }
  }, [])

  const clearMessages = useCallback(() => {
    setChatState({
      messages: [],
      isLoading: false
    })
  }, [])

  return {
    ...chatState,
    isStreaming,
    currentMessage,
    sendMessage,
    clearMessages
  }
}
