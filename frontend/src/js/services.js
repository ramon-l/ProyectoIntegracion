import Config from './config.js';

export const login = async (email, password) => {
  const res = await fetch(Config.LOGIN_URL, {
    method: "POST",
    headers: Config.getFirstAuthHeaders(),
    body: JSON.stringify({ email, password })
  });
  return res;
};

export const getReservas = async () => {
  const response = await axios.get(Config.RESERVAS_URL, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const crearRegistroUsuario = async (usuario) => {
  const response = await axios.post(Config.USUARIOS_URL, usuario, {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const obtenerRegistroUsuario = async () => {
  const response = await axios.get(Config.USUARIOS_URL +"/" +Config.getUserId(), {
    headers: Config.getAuthHeaders()
  });
  return response.data;
};

export const obtenerClima = async () => {
  const response = await axios.get(Config.CLIMA_URL +"?ciudad=ASUNCION&fecha='2025-09-17'", {
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

export const modificarRegistroUsuario = async (usuario) => {
  const response = await axios.put(Config.USUARIOS_URL +"/" +Config.getUserId(), usuario, {
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
