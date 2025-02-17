import React, { useEffect } from "react";
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
  const { isLoggedIn, setIsLoggedIn, setUser } = useGlobalState();
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
          setIsLoggedIn(true);
          setUser(userInfo);
        }
      } catch (error) {
        window.localStorage.removeItem("scrapping-user-token");
        setIsLoggedIn(false);
        setUser(null);

        if (location.pathname !== "/signin") {
          toast.error("Your credential is expired! Please login again");
        }
      }
    };

    if (location.pathname !== "/signin" && location.pathname !== "/signup") {
      fetchUserInfo();
    }
  }, [location.pathname, setIsLoggedIn, setUser]);

  if (required && !isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  if (!required && isLoggedIn) {
    return <Navigate to="/upload" />;
  }

  return children;
}

export default AuthGuard;
