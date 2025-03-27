import React from 'react'
import EmbedPageClient from '../EmbedPageClient';


export default function EmbedBotPage({ params }: { params: { bot_id: string } }) {
    return <div><EmbedPageClient chatbotId={Number(params.bot_id)} /></div>;
  }