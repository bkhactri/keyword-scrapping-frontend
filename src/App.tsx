import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "@routes/router";
import { useGlobalState } from "@store/global-state/useGlobalState";
import { User } from "@interfaces/user.interface";

const App = () => {
  const { setUser, setIsLoggedIn } = useGlobalState();

  useEffect(() => {
    const item = window.localStorage.getItem("scrapping-user-info");
    if (item) {
      const userInfo = JSON.parse(item) as User;
      if (userInfo) {
        setUser(userInfo);
        setIsLoggedIn(!!userInfo.accessToken);
      }
    }
  }, [setIsLoggedIn, setUser]);

  return <RouterProvider router={appRouter} />;
};

export default App;
