import {
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";
import { NavigateFunction } from "react-router-dom";
import {
  UserAuthenticateResponse,
  UserSignInPayload,
  UserSignUpPayload,
} from "@interfaces/user.interface";
import api from "@config/axios-request";
import { HttpStatus } from "@enums/http-status.enum";
import { useGlobalState } from "@store/global-state/useGlobalState";

interface AuthContextType {
  accessToken: string | null | undefined;
  login: (
    payload: UserSignInPayload,
    navigate: NavigateFunction
  ) => Promise<void>;
  signup: (
    payload: UserSignUpPayload,
    navigate: NavigateFunction
  ) => Promise<void>;

  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  login: async () => {},
  signup: async () => {},
  isLoading: false,
  error: null,
});

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestError, setRequestError] = useState<string | null>(null);
  const { setUser, setIsLoggedIn } = useGlobalState();

  const signup = useCallback(
    async (payload: UserSignUpPayload, navigate: NavigateFunction) => {
      setIsLoading(true);
      setRequestError(null);

      try {
        const response = await api.post<UserAuthenticateResponse>(
          "/signup",
          payload
        );

        if (response.status === HttpStatus.Created) {
          navigate("/signin");
        }
      } catch (error) {
        setRequestError(
          error?.response?.data?.message || "Something went wrong!"
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const login = useCallback(
    async (payload: UserSignInPayload, navigate: NavigateFunction) => {
      setIsLoading(true);
      setRequestError(null);

      try {
        const response = await api.post<UserAuthenticateResponse>(
          "/login",
          payload
        );

        if (response.status === HttpStatus.Ok) {
          const userInfo = response.data;

          setAccessToken(userInfo.accessToken);
          setUser(userInfo);
          setIsLoggedIn(!!userInfo.accessToken);
          window.localStorage.setItem(
            "scrapping-user-token",
            userInfo.accessToken
          );
          navigate("/");
        }
      } catch (error) {
        setRequestError(
          error?.response?.data?.message || "Something went wrong!"
        );
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoggedIn, setUser]
  );

  const contextValue = useMemo(
    () => ({
      accessToken,
      login,
      signup,
      isLoading,
      error: requestError,
    }),
    [accessToken, login, signup, isLoading, requestError]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
