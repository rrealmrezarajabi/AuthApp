// src/hooks/useLogin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export function useLogin() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => authApi.login(data),

    onSuccess: (res) => {
      const token = res?.data?.token;

      if (token) {
        // Save token in auth context + localStorage + axios header
        login(token);

        // Refetch profile query after login
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      } else {
        console.warn("No token found in login response");
      }
    },
  });
}
