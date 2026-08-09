import { jwtDecode } from "jwt-decode";
import AuthContext from "../contexts/auth";
import { useState, type ReactNode } from "react";
import type { User, DecodedToken } from "../types.ts";
import { getToken, clearToken } from "../helpers/token.ts";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const token = getToken();
    if (!token) {
      return null;
    }
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return { id: decoded.id, username: decoded.username };
    } catch {
      clearToken();
      return null;
    }
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
