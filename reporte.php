<?php
// Archivo: descargar_reporte.php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Supongamos que obtienes los datos de los billetes desde el POST o la sesión
    $data = $_POST['data']; // Asegúrate de recibir los datos correctamente

    // Genera un archivo CSV con los datos
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment;filename=reporte.csv');
    $output = fopen('php://output', 'w');
    fputcsv($output, array('Billete', 'Cantidad'));
    foreach ($data as $billete => $cantidad) {
        fputcsv($output, array($billete, $cantidad));
    }
    fclose($output);
    exit();
}
?>
