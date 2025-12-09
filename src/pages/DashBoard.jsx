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
    <div className="p-8 sm:p-10">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Dashboard
          </p>
          <h2 className="text-3xl font-semibold text-white">Protected area</h2>
          <p className="text-sm text-slate-400">
            Only authenticated users can see this page.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Logout
          </button>
          {isLoading && (
            <span className="text-sm text-slate-300">Loading profile...</span>
          )}
          {isError && (
            <span className="text-sm text-rose-300">
              Failed to load profile.
            </span>
          )}
        </div>

        {profile && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-inner shadow-emerald-500/10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  ID
                </p>
                <p className="text-lg font-semibold text-white">{profile.id}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Name
                </p>
                <p className="text-lg font-semibold text-white">
                  {profile.name}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Email
                </p>
                <p className="text-lg font-semibold text-white">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                Raw profile
              </p>
              <pre className="rounded-xl border border-white/5 bg-slate-950/70 p-4 text-sm text-emerald-200">
                {JSON.stringify(profile, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
