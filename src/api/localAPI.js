import axios from "axios";

{
  /* {sessionStorage.removeItem("token") */
  // this is to use when we create log out button
}
const localAPI = axios.create({
  baseURL:
    "https://cors-anywhere.herokuapp.com/https://postmelon.herokuapp.com/api",
});

localAPI.interceptors.request.use((request) => {
  const { token } = sessionStorage;
  if (token) {
    request.headers["x-auth-token"] = token;
  }
  return request;
});

export default localAPI;
