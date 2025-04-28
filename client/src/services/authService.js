import api from "./api";

const authService = {
  /**
   * Logs in a user with email and password
   * @param {Object} credentials - User credentials (email, password)
   * @returns {Promise} - User data and token
   */
  async login(credentials) {
    const response = await api.post("/student/auth/login", credentials);
    return response.data;
  },

  /**
   * Gets the current user data using the stored token
   * @returns {Promise} - Current user data
   */
  async getCurrentStudent() {
    const response = await api.get("/student/auth/me");
    return response.data;
  },

  /**
   * Logs out the current user (client-side only)
   * @returns {void}
   */
  logout() {
    // Server-side logout would be handled by the AuthContext
    // by removing the token from localStorage
    return true;
  },
};

export default authService;
