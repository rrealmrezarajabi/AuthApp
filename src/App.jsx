import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import { Link, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-col gap-6 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Test Auth App
              </p>
              <h1 className="text-2xl font-semibold text-white">
                Clean auth playground
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Simple login and signup with protected dashboard.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10 shadow-lg shadow-emerald-500/10">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
              Demo
            </span>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-sm">
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-white/10 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-white/10 hover:text-white"
                >
                  Register
                </Link>
              </>
            )}

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/30 hover:bg-white/10 hover:text-white"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </header>

        <div className="rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-emerald-500/10 backdrop-blur">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashBoard />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<DashBoard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
