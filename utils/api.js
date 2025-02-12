import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Change to your backend URL

// Register User
export const registerUser = async (formData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, formData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};
