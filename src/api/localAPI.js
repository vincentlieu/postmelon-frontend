import axios from "axios";

const localAPI = axios.create({
  baseURL: "https://postmelon.herokuapp.com/api/",
});

localAPI.interceptors.request.use((request) => {
  const { token, userId } = sessionStorage;

  if (token) {
    request.headers["x-auth-token"] = token;
  }

  return request;
});

export default localAPI;
