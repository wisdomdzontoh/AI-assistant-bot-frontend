import LoginForm from "../components/auth/LoginForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign In - ChatWise",
  description: "Sign in to your ChatWise account",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
  <LoginForm />
    </div>
  )
  
}

