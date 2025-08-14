/** @format */

import React, { useState, useRef, useEffect } from 'react'
import { useChat } from '../hooks/useChat'
import { ChatMessage } from '../components/ChatMessage'
import {
  ChatBubbleLeftRightIcon,
  TrashIcon,
  PaperAirplaneIcon,
  ChatBubbleBottomCenterTextIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

export const Chat: React.FC = () => {
  const [input, setInput] = useState('')
  const {
    messages,
    isLoading,
    error,
    isStreaming,
    currentMessage,
    sendMessage,
    clearMessages
  } = useChat()

  // 底部div和input标签
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  //监听message，如果变了就自动滚动到底部，好看返回的数据
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input.trim())
      setInput('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex px-4">
      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto my-4 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Mastra AI
                  </h1>
                  <p className="text-sm text-gray-500">天气小助手</p>
                </div>
              </div>
            </div>

            <button
              onClick={clearMessages}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <TrashIcon className="w-4 h-4 inline mr-2" />
              清空对话
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-center text-gray-600 w-3/5 fs-12">
                快来问我国内城市的天气情况吧
              </p>
            </div>
          ) : (
            <div className="mx-auto space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isStreaming && (
                <ChatMessage key={currentMessage.id} message={currentMessage} />
              )}
            </div>
          )}

          {isLoading && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-start mb-4">
                <div className="bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl shadow-sm">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-3"></div>
                    <span className="text-sm">AI 正在思考...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-4xl mx-auto mb-4">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm">
                <div className="flex items-center">
                  <ExclamationCircleIcon className="w-5 h-5 text-red-500 mr-2" />
                  <div>
                    <p className="font-medium">连接错误</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 px-6 py-4 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="输入消息..."
                  disabled={isLoading}
                  rows={1}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 resize-none shadow-sm hover:shadow-md transition-shadow duration-200"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <PaperAirplaneIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <div>
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">
                  Enter
                </kbd>{' '}
                发送
                <span className="mx-2">•</span>
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs">
                  Shift+Enter
                </kbd>{' '}
                换行
              </div>
              <div className="text-gray-400">
                {input.length > 0 && `${input.length} 字符`}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
