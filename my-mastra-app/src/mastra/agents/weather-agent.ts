/** @format */
import { createOpenAI } from '@ai-sdk/openai'
import { Agent } from '@mastra/core/agent'
// import { Memory } from '@mastra/memory'
// import { D1Store } from '@mastra/cloudflare-d1'
// import { CloudflareStore } from '@mastra/cloudflare'
// import { amapMaps } from '../mcp/amap-maps'
import { getCityCoordinates, getWeather } from '../tools/amap-tools'

const deepseekOpenAI = createOpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
})

// 想给memory 存到D1数据库的，本地调通了
// const storage =
//   process.env.NODE_ENV === 'production'
//     ? new D1Store({
//         binding: env.WEATHER_DB, // 因为被mastra外面包了一层 ，所以env这个变量丢失了
//         tablePrefix: 'weather_'
//       })
//     : new D1Store({// 在worker环境，不支持用http的形式去调用它自己的数据库
//         accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
//         databaseId: '623d2844-2117-4cbf-9b5b-2130ea0466e4',
//         apiToken: process.env.CF_API_TOKEN!,
//         tablePrefix: 'mastra_'
//       })

// 代理可以调用工具
export const weatherAgent = new Agent({
  id: 'weather-agent',
  name: '天气代理',
  instructions: `
      你是一个机智的天气小助手，你只能为你提供国内省市的天气情况，如果问你其他的问题，你是会生气的

      您的主要职责是帮助用户获取特定地点的天气详情。回复时：
      - 如果用户未提供地点，请务必询问。
      - 如果地点名称不是国内的，请提示只能查询国内的天气情况。
      - 如果用户询问的不是天气信息，请提示只能查询天气信息。

      请按照以下步骤操作：
      1. 首先，使用 getCityCoordinates 工具获取城市的区域编码。
      2. 然后，使用 getWeather 工具获取该区域编码的天气。
`,
  model: deepseekOpenAI('deepseek-chat'),
  tools: {
    getCityCoordinates,
    getWeather
  }
})
