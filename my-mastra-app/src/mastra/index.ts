/** @format */

import { Mastra } from '@mastra/core/mastra'
import { PinoLogger } from '@mastra/loggers'
import { CloudflareDeployer } from '@mastra/deployer-cloudflare'
import { CloudflareStore } from '@mastra/cloudflare'
import { weatherAgent } from './agents/weather-agent'

// 注册代理，工作流，存储，日志等
// libsql 是本地的文件数据库，数据可以存在内存里，也可以存在本地的文件里

export const mastra = new Mastra({
  // workflows: { weatherWorkflow },
  agents: { weatherAgent },
  deployer: new CloudflareDeployer({
    scope: process.env.CLOUDFLARE_ACCOUNT_ID || '',
    projectName: 'my-mastra-app',
    auth: {
      apiToken: process.env.CLOUDFLARE_API_TOKEN || ''
    },
    kvNamespaces: [
      {
        binding: 'MESSAGE_KV',
        id: '7acbab66d0664caba8f7e7c9089368df'
      }
    ]
  }),
  storage: new CloudflareStore({
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
    apiToken: process.env.CLOUDFLARE_API_TOKEN || '',
    namespacePrefix: 'mastra_'
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info'
  })
})
