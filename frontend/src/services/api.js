import axios from "axios";

const baseURL = "http://localhost:3001/api";

const api = axios.create({
  baseURL,
});

// Add authorization header interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to set up the 403 interceptor
export const setup403Interceptor = (logout) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 403) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred during login" };
  }
};

export const register = async (username, password) => {
  try {
    const response = await api.post("/users", { username, password });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An error occurred during registration",
      }
    );
  }
};

export const getBeers = async (page = 1) => {
  try {
    const response = await api.get(`/beers?page=${page}`);
    return response.data.map((beer) => ({
      ...beer,
      image: `${baseURL}/beers/images/${beer.image}`,
    }));
  } catch (error) {
    throw (
      error.response?.data || {
        message: "An error occurred while fetching beers",
      }
    );
  }
};

export default api;
