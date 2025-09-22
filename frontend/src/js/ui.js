//import { obtenerAllMesas } from "./services";

const login_seccion = 'login-seccion';
const registrar_seccion = 'registrar-seccion';
const seccionLista = [login_seccion, registrar_seccion, 'nav-seccion', 'nav-tabs-seccion'];
const ciudadesCentral = ['AREGUÁ', 'CAPIATÁ', 'FERNANDO DE LA MORA', 'GUARAMBARÉ', 'ITÁ', 'ITAUGUÁ',
  'J. AUGUSTO SALDÍVAR', 'LAMBARÉ', 'LIMPIO', 'LUQUE', 'MARIANO ROQUE ALONSO', 'ÑEMBY',
  'SAN ANTONIO', 'SAN LORENZO', 'VILLAELISA', 'VILLETA', 'YPACARAI', 'YPANÉ']

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

export const listarReservas = (reservas, isAdmin, actEstadoReserva) => {
  console.log(typeof isAdmin);
  if (!!reservas && reservas.length > 0) {
    const thead = document.getElementById('reservas-head');
    const tbody = document.getElementById('reservas-body');
    thead.innerHTML = "";
    tbody.innerHTML = "";
    if (isAdmin == "true") {
      const cabecera = document.createElement('tr');
      thead.innerHTML = `<th>Fecha Reserva</th>
                    <th>Hora Inicio</th>
                    <th>Hora Fin</th>
                    <th>Estado</th>
                    <th>Cantidad</th>
                    <th>fecha Solicitado</th>
                    <th>Capacidad mesa</th>
                    <th>Usuario</th>
                    <th>Accion</th>`;
      thead.appendChild(cabecera);
      reservas.forEach(reserva => {
        const fila = document.createElement('tr');
        fila.className = "text-center";
        fila.innerHTML = `<td>${new Date(reserva.fechaReserva).toLocaleDateString()}</td>
        <td>${new Date(reserva.horaInicioReserva).toLocaleTimeString()}</td>
        <td>${new Date(reserva.horaFinReserva).toLocaleTimeString()}</td>
        <td>${reserva.estadoReserva}</td>
        <td>${reserva.cantidadPersonas}</td>
        <td>${new Date(reserva.fechaSolicitado).toLocaleDateString()}</td>
        <td>${reserva.mesa.capacidad}</td>
        <td>${reserva.usuario.nombre}</td>`;

        // Crear la celda con los botones
        const tdAcciones = document.createElement('td');
        const divAcciones = document.createElement('div');
        if (reserva.estadoReserva == 'PENDIENTE') {
          // Crear el botón Rechazar
          const btnRechazar = document.createElement('button');
          btnRechazar.classList.add('btn', 'btn-outline-danger', 'fw-bold', 'btn-sm');
          btnRechazar.textContent = 'Rechazar';
          btnRechazar.onclick = () => actEstadoReserva(reserva.id, false);
          // Crear el botón Confirmar
          const btnConfirmar = document.createElement('button');
          btnConfirmar.classList.add('btn', 'btn-outline-success', 'fw-bold', 'btn-sm', 'ms-2');
          btnConfirmar.textContent = 'Confirmar';
          btnConfirmar.onclick = () => actEstadoReserva(reserva.id, true);

          // Agregar los botones a la div
          divAcciones.appendChild(btnRechazar);
          divAcciones.appendChild(btnConfirmar);
        }
        // Agregar la div a la celda de acciones
        tdAcciones.appendChild(divAcciones);
        fila.appendChild(tdAcciones);

        tbody.appendChild(fila);

      });
    } else {
      const cabecera = document.createElement('tr');
      cabecera.className = "text-center";
      cabecera.innerHTML = `
                    <th>Fecha Reserva</th>
                    <th>Hora Inicio</th>
                    <th>Hora Fin</th>
                    <th>Estado</th>
                    <th>Cantidad</th>
                    <th>fecha Solicitado</th>
                    <th>Capacidad mesa</th>
                    <th>Accion</th>`;
      thead.appendChild(cabecera);
      reservas.forEach(reserva => {
        const fila = document.createElement('tr');
        fila.className = "text-center";
        fila.innerHTML = `<td>${new Date(reserva.fechaReserva).toLocaleDateString()}</td>
        <td>${new Date(reserva.horaInicioReserva).toLocaleTimeString()}</td>
        <td>${new Date(reserva.horaFinReserva).toLocaleTimeString()}</td>
        <td>${reserva.estadoReserva}</td>
        <td>${reserva.cantidadPersonas}</td>
        <td>${new Date(reserva.fechaSolicitado).toLocaleDateString()}</td>
        <td>${reserva.mesa.capacidad}</td>`;

        // Crear la celda con los botones
        const tdAcciones = document.createElement('td');
        const divAcciones = document.createElement('div');
        if (reserva.estadoReserva == 'PENDIENTE' ||
          (reserva.estadoReserva == 'CONFIRMADO' &&
            (new Date(reserva.fechaReserva).toLocaleDateString() >= (new Date()).toLocaleDateString()))) {
          // Crear el botón Cancelar
          const btnCancelar = document.createElement('button');
          btnCancelar.classList.add('btn', 'btn-outline-danger', 'fw-bold', 'btn-sm', 'ms-2');
          btnCancelar.textContent = 'Cancelar';
          btnCancelar.onclick = () => actEstadoReserva(reserva.id, false);
          // Agregar los botones a la div
          divAcciones.appendChild(btnCancelar);
          // Agregar la div a la celda de acciones
          tdAcciones.appendChild(divAcciones);
        }
        if (reserva.estadoReserva == 'PENDIENTE') {
          // Crear el botón Confirmar
          const btnConfirmar = document.createElement('button');
          btnConfirmar.classList.add('btn', 'btn-outline-primary', 'fw-bold', 'btn-sm', 'ms-2');
          btnConfirmar.textContent = 'Modificar';
          btnConfirmar.onclick = () => actEstadoReserva(reserva.id, true);
          // Agregar los botones a la div
          divAcciones.appendChild(btnConfirmar);
          // Agregar la div a la celda de acciones
          tdAcciones.appendChild(divAcciones);
        }
        fila.appendChild(tdAcciones);

        tbody.appendChild(fila);

      });
    }
  } else {
    const mensaje = document.getElementById('mjeMesa');
    mensaje.className = "text-center";
    mensaje.innerHTML = "Sin datos";
  }
};

