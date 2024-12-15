import { useNavigate } from "react-router-dom";
import axios from "axios";
import appConfig from "@constants/appConfig";
import { HttpStatus } from "@enums/http-status.enum";

const api = axios.create({
  baseURL: `${appConfig.apiEndpoint}/api/v1`,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === HttpStatus.Unauthorized) {
      const navigate = useNavigate();
      navigate("/signin");
    }
    return Promise.reject(error);
  }
);

export default api;
