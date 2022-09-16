import type { Server, Socket } from 'socket.io'
import type {  ClientToServerEvents, ServerToClientEvents, SocketData  } from 'common/types/socket'

type CustomSocketServer = Server<ClientToServerEvents, ServerToClientEvents, any, SocketData>

export interface SocketEventListener {
  event: string
  handle: (socket: Socket, ...args: any[]) => void
}

const SocketManager = {
  _io: null as CustomSocketServer | null,

  initialize (server: CustomSocketServer): void {
    this._io = server

    this.io.on('connection', (socket) => {
      console.log(`[Socket] socket connected with id ${socket.id}`)
    })
  },

  // getters
  get io (): CustomSocketServer {
    if (this._io == null) {
      throw new Error('Trying to use socket server before initialization')
    }

    return this._io
  },
}

export default SocketManager


