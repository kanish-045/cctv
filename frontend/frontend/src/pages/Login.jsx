import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Mail, Lock, ShieldAlert, CheckCircle2 } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password
      });

      if (response.data === "Login Successful") {
        setSuccessMsg("Access Granted. Initializing console...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      } else {
        setErrorMsg("Invalid security credentials.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Authentication server unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-panel auth-card">
        {/* Logo and Header */}
        <div className="auth-header">
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            background: "var(--accent-primary-glow)",
            border: "1px solid var(--border-glow)",
            borderRadius: "var(--radius-md)",
            color: "var(--accent-primary)",
            marginBottom: "1rem"
          }}>
            <Shield size={32} strokeWidth={2} />
          </div>
          <h2 className="auth-title">Sentinel Console</h2>
          <p className="auth-subtitle">CCTV Automated Surveillance & Threat Analysis</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div className="auth-form-group">
            <label className="auth-label">Operator Email</label>
            <div className="input-with-icon-wrapper">
              <div className="input-icon-prefix">
                <Mail size={16} />
              </div>
              <input
                type="email"
                className="input-control input-control-with-icon"
                placeholder="operator@sentinel.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading || successMsg}
              />
            </div>
          </div>

          <div className="auth-form-group" style={{ marginBottom: "1.75rem" }}>
            <label className="auth-label">Security Keycode</label>
            <div className="input-with-icon-wrapper">
              <div className="input-icon-prefix">
                <Lock size={16} />
              </div>
              <input
                type="password"
                className="input-control input-control-with-icon"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading || successMsg}
              />
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div style={{
              color: "var(--color-danger)",
              fontSize: "0.85rem",
              background: "var(--color-danger-glow)",
              padding: "10px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid rgba(244, 63, 94, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1.25rem",
              animation: "fadeIn 0.2s ease-out"
            }}>
              <ShieldAlert size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div style={{
              color: "var(--color-success)",
              fontSize: "0.85rem",
              background: "var(--color-success-glow)",
              padding: "10px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "1.25rem",
              animation: "fadeIn 0.2s ease-out"
            }}>
              <CheckCircle2 size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || successMsg}
            style={{ opacity: (loading || successMsg) ? 0.75 : 1 }}
          >
            {loading ? "Authenticating..." : successMsg ? "Access Granted" : "Secure Log In"}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <span>New Operator? </span>
          <Link to="/register">Establish Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;