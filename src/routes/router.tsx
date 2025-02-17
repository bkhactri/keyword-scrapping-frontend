import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "@contexts/useAuthContext";
import SignIn from "@pages/SignInPage/SignInPage";
import SignUp from "@pages/SignUpPage/SignUpPage";
import UploadPage from "@pages/UploadPage/UploadPage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import AuthGuard from "./guard/auth.guard";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/upload" />,
      },
      {
        path: "/upload",
        element: (
          <AuthGuard required>
            <UploadPage />
          </AuthGuard>
        ),
      },
      {
        path: "/signin",
        element: (
          <AuthGuard>
            <SignIn />
          </AuthGuard>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthGuard>
            <SignUp />
          </AuthGuard>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
