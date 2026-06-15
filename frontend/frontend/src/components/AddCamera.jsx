import { useState } from "react";
import { Plus, Video, Info } from "lucide-react";

function AddCamera({ onAdd }) {
  const [cameraName, setCameraName] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!cameraName.trim()) {
      setError("Camera name is required.");
      return;
    }
    if (!streamUrl.trim()) {
      setError("Stream URL is required.");
      return;
    }

    // Basic URL format validation
    if (!streamUrl.startsWith("http://") && !streamUrl.startsWith("https://") && !streamUrl.startsWith("rtsp://")) {
      setError("URL must start with http://, https://, or rtsp://");
      return;
    }

    onAdd(cameraName.trim(), streamUrl.trim());
    setCameraName("");
    setStreamUrl("");
    setIsOpen(false);
  };

  return (
    <div className="glass-panel" style={{
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      marginBottom: "1.5rem"
    }}>
      {/* Header / Accordion trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          padding: "1.25rem",
          background: "transparent",
          border: "none",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "background var(--transition-fast)"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            background: "var(--accent-primary-glow)",
            color: "var(--accent-primary)",
            borderRadius: "var(--radius-sm)"
          }}>
            <Video size={18} />
          </div>
          <div>
            <h3 style={{ fontSize: "1rem", margin: 0, fontWeight: 700 }}>
              Connect New CCTV Stream
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: 0 }}>
              Add a camera stream url to begin scanning and security monitoring.
            </p>
          </div>
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "var(--bg-surface-elevated)",
          color: "var(--text-primary)",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform var(--transition-normal)"
        }}>
          <Plus size={16} />
        </div>
      </button>

      {/* Form content (collapsible) */}
      {isOpen && (
        <form onSubmit={handleSubmit} style={{
          padding: "0 1.25rem 1.25rem 1.25rem",
          borderTop: "1px solid var(--border-subtle)",
          animation: "slideDown 0.25s ease-out"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
            <div className="add-camera-form-grid">
              {/* Camera Name Input */}
              <div className="form-group-flex">
                <label className="auth-label">Camera Label / Identifier</label>
                <div className="input-with-icon-wrapper">
                  <div className="input-icon-prefix">
                    <Video size={16} />
                  </div>
                  <input
                    className="input-control input-control-with-icon"
                    placeholder="e.g. Front Gate, Lobby West"
                    value={cameraName}
                    onChange={(e) => setCameraName(e.target.value)}
                  />
                </div>
              </div>

              {/* Stream URL Input */}
              <div className="form-group-flex">
                <label className="auth-label" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  IP Webcam Stream URL
                  <span style={{ color: "var(--text-muted)", cursor: "help" }} title="Supports HTTP, HTTPS, or RTSP streams from your webcam or camera devices.">
                    <Info size={12} />
                  </span>
                </label>
                <div className="input-with-icon-wrapper">
                  <div className="input-icon-prefix">
                    <Info size={16} />
                  </div>
                  <input
                    className="input-control input-control-with-icon"
                    placeholder="e.g. http://192.168.1.100:8080/video"
                    value={streamUrl}
                    onChange={(e) => setStreamUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" className="btn-primary" style={{ height: "45px", padding: "0 1.5rem" }}>
                  <Plus size={18} />
                  <span>Connect Camera</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                color: "var(--color-danger)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "var(--color-danger-glow)",
                padding: "8px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1px solid rgba(244, 63, 94, 0.2)"
              }}>
                <Info size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default AddCamera;
