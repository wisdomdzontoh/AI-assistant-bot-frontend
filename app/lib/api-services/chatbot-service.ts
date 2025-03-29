import API from "../../lib/api"

export interface Chatbot {
  primary_color: string
  persona: string
  welcome_message: string
  id: number
  organization: number
  name: string
  description: string | null
  instructions: string
  is_active: boolean
  created_at: string
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
  feedback?: "up" | "down" // 🆕 optional
}


export const ChatbotService = {
  getChatbots: async (): Promise<Chatbot[]> => {
    const response = await API.get("/chatbot/chatbots")
    return response.data
  },


  getChatbot: async (id: number): Promise<Chatbot> => {
    if (!id) throw new Error("Missing chatbot ID")
  
    try {
      const response = await API.get(`/chatbot/chatbots/${id}/`)
      return response.data
    } catch (err: any) {
      console.error("Failed to fetch chatbot:", err.response?.data || err.message)
      throw new Error("Failed to load chatbot details")
    }
  },
  

  // Update chatbot widget settings
  updateWidgetSettings: async (id: number, data: Partial<Chatbot>): Promise<Chatbot> => {
    const response = await API.put(`/chatbot/chatbots/${id}/`, data)
    return response.data
  },

  createChatbot: async (chatbot: Partial<Chatbot>): Promise<Chatbot> => {
    const response = await API.post("/chatbot/chatbots/", chatbot)
    return response.data
  },

  updateChatbot: async (id: number, chatbot: Partial<Chatbot>): Promise<Chatbot> => {
    const response = await API.put(`/chatbot/chatbots/${id}/`, chatbot)
    return response.data
  },

  deleteChatbot: async (id: number): Promise<void> => {
    await API.delete(`/chatbot/chatbots/${id}/`)
  },

  startSession: async (chatbotId: number): Promise<ChatSession> => {
    const response = await API.post("/chatbot/sessions/start/", { chatbot_id: chatbotId })
    return response.data
  },

  sendMessage: async (sessionId: string, message: string): Promise<{ reply: string }> => {
    const response = await API.post(`/chatbot/sessions/${sessionId}/message/`, { message })
    return response.data
  },

  getSession: async (sessionId: string): Promise<{ session_id: string; messages: ChatMessage[] }> => {
    const response = await API.get(`/chatbot/sessions/${sessionId}/`)
    return response.data
  },

  getAnalytics: async (chatbotId: number): Promise<any> => {
    const response = await API.get(`/chatbot/analytics/${chatbotId}/`)
    return response.data
  },

  trainChatbot: async (id: number): Promise<void> => {
    await API.post(`/knowledge/train/${id}/`)
  },



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
      const errorText = res.data
      console.error("Upload failed:", errorText)
      throw new Error(`Failed to upload: ${file.name}`)
    }
  },

  getKnowledge: async (chatbotId: number, page = 1): Promise<{ results: any[], count: number }> => {
    const response = await API.get(`/knowledge/?chatbot=${chatbotId}&page=${page}`)
    return response.data
  },

  deleteKnowledge: async (id: number): Promise<void> => {
    await API.delete(`/knowledge/${id}/`)
  },


  crawlWebsite: async (
    chatbotId: number,
    values: {
      url: string;
      maxPages: number;
      includeSubdomains: boolean;
      followExternalLinks: boolean;
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
  
    const response = await API.post("/knowledge/", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
  
    if (response.status !== 201) {
      throw new Error(response.statusText || "Failed to submit crawl job.")
    }
  },
  
  getConversations: async (chatbotId: number): Promise<{
    id: number
    session_id: string
    created_at: string
    messages: ChatMessage[]
  }[]> => {
    const response = await API.get(`/chatbot/chatbots/${chatbotId}/conversations/`)
    return response.data
  },
  
  
  
  
  
  
  
  
  
}







