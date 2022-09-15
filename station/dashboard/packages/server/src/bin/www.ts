#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from 'http'
import type { ListenOptions } from 'net'
import startup from '@/boot/index'
import app from '@/app'


console.log('Launching server process, reading environment variables..')

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT ?? 3000)
app.set('port', port)
console.log(`Attempt attaching to port: ${port}`)

/**
 * Create HTTP server.
 */
const server = http.createServer({}, app)
// store server instance so it is accessible
app.set('serverInstance', server)

server.on('error', onError)
server.on('listening', onListening)

const serverOptions: ListenOptions = { port }
server.listen(serverOptions)

// initialize server bindings
startup(server)

/**
 * Normalize a port into a number.
 */
function normalizePort (val: number | string): number {
  const port = typeof val === 'string'
    ? parseInt(val, 10)
    : val

  if (port >= 0) {
    // port number
    return port
  } else {
    throw new Error(`Invalid port number ${port}`)
  }
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError (error: any): void {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = `Port ${port}`

  // handle specific listen errors with friendly messages
  /*eslint-disable*/
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
  /*eslint-disable*/
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr!.port
  console.log('Listening on ' + bind)
}