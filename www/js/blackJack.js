
//function

$("#menuAjustes").hide();
$('#ir_ajustes').click(function(e) { 
    $("#menuAjustes").show();
});

$("#menuPerdido").hide();
$("#menuGanado").hide();


//CUANDO HAGA CLIC  ESCONDERÉ EL MENU , QUITARE CARTAS Y RESETEARE LOS PUNTOS A 0
$("#perdido").click(function(e){
    $("#menuPerdido").hide();
    $("#puntos").text("0");
    $("#puntosIA").text("0");
    quitarCartas();
});

$("#ganado").click(function(e){
    $("#menuGanado").hide();
    $("#puntos").text("0");
    $("#puntosIA").text("0");
    quitarCartas();
});



// Ajax para salir de la room
$('#salirSala').click(function(e) { 
    quitarCartas();
    $.ajax({
        type : "GET",
        url : "https://appcasino.herokuapp.com/api/salirRoomBj/"+localStorage.getItem('token'),     

        success: function(respuesta){
            respuesta = JSON.parse(respuesta);

            
            
            setTimeout(function() {window.location.replace("lista_bj.html")} , 1000);
        },
        error: function(respuesta){
            //alert("https://appcasino.herokuapp.com/api/salirRoomBj"+localStorage.getItem('token'),);
            console.log( "erroor ----> " + JSON.stringify(respuesta) );
        } 
    }); 
});


function rondaJugador(){
    $.ajax({
            type: 'GET',
            url: 'https://appcasino.herokuapp.com/api/rondaJugador/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token"), 


            success: function (msg) { 

               
                msg = JSON.parse(msg);
                if( msg.estado == 'ok'){
                    localStorage.setItem("rondaJugador", msg.rondaJugador);  
                    //alert("Ronda Jugador " + localStorage.getItem("rondaJugador"))                              
                }             
           
            },
            error: function (request, status, error) {
               //alert("ni");
                //alert(JSON.stringify(request)); 
            }
        });
}



function listaJugadores(){

    $.ajax({
        type: 'GET',
        url: 'https://appcasino.herokuapp.com/api/listaJugadores/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("rondaActual"), 


        success: function (msg) { 

                
            msg = JSON.parse(msg);
            //alert('https://appcasino.herokuapp.com/api/listaJugadores/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("rondaActual"))

            localStorage.setItem("listaJugadores", 1);

            localStorage.setItem("listaJugadoresLength", 1);

            //alert(localStorage.getItem("listaJugadoresLength"));
        },
        error: function (request, status, error) {
           //alert(JSON.stringify(request));
            //alert("wa");
            
        }
    });


}



function puntos(){
    $.ajax({
        type: 'GET',
        url: 'https://appcasino.herokuapp.com/api/puntos/'+localStorage.getItem("id_partida"), 


        success: function (msg) { 

            //alert('https://appcasino.herokuapp.com/api/pasa/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"));
            msg = JSON.parse(msg);
            

            if (msg.estado == "ok") {
                
                localStorage.setItem("puntos" , msg.puntos);
                $("#puntos").text(localStorage.getItem("puntos"));
            } else{
                ;
            }                 

            //alert(msg[0].estado);
       
        },
        error: function (request, status, error) {
            
            
        }
    });
}



function puntosIA(){
    $.ajax({
        type: 'GET',
        url: 'https://appcasino.herokuapp.com/api/puntosIA/'+localStorage.getItem("id_partida"), 


        success: function (msg) { 

            //alert('https://appcasino.herokuapp.com/api/pasa/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"));
            msg = JSON.parse(msg);
            

            if (msg.estado == "ok") {
                
                localStorage.setItem("puntosIA" , msg.puntos);
                $("#puntosIA").text(localStorage.getItem("puntosIA"));
            } else{
                
            }                 

            //alert(msg[0].estado);
       
        },
        error: function (request, status, error) {
            
            
        }
    });
}




