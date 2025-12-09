import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Dashboard</h2>
      <p>This is a protected page. Only logged-in users should see this.</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DashboardPage;
