$arrayNumerosRuletaColores = { 0:'verde',32:'rojo',15:'negro',19:'rojo',4:'negro',21:'rojo',2:'negro',25:'rojo',17:'negro',34:'rojo',6:'negro',27:'rojo',13:'negro',36:'rojo',11:'negro',30:'rojo',8:'negro',32:'rojo',10:'negro',5:'rojo',24:'negro',16:'rojo',33:'negro',1:'rojo',20:'negro',14:'rojo',31:'negro',9:'rojo',22:'rojo',18:'rojo',29:'negro',7:'rojo',28:'negro',12:'rojo',35:'negro',3:'rojo',26:'negro'};

// VARIABLES INICIALIZADAS
var alfa = 2*Math.PI/37;    // Calculo de cuantos PI ocupara 
var radio = 140;
var beta;

var y = 0;
var x = 0;
var alfaAnterior = 0;
var alfaAnteriorLetras = 0;

// Intervalos
var id_accion = -1;
var control = -1;
var id_test_tirar = -1;

// Numero premiado
var numeroGanador = -1;

// Angulos
var angulo = 0;
var nuevoAngulo = -1;

// Variables cronometro
var segundos = 15;
var minutos = 0;

// Creacion del canvas
var elemento = document.getElementById("canvas");
var lienzo = elemento.getContext("2d");  


//ruleta();

inicio();
$("#menuAjustes").hide();

// ============================================ Ruleta =========================================

// Funcion que se encarga de obtener los clics y enviar la apuesta al servidor
$( "td" ).click(function(e) {   
    var valor = "";
    var tipo = "";
    var tiempoActual = $('#labelTiempo').text();

    if ( tiempoActual != "00:00" ){
        // DOCENA
        if ( this.id == "1a12" || this.id == "2a12" || this.id == "3a12" ){
            tipo = "docena";
            valor = this.id;
        }
        // FILAS
        else if( this.id == "fila1" || this.id == "fila2" || this.id == "fila3" ){
            tipo = "filas";
            valor = this.id;
        }
        // MITAD
        else if( this.id == "1a18" || this.id == "19a36" ){
            tipo = "mitad";
            valor = this.id;
        }
        // COLOR
        else if( this.id == "rojo" || this.id == "negro" ){
            tipo = "color";
            valor = this.id;
        }
        // PAR/IMPAR
        else if( this.id == "par" || this.id == "impar" ){
            tipo = "par/impar";
            valor = this.id;
        }
        // NUMERO
        else{
            tipo = "numero";
            valor = this.id;
        }

       
        /*
        *   Funcion que se encarga de ir enviando las apuestas durante le periodo de tiempo
        */
        $.ajax({
            type : "GET",
            url : "https://appcasino.herokuapp.com/api/apostar/"+localStorage.getItem('id_partida')+"/"+localStorage.getItem('token')+"/"+valor+"/"+tipo+"/"+$('#creditosApuesta').val(),     

            success: function(respuesta){
                respuesta = JSON.parse(respuesta);
                
            },
            error: function(respuesta){
                console.log( "erroor ----> " + JSON.stringify(respuesta) );
            } 
        }); 
    }
});


// Evento para abrir el menu de salir de la room
$('#ir_ajustes').click(function(e) { 
    $("#menuAjustes").show();
});

// Ajax para salir de la room
$('#salirSala').click(function(e) { 
    $.ajax({
        type : "GET",
        url : "https://appcasino.herokuapp.com/api/salirRoomRuleta/"+localStorage.getItem('token'),     

        success: function(respuesta){
            respuesta = JSON.parse(respuesta);
            
            window.location.replace("listado.html");
        },
        error: function(respuesta){
            console.log( "erroor ----> " + JSON.stringify(respuesta) );
        } 
    }); 
});

