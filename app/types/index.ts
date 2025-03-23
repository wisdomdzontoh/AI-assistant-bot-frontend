export interface User {
    id: number;
    username: string;
    name: string;
  }
  
  export interface Chatbot {
    id: number;
    name: string;
    description?: string;
    welcome_message?: string;
    persona?: string;
    primary_color?: string;
    instructions?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    is_deleted?: boolean;
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
  