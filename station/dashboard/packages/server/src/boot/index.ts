import http from 'node:http'
import socket from './socket'

export default function initialize (server: http.Server): void {
  socket(server)
}