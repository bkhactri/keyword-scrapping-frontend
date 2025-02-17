import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "@config/axios-request";
import { useGlobalState } from "@store/global-state/useGlobalState";
import { User } from "@interfaces/user.interface";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
  required?: boolean;
}

function AuthGuard({ children, required = false }: Props) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { setIsLoggedIn, setUser } = useGlobalState();
  const location = useLocation();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = window.localStorage.getItem("scrapping-user-token");
        const response = await api.get<User>("/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userInfo = response.data;

        if (userInfo) {
          setIsAuth(true);
          setIsLoggedIn(true);
          setUser(userInfo);
        }
      } catch (error) {
        window.localStorage.removeItem("scrapping-user-token");
        setIsAuth(false);
        setIsLoggedIn(false);
        setUser(null);

        if (location.pathname !== "/signin") {
          toast.error("Your credential is expired! Please login again");
        }
      }
    };

    fetchUserInfo();
  }, [location.pathname, setIsLoggedIn, setUser]);

  if (required && !isAuth) {
    return <Navigate to="/signin" />;
  }

  if (!required && isAuth) {
    return <Navigate to="/upload" />;
  }

  return children;
}

export default AuthGuard;
