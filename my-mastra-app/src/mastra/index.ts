/** @format */

import { Mastra } from '@mastra/core/mastra'
import { PinoLogger } from '@mastra/loggers'
import { LibSQLStore } from '@mastra/libsql'
import { weatherWorkflow } from './workflows/weather-workflow'
import { weatherAgent } from './agents/weather-agent'

// 注册代理，工作流，存储，日志等
// libsql 是本地的文件数据库，数据可以存在内存里，也可以存在本地的文件里
export const mastra = new Mastra({
  // workflows: { weatherWorkflow },
  agents: { weatherAgent },
  storage: new LibSQLStore({
    url: ':memory:'
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info'
  })
})
