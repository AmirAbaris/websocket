import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socketIo = io('http://localhost:4000')

    socketIo.on('connect', () => {
      console.log('Connected to WebSocket server')
      setConnected(true)
    })

    socketIo.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
      setConnected(false)
    })

    setSocket(socketIo)

    return () => {
      socketIo.disconnect()
    }
  }, [])

  return { socket, connected }
}