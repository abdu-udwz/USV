import type { Server, Socket } from 'socket.io'

export interface SocketEventListener {
  event: string
  handle: (socket: Socket, ...args: any[]) => void
}

export class SocketManager {
  private _io: Server | null = null
  private readonly listeners: SocketEventListener[] = []

  initialize (server: Server): void {
    this._io = server

    this.io.on('connection', (socket) => {
      console.log(`[Socket] socket connected with id ${socket.id}`)
      this.onSocketConnected(socket)
    })
  }

  private onSocketConnected (socket: Socket): void {
    for (const listener of this.listeners) {
      socket.on(listener.event, (...args) => listener.handle(socket, ...args))
    }
  }

  emitToUser (userId: string, event: string, ...args: any[]): void {
    const room = userId 
    this.io.to(room).emit(event, ...args)
  }

  addEventListener (listener: SocketEventListener): void {
    this.listeners.push(listener)
  }

  // getters
  private get io (): Server {
    if (this._io == null) {
      throw new Error('Trying to use socket server before initialization')
    }

    return this._io
  }
}

export const manager = new SocketManager()


