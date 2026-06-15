import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import AddCamera from "../components/AddCamera";
import AlertTable from "../components/AlertTable";
import { Video, ShieldCheck, AlertOctagon, RefreshCw, Trash2, Wifi, WifiOff } from "lucide-react";

function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setActionError("");
    try {
      const cameraRes = await api.get("/api/cameras");
      const alertRes = await api.get("/api/alerts");
      setCameras(cameraRes.data || []);
      setAlerts(alertRes.data || []);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
      setActionError("Unable to synchronize with security server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Auto-refresh alerts and cameras every 10 seconds for real-time monitoring
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAddCamera = async (cameraName, streamUrl) => {
    setActionError("");
    try {
      await api.post("/api/cameras", {
        cameraName,
        streamUrl,
      });
      loadData();
    } catch (err) {
      console.error("Failed to add camera:", err);
      setActionError("Failed to register new camera stream.");
    }
  };

  const handleDeleteCamera = async (cameraId) => {
    if (!window.confirm("Are you sure you want to disconnect this camera stream?")) {
      return;
    }
    setActionError("");
    try {
      // Proactively support camera deletion endpoint if it exists in backend
      await api.delete(`/api/cameras/${cameraId}`);
      loadData();
    } catch (err) {
      console.error("Delete endpoint failed or not supported:", err);
      setActionError("Cannot delete camera: API endpoint not supported or server error.");
    }
  };

  // Derived stats
  const onlineCameras = cameras.filter(cam => cam.status?.toLowerCase() === "online" || cam.status?.toLowerCase() === "active").length;
  const criticalAlerts = alerts.filter(alert => alert.severity?.toLowerCase() === "critical").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top Navigation */}
      <Navbar cameraCount={cameras.length} alertCount={criticalAlerts} />

      {/* Main Dashboard Panel */}
      <main className="dashboard-container">
        
        {/* Metric Cards Row */}
        <section className="stats-grid">
          {/* Stat 1: Camera Status */}
          <div className="glass-panel stat-card success">
            <div className="stat-card-info">
              <span className="stat-label">Active Feeds</span>
              <span className="stat-value">{onlineCameras} / {cameras.length}</span>
            </div>
            <div className="stat-icon-wrapper">
              <Video size={24} />
            </div>
          </div>

          {/* Stat 2: System Status */}
          <div className="glass-panel stat-card success">
            <div className="stat-card-info">
              <span className="stat-label">Security Shield</span>
              <span className="stat-value">Operational</span>
            </div>
            <div className="stat-icon-wrapper">
              <ShieldCheck size={24} />
            </div>
          </div>

          {/* Stat 3: Threat Incidents */}
          <div className="glass-panel stat-card danger">
            <div className="stat-card-info">
              <span className="stat-label">Critical Alerts</span>
              <span className="stat-value">{criticalAlerts}</span>
            </div>
            <div className="stat-icon-wrapper">
              <AlertOctagon size={24} />
            </div>
          </div>
        </section>

        {/* Global Action Error Message */}
        {actionError && (
          <div style={{
            color: "var(--color-danger)",
            fontSize: "0.875rem",
            background: "var(--color-danger-glow)",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(244, 63, 94, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "between",
            animation: "fadeIn 0.2s ease-out"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AlertOctagon size={16} />
              <span>{actionError}</span>
            </div>
            <button 
              onClick={() => setActionError("")} 
              style={{ background: "transparent", border: "none", color: "var(--text-primary)", cursor: "pointer", marginLeft: "auto", fontSize: "0.8rem", fontWeight: 700 }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Camera Addition Component */}
        <AddCamera onAdd={handleAddCamera} />

        {/* Split Dashboard Content (2 Columns: Cameras on left, Alerts log on right) */}
        <div className="dashboard-layout">
          
          {/* Left Side: Live Feeds Grid */}
          <div>
            <div className="section-header">
              <h2 className="section-title">
                <Video size={20} className="text-secondary" />
                <span>Live Surveillance Matrix</span>
              </h2>
              <div className="section-actions">
                <button
                  className="btn-filter"
                  style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px" }}
                  onClick={loadData}
                  disabled={loading}
                >
                  <RefreshCw size={14} className={loading ? "spin" : ""} style={{ animation: loading ? "pulse-soft 1s infinite" : "none" }} />
                  <span>Sync Feeds</span>
                </button>
              </div>
            </div>

            {cameras.length > 0 ? (
              <div className="camera-grid">
                {cameras.map((camera) => {
                  const isOnline = camera.status?.toLowerCase() === "online" || camera.status?.toLowerCase() === "active";
                  return (
                    <div key={camera.id} className="glass-panel camera-card">
                      {/* Video Viewport Mockup */}
                      <div className="video-viewport">
                        {/* Feed Image or Simulated Visual Scan */}
                        <img 
                          src="/cctv-feed-placeholder.png" 
                          alt="Surveillance Feed" 
                          className="video-placeholder-bg"
                          onError={(e) => {
                            // Fallback if image doesn't load
                            e.target.style.display = "none";
                          }}
                        />
                        <div className="camera-scanline-effect"></div>
                        
                        {/* HUD overlays */}
                        <div className="camera-overlay-top">
                          <div className="camera-tag-live">
                            <span className={isOnline ? "pulse-green-dot" : "pulse-red-dot"}></span>
                            <span>{isOnline ? "Live" : "Offline"}</span>
                          </div>
                          <span className="camera-timestamp-rec">
                            {new Date().toISOString().slice(0, 19).replace("T", " ")}
                          </span>
                        </div>

                        <div className="camera-overlay-center">
                          <span className="camera-static-signal" style={{ color: isOnline ? "var(--text-muted)" : "var(--color-danger)" }}>
                            {isOnline ? "CAM-ACTIVE" : "SIGNAL LOSS"}
                          </span>
                        </div>
                      </div>

                      {/* Card Information */}
                      <div className="camera-card-body">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <span className="camera-card-name">{camera.cameraName}</span>
                          <span className={`camera-status-badge ${isOnline ? "online" : "offline"}`}>
                            {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
                            {camera.status || "Unknown"}
                          </span>
                        </div>
                        <span className="camera-card-url">{camera.streamUrl}</span>

                        <div className="camera-card-footer">
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                            ID: #{camera.id}
                          </span>
                          <button
                            onClick={() => handleDeleteCamera(camera.id)}
                            style={{
                              background: "transparent",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.8rem",
                              transition: "color var(--transition-fast)"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-danger)"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                          >
                            <Trash2 size={14} />
                            <span>Disconnect</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <Video size={48} className="empty-state-icon" />
                <h3>No Cameras Connected</h3>
                <p style={{ maxWidth: "340px", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                  Please expand the connect panel above to link your first IP Webcam or RTSP security feed.
                </p>
              </div>
            )}
          </div>

          {/* Right Side: Security Threat log list */}
          <div>
            <div className="section-header">
              <h2 className="section-title">
                <span>Threat intelligence</span>
              </h2>
            </div>
            <AlertTable alerts={alerts} />
          </div>

        </div>

      </main>
    </div>
  );
}

export default Dashboard;