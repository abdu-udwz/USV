import type http from 'node:http'

import { Server } from 'socket.io'
import socketService from '@/services/socket' 
import type {  ClientToServerEvents, ServerToClientEvents, SocketData  } from 'common/types/socket'


export default function init (server: http.Server): void {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, any, SocketData >(server, {
    serveClient: false,
  })
  socketService.initialize(io)
}

