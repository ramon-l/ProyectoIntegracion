import {
  login, getReservas, crearReserva, obtenerClima, crearUsuario, obtenerUsuario, modificarUsuario, eliminarUsuario,
  obtenerAllMesas, eliminarMesa, obtenerMesa, modificarMesa, crearMesa
} from './services.js';
import {
  mostrarReserva, mostrarBlockUI, loginSeccion, inicioSeccion, ocultarLoading, mostrarModificarUsuario,
  logoutSeccion, mostrarAlerta, registrarseSeccion, mostrarUsuario, cancelarModificarUsuario, mostrarClima,
  obtenerRegistroCreacion, obtenerRegistroModificado, listarMesas, mostrarModificarMesa, obtenerMesaModificada,
  cancelarMesa, mesaSeccion, renderPagination, obtenerMesaCreacion
} from './ui.js';
import Config from './config.js';

const Error = "<strong>Error:</strong> ";
const Warning = "<strong>Advertencia:</strong> ";
const Exito = "<strong>¡Éxito!</strong>: ";

inicioSeccion();

const loginForm = document.getElementById('login-form');
const logoutForm = document.getElementById('logout-form');
const registrarseForm = document.getElementById('registrarse-form');
const usuarioForm = document.getElementById('usuario-form');
const eliminarCuenta = document.getElementById('eliminar-cuenta');
const usuarioModificarForm = document.getElementById('usuario-modificar-form');
const mesaModificarForm = document.getElementById('mesa-modificar-form');
const mesaCrearForm = document.getElementById('mesa-crear-form');
const loginRegistrarseForm = document.getElementById('login-registrarse-form');
const logoutRegistrarseForm = document.getElementById('logout-registrarse-form');
const reservaForm = document.getElementById('reserva-form');
const mesaPaginacion = document.getElementById('mesa-paginacion');
const loginMesaForm = document.getElementById('login-mesa-form');
const logoutMesaForm = document.getElementById('logout-registrarse-form');

const cargarUsuario = async () => {
  try {
    const usuario = await obtenerUsuario();
    ocultarLoading();
    mostrarUsuario(usuario);
  } catch (err) {
    console.error('Error al cargar usuario:', err);
    mostrarAlerta('error', Error + 'Erro al crear usuario');
  }
};

const cargarMesas = async (pag) => {
  try {
    const pagina = !!pag ? pag : 1;
    const mesas = await obtenerAllMesas(pagina, 5);
    console.log(mesas);
    ocultarLoading();
    // Cargar la primera página al iniciar
    renderPagination(mesas.paginacion, "mesa-paginacion", changeMesaPage);
    listarMesas(mesas.data, Config.getUserRolId(), modMesas, delMesas);
  } catch (err) {
    console.error('Error al listar mesas:', err);
    mostrarAlerta('error', Error + 'Error al listar mesas');
  }
};

const cargarReservas = async () => {
  try {
    const reservas = await getReservas();
    ocultarLoading();
    reservas.forEach(mostrarReserva);
  } catch (err) {
    console.error('Error al cargar reservas:', err);
    mostrarAlerta('error', Error + 'Error al cargar reservas.');
  }
};

export const modMesas = async (mesaId, ts) => {
  try {
    const mesa = await obtenerMesa(mesaId);
    mostrarModificarMesa(mesaId, mesa);
  } catch (err) {
    console.error('Error al eliminar  mesa:', err);
    mostrarAlerta('error', Error + 'Erro al eliminar mesa');
  }
};

const delMesas = async (mesaId) => {
  try {
    let confirmacion = confirm("¿Estás seguro de que quieres eliminar esta mesa?");
    if (confirmacion) {
      const mesa = await eliminarMesa(mesaId);
      mostrarAlerta('success', Exito + 'La mesa ha sido eliminada.');
      cargarMesas();
    } else {
      cargarMesas();
      alert("La eliminación ha sido cancelada.");
    }
  } catch (err) {
    console.error('Error al eliminar  mesa:', err);
    mostrarAlerta('error', Error + 'Erro al eliminar mesa');
  }
};

logoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  Config.deleteToken();
  logoutSeccion();
  mostrarAlerta('success', `Sesión cerrada`);
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailLogin').value;
  const password = document.getElementById('passwordLogin').value;

  try {
    const response = await login(email, password);
    if (response.ok) {
      const data = await response.json();
      Config.saveToken(data.token);
      loginSeccion();
      cargarUsuario();
      cargarMesas();
      // cargarReservas();
    } else {
      const errorText = await response.json();
      mostrarAlerta('error', Error + errorText.error);
    }
  } catch (err) {
    mostrarAlerta('error', Error + err);
    console.error('Error de login:', err);
  }
});

usuarioForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  mostrarModificarUsuario();
});

eliminarCuenta.addEventListener('click', async (e) => {
  console.error("entra en reset");
  let confirmacion = window.confirm("¿Estás seguro de que quieres eliminar eliminar tu cuenta?");
  if (confirmacion) {
    eliminarUsuario();
    logoutSeccion();
    alert("La cuenta ha sido eliminada.");
  } else {
    cargarUsuario();
    alert("La eliminación ha sido cancelada.");
  }
});

usuarioModificarForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = obtenerRegistroModificado();
  try {
    const response = await modificarUsuario(registro);
    cargarUsuario();
    cancelarModificarUsuario();
    mostrarAlerta('success', Exito + "Usuario modificado correctamente");
  } catch (err) {
    mostrarAlerta('error', Error + 'Error al modificar usuario');
    console.error('Error al registrarse:', err);
  }
});

usuarioModificarForm.addEventListener('reset', async (e) => {
  e.preventDefault();
  cancelarModificarUsuario();
});

mesaModificarForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = obtenerMesaModificada();
  try {
    const response = await modificarMesa(registro);
    cargarMesas();
    cancelarMesa();
    mostrarAlerta('success', Exito + "Mesa modificada correctamente");
  } catch (err) {
    mostrarAlerta('error', Error + 'Error al modificar usuario');
    console.error('Error al registrarse:', err);
  }
});

mesaModificarForm.addEventListener('reset', async (e) => {
  e.preventDefault();
  cargarMesas();
  cancelarMesa();
});

registrarseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = obtenerRegistroCreacion();
  try {
    const response = await crearUsuario(registro);
    logoutSeccion();
    mostrarAlerta('success', Exito + "Usuario creado correctamente");
  } catch (err) {
    mostrarAlerta('error', Error + err);
    console.error('Error al registrarse:', err);
  }
});

loginRegistrarseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  registrarseSeccion();
});

logoutRegistrarseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  logoutSeccion();
});

loginMesaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  mesaSeccion();
});

logoutMesaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  logoutSeccion();
});

mesaCrearForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = obtenerMesaCreacion();
  try {
    const response = await crearMesa(registro);
    cancelarMesa();
    mostrarAlerta('success', Exito + "Mesa creada correctamente");
  } catch (err) {
    mostrarAlerta('error', Error + err);
    console.error('Error al registrarse:', err);
  }
});

mesaCrearForm.addEventListener('reset', async (e) => {
  e.preventDefault();
  cancelarMesa();
});

reservaForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const registro = await obtenerClima();
    mostrarClima(registro.data);
  } catch (err) {
    alert('Error al crear la reserva.');
    console.error(err);
  }
});

if (Config.isLoggedIn()) {
  //inicioSecciones();
  cargarUsuario();
  cargarMesas();
  //cargarReservas();
} else {
  logoutSeccion();
}

document.querySelectorAll('.alert .btn-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const alerta = btn.closest('.alert');
    alerta.classList.add('d-none');
    alerta.classList.remove('show');
  });
});

const changeMesaPage = async (pagina) => {
  const mesas = await cargarMesas(pagina);
};