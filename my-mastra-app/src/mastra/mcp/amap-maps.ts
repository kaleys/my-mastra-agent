/** @format */

import { MCPClient } from '@mastra/mcp'

// 配置高德地图的mpc客户端
export const amapMaps = new MCPClient({
  servers: {
    'amap-maps': {
      command: 'npx',
      args: ['-y', '@amap/amap-maps-mcp-server'],
      env: {
        // prettier-ignore
        "AMAP_MAPS_API_KEY": process.env.AMAP_MAPS_API_KEY || 'test-api'
      }
    }
  }
})
