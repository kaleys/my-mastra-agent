/** @format */

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from '../types'
import { UserIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { SparklesIcon } from '@heroicons/react/24/solid'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="flex items-start space-x-3 max-w-2xl">
        {!isUser && (
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0 mt-1">
            <SparklesIcon className="w-4 h-4 text-white" />
          </div>
        )}

        <div className="flex flex-col">
          <div
            className={`px-4 py-3 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
              isUser
                ? 'bg-blue-600 text-white border-blue-600 rounded-tr-sm'
                : 'bg-white text-gray-800 border-gray-200 rounded-tl-sm'
            }`}
          >
            {isUser ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
            ) : (
              <div className="text-sm leading-relaxed markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>

          <div
            className={`flex items-center mt-2 text-xs text-gray-500 ${
              isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <span>
              {message.timestamp.toLocaleTimeString('zh-CN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
            {message.metadata && Object.keys(message.metadata).length > 0 && (
              <>
                <span className="mx-2">•</span>
                <button
                  className="text-blue-500 hover:text-blue-600 transition-colors flex items-center"
                  title={JSON.stringify(message.metadata, null, 2)}
                >
                  <InformationCircleIcon className="w-3 h-3 mr-1" />
                  详情
                </button>
              </>
            )}
          </div>
        </div>

        {isUser && (
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-md flex-shrink-0 mt-1">
            <UserIcon className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}
