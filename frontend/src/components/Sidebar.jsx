export default function Sidebar({ sessions, activeSession, onNewSession, onSelectSession }) {
  return (
    <div style={{ width: "260px", background: "#0d0d0d", borderRight: "0.5px solid #1a1a1a", display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ padding: "20px 16px 16px", borderBottom: "0.5px solid #1a1a1a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#7F77DD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: "#fff", fontWeight: 600 }}>N</div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: 500, color: "#e8e8e8" }}>NovaSaaS</div>
            <div style={{ fontSize: "11px", color: "#444", marginTop: "1px" }}>Customer Support</div>
          </div>
        </div>
        <div
          onClick={onNewSession}
          style={{ width: "100%", padding: "9px 12px", borderRadius: "8px", border: "0.5px solid #252525", background: "#141414", color: "#999", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        >
          <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#7F77DD22", border: "0.5px solid #7F77DD44", display: "flex", alignItems: "center", justifyContent: "center", color: "#7F77DD", fontSize: "14px", lineHeight: 1 }}>+</div>
          <span>New conversation</span>
        </div>
      </div>

      {sessions.length > 0 && (
        <div style={{ padding: "16px 16px 6px", fontSize: "10px", color: "#333", letterSpacing: "0.1em", textTransform: "uppercase" }}>Recent</div>
      )}

      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 8px" }}>
        {sessions.map(s => (
          <div
            key={s.id}
            onClick={() => onSelectSession(s.id)}
            style={{ padding: "10px", borderRadius: "8px", cursor: "pointer", marginBottom: "2px", display: "flex", alignItems: "flex-start", gap: "8px", background: activeSession === s.id ? "#161616" : "transparent", border: activeSession === s.id ? "0.5px solid #222" : "0.5px solid transparent" }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: activeSession === s.id ? "#7F77DD" : "#333", marginTop: "4px", flexShrink: 0 }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "12px", color: "#bbb", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.preview}</div>
              <div style={{ fontSize: "10px", color: "#3a3a3a", marginTop: "2px" }}>{s.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "12px 16px", borderTop: "0.5px solid #1a1a1a", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#1a1a1a", border: "0.5px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#666" }}>U</div>
        <div style={{ fontSize: "11px", color: "#3a3a3a" }}>support@novasaas.com</div>
      </div>
    </div>
  )
}