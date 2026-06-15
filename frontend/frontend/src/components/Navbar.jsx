import { useNavigate } from "react-router-dom";
import { Shield, LogOut, Video, Bell } from "lucide-react";

function Navbar({ cameraCount = 0, alertCount = 0 }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate to Login page
    navigate("/");
  };

  return (
    <header className="glass-panel" style={{
      padding: "1rem 2rem",
      borderRadius: "0 0 var(--radius-md) var(--radius-md)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "none",
      position: "sticky",
      top: 0,
      zIndex: 10,
      marginBottom: "1rem"
    }}>
      {/* Brand logo & status info */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--accent-primary-glow)",
          border: "1px solid var(--border-glow)",
          color: "var(--accent-primary)",
          width: "40px",
          height: "40px",
          borderRadius: "var(--radius-md)"
        }}>
          <Shield size={22} strokeWidth={2.5} />
        </div>
        <div>
          <h2 style={{ fontSize: "1.15rem", margin: 0, fontWeight: 800, letterSpacing: "0.05em" }}>
            SENTINEL<span style={{ color: "var(--accent-primary)" }}>CCTV</span>
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
            <span className="pulse-green-dot"></span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-success)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              System Live
            </span>
          </div>
        </div>
      </div>

      {/* Metrics & Logout Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        {/* Quick metrics info (hidden on small screen via inline styles) */}
        <div className="nav-metrics" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255,255,255,0.03)",
            padding: "6px 12px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-subtle)"
          }}>
            <Video size={16} className="text-secondary" />
            <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Cameras:</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>{cameraCount}</span>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: alertCount > 0 ? "var(--color-danger-glow)" : "rgba(255,255,255,0.03)",
            padding: "6px 12px",
            borderRadius: "var(--radius-sm)",
            border: alertCount > 0 ? "1px solid rgba(244,63,94,0.3)" : "1px solid var(--border-subtle)",
            transition: "all var(--transition-fast)"
          }}>
            <Bell size={16} style={{ color: alertCount > 0 ? "var(--color-danger)" : "var(--text-secondary)" }} />
            <span style={{ fontSize: "0.8rem", color: alertCount > 0 ? "var(--text-primary)" : "var(--text-secondary)" }}>Alerts:</span>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: alertCount > 0 ? "var(--color-danger)" : "var(--text-primary)" }}>{alertCount}</span>
          </div>
        </div>

        {/* Separator line */}
        <div style={{ height: "24px", width: "1px", background: "var(--border-subtle)" }} />

        {/* Logout action */}
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid var(--border-medium)",
            borderRadius: "var(--radius-sm)",
            color: "var(--text-secondary)",
            padding: "8px 14px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all var(--transition-fast)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-danger)";
            e.currentTarget.style.color = "var(--color-danger)";
            e.currentTarget.style.background = "var(--color-danger-glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-medium)";
            e.currentTarget.style.color = "var(--text-secondary)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
