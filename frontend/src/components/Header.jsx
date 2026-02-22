import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark">TM</span>
        <div>
          <div className="brand-title">TaskManager</div>
          <div className="brand-subtitle">Plan it. Ship it.</div>
        </div>
      </div>
      <nav className="nav-actions">
        {isAuthenticated ? (
          <button className="btn ghost" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="btn ghost" to="/login">
              Login
            </Link>
            <Link className="btn primary" to="/register">
              Create account
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
