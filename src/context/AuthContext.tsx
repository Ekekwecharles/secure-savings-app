import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  startTimer: () => void;
  resetTimer: () => void;
  timeLeft: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(480);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    clearTimer();
  }, []); // Memoize logout, it doesn't depend on any state or props

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  const startTimer = useCallback(() => {
    clearTimer();
    setTimeLeft(480);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [logout]); // Memoize startTimer, it depends on logout

  const resetTimer = useCallback(() => {
    startTimer(); // Restart the timer
  }, [startTimer]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        logout,
        startTimer,
        resetTimer,
        timeLeft,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext was used outside of AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
