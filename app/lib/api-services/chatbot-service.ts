import API from "../../lib/api"

export interface Chatbot {
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
}

export const ChatbotService = {
  // Get all chatbots for the current organization
  getChatbots: async (): Promise<Chatbot[]> => {
    const response = await API.get("/chatbot/chatbots")
    return response.data
  },

  // Create a new chatbot
  createChatbot: async (chatbot: Partial<Chatbot>): Promise<Chatbot> => {
    const response = await API.post("/chatbot/chatbots/", chatbot)
    return response.data
  },

  // Update an existing chatbot
  updateChatbot: async (id: number, chatbot: Partial<Chatbot>): Promise<Chatbot> => {
    const response = await API.put(`/chatbot/chatbots/${id}/`, chatbot)
    return response.data
  },

  // Delete a chatbot
  deleteChatbot: async (id: number): Promise<void> => {
    await API.delete(`/chatbot/chatbots/${id}/`)
  },

  // Start a new chat session
  startSession: async (chatbotId: number): Promise<ChatSession> => {
    const response = await API.post("/chatbot/sessions/start/", { chatbot_id: chatbotId })
    return response.data
  },

  // Send a message in a chat session
  sendMessage: async (sessionId: string, message: string): Promise<{ reply: string }> => {
    const response = await API.post(`/chatbot/sessions/${sessionId}/message/`, { message })
    return response.data
  },

  getSession: async (sessionId: string) => {
    const response = await API.get(`/chatbot/sessions/${sessionId}/`)
    return response.data
  },

  // Get chatbot analytics
  getAnalytics: async (chatbotId: number): Promise<any> => {
    const response = await API.get(`/chatbot/analytics/${chatbotId}/`)
    return response.data
  },


}






