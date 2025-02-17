import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
          navigate(location.pathname);
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
  }, [location.pathname, navigate, setIsLoggedIn, setUser]);

  if (required && !isLoggedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default AuthGuard;
