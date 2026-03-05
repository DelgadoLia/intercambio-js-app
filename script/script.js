let personas = JSON.parse(localStorage.getItem("personas")) || [];

function insertarPersona(nombre) {

  const existe = personas.some(p => p.nombre === nombre);

  if (existe) {
    alert("Ese nombre ya está agregado");
    return false;
  }

  personas.push({
    nombre: nombre,
    exepciones: [nombre],
    recibe: false,
    nombreSorteado: "",
    exPropias: 0
  });


  localStorage.setItem("personas", JSON.stringify(personas));

  console.log("Persona agregada:", nombre);
  console.log("Estado actual del arreglo:", personas);

  return true;
};





function irPagina1(){
    window.location.href="base.html";
};

document.addEventListener("DOMContentLoaded", () => {
  const confirmar=document.getElementById("confirmar");
  if(confirmar){
    document.getElementById("confirmar").addEventListener("change", () => {
  const nombre = document.getElementById("nomOrganizador").value.trim();
  if (nombre !== ""){
    insertarPersona(nombre);
  }  
});
  }
});

function regresar1(){
  window.location.href="base.html";
}




function irPagina2(){
  const nombre = document.getElementById("nomOrganizador").value.trim();
  if (!nombre) {
    alert("Por favor escribe tu nombre");
    return;
  }else{
    localStorage.setItem("organizador", nombre);
    window.location.href="nombres.html";
  }
};





function irPagina3(){
  const items = document.querySelectorAll("#listaNombres .item input");
  items.forEach(input => {
    const nombre = input.value.trim();
    if(nombre !== ""){
      insertarPersona(nombre);
    }
  });
  localStorage.setItem("personas", JSON.stringify(personas));
  console.log("Arreglo con todos los integrantes:", personas);
  window.location.href = "excluir.html";
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
};






const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    appendAlert('Presiona el dulce para continuar', 'success')
  })
};





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
};




//ELIMINAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR
function eliminarNombre(boton){
    boton.parentElement.remove();
};
function eliminarNombreAdmin(boton){
   const nombreAdmin = document.getElementById("printNombre").textContent;
    personas.filter(usuario => nombre.id !== nombreAdmin);
    boton.parentElement.remove();
    console.log("Estado actual del arreglo:", personas);
};








document.addEventListener("DOMContentLoaded", () => {

  const nombreAdmin = document.getElementById("printNombre");

  if (nombreAdmin) {
    const dato = localStorage.getItem('organizador');
    nombreAdmin.textContent = dato || "";
  }

});



function regresar2(){
  window.location.href="nombres.html";
}










function noExcluir(boton){
  boton.classList.toggle("active");
}






function excluir(boton){
  boton.classList.toggle("active");
}







function irPagina4(){
  window.location.href="fecha.html";
}



function regresar3(){
  window.location.href="excluir.html";
}




//drag and drop///////////////////////////////////////////////////

const dulces=document.querySelectorAll(".dulce");

dulces.forEach(dulce=>{
  dulce.addEventListener("dragstart", (e)=>{
    e.dataTransfer.setData("text", e.target.id);
  });
});

document.addEventListener("dragover", (e)=>{
  e.preventDefault();
});

document.addEventListener("drop", (e)=>{
  e.preventDefault();

  const id=e.dataTransfer.getData("text");
  const elemento=document.getElementById(id);
  const rect=elemento.getBoundingClientRect();

  elemento.style.left=(e.pageX-rect.width/2)+"px";
  elemento.style.top=(e.pageY-rect.height/2)+"px";
});




function irPagina5(){
  window.location.href="fecha.html";
}



function regresar4(){
  window.location.href="tematica.html";
}





function irPagina6(){
  window.location.href="gasto.html";
}



function regresar5(){
  window.location.href="fecha.html";
}