export const listarCiudadesCentral = () => {
  const selectElement = document.getElementById('selectCiudades');

  selectElement.innerHTML = "";

  ciudadesCentral.forEach(ciudad => {
    const option = document.createElement('option');
    option.value = ciudad;
    option.textContent = ciudad;

    selectElement.appendChild(option);
  });
};

export const listarMesasSelect = (mesas) => {
  const selectElement = document.getElementById('mesaCrearReserva');

  selectElement.innerHTML = "";

  mesas.data.forEach(mesa => {
    const option = document.createElement('option');
    option.value = mesa.id;
    option.textContent = `Nro mesa: ${mesa.numeroMesa} - Capacidad: ${mesa.capacidad} - Ubicacion: ${mesa.ubicacion}`;

    selectElement.appendChild(option);
  });
};

export const obtenerReservaCreacion = (userId) => {
  const idMesa = document.getElementById('mesaCrearReserva').value;
  const fechaReserva = document.getElementById('fechaReserva').value;
  const horaInicioReserva = document.getElementById('horaInicioReserva').value;
  const horaFinReserva = document.getElementById('horaFinReserva').value;
  const cantidadPersonas = document.getElementById('cantidadReserva').value;
  const idUsuario = userId;

  return {fechaReserva, horaInicioReserva, horaFinReserva, cantidadPersonas,idMesa, idUsuario };
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

export const mesaSeccion = () => {
  document.getElementById('mostrar-mesas').style.display = 'none';
  document.getElementById('mostrar-mesa-paginado').style.display = 'none';
  document.getElementById('btn-agregar-mesa').style.display = 'none';
  document.getElementById('modificar-mesa').style.display = 'none';
  document.getElementById('crear-mesa').style.display = 'block';
};

export const reservaCrearSeccion = () => {
  document.getElementById('mostrar-reserva').style.display = 'none';
  document.getElementById('mostrar-reserva-paginado').style.display = 'none';
  document.getElementById('btn-agregar-reserva').style.display = 'none';
  document.getElementById('modificar-reserva').style.display = 'none';
  document.getElementById('crear-reserva').style.display = 'block';
};

export const cancelarReserva = () => {
  document.getElementById('mostrar-reserva').style.display = 'block';
  document.getElementById('mostrar-reserva-paginado').style.display = 'block';
  document.getElementById('btn-agregar-reserva').style.display = 'block';
  document.getElementById('modificar-reserva').style.display = 'none';
  document.getElementById('crear-reserva').style.display = 'none';
};

// Enlace externo 
export const getDatosClima = () => {
  let ciudad = document.getElementById("selectCiudades").value;
  let fecha = document.getElementById("fechaClima").value;
  return { ciudad, fecha };
};

export const mostrarClima = (data) => {
  document.getElementById("span-clima").innerHTML =
    `<span><hr>
    <b>Fecha:</b> ${data.date} 📅<br>
    <b>Ubicacion:</b> ${data.location} 📍<br>
    <b>Precipitacion:</b> ${data.precipitation} % 🌧️<br>
    <b>Temperatura Máxima:</b> ${data.tmax} ☀️<br>
    <b>Temperatura Mínima:</b> ${data.tmin} ❄️</span>
    `;
};

export const limpiarDatosClima = () => {
  listarCiudadesCentral();
  document.getElementById("fechaClima").value = "";
  document.getElementById("span-clima").innerHTML = "";
};

export const mostrarMjeClima = (mje) => {
  const div = document.getElementById("span-clima");
  div.innerHTML = "";
  const span = document.createElement('span');
  span.className = 'text-danger';
  span.innerText = mje;
  div.appendChild(span);
  setTimeout(() => {
    div.innerHTML = "";
  }, 3500);
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
  }, 2500);
};

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
