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
    canvas = document.getElementById('canvasVector'); // Variable global
    context = canvas.getContext('2d');               //variable global
    var mitadX = canvas.width / 2;
    var mitadY = canvas.height / 2;
    // seteamos el canvas al origen (0,0)
    context.translate(mitadX, mitadY);
    dibujarLinea(x - mitadX, 0, x + mitadX, 0);
    dibujarLinea(0, y + mitadY, 0, y - mitadY);
}
function dibujarLinea(origenX,origenY,finalX,finalY){

    context.beginPath();
    context.moveTo(origenX, origenY);
    context.lineTo(finalX, finalY);
    context.lineWidth = 0.5;
    context.stroke();
    context.closePath();

}

function obtener(nombre){
     var vector = document.getElementById(nombre).value;
     console.log(vector);
}

function bases(vector,base){
    document.getElementById(base).value = document.getElementById(vector).value;
}