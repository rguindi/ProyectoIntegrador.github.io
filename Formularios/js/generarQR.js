document.addEventListener('DOMContentLoaded', function(event) {
    event.preventDefault();
    console.log("El DOM ha sido completamente cargado.");

    document.getElementById('formularioEquipos').addEventListener('submit', function(event) {
        event.preventDefault(); 
        
     
        var numeroSerie = document.getElementById('numero_de_serie').value;
        
       
        if (numeroSerie.trim() === '') {
            document.getElementById('error_numero_de_serie').textContent = 'El número de serie es obligatorio.';
            return;
        }
        
   
        document.getElementById('error_numero_de_serie').textContent = '';
        
   
        var qr = qrcode(0, 'M');
        qr.addData(numeroSerie);
        qr.make();
        
    
        document.getElementById('codigoQR').innerHTML = qr.createImgTag(5); // 5 es el tamaño del código QR
        

    });
});

