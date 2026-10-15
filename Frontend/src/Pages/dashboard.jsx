
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user?.name || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load dashboard"
          );
        }

        setUserName(data.user.name);
      } catch (err) {
        setError(err.message);
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