function ronda() {   


     $.ajax({
        type: 'GET',
        url: 'https://appcasino.herokuapp.com/api/rondaActual/'+localStorage.getItem("id_partida"), 


        success: function (msg) { 

           
            msg = JSON.parse(msg);
            
            
            if( msg.estado == 'ok'){
                localStorage.setItem("rondaActual", msg.rondaActual); 
                //alert("Funcion : Ronda actual "+ localStorage.getItem("rondaActual")); 
                           
            }
            
       
        },
        error: function (request, status, error) {
           //alert("ni");
           // alert(JSON.stringify(request));
            
        }
    });
}



function creditos() {   


$.ajax({
                type : "GET",
                url : "https://appcasino.herokuapp.com/api/creditos/"+localStorage.getItem('token'),     

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
}



function repartir(){ 

    
    if (localStorage.getItem('estadoPartida') == 0) {
        //alert("Se puede repaartir");

        $("#apostar").hide();
        $("#pide").show();
        $("#dobla").show();
        $("#pasa").show();

        
        var cartasC;
        var cartasCC;
        var cartas1;
        var cartas11;
        var cartas2;
        var cartas22;
        var cartas3;
        var cartas33;

        $.ajax({
            type: 'GET',
            url: 'https://appcasino.herokuapp.com/api/repartir/'+localStorage.getItem("id_partida"), 


            success: function (msg) { 

                msg = JSON.parse(msg);

                //alert("??? " + localStorage.getItem("listaJugadores")[1]);

                //alert("esto que es " +JSON.stringify(msg[0].cartas[localStorage.getItem("listaJugadores")[4]][0]));

                cartasC = JSON.stringify(msg[0].cartas[0][0])
                cartasCC = JSON.stringify(msg[0].cartas[0][1])

                localStorage.setItem("cartaFiguraCrupier" , JSON.parse(cartasC).figura );
                localStorage.setItem("cartaNumeroCrupier" , JSON.parse(cartasC).numero );

                $('#carta1C').css("background-color" ,"white");
                $('#carta1C').append('<img style="height:95px; width: 55px;" src="img/Cartas/detras.png"></img>');
                
                 $('#carta2C').css("background-color" ,"white");
                $('#carta2C').append('<img style="height:95px; width: 55px;" src="img/Cartas/'+JSON.parse(cartasCC).figura+'/'+JSON.parse(cartasCC).numero+'.png"></img>');

                for (var i = 0; i < localStorage.getItem("listaJugadoresLength") ; i++) {
                    for (var a = 0; a < 2 ; a++) {                  
                        
                        if (i == 0) {
                            div1 = 'J'+(i+1);
                            if (a == 0) {                                
                                cartas1 = JSON.stringify(msg[0].cartas[localStorage.getItem("listaJugadores")[i]][a])         
                                

                                $('#carta'+(a+1)+'J'+(i+1)).css("background-color" ,"white");
                                $('#carta'+(a+1)+'J'+(i+1)).append('<img style="height:95px; width: 55px;" src="img/Cartas/'+JSON.parse(cartas1).figura+'/'+JSON.parse(cartas1).numero+'.png"></img>');
                            }else{
                                
                                cartas11 = JSON.stringify(msg[0].cartas[localStorage.getItem("listaJugadores")[i]][a])
                        
                                $('#carta'+(a+1)+'J'+(i+1)).css("background-color" ,"white");
                                $('#carta'+(a+1)+'J'+(i+1)).append('<img style="height:95px; width: 55px;" src="img/Cartas/'+JSON.parse(cartas11).figura+'/'+JSON.parse(cartas11).numero+'.png"></img>');
                            }    
                        }else if (i == 1){
                            div2 = 'J'+(i+1);
                            if (a == 0) {
                                
                                cartas2 = JSON.stringify(msg[0].cartas[localStorage.getItem("listaJugadores")[i+1]][a])
                       
                                $('#carta'+(a+1)+'J'+(i+1)).css("background-color" ,"white");
                                $('#carta'+(a+1)+'J'+(i+1)).append('<img style="height:95px; width: 55px;" src="img/Cartas/'+JSON.parse(cartas2).figura+'/'+JSON.parse(cartas2).numero+'.png"></img>');
                            }else{
                               
                                cartas22 = JSON.stringify(msg[0].cartas[localStorage.getItem("listaJugadores")[i+1]][a])
                               // alert(cartas22);
                                $('#carta'+(a+1)+'J'+(i+1)).css("background-color" ,"white");
                                $('#carta'+(a+1)+'J'+(i+1)).append('<img style="height:95px; width: 55px;" src="img/Cartas/'+JSON.parse(cartas22).figura+'/'+JSON.parse(cartas22).numero+'.png"></img>');
                            }    
                        }else if (i == 2){
                            div3 = 'J'+(i+1);
                            if (a == 0) {
                        
                                cartas3 = JSON.stringify(msg[0].cartas[localStorage.getItem("listaJugadores")[i+2]][a])
                       
                                $('#carta'+(a+1)+'J'+(i+1)).css("background-color" ,"white");
                                $('#carta'+(a+1)+'J'+(i+1)).append('<img style="height:95px; width: 55px;" src="img/Cartas/'+JSON.parse(cartas3).figura+'/'+JSON.parse(cartas3).numero+'.png"></img>');
                            }else{
                               // alert("carta3");
                                cartas33 = JSON.stringify(msg[0].cartas[localStorage.getItem("listaJugadores")[i+2]][a])
                                $('#carta'+(a+1)+'J'+(i+1)).css("background-color" ,"white");
                                $('#carta'+(a+1)+'J'+(i+1)).append('<img style="height:95px; width: 55px;" src="img/Cartas/'+JSON.parse(cartas33).figura+'/'+JSON.parse(cartas33).numero+'.png"></img>');
                        
                            }    
                        }
                    }
                }   

                puntos();
                if (JSON.parse(cartasCC).numero == "k" || JSON.parse(cartasCC).numero == "q" || JSON.parse(cartasCC).numero == "j") {
                    $("#puntosIA").text("10");
                }else if (JSON.parse(cartasCC).numero == "a") {
                    $("#puntosIA").text("11");
                }else{
                    $("#puntosIA").text(JSON.parse(cartasCC).numero);
                }
                
                //setTimeout(puntosIA , 2000);
                 
               
               //alert("cartas "+JSON.stringify(msg[0].cartas['0']));
               //alert('https://appcasino.herokuapp.com/api/repartir/'+localStorage.getItem("idPartida"));
                //alert("listaaaaaaaaaaaaaaaaa " +localStorage.getItem("listaJugadores"));
                

            },
            error: function (request, status, error) {       
                //alert(JSON.stringify(request));
               
            }
        });
    }
}




function quitarCartas(){

    $.ajax({
                    type: 'GET',
                    url: 'https://appcasino.herokuapp.com/api/quitarCartas/'+localStorage.getItem("id_partida"), 

                    //quito las cartas del tablero

                    success: function (msg) { 


                        for (var i = 1 ; i <= 6; i++) {
                            $('#carta'+ i + 'C').empty();
                            $('#carta'+ i + 'C').css("background-color" ,"green");

                            $('#carta'+ i + 'J1').empty();
                            $('#carta'+ i + 'J1').css("background-color" ,"green");

                            $('#carta'+ i + 'J2').empty();
                            $('#carta'+ i + 'J2').css("background-color" ,"green");

                            $('#carta'+ i + 'J3').empty();
                            $('#carta'+ i + 'J3').css("background-color" ,"green");

                            $('#carta'+ i + 'J4').empty();
                            $('#carta'+ i + 'J4').css("background-color" ,"green");

                            $('#carta'+ i + 'J5').empty();
                            $('#carta'+ i + 'J5').css("background-color" ,"green");

                            $('#carta'+ i + 'J6').empty();
                            $('#carta'+ i + 'J6').css("background-color" ,"green");

                            
                        }

   
                           
                    },
                    error: function (request, status, error) {
                        
                        
                    }
                });
};



function turnos() {   
    //
    rondaJugador();
    listaJugadores();
    ronda();
    setTimeout(IA , 2000);
}



function IA(){
  
        $.ajax({
            type: 'GET',
            url: 'https://appcasino.herokuapp.com/api/turnos/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("listaJugadoresLength")+'/'+localStorage.getItem("rondaActual"), 


            success: function (msg) {     

                
                msg = JSON.parse(msg);
                //si es el turno de la IA devolverá ia

                if( msg.estado == 'ia'){

                    //destapo la carta del crupier
                    $('#carta1C').empty();
                    $('#carta1C').css("background-color" ,"white");
                    $('#carta1C').append('<img style="height:95px; width: 55px;" src="img/Cartas/'+localStorage.getItem("cartaFiguraCrupier")+'/'+localStorage.getItem("cartaNumeroCrupier")+'.png"></img>');
                    
                    puntosIA();

                     $.ajax({
                        type: 'GET',
                        url: 'https://appcasino.herokuapp.com/api/ia/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("rondaActual"), 
                        success: function (msg) { 
                            //alert(msg);
                            //alert('https://appcasino.herokuapp.com/api/ia/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("rondaActual"));
                            msg1 = JSON.parse(msg); 

                          //  alert(msg1);

                            if (msg1.estado == "fin") {

                                //si es fin la maquina ha ganado

                                setTimeout(puntosIA, 500);

                                //setTimeout(function(){$("#puntos").text("0"); } , 2500);                                 
                                //setTimeout(function(){$("#puntosIA").text("0"); } , 2500);                                                    

                                setTimeout(function() {$("#menuPerdido").show(); }, 2000);
                                setTimeout(function() {$("#apostar").show();} , 1300);
                                setTimeout(function() {$("#dobla").hide();} , 1300);
                                setTimeout(function() {$("#pide").hide();} , 1300);
                                setTimeout(function() {$("#pasa").hide();} , 1300);
                                setTimeout(function() {$("#apuestaCreditos").text(""); } , 2500);       


                                //setTimeout(quitarCartas, 2500); 

                                                         

                                //setTimeout(repartir , 3000);
                            }else if (msg1.estado == "pide"){
                                //alert("PIDE");
                                 $.ajax({
                                        type: 'GET',
                                        url: 'https://appcasino.herokuapp.com/api/contarCartasIa/'+localStorage.getItem("id_partida"), 


                                        success: function (msg) {
                                            msg = JSON.parse(msg);
                                            //la maquina pide una carta y la printo en su sitio en el tablero

                                            setTimeout(function() {
                                                $('#carta'+(msg.numCartas)+'C') .css("background-color" ,"white");
                                                $('#carta'+(msg.numCartas)+'C').append('<img style="height:95px; width: 55px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                                } , 1000);

                                            setTimeout(
                                                puntosIA , 1500
                                            );
                                        },
                                        error: function (request, status, error) {
                                           //alert(JSON.stringify(request));
                                            //alert("wa");
                                            
                                        }
                                      });
                             }else if (msg1.estado == "pasa"){
                                //la maquina se ha pasado y el jugador gana
                                 $.ajax({
                                        type: 'GET',
                                        url: 'https://appcasino.herokuapp.com/api/contarCartasIa/'+localStorage.getItem("id_partida"), 


                                        success: function (msg) {
                                            msg = JSON.parse(msg);
                                            //alert("PAAAAASA");

                                            setTimeout(function() {
                                                $('#carta'+(msg.numCartas)+'C') .css("background-color" ,"white");
                                                $('#carta'+(msg.numCartas)+'C').append('<img style="height:95px; width: 55px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                                } , 500);

                                            setTimeout(
                                                puntosIA , 1000
                                            ); 
                                            

                                           // setTimeout(function(){$("#puntos").text("0"); } , 2000);                                 
                                            //setTimeout(function(){$("#puntosIA").text("0"); } , 2000);  
                                            setTimeout(function() {$("#apostar").show();} , 1300);              

                                            setTimeout(listaG,1500);
                                            setTimeout(function() {$("#apuestaCreditos").text(""); } , 2500);
                                            setTimeout(function() {$("#dobla").hide();} , 1300);
                                            setTimeout(function() {$("#pide").hide();} , 1300);
                                            setTimeout(function() {$("#pasa").hide();} , 1300);

                                            setTimeout(function() {$("#menuGanado").show(); }, 2000);
                                            
                                            
                                            setTimeout(function(){$("#puntos").text("0"); } , 2500);                                 
                                            setTimeout(function(){$("#puntosIA").text("0"); } , 2500);

                                            setTimeout(creditos , 2750);                                         
                                            

                                            //setTimeout(quitarCartas, 2500);  

                                            //setTimeout(repartir, 3000);

                                        },
                                        error: function (request, status, error) {
                                           //alert(JSON.stringify(request));
                                            //alert("wa");
                                            
                                        }
                                      });


                             }
},
                        error: function (request, status, error) {
                   
                        }
                    });     

                }else{
                    //alert("NO IA");
                }   
                
            },
            error: function (request, status, error) {

                
            }
        }); 
}



function listaG(){
    $.ajax({
            type: 'GET',
            url: 'https://appcasino.herokuapp.com/api/listaG/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("rondaActual"), 

            //llamada al reparto de creditos
            success: function (msg) { 
                 msg = JSON.parse(msg);
                 //alert(msg.estado);

                     
           
            },
            error: function (request, status, error) {
                //alert('https://appcasino.herokuapp.com/api/listaG/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("rondaActual"));
                
            }
        });
}






////////////////////////////////////////////
var div1;
var div2;
var div3;

creditos();

$.ajax({
        type: 'GET',
        url: 'https://appcasino.herokuapp.com/api/rondaActual/'+localStorage.getItem("id_partida"), 


        success: function (msg) { 

            //llamada a ronda actual para recibir la ronda de la partida
            msg = JSON.parse(msg);
            
            
            if( msg.estado == 'ok'){
                localStorage.setItem("rondaActual", msg.rondaActual);  

                           
            }
            
       
        },
        error: function (request, status, error) {
           //alert("ni");
            //alert(JSON.stringify(request));
            
        }
    });



rondaJugador();
listaJugadores();

//setTimeout(repartir , 950);

/*

--------------------------------------------

*/
$("#pasa").hide();
$("#pide").hide();
$("#dobla").hide();


$('#apostar').click(function(){
    var apuesta;
    apuesta = $("#apuesta").val();

    localStorage.setItem("apuesta" , apuesta);

    $("#apuestaCreditos").text(localStorage.getItem("apuesta"));

    //Apuesto los creditos y actualizo el recuadro de creditosUsuario;

    $.ajax({
        type: 'GET',
        url: 'https://appcasino.herokuapp.com/api/apostarBJ/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual")+'/'+apuesta, 


        success: function (msg) { 
            //alert("SIUU");
            repartir();
            creditos();               
        },
        error: function (request, status, error) {
            //alert('https://appcasino.herokuapp.com/api/apostarBJ/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual")+'/'+apuesta);
            //alert("NOOO");
            
            
        }
    });
});



$('#pide').click(function(){

	$.ajax({
                 	type: 'GET',
                    url: 'https://appcasino.herokuapp.com/api/pide/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"), 


                    success: function (msg) { 
                        msg1 = JSON.parse(msg);
                        //Si devuelvo pide , pido una y continuo jugando 
                        //Si devuelvo pasa significa que me he pasado en puntos y pasaré turno

                        if (msg1.estado == 'pide') {
                            //Pido una carta mas , dependieendo del jugador y del numero de cartas que tengan se printara 
                            //en un sitio u otro
                            $.ajax({
                                type: 'GET',
                                url: 'https://appcasino.herokuapp.com/api/contarCartas/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token"), 


                                success: function (msg) { 
                                    //alert("TODO BIEN X2");
                                    msg = JSON.parse(msg);
                                   // alert(msg1.figura);

                                    for (var i = 0; i < localStorage.getItem("listaJugadores").length ; i++) {
                                       
                                        if (msg.idJugador == localStorage.getItem("listaJugadores")[i]) {
                                            if ( i == 0){

                                                //alert("OJOOOOO1");
                                               $('#carta'+(msg.numCartas)+div1) .css("background-color" ,"white");
                                                $('#carta'+(msg.numCartas)+div1).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                            }else if ( i == 1 ){
                                               // alert("OJOOOOO2");
                                                $('#carta'+(msg.numCartas)+div2).css("background-color" ,"white");
                                                $('#carta'+(msg.numCartas)+div2).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');

                                            }else if ( i == 2){
                                               // alert("OJOOOOO3");
                                                $('#carta'+(msg.numCartas)+div3).css("background-color" ,"white");
                                                $('#carta'+(msg.numCartas)+div3).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                            } 
                                            
                                        } 

                                    }

                                    puntos();


                                  
                                    
                               
                                },
                                error: function (request, status, error) { 
                                    alert('https://appcasino.herokuapp.com/api/contarCartas/'+localStorage.getItem("idPartida")+'/'+localStorage.getItem("token"));
                                    
                                    
                                }
                            });

                        }else if (msg1.estado == 'pasa'){
                            //Pido una carta mas , dependieendo del jugador y del numero de cartas que tengan se printara 
                            //en un sitio u otro
                            $.ajax({
                                type: 'GET',
                                url: 'https://appcasino.herokuapp.com/api/contarCartas/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token"), 


                                success: function (msg) { 
                                    
                                    msg = JSON.parse(msg);

                                   // alert(msg1.figura);
                                    

                                    for (var i = 0; i < localStorage.getItem("listaJugadores").length ; i++) {
                                       
                                        if (msg.idJugador == localStorage.getItem("listaJugadores")[i]) {
                                            if ( i == 0){

                                                //alert("OJOOOOO1");
                                               $('#carta'+(msg.numCartas)+div1) .css("background-color" ,"white");
                                                $('#carta'+(msg.numCartas)+div1).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                            }else if ( i == 1 ){
                                                //alert("OJOOOOO2");
                                                $('#carta'+(msg.numCartas)+div2).css("background-color" ,"white");
                                                $('#carta'+(msg.numCartas)+div2).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');

                                            }else if ( i == 2){
                                                //alert("OJOOOOO3");
                                                $('#carta'+(msg.numCartas)+div3).css("background-color" ,"white");
                                                $('#carta'+(msg.numCartas)+div3).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                            } 
                                            
                                        } 

                                    }
                                    puntos();                                 
                                    
                               
                                },
                                error: function (request, status, error) { 
                                    //alert('https://appcasino.herokuapp.com/api/contarCartas/'+localStorage.getItem("idPartida")+'/'+localStorage.getItem("token"));
                                    //alert("subsuelo11111");
                                    
                                }
                            });
                            
                        }else if (msg1.estado == 'pasa1'){
                            //alert("pasa si o si ");
                        }                          
                        

                       
                        
                   
                    },
                    error: function (request, status, error) { 
                        //alert('https://appcasino.herokuapp.com/api/pide/'+localStorage.getItem("idPartida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"));
                        //alert("subsuelo");
                        //
                    }
                });
});


$('#pasa').click(function(){

	$.ajax({
                 	type: 'GET',
                    url: 'https://appcasino.herokuapp.com/api/pasa/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"), 

                    //pasas turno

                    success: function (msg) { 

                        //alert('https://appcasino.herokuapp.com/api/pasa/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"));
                        msg = JSON.parse(msg);

                        //alert(msg[0].estado);
                   
                    },
                    error: function (request, status, error) {
                        
                        
                    }
                });
});
	



$('#dobla').click(function(){


     	$.ajax({
        type: 'GET',
        url: 'https://appcasino.herokuapp.com/api/dobla/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"), 



        success: function (msg) { 
            msg1 = JSON.parse(msg);
            var apuesta;
            apuesta = localStorage.getItem("apuesta");

            apuesta = apuesta *2 ;

            $("#apuestaCreditos").text(apuesta);


            

            if (msg1.estado == 'pide') {
                
                $.ajax({
                    type: 'GET',
                    url: 'https://appcasino.herokuapp.com/api/contarCartas/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token"), 


                    success: function (msg) { 
                        //Al doblar pido una carta mas , doblo la apuesta y paso
                        msg = JSON.parse(msg);
                       

                        for (var i = 0; i < localStorage.getItem("listaJugadores").length ; i++) {
                           
                            if (msg.idJugador == localStorage.getItem("listaJugadores")[i]) {
                                if ( i == 0){

                                    //alert("OJOOOOO1");
                                   $('#carta'+(msg.numCartas)+div1) .css("background-color" ,"white");
                                    $('#carta'+(msg.numCartas)+div1).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                }else if ( i == 1 ){
                                   // alert("OJOOOOO2");
                                    $('#carta'+(msg.numCartas)+div2).css("background-color" ,"white");
                                    $('#carta'+(msg.numCartas)+div2).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');

                                }else if ( i == 2){
                                   // alert("OJOOOOO3");
                                    $('#carta'+(msg.numCartas)+div3).css("background-color" ,"white");
                                    $('#carta'+(msg.numCartas)+div3).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                } 
                                
                            } 

                        }

                       setTimeout(puntos , 500);
                        setTimeout(creditos , 1000);            
                        
                   
                    },
                    error: function (request, status, error) { 
                        alert('https://appcasino.herokuapp.com/api/contarCartas/'+localStorage.getItem("idPartida")+'/'+localStorage.getItem("token"));
                        
                        
                    }
                });

            }else if (msg1.estado == 'pasa'){
                //alert(JSON.stringify(msg1));
                //alert(msg1.figura);
                $.ajax({
                    type: 'GET',
                    url: 'https://appcasino.herokuapp.com/api/contarCartas/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token"), 


                    success: function (msg) { 
                        
                        msg = JSON.parse(msg);

                       // alert(msg1.figura);
                        

                        for (var i = 0; i < localStorage.getItem("listaJugadores").length ; i++) {
                           
                            if (msg.idJugador == localStorage.getItem("listaJugadores")[i]) {
                                if ( i == 0){

                                    //alert("OJOOOOO1");
                                   $('#carta'+(msg.numCartas)+div1) .css("background-color" ,"white");
                                    $('#carta'+(msg.numCartas)+div1).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                }else if ( i == 1 ){
                                    //alert("OJOOOOO2");
                                    $('#carta'+(msg.numCartas)+div2).css("background-color" ,"white");
                                    $('#carta'+(msg.numCartas)+div2).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');

                                }else if ( i == 2){
                                    //alert("OJOOOOO3");
                                    $('#carta'+(msg.numCartas)+div3).css("background-color" ,"white");
                                    $('#carta'+(msg.numCartas)+div3).append('<img style="height:95px; width: 50px;" src="img/Cartas/'+msg1.figura+'/'+msg1.numero+'.png"></img>');
                                } 
                                
                            } 

                        }
                        setTimeout(puntos , 500);

                        setTimeout(creditos , 1000);                              
                        
                   
                    },
                    error: function (request, status, error) { 
                        //alert('https://appcasino.herokuapp.com/api/contarCartas/'+localStorage.getItem("idPartida")+'/'+localStorage.getItem("token"));
                        //alert("subsuelo11111");
                        
                    }
                });
                
            }else if (msg1.estado == 'pasa1'){
                //alert("pasa si o si ");
            }             
       
        },
        error: function (request, status, error) { 
            //alert('https://appcasino.herokuapp.com/api/pide/'+localStorage.getItem("idPartida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"));
            //alert("subsuelo");
            //alert('https://appcasino.herokuapp.com/api/dobla/'+localStorage.getItem("id_partida")+'/'+localStorage.getItem("token")+'/'+localStorage.getItem("rondaActual"));
        }
    });

});

// Evento para abrir el menu de salir de la room

setInterval(turnos, 4000); //300000 MS == 5 minutes

