import React from 'react'



export default function Sidebar() {
    return (
      <aside className="w-64 bg-gray-900 text-white p-4">
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Chatbots</li>
            <li>Knowledge</li>
            <li>Subscription</li>
          </ul>
        </nav>
      </aside>
    );
  }