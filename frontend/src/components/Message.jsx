export default function Message({ role, content }) {
  const isUser = role === "user"
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  return (
    <div style={{ display: "flex", gap: "10px", maxWidth: "78%", alignSelf: isUser ? "flex-end" : "flex-start", flexDirection: isUser ? "row-reverse" : "row" }}>
      <div style={{ width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 500, marginTop: "2px", background: isUser ? "#141414" : "#12102a", color: isUser ? "#555" : "#7F77DD", border: isUser ? "0.5px solid #252525" : "0.5px solid #2a2060" }}>
        {isUser ? "U" : "N"}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ padding: "11px 15px", fontSize: "13px", lineHeight: 1.65, background: isUser ? "#13102a" : "#111", border: isUser ? "0.5px solid #2a2060" : "0.5px solid #1d1d1d", color: isUser ? "#b0a8e8" : "#c8c8c8", borderRadius: isUser ? "12px 3px 12px 12px" : "3px 12px 12px 12px" }}>
          {content}
        </div>
        {!isUser && (
          <div style={{ display: "flex", gap: "5px", padding: "0 2px" }}>
            <span style={{ fontSize: "10px", background: "#0d0d0d", border: "0.5px solid #1a1a1a", color: "#3a3a3a", padding: "3px 8px", borderRadius: "4px" }}>NovaSaaS docs</span>
          </div>
        )}
        <div style={{ fontSize: "10px", color: "#2a2a2a", padding: "0 4px", textAlign: isUser ? "right" : "left" }}>{time}</div>
      </div>
    </div>
  )
}