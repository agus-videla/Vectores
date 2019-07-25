/**
 * Inicializa el canvas con el (0,0) al centro
 * @method inicio
 */
function inicio() {
    VectoresActuales = [];  //Almacena los vectores dibujados actualmente
    EtiquetasActuales = [];  //Almacena las etiquetas de los vectores dibujados actualmente
    var canvas = document.getElementById('canvasVector');
    var context = canvas.getContext('2d');
    var mitadX = canvas.width / 2;
    var mitadY = canvas.height / 2;
    //setea el canvas al origen (0,0)
    context.translate(mitadX, mitadY);
    context.translate(0.5, 0.5);
    reset();
}

/**
 * Borra el canvas y dibuja los ejes según las bases
 * @method dibujarCoordenadas
 */
function dibujarCoordenadas() {
    var canvas = document.getElementById('canvasVector');
    var context = canvas.getContext('2d');
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

/**
 * Limpia los arreglos de vectores que están actualmente dibujados
 * @method reset
 */
function reset(){
    VectoresActuales = [];
    EtiquetasActuales = [];
    dibujarCoordenadas();
}

/**
 * Dibuja un punto y la etiqueta al final del vector
 * @method dibujarCirculo
 * @param {int} finalX Coordenada en x del vector, transformada por el zoom
 * @param {int} finalY Coordenada en y del vector, transformada por el zoom
 * @param {int} labelx Coordenada real en x
 * @param {int} labely Coordenada real en y
 */
function dibujarCirculo(finalX,finalY,labelx,labely){
    var canvas = document.getElementById('canvasVector');
    var context = canvas.getContext('2d');
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

/**
 * Dibuja una linea
 * @method dibujarLinea
 * @param {int} origenX
 * @param {int} origenY
 * @param {int} finalX
 * @param {int} finalY
 */
function dibujarLinea(origenX,origenY,finalX,finalY){
    var canvas = document.getElementById('canvasVector');
    var context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(origenX, origenY);
    context.lineTo(finalX, finalY);
    context.lineWidth = 0.5;
    context.stroke();
    context.closePath();
}

/**
 * Copia el vector deseado en el campo de base elegido
 * @method Bases
 * @param {string} vector Id del vector
 * @param {string} base Id de la base
 */
function bases(vector,base){
    document.getElementById(base).value = document.getElementById(vector).value;
    dibujarCoordenadas();
}

/**
 * Transforma las coordenadas segun la base actual
 * @method CombinacionLineal
 * @param {array} vector real
 * @return {array} vector transformado
 */
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

/**
 * Almacena coordenadas (duh)
 * @method almacenarCoordenadas
 * @param x
 * @param y
 */
function almacenarCoordenadas(x, y){
    VectoresActuales.push({x,y});
}

/**
 * Guarda las etiquetas (no debería tener que explicar esto)
 * @method almacenarEtiquetas
 * @param x
 * @param y
 */
function almacenarEtiquetas(x,y){
    EtiquetasActuales.push({x,y});
}


/**
 * Escala los vectores dinámicamente conforme va cambiando el zoom
 * @method zoomAnim
 */
function zoomAnim(){
    if(VectoresActuales[0] == null){
        return;
    }
    dibujarCoordenadas();
    var zoom = document.getElementById('zoom').value;
    for(var length = VectoresActuales.length;0<length;length--){
        VectoresActuales.push(VectoresActuales[0]);
        EtiquetasActuales.push(EtiquetasActuales[0]);
        dibujarLinea(0,0,VectoresActuales[0].x*zoom,-VectoresActuales[0].y*zoom);
        dibujarCirculo(VectoresActuales[0].x*zoom,-VectoresActuales[0].y*zoom,EtiquetasActuales[0].x,EtiquetasActuales[0].y);
        VectoresActuales.shift();
        EtiquetasActuales.shift();
    }
}

/**
 * Se fija si los vectores han sido correctamente ingresados
 * además, si se modificó una base vuelve a dibujar los ejes de coordenadas
 * @method checkVector
 * @param id
 * @param valor
 */
function checkVector(id,valor){
    if(valor === "")
        return;
    if(!valor.includes(',')) {
        alert('Para declarar un vector separe los componentes con una coma. \nEjemplo: 4,5');
        document.getElementById(id).value = "";
        return;
    }
    if(id === 'b1' || id === 'b2'){
        reset();
    }
}

/**
 * Se fija si las funciones han sido correctamente utilizadas
 * @method checkInt
 * @param id
 * @param valor
 */
function checkInt(id,valor){
    if(valor === "")
        return;
    if(valor.includes('-') || valor.includes(',') || valor.includes('.') || valor>4 || valor < 1) {
        alert('Para utilizar las funciones debe operar con los índices de los vectores declarados en la sección "vectores".' +
            '\n\nEjemplo: \n\n1. 0,3 \n2. 1,2 \nSuma: 1 + 2 = 1,5');
        document.getElementById(id).value = "";
    }
}

/**
 * Dibuja el vector seleccionado
 * @method plot
 */
function plot(){
    var txtInputPlot = document.getElementById('plot').value;
    if(txtInputPlot.length === 0){
        return;
    }
    var vector = document.getElementById('v' + txtInputPlot).value;
    var arrayVector = vector.split(',');
    var temp = [0,0];
    var zoom = document.getElementById('zoom').value;
    temp[0] = parseInt(arrayVector[0]);
    temp[1] = parseInt(arrayVector[1]);
    var vectorResult = combinacionLineal(temp);
    almacenarCoordenadas(vectorResult[0],vectorResult[1]);
    almacenarEtiquetas(temp[0],temp[1]);
    dibujarLinea(0,0,vectorResult[0]*zoom,-vectorResult[1]*zoom);
    dibujarCirculo(vectorResult[0]*zoom,-vectorResult[1]*zoom,temp[0],temp[1]);
}

/**
 * Suma dos vectores elegidos y los dibuja
 * @method sumar
 */
function sumar(){
    var txtInputSuma = document.getElementById('suma').value;
    var txtInputSuma2 = document.getElementById('suma2').value;
    if(txtInputSuma.length === 0 || txtInputSuma2 === 0){
        return;
    }
    var vector1 = document.getElementById('v' + txtInputSuma).value;
    var vector2 = document.getElementById('v' + txtInputSuma2).value;
    var arrayVector1 = vector1.split(',');
    var arrayVector2 = vector2.split(',');
    var temp = [0,0];
    var zoom = document.getElementById('zoom').value;
    temp[0] = parseInt(arrayVector1[0]) + parseInt(arrayVector2[0]);
    temp[1] = parseInt(arrayVector1[1]) + parseInt(arrayVector2[1]);
    var vectorResult = combinacionLineal(temp);
    almacenarCoordenadas(vectorResult[0],vectorResult[1]);
    almacenarEtiquetas(temp[0],temp[1]);
    dibujarLinea(0,0,vectorResult[0]*zoom,-vectorResult[1]*zoom);
    dibujarCirculo(vectorResult[0]*zoom,-vectorResult[1]*zoom,temp[0],temp[1]);
}

/**
 * Calcula el modulo del vector seleccionado y lo muestra en un alert
 * @method modulo
 */
function modulo(){
    var txtInputModulo = document.getElementById('modulo').value;
    if (txtInputModulo.length === 0){
        return;
    }
    var vector = document.getElementById('v' + txtInputModulo).value;
    var arrayVector = vector.split(',');
    var resultado = Math.sqrt(parseInt(arrayVector[0])*parseInt(arrayVector[0])+parseInt(arrayVector[1])*parseInt(arrayVector[1]));
    var resultadocorregido = resultado.toFixed(4);
    alert("|" + vector + "| = " + resultadocorregido);
}

/**
 * Escala un vector y lo dibuja
 * @method escalar
 */
function escalar(){
    var nmbInputModulo = document.getElementById('escalar').value;
    var txtInputModulo = document.getElementById('escalar2').value;
    if(nmbInputModulo.length === 0 || txtInputModulo.length === 0){
        return;
    }
    var vector = document.getElementById('v' + txtInputModulo).value;
    var arrayVector = vector.split(',');
    var temp = [0,0];
    var zoom = document.getElementById('zoom').value;
    temp[0] = nmbInputModulo * parseInt(arrayVector[0]);
    temp[1] = nmbInputModulo * parseInt(arrayVector[1]);
    var vectorResult = combinacionLineal(temp);
    almacenarCoordenadas(vectorResult[0],vectorResult[1]);
    almacenarEtiquetas(temp[0],temp[1]);
    dibujarLinea(0,0,vectorResult[0]*zoom,-vectorResult[1]*zoom);
    dibujarCirculo(vectorResult[0]*zoom,-vectorResult[1]*zoom,temp[0],temp[1]);
}

/**
 * Calcula la distancia entre dos vectores elegidos y la muestra en un alert
 * @method distancia
 */
function distancia(){
    var txtInputDistancia1 = document.getElementById('distancia1').value;
    var txtInputDistancia2 = document.getElementById('distancia2').value;
    if(txtInputDistancia1.length === 0 || txtInputDistancia2.length === 0){
        return;
    }
    var vector1 = document.getElementById('v' + txtInputDistancia1).value;
    var vector2 = document.getElementById('v' + txtInputDistancia2).value;
    var arrayVector1 = vector1.split(',');
    var arrayVector2 = vector2.split(',');
    var resultado = Math.sqrt(Math.pow(arrayVector2[0]-arrayVector1[0],2)+Math.pow(arrayVector2[1]-arrayVector1[1],2));
    var resultadocorregido = resultado.toFixed(4);
    alert("dist(" + vector1 + ";" + vector2 + ") = " + resultadocorregido);
}