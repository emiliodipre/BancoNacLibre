<?php
require 'fpdf/fpdf.php';

// Recibir datos del formulario
$datos = json_decode($_POST['datos'], true);

// Crear el XML
$xml = new SimpleXMLElement('<reporte></reporte>');
$billetes = $xml->addChild('billetes');
foreach ($datos as $billete => $cantidad) {
    $billeteElement = $billetes->addChild('billete');
    $billeteElement->addAttribute('valor', str_replace('billete', '', $billete)); // Quitar 'billete' del atributo
    $billeteElement->addAttribute('cantidad', $cantidad);
}

// Crear el PDF
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Cell(40, 10, 'Reporte de Billetes');
$pdf->Ln();

// Agregar contenido del XML al PDF
foreach ($xml->billetes->billete as $billete) {
    $pdf->Cell(40, 10, 'Billete: $' . $billete['valor']);
    $pdf->Cell(40, 10, 'Cantidad: ' . $billete['cantidad']);
    $pdf->Ln();
}

// Salida del PDF
header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="reporte.pdf"');
$pdf->Output('D'); // 'D' para descargar el PDF
?>
