
var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	quica = new Quica();
	calacas1 = [new Calaca1(), new Calaca1()];
	calacas2 = [new Calaca2(), new Calaca2()];
	calacas3 = [new Calaca3(), new Calaca3()];
	
	run();	
	
	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		quica.actualizar('arriba');
	if(event.which==40 || event.which==83)
		quica.actualizar('abajo');
	if(event.which==39 || event.which==68)
		quica.actualizar('derecha');
	if(event.which==37 || event.which==65)
		quica.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		quica.dibujar(contextoBuffer);
		for(i=0;i<calacas1.length;i++){
			calacas1[i].dibujar(contextoBuffer);
			calacas1[i].actualizar();
			if(quica.colision(calacas1[i].x,calacas1[i].y)){
				quica.sprite = 2;
				quica.vida++;
				$('#gana')[0].play();
			}
		}
		
		for(i=0;i<calacas2.length;i++){
			calacas2[i].dibujar(contextoBuffer);
			calacas2[i].actualizar();
			if(quica.colision(calacas2[i].x,calacas2[i].y)){
				quica.sprite = 2;
				quica.vida--;
				$('#pierde')[0].play();
			}
		}
		
		for(i=0;i<calacas3.length;i++){
			calacas3[i].dibujar(contextoBuffer);
			calacas3[i].actualizar();
			if(quica.colision(calacas3[i].x,calacas3[i].y)){
				quica.sprite = 2;
				quica.vida--;
				$('#gana')[0].play();
			}
		}
		if(quica.vida <0)
			jugando = false;
		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		quica.sprite = 3;
		quica.vida = 0;
		quica.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}


