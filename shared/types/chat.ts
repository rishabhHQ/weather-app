// For Phase 3 — stubbed now so the structure is complete

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatRequest {
  message: string
  weatherContext?: string  // we'll pass current weather so AI can reference it
}