/**
 * Muestra y oculta DIVS, es un sistema de pestañas
 * @method verTeoria
 * @param evt No estoy seguro lo saqué de W3S Ups...
 * @param {string} tema Id del tema de la pesataña
 */
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
