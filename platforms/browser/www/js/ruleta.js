// VARIABLES INICIALIZADAS
var alfa = 2*Math.PI/37;    // Calculo de cuantos PI ocupara 
var radio = 140;
var numeroApuntado;
var y = 0;
var x = 0;
var alfaAnterior = 0;
var alfaAnteriorLetras = 0;
var angulo = 0;
var id_accion = -1;

// Creacion del canvas
var elemento = document.getElementById("canvas");
var lienzo = elemento.getContext("2d");  


ruleta();



// ============================================ Ruleta =========================================

// Funcion que se encarga de 
$( "td" ).click(function(e) {   


    // insercion de la ficha
    $("#"+this.id).empty();
    $("#"+this.id).append('<img class="ficha" src="img/ficha_amarillo.png"></img>');
    
    alert(this.id);
    alert($('#'+this.id).attr('class'));

    /*
    $.ajax({
        type : "GET",
        url : "https://appcasino.herokuapp.com/api/apostar/"+localStorage.getItem('id_partida')+"/"+localStorage.getItem('token')+"/"+creditos+"/"++"/"+$('creditos').text(),     

        success: function(respuesta){
            respuesta = JSON.parse(respuesta);

            if( respuesta[0].status == 'ok' ){
                localStorage.setItem('creditos', respuesta[0].creditos);
                $('#creditosUsuario').text(localStorage.getItem('creditos'));
            }
        },
        error: function(respuesta){
            alert( "erroor login ----> " + JSON.stringify(respuesta) );
        } 
    });
    */
    
});







// function 
function ruleta(){
    id_accion = setInterval(animacionGiro, 10);
}

function animacionGiro(){
    limpiarCanvas();
    crearBordeNaranja();
    triangulo(); 
    angulo = angulo - 0.017;
    girar(angulo);
    triangulo();
}

function triangulo(){
    lienzo.beginPath();
    lienzo.moveTo(180, 40);
    lienzo.lineTo(180, 40);
    lienzo.lineTo(200, 80);
    
    lienzo.moveTo(220, 40);
    lienzo.lineTo(220, 40);
    lienzo.lineTo(200, 80);

    lienzo.moveTo(180, 40);
    lienzo.lineTo(180, 40);
    lienzo.lineTo(220, 40);
    lienzo.lineWidth = 1;
    lienzo.fillStyle = "#ffaf04";
    lienzo.stroke(); 
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


function girar(beta, numeroGanador){
    var arrayNumero = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,32,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
    alfaAnterior = beta;
    alfaAnteriorLetras = beta;

    // for para dividir la circunferencia en 37 porciones
    for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
        
        // Creacion del arco de cada celda
        lienzo.beginPath();
        lienzo.arc(200, 250, radio, alfaAnterior, (alfa*numeroCeldas)+beta );

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

        alfaAnteriorLetras = alfaAnteriorLetras + (alfa/2);
        y = Math.sin(alfaAnteriorLetras)*radio;
        x = Math.cos(alfaAnteriorLetras)*radio;

        // Creacion del arco de cada celda
        lienzo.beginPath();

        var xfinal = x+(200-5);
        var yfinal = y+(250+5);

        lienzo.fillStyle = 'white';
        lienzo.font = '20pt';
        lienzo.fillText( arrayNumero[numeroCeldas-1], xfinal , yfinal);
        
        // if para obtener los numeros que estan en el puntero y comparar si estan en el punto de arriba              // 4.71 punto centrico de la circunferencia
        if( (4.71 >= alfaAnterior && 4.71 <= ((alfa*numeroCeldas)+beta)) || (-1.57 >= alfaAnterior && -1.57 <= ((alfa*numeroCeldas)+beta))==true ){
            
            // si el numero ganador es el mismo que el que esta arriba del todo.. 
            if ( (numeroGanador == arrayNumero[numeroCeldas-1]) == true ){
                //alert("->22");
                clearInterval(id_accion);
            }
        }

        lienzo.stroke();
        alfaAnterior = (alfa*numeroCeldas)+beta;
        alfaAnteriorLetras = (alfa*numeroCeldas)+beta;
    }
}


function limpiarCanvas(){
    //lienzo.clearRect(0, 0, 400, 500);
    var anchura_canvas = $('#canvas').width();
    var altura_canvas = $('#canvas').height();
    lienzo.clearRect(0, 0, anchura_canvas, altura_canvas);
}


// =================================================    TIEMPO  ===============================================
var segundos = 60;
var minutos = 0;

inicio();

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









/*

function printarRuleta(){ 
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


function girar(beta){
    alfaAnterior = beta;
    
    // for para dividir 
    for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
        
        // Creacion del arco de cada celda
        lienzo.beginPath();
        lienzo.arc(200, 250, radio, alfaAnterior, (alfa*numeroCeldas)+beta );

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
        alfaAnterior = (alfa*numeroCeldas)+beta;
    }

    printarNumerosRuleta(beta);
}

function printarNumerosRuleta(beta){
    var arrayNumero = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,32,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
    //alert(arrayNumero[0]);
    
    alfaAnterior = beta;

    // for para dividir 
    for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
        alfaAnterior = alfaAnterior + (alfa/2);
        
        alert("alfaAnterior: "+alfaAnterior + ", alfa: "+ alfa );

        y = Math.sin(alfaAnterior)*radio;
        x = Math.cos(alfaAnterior)*radio;

        // Creacion del arco de cada celda
        lienzo.beginPath();

        //alert( alfaAnterior );
        
        var xfinal = x+(200-5);
        var yfinal = y+(250+5);
        
        lienzo.fillStyle = 'white';
        lienzo.font = '20pt';
        lienzo.fillText( arrayNumero[numeroCeldas-1], xfinal , yfinal); 

        lienzo.stroke();
        alfaAnterior = (alfa*numeroCeldas)+beta;
    }
}
*/
