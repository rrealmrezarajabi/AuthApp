// src/pages/DashboardPage.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

function DashboardPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading, isError } = useProfile();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Dashboard</h2>
      <p>This is a protected page. Only logged-in users should see this.</p>

      <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
        Logout
      </button>

      <hr />

      <h3>User Profile</h3>

      {isLoading && <p>Loading profile...</p>}
      {isError && <p>Failed to load profile.</p>}

      {profile && (
        <div style={{ marginTop: "1rem" }}>
          {/* Adjust these fields based on your backend response */}
          <p>
            <strong>ID:</strong> {profile.id}
          </p>
          <p>
            <strong>Name:</strong> {profile.name}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>

          <pre
            style={{
              marginTop: "1rem",
              background: "#f4f4f4",
              padding: "0.5rem",
            }}
          >
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
