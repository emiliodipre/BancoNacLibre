<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cajero_reportes";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    var_dump($_POST); 
    if (isset($_POST['tipo_reporte'])) {
        $tipo_reporte = $_POST['tipo_reporte'];
        $fecha = date("Y-m-d H:i:s"); 
        $detalle = "";

        
        switch ($tipo_reporte) {
            case '1':
                $detalle = "Reporte de transacciones del día";
                break;
            case '2':
                $detalle = "Reporte de intentos no autorizados";
                break;
            case '3':
                $detalle = "Cantidad de errores generados por día";
                break;
            default:
                echo "Tipo de reporte no válido.";
                exit;
        }

        
        $stmt = $conn->prepare("INSERT INTO reportes (tipo_reporte, fecha, detalle) VALUES (?, ?, ?)");
        $stmt->bind_param("iss", $tipo_reporte, $fecha, $detalle);

        if ($stmt->execute()) {
            echo "Reporte enviado correctamente.";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "No se recibió el tipo de reporte.";
    }
} else {
    echo "No se envió una solicitud POST.";
}

$conn->close();
?>
