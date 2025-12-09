import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
   const loginMutation = useLogin();
  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        console.log("Login successful:", res.data);
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });
  };
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email field */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password field */}
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Password</label>
          <br />
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
