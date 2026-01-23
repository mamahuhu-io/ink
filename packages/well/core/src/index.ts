// @ink/well-core
// AI 核心抽象层

export interface AIProvider {
  name: string
  chat(messages: AIMessage[]): Promise<AIResponse>
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIResponse {
  content: string
  usage?: {
    promptTokens: number
    completionTokens: number
  }
}

export interface AIConfig {
  provider: string
  apiKey?: string
  baseUrl?: string
  model?: string
}

// Provider registry
const providers = new Map<string, AIProvider>()

export function registerProvider(provider: AIProvider) {
  providers.set(provider.name, provider)
}

export function getProvider(name: string): AIProvider | undefined {
  return providers.get(name)
}

export function listProviders(): string[] {
  return Array.from(providers.keys())
}
