//import { obtenerAllMesas } from "./services";

const login_seccion = 'login-seccion';
const registrar_seccion = 'registrar-seccion';
const seccionLista = [login_seccion, registrar_seccion, 'nav-seccion', 'nav-tabs-seccion'];
let currentPage = 1;
const pageSize = 10;

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

// Sección de Usuarios
export const mostrarUsuario = (usuario) => {
  document.getElementById('nombre').value = usuario.nombre;
  document.getElementById('apellido').value = usuario.apellido;
  document.getElementById('correo').value = usuario.correo;
  document.getElementById('telefono').value = usuario.telefono;
};

export const mostrarModificarUsuario = (usuario) => {
  document.getElementById('nombreMod').value = document.getElementById('nombre').value;
  document.getElementById('apellidoMod').value = document.getElementById('apellido').value;
  document.getElementById('correoMod').value = document.getElementById('correo').value;
  document.getElementById('telefonoMod').value = document.getElementById('telefono').value;

  document.getElementById('mostrar-usuario').style.display = 'none';
  document.getElementById('modificar-usuario').style.display = 'block';
};

export const cancelarModificarUsuario = (usuario) => {
  document.getElementById('mostrar-usuario').style.display = 'block';
  document.getElementById('modificar-usuario').style.display = 'none';
};

export const obtenerRegistroCreacion = () => {
  const nombre = document.getElementById('nombreRegistro').value;
  const apellido = document.getElementById('apellidoRegistro').value;
  const telefono = document.getElementById('telefonoRegistro').value;
  const correo = document.getElementById('emailRegistro').value;
  const password = document.getElementById('passwordRegistro').value;
  const rolId = document.getElementById('rolRegistro').value;

  return { nombre, apellido, telefono, correo, password, rolId };
};

export const obtenerRegistroModificado = () => {
  const nombre = document.getElementById('nombreMod').value;
  const apellido = document.getElementById('apellidoMod').value;
  const telefono = document.getElementById('telefonoMod').value;
  const correo = document.getElementById('correoMod').value;

  return { nombre, apellido, telefono, correo };
};

//Mesas
export const listarMesas = (mesas, rolId, modMesas, delMesas) => {
  console.log(mesas);
  if (!!mesas && mesas.length > 0) {
    const tbody = document.getElementById('mesas-body');
    tbody.innerHTML = "";
    mesas.forEach(mesa => {
      const fila = document.createElement('tr');
      fila.className = "text-center";
      fila.innerHTML =
        `<td>${mesa.numeroMesa}</td>
        <td>${mesa.capacidad}</td>
        <td>${mesa.ubicacion}</td>
        <td>${mesa.estado}</td>`;
      // Crear la celda con los botones
      const tdAcciones = document.createElement('td');
      const divAcciones = document.createElement('div');
      // Crear el botón Eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-outline-danger', 'fw-bold', 'btn-sm');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.onclick = () => delMesas(mesa.id);
      // Crear el botón Modificar
      const btnModificar = document.createElement('button');
      btnModificar.classList.add('btn', 'btn-outline-primary', 'fw-bold', 'btn-sm', 'ms-2');
      btnModificar.textContent = 'Modificar';
      btnModificar.onclick = () => modMesas(mesa.id, btnModificar);

      // Agregar los botones a la div
      divAcciones.appendChild(btnEliminar);
      divAcciones.appendChild(btnModificar);

      // Agregar la div a la celda de acciones
      tdAcciones.appendChild(divAcciones);
      fila.appendChild(tdAcciones);

      tbody.appendChild(fila);

    });
  } else {
    const mensaje = document.getElementById('mjeMesa');
    mensaje.className = "text-center";
    mensaje.innerHTML = "Sin datos";
  }
};
fechaReserva, horaInicioReserva, horaFinReserva, estadoReserva,
  cantidadPersonas, fechaSolicitado, idMesa, idUsuario, idAdmin
