$('#usuario').val("test");
$('#password').val("P@ssw0rd");


/*
* LOGIN
*/
$( "#logear" ).click(function() {	
  window.location.replace("inicio.html");


  // Obtencion de los valores, de user y de password
  var usuario = $('#usuario').val();
	var contraseña = $('#password').val();

  // llamada para logearse, con los dos valores obtenidos.
	$.ajax({
		type : "GET",
    url : "https://appcasino.herokuapp.com/api/login/"+usuario+"/"+contraseña,	   
    
   	success: function(respuesta){
   		respuesta = JSON.parse(respuesta);
   		 
      
      
      // si todo va bien, se guarda el token en el localstorage y se le llevara al listado de jugadores
      if( respuesta.status == "ok" ){
      	localStorage.setItem('token', respuesta.token );
        window.location.replace("inicio.html");
      }
      
    },
    error: function(respuesta){
     	console.log( "erroor login ----> " + JSON.stringify(respuesta) );
    } 
  });
});



/*
* MENU
*/
$( "#ir_blackjack" ).click(function() { 
  alert("blackjack");
});

$( "#ir_ruleta" ).click(function() { 
  //alert("ruleta");
  window.location.replace("ruleta.html");
});

$( "#ir_tienda" ).click(function() { 
  alert("tienda");
});

$( "#ir_ajustes" ).click(function() { 
  alert("ajustes");
});






// ============================================ Ruleta =========================================

// Funcion que se encarga de 
$( "td" ).click(function(e) {
  //alert( "e: " + this.id );
  
  // insercion de la ficha
  $("#"+this.id).empty();
  $("#"+this.id).append('<img class="ficha" src="img/ficha_amarillo.png"></img>');

});