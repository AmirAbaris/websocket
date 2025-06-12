import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'

export function useSocket() {
  // used ref to not to trigger re-render
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    socketRef.current = io('http://localhost:4000')

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server')
    })

    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server')
    })

    socketRef.current.on('message', (data) => {
      console.log('Message from server:', data)
    })

    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

  return socketRef.current
}
