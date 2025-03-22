import React from 'react'


export default function EmbedBotPage({ params }: { params: { bot_id: string } }) {
    return <div>Embedded Bot ID: {params.bot_id}</div>;
  }