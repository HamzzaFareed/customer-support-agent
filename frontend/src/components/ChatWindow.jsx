import { useEffect, useRef } from "react"
import Message from "./Message"
import InputBar from "./InputBar"

export default function ChatWindow({ messages, loading, onSend, hasSession }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const suggestions = [
    "How do I reset my password?",
    "What's included in the Pro plan?",
    "How do I invite team members?",
    "My file upload is failing"
  ]

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", background: "#080808" }}>
      <div style={{ padding: "14px 24px", borderBottom: "0.5px solid #141414", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3B6D11" }}></div>
          <span style={{ fontSize: "13px", color: "#d0d0d0", fontWeight: 500 }}>Support Agent</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "10px", background: "#0f1a0f", color: "#3B6D11", padding: "4px 10px", borderRadius: "20px", border: "0.5px solid #1a2a1a" }}>Fast</span>
          <span style={{ fontSize: "10px", background: "#111", color: "#444", padding: "4px 10px", borderRadius: "20px", border: "0.5px solid #1f1f1f" }}>Groq · llama3-70b</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {!hasSession && (
          <div style={{ margin: "auto", textAlign: "center" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#111", border: "0.5px solid #1f1f1f", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#333"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </div>
            <div style={{ fontSize: "14px", color: "#3a3a3a", marginBottom: "6px" }}>How can we help?</div>
            <div style={{ fontSize: "12px", color: "#2a2a2a", marginBottom: "16px" }}>Start a new conversation or try a suggestion</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => { onSend(s) }}
                  style={{ fontSize: "11px", background: "#111", border: "0.5px solid #1f1f1f", color: "#444", padding: "5px 12px", borderRadius: "20px", cursor: "pointer" }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <Message key={i} role={m.role} content={m.content} />
        ))}

        {loading && (
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#12102a", border: "0.5px solid #2a2060", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#7F77DD", fontWeight: 500, flexShrink: 0 }}>N</div>
            <div style={{ padding: "12px 16px", background: "#111", border: "0.5px solid #1d1d1d", borderRadius: "3px 12px 12px 12px", display: "flex", gap: "5px", alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#333", animation: "tp 1.2s infinite", animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <style>{`@keyframes tp { 0%,80%,100%{opacity:0.2} 40%{opacity:0.8} }`}</style>
      <InputBar onSend={onSend} disabled={!hasSession || loading} />
    </div>
  )
}