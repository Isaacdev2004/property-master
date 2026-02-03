import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  sessionId: string | null;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(() => 
    localStorage.getItem("adminSession")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        await fetch("/api/admin/verify", {
          headers: { "x-admin-session": sessionId }
        }).then(res => {
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("adminSession");
            setSessionId(null);
          }
        });
      } catch {
        localStorage.removeItem("adminSession");
        setSessionId(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, [sessionId]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/cms-portal-x7k9/auth", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" }
      });
      
      if (!response.ok) return false;
      
      const data = await response.json();
      if (data.sessionId) {
        localStorage.setItem("adminSession", data.sessionId);
        setSessionId(data.sessionId);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    if (sessionId) {
      try {
        await fetch("/api/admin/logout", {
          method: "POST",
          headers: { "x-admin-session": sessionId }
        });
      } catch {}
    }
    localStorage.removeItem("adminSession");
    setSessionId(null);
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, isLoading, login, logout, sessionId }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}

export function adminFetch(url: string, options: RequestInit = {}) {
  const sessionId = localStorage.getItem("adminSession");
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "x-admin-session": sessionId || "",
      "Content-Type": "application/json",
    },
  });
}
