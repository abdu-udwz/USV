import express from 'express'
// import path from 'path'
import cors from '@/middleware/cors'
// import { createProxyMiddleware } from 'http-proxy-middleware'
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

app.get('/', (req, res) => {
  res.send('<h1>Hello, world</h1>')
})

export default app