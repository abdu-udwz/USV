import { io, type Socket } from 'socket.io-client'
import type { ServerToClientEvents, ClientToServerEvents} from 'common/types/socket'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();


export default socket