import { useState } from "react";
import { AlertTriangle, AlertOctagon, Info, SlidersHorizontal, Eye } from "lucide-react";

function AlertTable({ alerts = [] }) {
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter alerts by severity and search term
  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity?.toLowerCase() === filterSeverity.toLowerCase();
    const matchesSearch = 
      alert.alertType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const getAlertIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return <AlertOctagon size={18} />;
      case "warning":
        return <AlertTriangle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  const getAlertClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case "critical":
        return "critical";
      case "warning":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <div className="glass-panel alerts-card" style={{
      border: "1px solid var(--border-subtle)",
    }}>
      {/* Header and Search */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <SlidersHorizontal size={18} className="text-secondary" />
          <h3 style={{ fontSize: "1.1rem", margin: 0, fontWeight: 700 }}>
            Security Threat Log
          </h3>
        </div>

        {/* Search Input */}
        <div>
          <input
            className="input-control"
            placeholder="Search threats..."
            style={{
              padding: "6px 12px",
              fontSize: "0.85rem",
              width: "200px"
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="alerts-filter-bar">
        <button
          className={`btn-filter ${filterSeverity === "all" ? "active" : ""}`}
          onClick={() => setFilterSeverity("all")}
        >
          All ({alerts.length})
        </button>
        <button
          className={`btn-filter ${filterSeverity === "critical" ? "active" : ""}`}
          onClick={() => setFilterSeverity("critical")}
          style={{
            borderColor: filterSeverity === "critical" ? "var(--color-danger)" : "",
            color: filterSeverity === "critical" ? "var(--color-danger)" : ""
          }}
        >
          Critical ({alerts.filter(a => a.severity?.toLowerCase() === "critical").length})
        </button>
        <button
          className={`btn-filter ${filterSeverity === "warning" ? "active" : ""}`}
          onClick={() => setFilterSeverity("warning")}
          style={{
            borderColor: filterSeverity === "warning" ? "var(--color-warning)" : "",
            color: filterSeverity === "warning" ? "var(--color-warning)" : ""
          }}
        >
          Warning ({alerts.filter(a => a.severity?.toLowerCase() === "warning").length})
        </button>
        <button
          className={`btn-filter ${filterSeverity === "info" ? "active" : ""}`}
          onClick={() => setFilterSeverity("info")}
          style={{
            borderColor: filterSeverity === "info" ? "var(--accent-primary)" : "",
            color: filterSeverity === "info" ? "var(--accent-primary)" : ""
          }}
        >
          Info ({alerts.filter(a => a.severity?.toLowerCase() !== "critical" && a.severity?.toLowerCase() !== "warning").length})
        </button>
      </div>

      {/* Alerts List */}
      <div className="alerts-list">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-list-item ${getAlertClass(alert.severity)}`}
            >
              <div className="alert-item-icon">
                {getAlertIcon(alert.severity)}
              </div>
              <div className="alert-item-content">
                <div className="alert-item-title-row">
                  <div>
                    <span className="alert-item-name">{alert.alertType}</span>
                    <span className="alert-severity-badge">
                      {alert.severity || "info"}
                    </span>
                  </div>
                  <span className="alert-item-time">
                    {alert.timestamp ? new Date(alert.timestamp).toLocaleString() : "Just now"}
                  </span>
                </div>
                <p className="alert-item-msg">{alert.message}</p>
              </div>
              
              <button style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all var(--transition-fast)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
              title="Acknowledge alert"
              >
                <Eye size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="empty-state" style={{ padding: "2rem" }}>
            <span style={{ fontSize: "0.85rem" }}>No threats detected or matching filter criteria.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AlertTable;
