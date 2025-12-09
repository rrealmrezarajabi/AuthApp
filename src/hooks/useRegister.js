// src/hooks/useRegister.js
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

export function useRegister() {
  return useMutation({
    mutationFn: (data) => authApi.register(data),
  });
}
