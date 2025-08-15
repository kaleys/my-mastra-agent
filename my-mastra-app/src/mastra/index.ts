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
    d1Databases: [
      {
        binding: 'WEATHER_DB', // 这个就是 env.BIND_DB
        database_name: 'weather-memory-db',
        database_id: '623d2844-2117-4cbf-9b5b-2130ea0466e4'
      }
    ],
    env: {}
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info'
  })
})
