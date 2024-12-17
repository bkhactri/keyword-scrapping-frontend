import { createBrowserRouter, Navigate } from "react-router-dom";
import SignIn from "@pages/SignInPage/SignInPage";
import SignUp from "@pages/SignUpPage/SignUpPage";
import UploadPage from "@pages/UploadPage/UploadPage";
import NotFoundPage from "@pages/NotFoundPage/NotFoundPage";
import MainLayout from "@components/Layout/MainLayout";
import HistoryPage from "@pages/HistoryPage/HistoryPage";
import AuthGuard from "./guard/auth.guard";

export const appRouter = createBrowserRouter([
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
    path: "/",
    element: <MainLayout />,
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
        path: "/history",
        element: (
          <AuthGuard required>
            <HistoryPage />
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
