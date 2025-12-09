import { useForm } from "react-hook-form";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // You can adjust fields before sending if backend expects different names
    registerMutation.mutate(data, {
      onSuccess: () => {
        // After successful sign up, redirect to login
        navigate("/dashboard");
      },
    });
  };

  const password = watch("password");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col gap-4 p-10 border-r border-white/10 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-slate-900">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-200/80">
          Create account
        </p>
        <h2 className="text-3xl font-semibold text-white">
          Join the dashboard
        </h2>
        <p className="text-sm text-slate-200/80">
          Sign up to start exploring the protected area.
        </p>
        <div className="mt-auto flex gap-2">
          <span className="h-1 w-10 rounded-full bg-indigo-400" />
          <span className="h-1 w-10 rounded-full bg-white/30" />
          <span className="h-1 w-10 rounded-full bg-white/10" />
        </div>
      </div>

      <div className="p-8 sm:p-10">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Sign up
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Create your account
            </h3>
            <p className="text-sm text-slate-400">
              Fill the form to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Jane Doe"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
              {errors.name && (
                <p className="text-sm text-rose-300">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
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
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-rose-300">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-slate-50 placeholder:text-slate-500 focus:border-indigo-400/60 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-rose-300">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {registerMutation.isError && (
              <p className="text-sm text-rose-300">Sign up failed.</p>
            )}

            <button
              type="submit"
              disabled={registerMutation.isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60"
            >
              {registerMutation.isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
