import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const loginMutation = useLogin();

  const onSubmit = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col gap-4 p-10 border-r border-white/10 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-slate-900">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-200/80">
          Welcome back
        </p>
        <h2 className="text-3xl font-semibold text-white">
          Sign in to continue
        </h2>
        <p className="text-sm text-slate-200/80">
          Use your account to access the protected dashboard experience.
        </p>
        <div className="mt-auto flex gap-2">
          <span className="h-1 w-10 rounded-full bg-emerald-400" />
          <span className="h-1 w-10 rounded-full bg-white/30" />
          <span className="h-1 w-10 rounded-full bg-white/10" />
        </div>
      </div>

      <div className="p-8 sm:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Login
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Access your account
            </h3>
            <p className="text-sm text-slate-400">
              Enter your credentials to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                placeholder="you@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-rose-300">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:border-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
                placeholder="••••••••"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-rose-300">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60"
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
