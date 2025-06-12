'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSocket } from "@/hooks/useSocket"
import { useEffect, useState } from "react"

export default function Page() {
  const { socket, connected } = useSocket()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const sendMessage = () => {
    if (connected && message.trim()) {
      socket?.emit('message', message)
      setMessages((prev) => [...prev, `You: ${message}`])
      setMessage('')
    }
  }

  useEffect(() => {
    if (!socket) return

    const messageHandler = (msg: string) => {
      setMessages((prev) => [...prev, `Server: ${msg}`])
    }

    socket.on('message', messageHandler)

    return () => {
      socket.off('message', messageHandler)
    }
  }, [socket])

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold text-center">WebSocket Chat</h1>

      <Card className="h-80 overflow-y-auto p-4 space-y-2 bg-muted shadow">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2 justify-between">
              <p className="text-sm font-medium">Chat</p>
              {connected ? (
                <p className="text-sm text-green-500">Connected</p>
              ) : (
                <p className="text-sm text-red-500">
                  Disconnected
                </p>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {messages.map((msg, i) => (
            <div key={i} className="text-sm bg-white p-2 rounded shadow-sm">
              {msg}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage} disabled={!connected}>
          Send
        </Button>
      </div>
    </div>
  )
}