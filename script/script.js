function irPagina1(){
    window.location.href="base.html";
}

function irPagina2(){
    window.location.href="nombres.html";
}

//Para mosrtar alert de ayuda
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible w-50 mx-auto" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Presiona el dulce para continuar', 'success')
  })
}

//lista de nombres

function agregarNombre(){
    const lista=document.getElementById("listaNombres");
    const nuevo=document.createElement("div");

    nuevo.classList.add("item");
    nuevo.innerHTML= `
        <input type="text" placeholder="Nuevo nombre">
        <button class="btnEliminar" onclick="eliminarNombre(this)">x</button>
    `;
    lista.appendChild(nuevo);
}

function eliminarNombre(boton){
    boton.parentElement.remove();
}