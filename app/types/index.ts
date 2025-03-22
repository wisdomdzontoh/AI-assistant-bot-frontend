export interface User {
    id: number;
    username: string;
    name: string;
  }
  
  export interface Chatbot {
    id: number;
    name: string;
    description?: string;
    created_at: string;
    updated_at: string;
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
  