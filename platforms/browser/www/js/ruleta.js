// Calculo de cuantos PI ocupara 
var alfa = 2*Math.PI/37; 
var radio = 140;


var y = 0;
var x = 0;
var alfaAnterior = 0;

// Creacion del canvas
var elemento = document.getElementById("canvas");
var lienzo = elemento.getContext("2d");  


var ruleta = new ruleta();


// function 
function ruleta(){
    limpiarCanvas();
    //crearCircunferencia();
    crearBordeNaranja();
    //printarRuleta();
    girar();
    printarNumerosRuleta();   
}

function crearCircunferencia(){
    // Creacion de la circunferencia
    lienzo.beginPath();
    lienzo.arc(200,250,radio,0,2*Math.PI);
    lienzo.stroke();  
}

function crearBordeNaranja(){
    // Borde naranja del tablero
    lienzo.beginPath();
    lienzo.arc(200,250,180,0,2*Math.PI);
    lienzo.lineWidth = 20;
    lienzo.strokeStyle = " #ffaf04";
    lienzo.stroke(); 
}

function printarRuleta(){ 
    // for para dividir 
    for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
       
        // Creacion del arco de cada celda
        lienzo.beginPath();
        lienzo.arc(200, 250, radio, alfaAnterior, alfa*numeroCeldas);
        
        lienzo.rotate(angulo);

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
}


function printarNumerosRuleta(){
    var arrayNumero = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,32,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
    //alert(arrayNumero[0]);
    
    alfaAnterior =0;

    // for para dividir 
    for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
        alfaAnterior = alfaAnterior + (alfa/2);
        
        y = Math.sin(alfaAnterior)*radio;
        x = Math.cos(alfaAnterior)*radio;

        // Creacion del arco de cada celda
        lienzo.beginPath();
        
        var xfinal = x+(200-5);
        var yfinal = y+(250+5);
        
        lienzo.fillStyle = 'white';
        lienzo.font = '20pt';
        lienzo.fillText( arrayNumero[numeroCeldas-1], xfinal , yfinal); 

        lienzo.stroke();
        alfaAnterior = alfa*numeroCeldas;
    }
}

function limpiarCanvas(){
    //lienzo.clearRect(0, 0, 400, 500);
    var anchura_canvas = $('#canvas').width();
    var altura_canvas = $('#canvas').height();

    lienzo.clearRect(0, 0, anchura_canvas, altura_canvas);
}


function girar(){
    var beta = 1;
    // for para dividir 
    for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
        // Creacion del arco de cada celda
        lienzo.beginPath();
        lienzo.arc(200, 250, radio, alfaAnterior, beta*numeroCeldas);
        
        // Eleccion del color
        if ( numeroCeldas == 1){
            lienzo.lineWidth = 20;
            lienzo.strokeStyle = "green";
        }
        else if ( ((numeroCeldas % 2) == 0) == true ){
            lienzo.lineWidth = 40;
            lienzo.strokeStyle = "red";
        }
        else{
            lienzo.lineWidth = 60;
            lienzo.strokeStyle = "black";
        }
     
        lienzo.stroke();
        alfaAnterior = beta*numeroCeldas;
    }
}




// =================================================    TIEMPO  ===============================================
var segundos = 60;
var minutos = 0;

inicio ();

function inicio () {
    control = setInterval(cronometro,1000);
}

function cronometro () { 
    if( segundos > 0){
        segundos--;
        if (segundos < 10) { segundos = "0"+segundos }
    }
    if (segundos == 0) {
        //segundos = 60;
        girarRuleta(); 
    }
    if (minutos > 0) {
        minutos--;
        if (minutos < 10) { minutos = "0"+minutos }
    }
        
    $('#labelTiempo').text("0"+minutos+":"+segundos);
}

function reinicio () {
    clearInterval(control);
    segundos = 60;
    minutos = 0;
    $('#labelTiempo').text("00:00");
}


// Una vez acabado el tiempo, se solicitara
function girarRuleta () {
    clearInterval(control);
    $('#labelTiempo').text("00:00");

    // Bloquear td's

    // Llamada al server para cambiar el estado

    // Llamada a girar ruleta

    // Llamada solicitar numero


}