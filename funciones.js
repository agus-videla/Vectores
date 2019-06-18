var x=0;
var y=0;

function verTeoria(evt, tema){
    var i, contenido, linkContenido;

    contenido = document.getElementsByClassName('contenido');
    for(i = 0; i < contenido.length; i++){
        contenido[i].style.display = "none";
    }

    linkContenido = document.getElementsByClassName('linkContenido');
    for(i = 0; i < linkContenido.length; i++){
        linkContenido[i].className = linkContenido[i].className.replace(" activo", "");
    }

    document.getElementById(tema).style.display = "block";
    evt.currentTarget.className += " activo";
}

function inicio() {
    //variables globales por si las moscas
    canvas = document.getElementById('canvasVector');
    context = canvas.getContext('2d');
    mitadX = canvas.width / 2;
    mitadY = canvas.height / 2;
    //setea el canvas al origen (0,0)
    context.translate(mitadX, mitadY);
    reset();
}
function reset(){
    //borra cada cuadrante por separado por estar el origen de coordenadas en el centro
    context.clearRect(0, 0, -canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, -canvas.height);
    context.clearRect(0, 0, -canvas.width, -canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    dibujarLinea(x - mitadX, 0, x + mitadX, 0);
    dibujarLinea(0, y + mitadY, 0, y - mitadY);
}
function dibujarCirculo(finalX,finalY,labelx,labely){
    context.beginPath();
    context.arc(finalX,finalY,2,0,Math.PI*2);
    context.fill();
    context.textAlign='center';
    //Cambia la posición de la etiqueta si está por sobre el eje x o por debajo
    if(finalY > 0){
        context.fillText('[ '+ labelx +','+ labely +']', finalX, finalY +10);
    }else{
        context.fillText('[ '+ labelx +','+ labely +']', finalX, finalY -5);
    }

    context.closePath();
}

function dibujarLinea(origenX,origenY,finalX,finalY){

    context.beginPath();
    context.moveTo(origenX, origenY);
    context.lineTo(finalX, finalY);
    context.lineWidth = 0.5;
    context.stroke();
    context.closePath();

}

function bases(vector,base){
    document.getElementById(base).value = document.getElementById(vector).value;
}

//Aca van las operaciones
function sumar(){
    var txtInputSuma = document.getElementById('suma').value;
    var txtInputSuma2 = document.getElementById('suma2').value;
    var vector1 = document.getElementById('v' + txtInputSuma).value;
    var vector2 = document.getElementById('v' + txtInputSuma2).value;
    var arrayVector1 = vector1.split(',');
    var arrayVector2 = vector2.split(',');
    var vector3 =[0,0];
    var zoom = document.getElementById('zoom').value;;
    vector3[0] = parseInt(arrayVector1[0]) + parseInt(arrayVector2[0]);
    vector3[1] = parseInt(arrayVector1[1]) + parseInt(arrayVector2[1]);

    dibujarLinea(0,0,vector3[0]*zoom,-vector3[1]*zoom);
    dibujarCirculo(vector3[0]*zoom,-vector3[1]*zoom,vector3[0],vector3[1]);
}

function modulo(){
    var txtInputModulo = document.getElementById('modulo').value;
    var vector = document.getElementById('v' + txtInputModulo).value;
    var arrayVector = vector.split(',');
    var resultado = Math.sqrt(arrayVector[0]*arrayVector[0]+arrayVector[1]*arrayVector[1])
    var resultadocorregido = resultado.toFixed(4);
    alert("|" + vector + "| = " + resultadocorregido);
}

function escalar(){
    var nmbInputModulo = document.getElementById('escalar').value;
    var txtInputModulo = document.getElementById('escalar2').value;
    var vector = document.getElementById('v' + txtInputModulo).value;
    var arrayVector = vector.split(',');
    var vectorResult = [0,0];
    var zoom = document.getElementById('zoom').value;
    vectorResult[0] = nmbInputModulo * parseInt(arrayVector[0]);
    vectorResult[1] = nmbInputModulo * parseInt(arrayVector[1]);

    dibujarLinea(0,0,vectorResult[0]*zoom,-vectorResult[1]*zoom);
    dibujarCirculo(vectorResult[0]*zoom,-vectorResult[1]*zoom,vectorResult[0],vectorResult[1]);

}