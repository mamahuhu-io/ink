// @ink/well-assistant
// AI 对话式助手

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

// Chat history management
export function createSession(): ChatSession {
  return {
    id: crypto.randomUUID(),
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
}

export function addMessage(
  session: ChatSession,
  role: 'user' | 'assistant',
  content: string
): ChatMessage {
  const message: ChatMessage = {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: Date.now(),
  }
  session.messages.push(message)
  session.updatedAt = Date.now()
  return message
}
