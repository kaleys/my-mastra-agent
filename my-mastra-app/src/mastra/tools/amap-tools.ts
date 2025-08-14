/** @format */

import { createTool } from '@mastra/core/tools'
import { z } from 'zod'

const amapApiKey = process.env.AMAP_MAPS_API_KEY

export const getCityCoordinates = createTool({
  id: 'getCityCoordinates',
  description: '获取城市的经纬度和区域编码',
  inputSchema: z.object({
    city: z.string()
  }),
  outputSchema: z.object({
    lat: z.string(),
    lon: z.string(),
    adcode: z.string()
  }),
  execute: async ({ context }) => {
    const { city } = context
    const url = `https://restapi.amap.com/v3/geocode/geo?address=${city}&key=${amapApiKey}`
    const response = await fetch(url)
    const data = await response.json()
    if (data.status === '1' && data.geocodes.length > 0) {
      const location = data.geocodes[0].location
      const adcode = data.geocodes[0].adcode
      const [lon, lat] = location.split(',')
      return { lat, lon, adcode }
    }
    throw new Error('Could not find coordinates for the city.')
  }
})

export const getWeather = createTool({
  id: 'getWeather',
  description: '通过城市的区域编码获取地区的天气',
  inputSchema: z.object({
    adcode: z.string()
  }),
  outputSchema: z.object({
    weather: z.any()
  }),
  execute: async ({ context }) => {
    const { adcode } = context
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${amapApiKey}&extensions=all`
    const response = await fetch(url)
    const data = await response.json()
    if (data.status === '1' && data.forecasts.length > 0) {
      return { weather: data.forecasts[0] }
    }
    throw new Error('Could not get the weather.')
  }
})
