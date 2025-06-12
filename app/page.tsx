'use client'

import { useState } from 'react'
import { useSocket } from '../hooks/useSocket'

export default function Page() {
  const socket = useSocket()
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', message)
      setMessage('')
    }
  }

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}
