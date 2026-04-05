import { useState } from "react"

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState("")

  function handleSend() {
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText("")
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ padding: "16px 24px 20px", borderTop: "0.5px solid #111" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-end", background: "#0d0d0d", border: "0.5px solid #1f1f1f", borderRadius: "12px", padding: "12px 14px" }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder={disabled ? "Start a new conversation first..." : "Ask anything about NovaSaaS..."}
          disabled={disabled}
          rows={1}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#c8c8c8", fontSize: "13px", resize: "none", fontFamily: "inherit", lineHeight: 1.5 }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          style={{ width: "32px", height: "32px", borderRadius: "8px", background: disabled || !text.trim() ? "#141414" : "#7F77DD", border: "0.5px solid #252525", cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.15s" }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
            <path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/>
          </svg>
        </button>
      </div>
      <div style={{ fontSize: "10px", color: "#222", textAlign: "center", marginTop: "8px" }}>
        Powered by RAG · Answers sourced from NovaSaaS documentation
      </div>
    </div>
  )
}