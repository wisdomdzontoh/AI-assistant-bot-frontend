import API from "../../lib/api"

export interface Chatbot {
  id: number
  organization: number
  name: string
  description: string | null
  instructions: string
  persona: string
  welcome_message: string
  primary_color: string
  is_active: boolean
  created_at: string
  updated_at?: string
  is_deleted?: boolean

  // Widget settings
  widget_name: string
  widget_welcome: string
  widget_color: string
  widget_position: "right" | "left"
  widget_show_branding: boolean
  widget_feedback: boolean
  widget_attachments: boolean

  // Feature toggles
  enable_human_handoff?: boolean
  enable_feedback?: boolean
  enable_attachments?: boolean

  // Optional
  max_response_tokens?: number
}

export interface ChatSession {
  session_id: string
  chatbot_name: string
}

export interface ChatMessage {
  id?: number
  sender: "user" | "bot"
  content: string
  created_at?: string
  feedback?: "up" | "down"
}

export interface KnowledgeBaseItem {
  id: number
  title: string
  source_type: "upload" | "url" | "text"
  created_at: string
  embedded: boolean
  keywords?: string
}

export const ChatbotService = {
  // Chatbot CRUD
  getChatbots: async (): Promise<Chatbot[]> => {
    const res = await API.get("/chatbot/chatbots")
    return res.data
  },

  getChatbot: async (id: number): Promise<Chatbot> => {
    const res = await API.get(`/chatbot/chatbots/${id}/`)
    return res.data
  },

  createChatbot: async (data: Partial<Chatbot>): Promise<Chatbot> => {
    const res = await API.post("/chatbot/chatbots/", data)
    return res.data
  },

  updateChatbot: async (id: number, data: Partial<Chatbot>): Promise<Chatbot> => {
    const res = await API.put(`/chatbot/chatbots/${id}/`, data)
    return res.data
  },

  deleteChatbot: async (id: number): Promise<void> => {
    await API.delete(`/chatbot/chatbots/${id}/`)
  },

  // Widget settings
  updateWidgetSettings: async (id: number, data: Partial<Chatbot>): Promise<Chatbot> => {
    const res = await API.put(`/chatbot/chatbots/${id}/`, data)
    return res.data
  },

  // Sessions & Messaging
  startSession: async (chatbotId: number): Promise<ChatSession> => {
    const res = await API.post("/chatbot/sessions/start/", { chatbot_id: chatbotId })
    return res.data
  },

  sendMessage: async (sessionId: string, message: string): Promise<{ reply: string }> => {
    const res = await API.post(`/chatbot/sessions/${sessionId}/message/`, { message })
    return res.data
  },

  getSession: async (
    sessionId: string
  ): Promise<{ session_id: string; messages: ChatMessage[] }> => {
    const res = await API.get(`/chatbot/sessions/${sessionId}/`)
    return res.data
  },

  getConversations: async (
    chatbotId: number
  ): Promise<{ id: number; session_id: string; created_at: string; messages: ChatMessage[] }[]> => {
    const res = await API.get(`/chatbot/chatbots/${chatbotId}/conversations/`)
    return res.data
  },

  getAnalytics: async (chatbotId: number): Promise<any> => {
    const res = await API.get(`/chatbot/analytics/${chatbotId}/`)
    return res.data
  },

  trainChatbot: async (chatbotId: number): Promise<void> => {
    await API.post(`/knowledge/train/${chatbotId}/`)
  },

  // Knowledge (Upload, Crawl, Delete)
  uploadFile: async (chatbotId: number, file: File): Promise<void> => {
    const formData = new FormData()
    formData.append("chatbot", chatbotId.toString())
    formData.append("source_type", "upload")
    formData.append("title", file.name)
    formData.append("file", file)

    const res = await API.post("/knowledge/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (res.status !== 201) {
      console.error("Upload failed:", res.data)
      throw new Error(`Failed to upload: ${file.name}`)
    }
  },

  getKnowledge: async (
    chatbotId: number,
    page = 1
  ): Promise<{ results: KnowledgeBaseItem[]; count: number }> => {
    const res = await API.get(`/knowledge/?chatbot=${chatbotId}&page=${page}`)
    return res.data
  },

  deleteKnowledge: async (id: number): Promise<void> => {
    await API.delete(`/knowledge/${id}/`)
  },

  crawlWebsite: async (
    chatbotId: number,
    values: {
      url: string
      maxPages: number
      includeSubdomains: boolean
      followExternalLinks: boolean
    }
  ): Promise<void> => {
    const payload = {
      chatbot: chatbotId,
      source_type: "url",
      title: values.url,
      url: values.url,
      metadata: {
        max_pages: values.maxPages,
        include_subdomains: values.includeSubdomains,
        follow_external_links: values.followExternalLinks,
      },
      content: "",
      keywords: "",
    }

    const res = await API.post("/knowledge/", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.status !== 201) {
      throw new Error(res.statusText || "Failed to submit crawl job.")
    }
  },
}
