const { VITE_API_URL } = import.meta.env;

const config = {
  apiEndpoint: VITE_API_URL as string,
};

export default {
  ...config,
};
