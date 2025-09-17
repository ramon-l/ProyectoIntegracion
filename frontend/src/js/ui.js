const login_seccion = 'login-seccion';
const registrar_seccion = 'registrar-seccion';
const seccionLista = [login_seccion,registrar_seccion,'nav-seccion','nav-tabs-seccion'];

export const mostrarReserva = (reserva) => {
  const tbody = document.getElementById('reserva-body');
  const fila = document.createElement('tr');
  fila.innerHTML = `
    <td>${reserva.id}</td>
    <td>${reserva.nombre || reserva.title}</td>
    <td>${reserva.detalle || reserva.body}</td>
  `;
  tbody.appendChild(fila);
};

export const mostrarUsuario = (usuario) => {
  document.getElementById('nombre').value= usuario.nombre;
  document.getElementById('apellido').value= usuario.apellido;
  document.getElementById('correo').value= usuario.correo;
  document.getElementById('telefono').value= usuario.telefono;
};

export const mostrarModificarUsuario = (usuario) => {
  document.getElementById('nombreMod').value= document.getElementById('nombre').value;
  document.getElementById('apellidoMod').value= document.getElementById('apellido').value;
  document.getElementById('correoMod').value= document.getElementById('correo').value;
  document.getElementById('telefonoMod').value= document.getElementById('telefono').value;

  document.getElementById('mostrar-usuario').style.display = 'none';
  document.getElementById('modificar-usuario').style.display = 'block';
};

export const cancelarModificarUsuario = (usuario) => {
  document.getElementById('mostrar-usuario').style.display = 'block';
  document.getElementById('modificar-usuario').style.display = 'none';
};

export const ocultarLoading = () => {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';
};

export const inicioSeccion = () => {
  /**
    no hace nada por el momentto
  */
};

export const loginSeccion = () => {
  seccionLista.forEach(seccion => {
    document.getElementById(seccion).style.display = 'block';
  })
  document.getElementById('emailLogin').value = "";
  document.getElementById('passwordLogin').value = "";
  document.getElementById(seccionLista[0]).style.display = 'none';
  document.getElementById(seccionLista[1]).style.display = 'none';
};

export const logoutSeccion = () => {
  seccionLista.forEach(seccion => {
    document.getElementById(seccion).style.display = 'none';
  })
  document.getElementById(seccionLista[0]).style.display = 'block';
};

export const registrarseSeccion = () => {
  seccionLista.forEach(seccion => {
    document.getElementById(seccion).style.display = 'none';
  })
  document.getElementById(seccionLista[1]).style.display = 'block';
};

export const mostrarAlerta = (tipo, mensaje) => {
  // Ocultar todas las alertas primero
  document.querySelectorAll('.alert').forEach(alert => {
    alert.classList.add('d-none');
    alert.classList.remove('show');
  });

  let alerta;
  if (tipo === 'success') {
    alerta = document.getElementById('alertSuccess');
    alerta.querySelector('#mensaje').innerHTML = mensaje;
  } else if (tipo === 'warning') {
    alerta = document.getElementById('alertWarning');
    alerta.querySelector('#mensaje').innerHTML = mensaje;
  } else if (tipo === 'error') {
    alerta = document.getElementById('alertError');
    alerta.querySelector('#mensaje').innerHTML = mensaje;
  }

  if (alerta) {
    alerta.classList.remove('d-none');
    alerta.classList.add('show');
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      alerta.classList.add('d-none');
      alerta.classList.remove('show');
    }, 3000);
  }
};

// Función para mostrar/ocultar Block UI
export const mostrarBlockUI = () => {
  const blockUI = document.getElementById('blockUI');
  blockUI.classList.remove('d-none');
  setTimeout(() => {// Ejemplo: Ocultar después de 5 segundos
    blockUI.classList.add('d-none');
  }, 5000);
}