// Calculo de cuantos PI ocupara 
var alfa = 2*Math.PI/37; // 0,17
var radio = 140;

// Creacion del canvas
var elemento = document.getElementById("canvas");
var lienzo = elemento.getContext("2d");  

// Creacion de la circunferencia
lienzo.beginPath();
lienzo.arc(200,250,radio,0,2*Math.PI);
lienzo.stroke();  

// Borde naranja del tablero
lienzo.beginPath();
lienzo.arc(200,250,180,0,2*Math.PI);
lienzo.lineWidth = 30;
lienzo.strokeStyle = " #ffaf04";
lienzo.stroke(); 

// Variables alfa, y, x
var alfaAnterior = 0;
var y = 0;
var x = 0;

// for para dividir 
for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
   
    // Creacion del arco de cada celda
    lienzo.beginPath();
    lienzo.arc(200, 250, radio, alfaAnterior, alfa*numeroCeldas);
    
    // Eleccion del color
    if ( numeroCeldas == 1){
        lienzo.lineWidth = 80;
        lienzo.strokeStyle = "green";
    }
    else if ( ((numeroCeldas % 2) == 0) == true ){
        lienzo.lineWidth = 80;
        lienzo.strokeStyle = "red";
    }
    else{
        lienzo.lineWidth = 80;
        lienzo.strokeStyle = "black";
    }
 
    lienzo.stroke();
    alfaAnterior = alfa*numeroCeldas;
}

// Variables alfa, y, x
alfaAnterior =0;

// for para dividir 
for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
    alfaAnterior = alfaAnterior + (alfa/2);
    y = Math.sin(alfaAnterior)*radio;
    x = Math.cos(alfaAnterior)*radio;

    // Creacion del arco de cada celda
    lienzo.beginPath();
    //lienzo.arc(200, 250, radio, alfaAnterior, alfa*numeroCeldas);
    var xfinal = x+(200-5);
    var yfinal = y + (250+5);
    
    lienzo.fillStyle = 'white';
    lienzo.font = '20pt';
    lienzo.fillText( numeroCeldas, xfinal , yfinal); 

    //lienzo.rotate(1*Math.PI/180);       
    
    lienzo.stroke();
    alfaAnterior = alfa*numeroCeldas;
}