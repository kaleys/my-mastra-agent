/** @format */

interface Env {
  WEATHER_DB: D1Database
}
// 声明全局的 env 变量
declare global {
  const env: Env
}

export {}
