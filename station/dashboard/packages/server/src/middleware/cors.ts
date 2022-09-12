import cors from 'cors'
import type { CorsOptions } from 'cors'

const allowLocalhostOrigin = process.env.CORS_ALLOW_LOCALHOST === 'true'
if (allowLocalhostOrigin) {
  console.warn('[config]: CORS allows localhost')
}

const allowedOrigins: string[] = (process.env.CORS_ALLOWED ?? '').split(',')

const config: CorsOptions = {
  origin: (origin, callback) => {
    if (origin == null) {
      // allow clients with no CORS policy or server-to-server
      return callback(null, true)
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      if (allowLocalhostOrigin && (origin.match(/localhost/) != null)) {
        return callback(null, true)
      }
    }

    callback(null, false)
  },

  credentials: true,
}

export default cors(config)