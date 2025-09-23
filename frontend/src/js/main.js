import {
  login, crearReserva, obtenerClima, crearUsuario, obtenerUsuario, modificarUsuario, eliminarUsuario,
  obtenerAllMesas, eliminarMesa, obtenerMesa, modificarMesa, crearMesa, getAllReservas, estadoReserva
} from './services.js';
import {
  mostrarBlockUI, loginSeccion, inicioSeccion, mostrarModificarUsuario,
  logoutSeccion, mostrarAlerta, registrarseSeccion, mostrarUsuario, cancelarModificarUsuario, mostrarClima,
  obtenerRegistroCreacion, obtenerRegistroModificado, listarMesas, mostrarModificarMesa, obtenerMesaModificada,
  cancelarMesa, mesaSeccion, renderPagination, obtenerMesaCreacion, listarReservas, listarCiudadesCentral,
  getDatosClima, mostrarMjeClima, limpiarDatosClima, listarMesasSelect, reservaCrearSeccion, cancelarReserva,
  obtenerReservaCreacion, mostrarMesaNav
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
const modalClima = document.getElementById('modal-clima-form');
const mesaPaginacion = document.getElementById('mesa-paginacion');
const loginMesaForm = document.getElementById('login-mesa-form');
const logoutMesaForm = document.getElementById('logout-registrarse-form');
const consultarClimaBtn = document.getElementById('consultar-clima-btn');
const climaModal = document.getElementById('climaModal');
const reservaCrearForm = document.getElementById('reserva-crear-form');
const loginReservaForm = document.getElementById('login-reserva-form');

const cargarUsuario = async () => {
  try {
    const usuario = await obtenerUsuario();
    mostrarUsuario(usuario);
  } catch (err) {
    console.error('Error al cargar usuario:', err);
    mostrarAlerta('error', Error + 'Erro al crear usuario');
  }
};

const cargarMesas = async (pag) => {
  try {
    const pagina = !!pag ? pag : 1;
    const mesas = await obtenerAllMesas(true, pagina, 5);
    // Cargar la primera página al iniciar
    renderPagination(mesas.paginacion, "mesa-paginacion", changeMesaPage);
    listarMesas(mesas.data, Config.getUserRolId(), modMesas, delMesas);
  } catch (err) {
    console.error('Error al listar mesas:', err);
    mostrarAlerta('error', Error + 'Error al listar mesas');
  }
};

const cargarReservas = async (pag) => {
  try {
    const pagina = !!pag ? pag : 1;
    const reservas = await getAllReservas(pagina, 5);
    // Cargar la primera página al iniciar
    renderPagination(reservas.paginacion, "reserva-paginacion", changeReservaPage);
    listarReservas(reservas.data, Config.isAdmin(), actEstadoReserva);
  } catch (err) {
    console.error('Error al listar mesas:', err);
    mostrarAlerta('error', Error + 'Error al listar mesas');
  }
};

export const modMesas = async (mesaId, ts) => {
  try {
    const mesa = await obtenerMesa(mesaId);
    cargarMesas();
    mostrarModificarMesa(mesaId, mesa);
  } catch (err) {
    console.error('Error al modificar  mesa:', err);
    mostrarAlerta('error', Error + 'Erro al eliminar mesa');
  }
};

const delMesas = async (mesaId) => {
  try {
    let confirmacion = confirm("¿Estás seguro de que quieres eliminar esta mesa?");
    if (confirmacion) {
      const mesa = await eliminarMesa(mesaId);
      mostrarAlerta('success', Exito + 'La mesa ha sido eliminada.');
    } else {
      alert("La eliminación ha sido cancelada.");
    }
  } catch (err) {
    console.error('Error al eliminar  mesa:', err);
    mostrarAlerta('error', Error + 'Erro al eliminar mesa');
  }
  cargarMesas();
};

const actEstadoReserva = async (reservaId, estado) => {
  try {
    if ('CONFIRMADO' === estado) {
      let confirmacion = confirm("¿Estás seguro de que quieres confirmar esta reserva?");
      if (confirmacion) {
        const reserva = await estadoReserva(reservaId, estado);
        mostrarAlerta('success', Exito + 'La reserva ha sido confirmada.');
      }
    } else if ('RECHAZADO' === estado) {
      let confirmacion = confirm("¿Estás seguro de que quieres rechazar esta reserva?");
      if (confirmacion) {
        const reserva = await estadoReserva(reservaId, estado);
        mostrarAlerta('success', Exito + 'La reserva ha sido rechazada.');
      }
    } else if ('CANCELADO' === estado) {
      let confirmacion = confirm("¿Estás seguro de que quieres cancelar esta reserva?");
      if (confirmacion) {
        const reserva = await estadoReserva(reservaId, estado);
        mostrarAlerta('success', Exito + 'La reserva ha sido cancelada.');
      }
    }
  } catch (err) {
    console.error('Error al modificar estado de reserva:', err);
    mostrarAlerta('error', Error + 'Erro al modificar estado de reserva');
  }
  cargarReservas();
};

loginReservaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const mesas = await obtenerAllMesas(false);
    listarMesasSelect(mesas);
  } catch (err) {
    mostrarAlerta('error', Error + 'Erro al obtener mesas');
  }
  reservaCrearSeccion();
});

reservaCrearForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const registro = obtenerReservaCreacion(Config.getUserId());
  try {
    const response = await crearReserva(registro);
    cancelarReserva();
    mostrarAlerta('success', Exito + "Reserva creada correctamente");
    cargarReservas();
  } catch (err) {
    mostrarAlerta('error', Error + err);
    console.error('Error al crear reserva:', err);
  }
});

reservaCrearForm.addEventListener('reset', async (e) => {
  e.preventDefault();
  cancelarReserva();
});

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
      console.log("isAdmin después de login: ");
      console.log(Config.isAdmin(), typeof Config.isAdmin());
      if (Config.isAdmin() == "true" || Config.isAdmin() === true) {
        mostrarMesaNav(true);
        cargarMesas();
      } else {
        mostrarMesaNav(false);
      }
      cargarReservas();
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

modalClima.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    listarCiudadesCentral();
  } catch (err) {
    alert('Error al crear la reserva.');
    console.error(err);
  }
});

consultarClimaBtn.addEventListener('click', async (e) => {
  let { ciudad, fecha } = getDatosClima();
  if (!!ciudad && !!fecha) {
    try {
      listarCiudadesCentral();
      mostrarBlockUI();
      const registro = await obtenerClima(ciudad, fecha);
      mostrarClima(registro.data);
    } catch (err) {
      mostrarMjeClima(err);
      console.error(err);
    }
  } else {
    mostrarMjeClima(`Los campos ciudad y fecha son requeridos`);
  }
});

climaModal.addEventListener('hidden.bs.modal', event => {
  limpiarDatosClima();
});

if (Config.isLoggedIn()) {
  //inicioSecciones();
  cargarUsuario();
        console.log("isAdmin después de login: ");
      console.log(Config.isAdmin());
  if (Config.isAdmin() == "true" || Config.isAdmin() === true) {
    mostrarMesaNav(true);
    cargarMesas();
  } else {
    mostrarMesaNav(false);
  }
  cargarReservas();
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

const changeReservaPage = async (pagina) => {
  const mesas = await cargarReservas(pagina);
};