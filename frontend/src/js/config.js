const Config = {
  API_BASE_URL: 'http://localhost:3000/api',
  ENDPOINTS: {
    LOGIN: '/login',
    RESERVAS: '/reservas',
    USUARIOS: '/usuarios',
    MESAS: '/mesas',
    ROLES: '/roles',
    CLIMA: '/clima'
  },

  get LOGIN_URL() {
    return `${this.API_BASE_URL}${this.ENDPOINTS.LOGIN}`;
  },

  get RESERVAS_URL() {
    return `${this.API_BASE_URL}${this.ENDPOINTS.RESERVAS}`;
  },

  get USUARIOS_URL() {
    return `${this.API_BASE_URL}${this.ENDPOINTS.USUARIOS}`;
  },

  get MESAS_URL() {
    return `${this.API_BASE_URL}${this.ENDPOINTS.MESAS}`;
  },

  get ROLES_URL() {
    return `${this.API_BASE_URL}${this.ENDPOINTS.ROLES}`;
  },

  get CLIMA_URL() {
    return `${this.API_BASE_URL}${this.ENDPOINTS.CLIMA}`;
  },

  saveToken(token) {
    localStorage.setItem('token', token);
  },

  deleteToken() {
    localStorage.removeItem('token');
  },

  getToken() {
    return localStorage.getItem('token');
  },

  getUserId() {
    return localStorage.getItem('userId');
  },

  setUserId(id) {
    localStorage.setItem('userId', id);
  },

  getUserRolId() {
    return localStorage.getItem('userRolId');
  },

  setUserRolId(id) {
    localStorage.setItem('userRolId', id);
  },
  
  isLoggedIn() {
    return !!this.getToken();
  },

  getFirstAuthHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  },

  getAuthHeaders() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    };
  }
};

export default Config;
