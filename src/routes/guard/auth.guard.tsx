import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalState } from "@store/global-state/useGlobalState";

interface Props {
  children: React.ReactNode;
  required?: boolean;
}

function AuthGuard({ children, required = false }: Props) {
  const { user, isLoggedIn } = useGlobalState();

  if (required && (!user || !isLoggedIn)) {
    return <Navigate to="/signin" />;
  }

  if (!required && user && isLoggedIn) {
    return <Navigate to="/upload" />;
  }

  return children;
}

export default AuthGuard;
