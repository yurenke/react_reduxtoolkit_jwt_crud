import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/posts/";

const getPosts = (page) => {
    return axios.get(API_URL + 'all', { params: { page: page }, headers: authHeader() });
};

const createPost = (inputs) => {
    return axios.post(API_URL + 'create', inputs, { headers: authHeader() });
};

const viewPost = (id) => {
    return axios.get(API_URL + id, { headers: authHeader() });
};

const editPost = (id, inputs) => {
    return axios.put(API_URL + id, inputs, { headers: authHeader() });
};

const deletePost = (id) => {
    return axios.delete(API_URL + id, { headers: authHeader() });
};

const UserService = {
  getPosts,
  createPost,
  viewPost,
  editPost,
  deletePost
};

export default UserService;