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
    var mitadX = canvas.width / 2;
    var mitadY = canvas.height / 2;
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
    var base1 = document.getElementById('b1').value;
    var base2 = document.getElementById('b2').value;
    var arraybase1 = base1.split(',');
    var arraybase2 = base2.split(',');
    dibujarLinea(0,0,parseInt(arraybase1[0])*canvas.width,parseInt(arraybase1[1])*-canvas.height);
    dibujarLinea(0,0,parseInt(arraybase1[0])*-canvas.width,parseInt(arraybase1[1])*canvas.height);
    dibujarLinea(0,0,parseInt(arraybase2[0])*canvas.width,parseInt(arraybase2[1])*-canvas.height);
    dibujarLinea(0,0,parseInt(arraybase2[0])*-canvas.width,parseInt(arraybase2[1])*canvas.height);
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

function combinacionLineal(vector){
    var base1 = document.getElementById('b1').value;
    var base2 = document.getElementById('b2').value;
    var arraybase1 = base1.split(',');
    var arraybase2 = base2.split(',');
    var combinado = [0,0];
    combinado[0] = arraybase1[0] * vector[0] + arraybase2[0] * vector[1];
    combinado[1] = arraybase1[1] * vector[0] + arraybase2[1] * vector[1];
    return combinado;
}

//Aca van las operaciones
function plot(){
    var txtInputPlot = document.getElementById('plot').value;
    var vector = document.getElementById('v' + txtInputPlot).value;
    var arrayVector = vector.split(',');
    var temp = [0,0];
    var zoom = document.getElementById('zoom').value;
    temp[0] = parseInt(arrayVector[0]);
    temp[1] = parseInt(arrayVector[1]);
    var vectorResult = combinacionLineal(temp);
    dibujarLinea(0,0,vectorResult[0]*zoom,-vectorResult[1]*zoom);
    dibujarCirculo(vectorResult[0]*zoom,-vectorResult[1]*zoom,temp[0],temp[1]);
}

function sumar(){
    var txtInputSuma = document.getElementById('suma').value;
    var txtInputSuma2 = document.getElementById('suma2').value;
    var vector1 = document.getElementById('v' + txtInputSuma).value;
    var vector2 = document.getElementById('v' + txtInputSuma2).value;
    var arrayVector1 = vector1.split(',');
    var arrayVector2 = vector2.split(',');
    var temp =[0,0];
    var zoom = document.getElementById('zoom').value;
    temp[0] = parseInt(arrayVector1[0]) + parseInt(arrayVector2[0]);
    temp[1] = parseInt(arrayVector1[1]) + parseInt(arrayVector2[1]);
    var vectorResult = combinacionLineal(temp);
    dibujarLinea(0,0,vectorResult[0]*zoom,-vectorResult[1]*zoom);
    dibujarCirculo(vectorResult[0]*zoom,-vectorResult[1]*zoom,temp[0],temp[1]);
}

function modulo(){
    var txtInputModulo = document.getElementById('modulo').value;
    var vector = document.getElementById('v' + txtInputModulo).value;
    var arrayVector = vector.split(',');
    var resultado = Math.sqrt(parseInt(arrayVector[0])*parseInt(arrayVector[0])+parseInt(arrayVector[1])*parseInt(arrayVector[1]));
    var resultadocorregido = resultado.toFixed(4);
    alert("|" + vector + "| = " + resultadocorregido);
}

function escalar(){
    var nmbInputModulo = document.getElementById('escalar').value;
    var txtInputModulo = document.getElementById('escalar2').value;
    var vector = document.getElementById('v' + txtInputModulo).value;
    var arrayVector = vector.split(',');
    var temp = [0,0];
    var zoom = document.getElementById('zoom').value;
    temp[0] = nmbInputModulo * parseInt(arrayVector[0]);
    temp[1] = nmbInputModulo * parseInt(arrayVector[1]);
    var vectorResult = combinacionLineal(temp);
    dibujarLinea(0,0,vectorResult[0]*zoom,-vectorResult[1]*zoom);
    dibujarCirculo(vectorResult[0]*zoom,-vectorResult[1]*zoom,temp[0],temp[1]);
}

function distancia(){
    var txtInputDistancia1 = document.getElementById('distancia1').value;
    var txtInputDistancia2 = document.getElementById('distancia2').value;
    var vector1 = document.getElementById('v' + txtInputDistancia1).value;
    var vector2 = document.getElementById('v' + txtInputDistancia2).value;
    var arrayVector1 = vector1.split(',');
    var arrayVector2 = vector2.split(',');
    var resultado = Math.sqrt(Math.pow(arrayVector2[0]-arrayVector1[0],2)+Math.pow(arrayVector2[1]-arrayVector1[1],2));
    var resultadocorregido = resultado.toFixed(4);
    alert("dist(" + vector1 + ";" + vector2 + ") = " + resultadocorregido);
}