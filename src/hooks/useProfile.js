import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

export function useProfile() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await authApi.getProfile();
      return res.data;
    },
    enabled: !!token, // only run when user is authenticated
  });
}
