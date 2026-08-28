import { jwtDecode } from "jwt-decode";
import AuthContext from "../contexts/auth";
import { useState, useRef, useEffect, type ReactNode } from "react";
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

  const previousUserRef = useRef(user);
  const [justAuthenticated, setJustAuthenticated] = useState(false);

  useEffect(() => {
    if (!previousUserRef.current && user) {
      setJustAuthenticated(true);
    }
    previousUserRef.current = user;
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        justAuthenticated,
        clearJustAuthenticated: () => setJustAuthenticated(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
