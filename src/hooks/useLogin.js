import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const { login } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => authApi.login(data),

    onSuccess: (res) => {
      const token = res?.data?.token;

      if (!token) {
        console.warn("No token found in login response");
        return;
      }

      // Save token to context + localStorage + set axios header
      login(token);

      // Refetch profile after login
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      // Redirect to dashboard
      navigate("/dashboard");
    },
  });
}
