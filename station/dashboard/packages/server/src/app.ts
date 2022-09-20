import express from 'express'
// import path from 'path'
import cors from '@/middleware/cors'
import { createProxyMiddleware, type Filter as HttpProxyFilter } from 'http-proxy-middleware'
import indexRouter from '@/routes/index'

const app = express()
// do NOT expose the server identity EXPRESS
// avoid any targeted attacks
app.disable('x-powered-by')

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
}

app.use(cors)
// app.use(session)

app.use('/_api', indexRouter)

const proxyFilter: HttpProxyFilter = (path) => {
  return !path.includes('socket.io')
}

const httpProxy = createProxyMiddleware(proxyFilter, {
  target: process.env.NUXT_URL ?? 'http://localhost:5173',
  secure: false,
  ws: true,
  changeOrigin: true,
})

app.use(httpProxy)

export default app