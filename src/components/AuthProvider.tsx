import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import axios from 'axios';

type User = {
  sub: string;
  exp: number;
};

type LoginCredentials = {
  email: string;
  password: string;
};

type LoginResult = {
  accessToken: string;
  message: string;
};


type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
};
export interface AuthResponse {
  accessToken: string;
}

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded: User = jwtDecode(token);
        setUser(decoded);

        if (decoded.exp * 1000 < Date.now()) {
          logout();
        }
      } catch (error) {
        console.error('Token inválido:', error);
        logout();
      }
    }
  }, [token]);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await axios.post<AuthResponse>('http://localhost:4000/api/auth', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (!response.data.accessToken) {
        throw new Error(`Erro no login: ${response.status}`);
      }

      const { accessToken }: AuthResponse = response.data;

      localStorage.setItem('token', accessToken);
      setToken(accessToken);
      toast.success('Login realizado com sucesso!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/');
    } catch (err) {
      console.log(err);
      let errMessage = 'Ocorreu um erro ao realizar login!';
      if (axios.isAxiosError(err)) {
        if (err?.response?.data?.error.message) {
          errMessage = err.response.data.error.message;
        }
      } else {
        console.error(err);
      }
      toast.error(errMessage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = (): boolean => {
    if (!token) return false;

    try {
      const decoded: User = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};