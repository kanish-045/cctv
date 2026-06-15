import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Lock, ShieldAlert, CheckCircle2, UserPlus } from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validation checks
    if (!user.name.trim() || !user.email.trim() || !user.phone.trim() || !user.password.trim()) {
      setErrorMsg("All fields are required to establish an operator identity.");
      return;
    }

    if (user.password.length < 6) {
      setErrorMsg("Security passcode must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/auth/register", user);
      setSuccessMsg("Operator identity registered successfully! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMsg("Registration failed. Email or phone might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-panel auth-card" style={{ maxWidth: "460px" }}>
        {/* Header */}
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
            <UserPlus size={30} strokeWidth={2} />
          </div>
          <h2 className="auth-title">Register Identity</h2>
          <p className="auth-subtitle">Add a new operator credential to the security system</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister}>
          
          <div className="auth-form-group">
            <label className="auth-label">Full Name</label>
            <div className="input-with-icon-wrapper">
              <div className="input-icon-prefix">
                <User size={16} />
              </div>
              <input
                type="text"
                className="input-control input-control-with-icon"
                placeholder="operator name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                disabled={loading || successMsg}
              />
            </div>
          </div>

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
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                disabled={loading || successMsg}
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Contact Phone</label>
            <div className="input-with-icon-wrapper">
              <div className="input-icon-prefix">
                <Phone size={16} />
              </div>
              <input
                type="text"
                className="input-control input-control-with-icon"
                placeholder="phone number"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                disabled={loading || successMsg}
              />
            </div>
          </div>

          <div className="auth-form-group" style={{ marginBottom: "1.75rem" }}>
            <label className="auth-label">Security Keycode (Password)</label>
            <div className="input-with-icon-wrapper">
              <div className="input-icon-prefix">
                <Lock size={16} />
              </div>
              <input
                type="password"
                className="input-control input-control-with-icon"
                placeholder="Min. 6 characters"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                disabled={loading || successMsg}
              />
            </div>
          </div>

          {/* Messages */}
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
            {loading ? "Registering..." : successMsg ? "Identity Created" : "Create Operator Identity"}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          <span>Already registered? </span>
          <Link to="/">Sign In Console</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;