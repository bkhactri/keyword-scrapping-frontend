import { RouterProvider } from "react-router-dom";
import { appRouter } from "@routes/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@contexts/useAuthContext";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;