// Funcion que ejecuta la animacion de giro ruleta
function animacionGiro(){
    limpiarCanvas();
    crearBordeNaranja();
    //console.log(nuevoAngulo);
    angulo = angulo - 0.01;
    girar();
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


function girar(){  
    var arrayNumero = [0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,32,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
    alfaAnterior = angulo;
    alfaAnteriorLetras = angulo;

    // for para dividir la circunferencia en 37 porciones
    for( var numeroCeldas = 1; numeroCeldas <= 37; numeroCeldas++ ){
        
        // Creacion del arco de cada celda
        lienzo.beginPath();
        lienzo.arc(200, 250, radio, alfaAnterior, (alfa*numeroCeldas)+angulo );

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

        // Printar Numeros
        // Se le suma la division para obtener la midad, asi al sumas se desplaza del inicio, quedandose en medio del borde
        alfaAnteriorLetras = alfaAnteriorLetras + (alfa/2);
        y = Math.sin(alfaAnteriorLetras)*radio;
        x = Math.cos(alfaAnteriorLetras)*radio;

        // Creacion del arco de cada celda
        lienzo.beginPath();
        // inicio y fin del arco donde se añadira el numero ( a xfinal se le suma la mitad de x, y a yfinal se le suma la mitad de y, asi obtendra como punto inicial el centro de la ruleta)
        var xfinal = x+(200-5);
        var yfinal = y+(250+5);

        // Estilos
        lienzo.fillStyle = 'white';
        lienzo.font = '20pt';

        // Se añade el numero que toca en esa posicion
        lienzo.fillText( arrayNumero[numeroCeldas-1], xfinal , yfinal);
        lienzo.stroke();

        if( arrayNumero[numeroCeldas-1] == 0 ){
            ultimoAlfaInicial0 = alfaAnterior;
            ultimoAlfaFinal0 = ((alfa*numeroCeldas)+angulo);
        }


        // Si hay un numero ganador lo buscara sino seguira girando
        if ( numeroGanador != -1 ){
            // if para obtener los numeros que estan en el puntero y comparar si estan en el punto de arriba  (4.71 punto centrico de la circunferencia)
            if( (4.71 >= alfaAnterior && 4.71 <= ((alfa*numeroCeldas)+angulo)) || (-1.57 >= alfaAnterior && -1.57 <= ((alfa*numeroCeldas)+angulo))==true  || (-14.21 >= alfaAnterior && -14.21 <= ((alfa*numeroCeldas)+angulo)) ){                   
                
                // si el numero ganador es el mismo que el que esta arriba del todo.. 
                if ( (numeroGanador == arrayNumero[numeroCeldas-1]) == true ){

                    // Parara la animacion de girar
                    clearInterval(id_accion); 
                    id_accion = -1;
                    alfaAnterior = angulo;
                    alfaAnteriorLetras = angulo;
                    
                    ganancias(); 

                    setTimeout(inicio(), 8000);
                }
            }
        }
        
        alfaAnterior = (alfa*numeroCeldas)+angulo;
        alfaAnteriorLetras = (alfa*numeroCeldas)+angulo;
    }
}



function limpiarCanvas(){
    var anchura_canvas = $('#canvas').width();
    var altura_canvas = $('#canvas').height();
    lienzo.clearRect(0, 0, anchura_canvas, altura_canvas);
}


// =================================================    TIEMPO  ===============================================
function inicio() {
    alfaAnterior = angulo;
    nuevoAngulo = -1;
    numeroGanador = -1;

    minutos = 0;
    segundos = 15;
    $('#labelTiempo').text("0"+minutos+":"+segundos);

    //clearInterval(id_test_tirar);
    if( control == -1 ){
        control = setInterval(cronometro,1000);
    }
    if( id_accion == -1 ){
        id_accion = setInterval(animacionGiro, 10);
    }
    
}


function cronometro () { 
    if( segundos > 0){
        segundos--;
        if (segundos < 10) { segundos = "0"+segundos }
    }
    if (segundos == 0) {
        // Si se ha acabado el tiempo, limpia la animacion y genera el numero random
        clearInterval(control);
        control = -1;
        $('#labelTiempo').text("00:00");
        numeroRandom();
    }
    if (minutos > 0) {
        minutos--;
        if (minutos < 10) { minutos = "0"+minutos }
    }
        
    $('#labelTiempo').text("0"+minutos+":"+segundos);
}



// LLamar a la funcion que generara el numero random
function numeroRandom(){
    $.ajax({
        type : "GET",
        url : "https://appcasino.herokuapp.com/api/numero_random/"+localStorage.getItem('id_partida'),     

        success: function(respuesta){
            respuesta = JSON.parse(respuesta);
            
            if ( respuesta.status == 'ok'){
                var numero = respuesta.numeros[0].ultimos_numeros;
                var arrayNumero = numero.split("-");
                var ultimo = arrayNumero.length;
                numeroGanador = arrayNumero[ultimo-1];

                localStorage.setItem('numeroGanador', numeroGanador);
                //nuevoAngulo = 0.034;
            }
        },
        error: function(respuesta){
            console.log( "erroor numero aleatorio----> " + JSON.stringify(respuesta) );
        } 
    });  
}


// Una vez acabado el tiempo, se reparten las ganancias
function ganancias() { 
    $.ajax({
        type : "GET",
        url : "https://appcasino.herokuapp.com/api/ganancias2/"+localStorage.getItem('id_partida')+"/"+localStorage.getItem('numeroGanador'),     

        success: function(respuesta){
            respuesta = JSON.parse(respuesta);

            //console.log(JSON.stringify(respuesta));
        },
        error: function(respuesta){
            console.log( "erroor ganancias----> " + JSON.stringify(respuesta) );
        } 
    });  
}
