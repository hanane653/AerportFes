import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth'; // Adjust URL if necessary

const apiService = {
  login: (username, password) => {
    return axios.post(`${API_URL}/signin`, { username, password });
  },

  register: (username, email, password) => {
    return axios.post(`${API_URL}/signup`, { username, email, password });
  },

  getCurrentUser: () => {
    // Implement logic to get current user from local storage or API
    return JSON.parse(localStorage.getItem('user'));
  },

  logout: () => {
    // Implement logic to clear user session or token
    localStorage.removeItem('user');
  },
};

export default apiService;