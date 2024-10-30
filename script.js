let datosBilletes = {};

// Validar usuario y mostrar menú
function validarUsuario() {
    const password = $('#password').val();
    if (password === 'admin') {
        $('#validacion').hide();
        mostrarSeccion('recoleccion-datos'); // Avanzar automáticamente a la primera sección
    } else {
        alert('Contraseña incorrecta');
    }
}

// Mostrar la sección seleccionada
function mostrarSeccion(seccionId) {
    ocultarSecciones();  // Ocultar todas las secciones
    $(`#${seccionId}`).show();  // Mostrar solo la sección seleccionada
    
    if (seccionId === 'generacion-reportes') {
        generarReporte();  // Generar el reporte si es la sección de reportes
    }
}

// Ocultar todas las secciones
function ocultarSecciones() {
    const secciones = ['menu-principal', 'recoleccion-datos', 'generacion-reportes', 'notificacion-cierre', 'cierre-seccion'];
    secciones.forEach(seccion => $(`#${seccion}`).hide());
}

// Guardar los datos ingresados y avanzar automáticamente a la generación de reportes
function guardarDatos() {
    datosBilletes = {
        billete100: parseInt($('#billete100').val()) || 0,
        billete200: parseInt($('#billete200').val()) || 0,
        billete500: parseInt($('#billete500').val()) || 0,
        billete1000: parseInt($('#billete1000').val()) || 0,
        billete2000: parseInt($('#billete2000').val()) || 0,
    };

    if (Object.values(datosBilletes).some(val => val > 0)) {
        alert('Datos guardados correctamente.');
        mostrarSeccion('generacion-reportes'); // Avanzar automáticamente a la sección de generación de reportes
    } else {
        alert('Debe ingresar al menos una cantidad de billetes.');
    }
}

// Generar el reporte y mostrar el botón "Continuar"
function generarReporte() {
    let listaReporte = $('#reporte-total');
    listaReporte.empty();  // Limpiar la lista antes de generar el reporte

    if (Object.values(datosBilletes).some(val => val > 0)) {
        for (const [billete, cantidad] of Object.entries(datosBilletes)) {
            listaReporte.append(`<li class="list-group-item">Total ${billete.replace('billete', '$')}: ${cantidad}</li>`);
        }
        
        // Mostrar el botón "Continuar" para avanzar a la siguiente sección
        $('#btn-continuar').show();
    } else {
        alert('No hay datos para generar el reporte.');
        mostrarSeccion('recoleccion-datos'); // Volver a recolección si no hay datos
    }
}

// Función que se ejecuta al hacer clic en el botón "Continuar"
function continuarANotificacion() {
    mostrarSeccion('notificacion-cierre');
}

// Enviar reporte y mostrar mensaje
function enviarReporte() {
    // Obtener los elementos del DOM
    const loader = document.getElementById('loader');
    const mensajeReporte = document.getElementById('mensaje-reporte');

    // Inicialmente, ocultar tanto el loader como el mensaje
    loader.style.display = 'none';
    mensajeReporte.style.display = 'none';

    // Mostrar el loader al hacer clic en el botón (indicando que se está procesando)
    loader.style.display = 'block';

    // Simular el envío del reporte 
    setTimeout(() => {
        // Aquí iría el código para enviar el reporte a el servidor 

        // Ocultar el loader y mostrar el mensaje de éxito
        loader.style.display = 'none';
        mensajeReporte.textContent = "Reporte enviado con éxito.";
        mensajeReporte.style.display = 'block';
    }, 3000); // tiempo de espera
}


// Descargar reporte (simulación)
function descargarReporte() {
    // Obtener los datos de los billetes
    const datos = {
        billete100: $('#billete100').val(),
        billete200: $('#billete200').val(),
        billete500: $('#billete500').val(),
        billete1000: $('#billete1000').val(),
        billete2000: $('#billete2000').val(),
    };

    // Enviar los datos al servidor PHP
    $.ajax({
        url: 'guardar_reporte.php', // Ajusta la ruta a tu archivo PHP
        type: 'POST',
        data: { datos: JSON.stringify(datos) },
        xhrFields: {
            responseType: 'blob' // Necesario para manejar la respuesta como un archivo
        },
        success: function(data) {
            // Crear un enlace para descargar el archivo
            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte.pdf'; // Nombre del archivo a descargar
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Liberar el objeto URL
        },
        error: function() {
            alert('Error al generar el reporte.');
        }
    });
}



// Cerrar la sección
function cerrarSeccion() {
    alert('Sección cerrada.');
    location.reload(); // Recargar la página para reiniciar el proceso
}


