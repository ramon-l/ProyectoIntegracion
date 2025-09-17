import { login, getReservas, crearReserva, obtenerClima, crearRegistroUsuario, obtenerRegistroUsuario, 
  modificarRegistroUsuario, eliminarUsuario} from './services.js';
import {
  mostrarReserva, mostrarBlockUI, loginSeccion, inicioSeccion, ocultarLoading, mostrarModificarUsuario,
  logoutSeccion, mostrarAlerta, registrarseSeccion, mostrarUsuario, cancelarModificarUsuario
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
const loginRegistrarseForm = document.getElementById('login-registrarse-form');
const logoutRegistrarseForm = document.getElementById('logout-registrarse-form');
const reservaForm = document.getElementById('reserva-form');

const cargarUsuario = async () => {
  try {
    const usuario = await obtenerRegistroUsuario();
    ocultarLoading();
    mostrarUsuario(usuario);
  } catch (err) {
    console.error('Error al cargar usuario:', err);
    mostrarAlerta('error', Error + 'Erro al crear usuario');
  }
};

const cargarReservas = async () => {
  try {
    const reservas = await getReservas();
    ocultarLoading();
    reservas.forEach(mostrarReserva);
  } catch (err) {
    console.error('Error al cargar reservas:', err);
    document.getElementById('loading').textContent = 'Error al cargar reservas.';
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
      console.log(data);
      Config.saveToken(data.token);
      Config.setUserId(data.userId);
      Config.setUserRolId(data.userRolId);
      loginSeccion();
      cargarUsuario();
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
  console.log("entra en reset");
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
  const nombre = document.getElementById('nombreMod').value;
  const apellido = document.getElementById('apellidoMod').value;
  const telefono = document.getElementById('telefonoMod').value;
  const correo = document.getElementById('correoMod').value;

  const registro = { nombre, apellido, telefono, correo };

  try {
    const response = await modificarRegistroUsuario(registro);
    cargarUsuario();
    cancelarModificarUsuario();
  } catch (err) {
    mostrarAlerta('error', Error + 'Error al modificar usuario');
    console.error('Error al registrarse:', err);
  }
});

usuarioModificarForm.addEventListener('reset', async (e) => {
  e.preventDefault();
  cancelarModificarUsuario();
});

registrarseForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombreRegistro').value;
  const apellido = document.getElementById('apellidoRegistro').value;
  const telefono = document.getElementById('telefonoRegistro').value;
  const correo = document.getElementById('emailRegistro').value;
  const password = document.getElementById('passwordRegistro').value;
  const rolId = document.getElementById('rolRegistro').value;

  const registro = { nombre, apellido, telefono, correo, password, rolId };

  try {
    const response = await crearRegistroUsuario(registro);
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

reservaForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const registro = await obtenerClima();
    const data = registro.data;

    document.getElementById("span-clima").innerText =
      ` fecha: ${data.date},
      ubicacion: ${data.location},
      Precipitacion: ${data.precipitation},
      temperatura máxima: ${data.tmax},
      temperatura mínima: ${data.tmin},
    `;
  } catch (err) {
    alert('Error al crear la reserva.');
    console.error(err);
  }
});

if (!Config.isLoggedIn()) {
  //inicioSecciones();
  //cargarUsuario();
  //cargarReservas();
  logoutSeccion();
}

document.querySelectorAll('.alert .btn-close').forEach(btn => {
  btn.addEventListener('click', () => {
    const alerta = btn.closest('.alert');
    alerta.classList.add('d-none');
    alerta.classList.remove('show');
  });
});