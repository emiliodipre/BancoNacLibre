
const reportTransacciones = document.getElementById('report-transacciones');
const reportSeguridad = document.getElementById('report-seguridad');
const reportErrores = document.getElementById('report-error');


const transaccionesForm = document.getElementById('transacciones-form');
const seguridadForm = document.getElementById('seguridad-form');
const erroresForm = document.getElementById('errores-form');


const enviarTransacciones = document.getElementById('enviarTransacciones');
const enviarSeguridad = document.getElementById('enviarSeguridad');
const enviarErrores = document.getElementById('enviarErrores');


const reporteForm = document.getElementById('reporteForm');
const tipoReporteInput = document.getElementById('tipo_reporte');


function ocultarFormularios() {
  transaccionesForm.style.display = 'none';
  seguridadForm.style.display = 'none';
  erroresForm.style.display = 'none';
}

reportTransacciones.addEventListener('click', function() {
  ocultarFormularios();
  transaccionesForm.style.display = 'block';
  tipoReporteInput.value = '1';  
});

reportSeguridad.addEventListener('click', function() {
  ocultarFormularios();
  seguridadForm.style.display = 'block';
  tipoReporteInput.value = '2';  
});

reportErrores.addEventListener('click', function() {
  ocultarFormularios();
  erroresForm.style.display = 'block';
  tipoReporteInput.value = '3';  
});

enviarTransacciones.addEventListener('click', function() {
  reporteForm.submit();
});

enviarSeguridad.addEventListener('click', function() {
  reporteForm.submit();
});

enviarErrores.addEventListener('click', function() {
  reporteForm.submit();
});
