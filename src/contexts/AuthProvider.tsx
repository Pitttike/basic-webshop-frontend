import { useContext, createContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../types";

type LoginType = {
  username: string;
  password: string;
}

interface ProviderProps {
  user: User | null,
  token: string,
  loginAction(data: LoginType): void,
  logout(): void,
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: '',
  loginAction: () => {},
  logout: () => {}
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await fetch("http://localhost:3000/auth/user", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [token]); 

  const loginAction = async (data: LoginType) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      
      if (res.access_token) {
        setToken(res.access_token);
        localStorage.setItem("site", res.access_token);
        navigate("/products");
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  };
  
  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, user } = useAuth();

  if (!token || !user?.id) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};