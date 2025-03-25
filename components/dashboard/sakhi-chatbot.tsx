"use client"

import type React from "react"

import { useState } from "react"
import { Bot, X, Send, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function SakhiChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm Sakhi, your motor assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot response based on user query
    setTimeout(() => {
      let botResponse = ""
      const userQuery = inputValue.toLowerCase()

      if (userQuery.includes("fault") || userQuery.includes("error") || userQuery.includes("problem")) {
        botResponse =
          "Based on the current readings, I'm detecting a potential bearing fault with 35% probability. I recommend scheduling an inspection within the next 30 days."
      } else if (userQuery.includes("temperature") || userQuery.includes("hot") || userQuery.includes("heat")) {
        botResponse =
          "The current motor temperature is within normal range at 42°C. The warning threshold is 55°C. No immediate action is required."
      } else if (userQuery.includes("vibration")) {
        botResponse =
          "Current vibration levels are at 1.2 mm/s, which is below the warning threshold of 2.0 mm/s but shows an increasing trend. Consider monitoring more frequently."
      } else if (userQuery.includes("maintenance") || userQuery.includes("service")) {
        botResponse =
          "Based on ML predictions, I recommend: 1) Bearing lubrication within 7 days, 2) Check rotor balance within 15 days, 3) Schedule comprehensive maintenance within 45 days."
      } else if (userQuery.includes("efficiency") || userQuery.includes("performance")) {
        botResponse =
          "Current motor efficiency is at 87%. This is 3% below optimal performance. Consider checking for voltage imbalance and bearing condition."
      } else {
        botResponse =
          "I'm here to help with motor diagnostics and recommendations. You can ask me about current faults, maintenance suggestions, or specific sensor readings."
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button onClick={toggleChat} className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg" size="icon">
        <Bot className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-4 right-4 w-80 shadow-lg transition-all duration-200 ${isMinimized ? "h-14" : "h-96"}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 border-b">
        <CardTitle className="text-sm font-medium flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sakhi" />
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          Sakhi - Motor Assistant
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMinimize}>
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleChat}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <>
          <ScrollArea className="h-[calc(100%-7rem)] p-3">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-3 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask Sakhi about motor issues..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}

