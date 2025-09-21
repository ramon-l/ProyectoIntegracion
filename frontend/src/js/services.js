import Config from './config.js';

// Login
export const login = async (email, password) => {
  const res = await fetch(Config.LOGIN_URL, {
    method: "POST",
    headers: Config.getFirstAuthHeaders(),
    body: JSON.stringify({ email, password })
  });
  return res;
};

// Reservas
export const getReservas = async () => {
  const response = await axios.get(Config.RESERVAS_URL, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const crearReserva = async (reserva) => {
  const response = await axios.post(Config.RESERVAS_URL, reserva, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

//Usuarios
export const crearUsuario = async (usuario) => {
  const response = await axios.post(Config.USUARIOS_URL, usuario, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const obtenerUsuario = async () => {
  const response = await axios.get(Config.USUARIOS_URL +"/" +Config.getUserId(), {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const eliminarUsuario = async () => {
  const response = await axios.delete(Config.USUARIOS_URL+"/" +Config.getUserId(), {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const modificarUsuario = async (usuario) => {
  const response = await axios.put(Config.USUARIOS_URL +"/" +Config.getUserId(), usuario, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

//Mesas
export const crearMesa = async (mesa) => {
  const response = await axios.post(Config.MESAS_URL, mesa, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const obtenerAllMesas = async (currentpage,pageSize) => {
  const response = await axios.get(Config.MESAS_URL+`?page=${currentpage}&pageSize=${pageSize}`, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const obtenerMesa = async (mesaId) => {
  const response = await axios.get(Config.MESAS_URL+"/"+mesaId, {
    headers: Config.getAuthHeaders()
  }); 
  return response.data;
};

export const modificarMesa = async (mesa) => {
  const id = mesa.id;
  delete mesa.id;
  const response = await axios.put(Config.MESAS_URL +"/" +id, mesa, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const eliminarMesa = async (mesaId) => {
  const response = await axios.delete(Config.MESAS_URL+"/" +mesaId, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

//Enlace externo
export const obtenerClima = async () => {
  const response = await axios.get(Config.CLIMA_URL +"?ciudad=ASUNCION&fecha='2025-09-17'", {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};
