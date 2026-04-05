import { useState } from "react"
import Sidebar from "./components/Sidebar"
import ChatWindow from "./components/ChatWindow"
import axios from "axios"

const API = "https://customer-support-agent-production-a7d9.up.railway.app"

export default function App() {
  const [sessions, setSessions] = useState([])
  const [activeSession, setActiveSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  async function startNewSession() {
    const res = await axios.get(`${API}/session/new`)
    const session = {
      id: res.data.session_id,
      preview: "New conversation",
      time: "Just now"
    }
    setSessions(prev => [session, ...prev])
    setActiveSession(session.id)
    setMessages([
      { role: "assistant", content: "Hi there! I'm the NovaSaaS support agent. How can I help you today?" }
    ])
  }

  async function sendMessage(text) {
    if (!activeSession) return
    const userMsg = { role: "user", content: text }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    try {
      const res = await axios.post(`${API}/chat`, {
        session_id: activeSession,
        message: text
      })
      setMessages(prev => [...prev, { role: "assistant", content: res.data.reply }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }])
    }
    setLoading(false)
    setSessions(prev =>
      prev.map(s => s.id === activeSession ? { ...s, preview: text.slice(0, 40) } : s)
    )
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0a0a" }}>
      <Sidebar
        sessions={sessions}
        activeSession={activeSession}
        onNewSession={startNewSession}
        onSelectSession={setActiveSession}
      />
      <ChatWindow
        messages={messages}
        loading={loading}
        onSend={sendMessage}
        hasSession={!!activeSession}
      />
    </div>
  )
}