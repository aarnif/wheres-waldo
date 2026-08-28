import { createContext } from "react";
import type { User } from "../types.ts";

export interface AuthContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  justAuthenticated: boolean;
  clearJustAuthenticated: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export default AuthContext;
