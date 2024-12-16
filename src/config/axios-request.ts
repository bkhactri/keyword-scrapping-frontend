import axios from "axios";
import appConfig from "@constants/appConfig";

const api = axios.create({
  baseURL: `${appConfig.apiEndpoint}/api/v1`,
});

export default api;
