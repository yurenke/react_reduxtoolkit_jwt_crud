import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username: username,
    email: email,
    password: password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "logintoken", {
        email: email,
        password: password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;