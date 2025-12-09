// src/hooks/useLogin.js
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res) => {
      // Adjust this based on your backend response structure
      const token = res?.data?.token;

      if (token) {
        login(token);
      } else {
        console.warn("No token found in login response");
      }
    },
  });
}
