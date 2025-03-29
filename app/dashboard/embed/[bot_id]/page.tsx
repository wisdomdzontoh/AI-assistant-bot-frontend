"use client"

import React from "react"
import { useParams } from "next/navigation"
import EmbedPageClient from "../EmbedPageClient"

export default function EmbedBotPage() {
  const params = useParams()
  const chatbotId = Number(params?.bot_id)

  return <div><EmbedPageClient chatbotId={chatbotId} /></div>
}
