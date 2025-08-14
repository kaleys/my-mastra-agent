/** @format */

import { Mastra } from '@mastra/core/mastra'
import { PinoLogger } from '@mastra/loggers'
import { CloudflareDeployer } from '@mastra/deployer-cloudflare'
// import { CloudflareStore } from '@mastra/cloudflare'
import { weatherAgent } from './agents/weather-agent'

// 注册代理，工作流，存储，日志等
// libsql 是本地的文件数据库，数据可以存在内存里，也可以存在本地的文件里

export const mastra = new Mastra({
  // workflows: { weatherWorkflow },
  agents: { weatherAgent },
  deployer: new CloudflareDeployer({
    // accoutId: process.env.CLOUDFLARE_ACCOUNT_ID,
    projectName: 'mastra-weather-agent-server',
    kvNamespaces: [
      {
        binding: 'MESSAGE_KV',
        id: '7acbab66d0664caba8f7e7c9089368df'
      }
    ]
  }),
  // storage:
  //   process.env.NODE_ENV === 'production'
  //     ? new CloudflareStore({
  //         binding: 'MESSAGE_KV'
  //       })
  //     : new CloudflareStore({
  //         accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '',
  //         apiToken: process.env.CF_API_TOKEN || '',
  //         kvNamespaceId: '7acbab66d0664caba8f7e7c9089368df'
  //       }),

  // telemetry: {
  //   enabled: true
  // },
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info'
  })
})