export const listarReservas = (reservas, rolId, modMesas, delMesas) => {
  console.log(reservas);
  if (!!reservas && reservas.length > 0) {
    const tbody = document.getElementById('reservas-body');
    tbody.innerHTML = "";
    reservas.forEach(reserva => {
      const fila = document.createElement('tr');
      fila.className = "text-center";
      fila.innerHTML =
        `<td>${reserva.fechaReserva}</td>
        <td>${reserva.horaInicioReserva}</td>
        <td>${reserva.horaFinReserva}</td>
        <td>${reserva.estadoReserva}</td>
        <td>${reserva.cantidadPersonas}</td>
        <td>${reserva.fechaSolicitado}</td>
        <td>${reserva.idMesa}</td>
        <td>${reserva.idUsuario}</td>
        <td>${reserva.idAdmin}</td>`;
      // Crear la celda con los botones
      const tdAcciones = document.createElement('td');
      const divAcciones = document.createElement('div');
      // Crear el botón Eliminar
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-outline-danger', 'fw-bold', 'btn-sm');
      btnEliminar.textContent = 'Rechazar';
      btnEliminar.onclick = () => delMesas(reserva.id);
      // Crear el botón Modificar
      const btnModificar = document.createElement('button');
      btnModificar.classList.add('btn', 'btn-outline-success', 'fw-bold', 'btn-sm', 'ms-2');
      btnModificar.textContent = 'Confirmar';
      btnModificar.onclick = () => modMesas(reserva.id, btnModificar);

      // Agregar los botones a la div
      divAcciones.appendChild(btnEliminar);
      divAcciones.appendChild(btnModificar);

      // Agregar la div a la celda de acciones
      tdAcciones.appendChild(divAcciones);
      fila.appendChild(tdAcciones);

      tbody.appendChild(fila);

    });
  } else {
    const mensaje = document.getElementById('mjeMesa');
    mensaje.className = "text-center";
    mensaje.innerHTML = "Sin datos";
  }
};
export const obtenerMesaCreacion = () => {
  const numeroMesa = document.getElementById('nroMesa').value;
  const capacidad = document.getElementById('capacidad').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const estado = document.getElementById('estado').value;

  return { numeroMesa, capacidad, ubicacion, estado };
};

export const obtenerMesaModificada = () => {
  const id = document.getElementById('mesaIdMod').value;
  const numeroMesa = document.getElementById('nroMesaMod').value;
  const capacidad = document.getElementById('capacidadMod').value;
  const ubicacion = document.getElementById('ubicacionMod').value;
  const estado = document.getElementById('estadoMod').value;

  return { id, numeroMesa, capacidad, ubicacion, estado };
};

export const cancelarMesa = (usuario) => {
  document.getElementById('mostrar-mesas').style.display = 'block';
  document.getElementById('mostrar-mesa-paginado').style.display = 'block';
  document.getElementById('btn-agregar-mesa').style.display = 'block';
  document.getElementById('modificar-mesa').style.display = 'none';
  document.getElementById('crear-mesa').style.display = 'none';
};

export const mostrarModificarMesa = (Id, mesa) => {
  document.getElementById('mesaIdMod').value = Id;
  document.getElementById('nroMesaMod').value = mesa.numeroMesa;
  document.getElementById('capacidadMod').value = mesa.capacidad;
  document.getElementById('ubicacionMod').value = mesa.ubicacion;
  document.getElementById('estadoMod').value = mesa.estado;

  document.getElementById('mostrar-mesas').style.display = 'none';
  document.getElementById('mostrar-mesa-paginado').style.display = 'none';
  document.getElementById('btn-agregar-mesa').style.display = 'none';
  document.getElementById('modificar-mesa').style.display = 'block';
};

export const mesaSeccion = (usuario) => {
  document.getElementById('mostrar-mesas').style.display = 'none';
  document.getElementById('mostrar-mesa-paginado').style.display = 'none';
  document.getElementById('btn-agregar-mesa').style.display = 'none';
  document.getElementById('modificar-mesa').style.display = 'none';
  document.getElementById('crear-mesa').style.display = 'block';
};

// Enlace externo 
export const mostrarClima = (data) => {
  document.getElementById("span-clima").innerText =
    `fecha: ${data.date} 📅,
      ubicacion: ${data.location} 📍,
      Precipitacion: ${data.precipitation} % 🌧️,
      temperatura máxima: ${data.tmax} ☀️,
      temperatura mínima: ${data.tmin} ❄️,
    `;
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

//Manejo de pantallas
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

// Alertas y spinner
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

//Paginacion

export const renderPagination = (paginationInfo, elementId, function_) => {
  const ul = document.getElementById(elementId);
  ul.innerHTML = '';

  const { currentPage, totalPag } = paginationInfo;

  // Botón Anterior
  const prev = document.createElement('li');
  prev.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  prev.innerHTML = `<a class="page-link" href="#">Anterior</a>`;
  prev.onclick = () => function_(currentPage - 1);
  ul.appendChild(prev);

  // Botones numéricos
  for (let i = 1; i <= totalPag; i++) {
    const li = document.createElement('li');
    li.className = `page-item ${i === currentPage ? 'active' : ''}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = () => function_(i);
    ul.appendChild(li);
  }

  // Botón Siguiente
  const next = document.createElement('li');
  next.className = `page-item ${currentPage === totalPag ? 'disabled' : ''}`;
  next.innerHTML = `<a class="page-link" href="#">Siguiente</a>`;
  next.onclick = () => function_(currentPage + 1);
  ul.appendChild(next);
}
