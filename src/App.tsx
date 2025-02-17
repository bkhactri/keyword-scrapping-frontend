import { RouterProvider } from "react-router-dom";
import { appRouter } from "@routes/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </>
  );
};

export default App;
