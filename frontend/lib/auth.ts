// 📂 frontend/lib/auth.ts

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TOKEN_KEY = "token";

/**
 * Save JWT token to localStorage
 * @param token string
 */
export const saveToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

/**
 * Get JWT token from localStorage
 */
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

/**
 * Remove JWT token (logout)
 */
export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
};

/**
 * Hook to protect pages (redirect to login if not authenticated)
 */
export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      setAuthenticated(false);
    } else {
      setAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  return { loading, authenticated };
};
