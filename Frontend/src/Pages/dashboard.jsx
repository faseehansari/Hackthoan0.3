import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js"; // Aap ki api.js file ka path (apne folder structure ke mutabiq check kar lein)

const Dashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user?.name || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Yahan fetch ke bajaye axios wala 'api' instance use kiya hai
        const response = await api.get("/api/dashboard");
        const data = response.data;

        setUserName(data.user.name);
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchDashboard();
    } else {
      setLoading(false);
      setError("Please login to access dashboard");
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-4xl">
        <header className="flex items-center justify-between rounded-xl bg-white p-5 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Your account overview
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <main className="mt-6 rounded-xl bg-white p-8 shadow-sm">
          {loading ? (
            <p className="text-gray-500">Loading dashboard...</p>
          ) : error ? (
            <p role="alert" className="text-red-600">
              {error}
            </p>
          ) : (
            <div>
              <p className="text-sm text-gray-500">
                Welcome back,
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {userName}
              </h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;