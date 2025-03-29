export interface User {
    id: number;
    username: string;
    name: string;
  }
  
// types/index.ts
export interface Chatbot {
  id: number
  name: string
  description?: string
  welcome_message?: string
  persona?: string
  primary_color?: string
  instructions?: string
  is_active: boolean
  created_at: string
  updated_at?: string
  is_deleted?: boolean
  widget_name: string
  widget_color: string
  widget_position: "right" | "left"
  widget_welcome?: string
  widget_show_branding: boolean
  widget_feedback: boolean
  widget_attachments: boolean
}

  



  export interface WidgetPreviewProps {
      chatbotId: number
      chatbotName?: string
      welcomeMessage?: string
      primaryColor?: string
      position?: "right" | "left"
    }
  
  export interface KnowledgeBaseItem {
    id: number;
    question: string;
    answer: string;
  }
  
  export interface Subscription {
    id: number;
    plan: string;
    active: boolean;
    expires_at: string;
  }
  