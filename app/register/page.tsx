import RegisterForm from "../components/auth/RegisterForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Account - ChatWise",
  description: "Create a new ChatWise account for your organization",
}

export default function RegisterPage() {
  return (
      <div className="min-h-screen flex flex-col">
            <RegisterForm />
      </div>
    )
}

