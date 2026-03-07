let personas = JSON.parse(localStorage.getItem("personas")) || [];
if(!Array.isArray(personas)){
  personas = [];
}

function insertarPersona(nombre) {

  nombre = nombre.trim();

  const existe = personas.some(p => p.nombre === nombre);

  if (existe) {
    alert("Ese nombre ya está agregado");
    return false;
  }

  personas.push({
    nombre: nombre,
    excepciones: [nombre],
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
  const check = document.getElementById("confirmar");
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
  window.location.href = "excluir.html";
}


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






function eliminarNombre(boton){
    boton.parentElement.remove();
};

function eliminarNombreAdmin(boton){
   const nombreAdmin = document.getElementById("printNombre").textContent;

   personas = personas.filter(usuario => usuario.nombre !== nombreAdmin); 

   localStorage.setItem("personas", JSON.stringify(personas));

   boton.parentElement.remove();

   console.log("Estado actual del arreglo:", personas);
};





document.addEventListener("DOMContentLoaded", () => {

  const nombreAdmin = document.getElementById("printNombre");

  if(personas.length === 0){
    let nomOrganizador = document.getElementById("printNombre");
    let eliminarBotonAd = document.getElementById("eliminarBotonAd");
    nomOrganizador.style.display = "none";
    eliminarBotonAd.style.display = "none";
  }else{
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

///////////////////////////////////////////////////////////////////////////////////////

function irPagina4(){
  window.location.href="tematica.html";
}

function regresar3(){
  window.location.href="excluir.html";
}

function excluirMostrar(boton){
  window.location.href="excluirMostrar.html";
}

function cancelar(){
  window.location.href="excluir.html";
}

function cambiarTexto(){
  const texto = document.getElementById("textoInstrucciones");

  if(window.innerWidth<992){
    document.getElementById("textoInstrucciones").textContent = "Selecciona una tematica usando los botones que están arriba";
  }
}

cambiarTexto();
window.addEventListener("resize", cambiarTexto);

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

////////////////////////////////////////////////////////////////////////////////////////////

function irPagina5(){
  const celebracion = document.getElementById("tematica").value.trim();
  if (!celebracion) {
    alert("Por favor escribe o selecciona una celebración");
    return;
  }else{
    localStorage.setItem("celebracion", celebracion);
    window.location.href="fecha.html";
  }
}

const botonesTematica = document.querySelectorAll(".botonTematica");

botonesTematica.forEach(boton => {

  boton.addEventListener("click", () => {

    const inputTematica = document.getElementById("tematica");

    inputTematica.value = boton.textContent;

  });

});


function regresar4(){
  window.location.href="tematica.html";
}

/////////////////////////////////////////////////////////////////////////////////////

function irPagina6(){
  window.location.href="gasto.html";
}

function regresar5(){
  window.location.href="fecha.html";
}

///////////////////////////////////////////////////////////////////////////////////
function realizarIntercambio(personas) {

  personas.forEach(p => {
    p.recibe = false;
    p.nombreSorteado = "";
  });

  let personasOrdenadas = [...personas].sort(
    (a, b) => (b.excepciones?.length || 0) - (a.excepciones?.length || 0)
  );

  function backtrack(index) {

    if (index === personasOrdenadas.length) {
      return true;
    }

    let actual = personasOrdenadas[index];

    let opciones = personasOrdenadas.filter(p =>
      !p.recibe &&
      !(actual.excepciones || []).includes(p.nombre)
    );

    for (let opcion of opciones) {

      opcion.recibe = true;
      actual.nombreSorteado = opcion.nombre;

      if (backtrack(index + 1)) {
        return true;
      }

      opcion.recibe = false;
      actual.nombreSorteado = "";
    }

    return false;
  }

  const resultado = backtrack(0);

  if (!resultado) {
    alert("No existe combinación válida con las excepciones actuales");
  }

  return resultado;
}


function irPagina7(){
  const gasto = document.getElementById("gastoText").value.trim();
  if(gasto !== ""){
    localStorage.setItem("presupuesto", gasto);
  }
  let resultado = realizarIntercambio(personas);
  if(resultado){
    localStorage.setItem("personas", JSON.stringify(personas));
    window.location.href = "opciones.html";
  }
}

function regresar6(){
  window.location.href="gasto.html";
}

///////////////////////////////////////////////////////////////////////////////////

function irPagina8(){
  window.location.href="datos.html";
}

function irPagina9(){
  window.location.href="sorteo.html";
}

function regresar7(){
  window.location.href="opciones.html";
}

function mostrar(boton){
  if(boton.id === "btnfecha"){
    document.getElementById("fecha").style.display="block";
    document.getElementById("personalizadoFecha").style.display="block";
  }else if(boton.id === "btngasto"){
    document.getElementById("gastoText").style.display="block";
    document.getElementById("personalizadoGasto").style.display="block";
  }
}

document.addEventListener("DOMContentLoaded", () => {

  const contenedor = document.getElementById("listaPersonas");

  if(!contenedor) return;

  const datos = localStorage.getItem("personas");
  if(datos){
    personas = JSON.parse(datos);
  }

  contenedor.innerHTML="";

  personas.forEach(persona => {

    const div=document.createElement("div");
    div.style.marginBottom="10px";

    const nombre=document.createElement("span");
    nombre.textContent=persona.nombre+" ";

    const boton=document.createElement("button");
    boton.className="botonAgregarExc"
    boton.textContent="Añadir excepciones";

    boton.addEventListener("click",()=>{
      mostrarListaExcepciones(persona);
    });

    div.appendChild(nombre);
    div.appendChild(boton);

    contenedor.appendChild(div);

  });

});

function mostrarListaExcepciones(personaActual){

  const contenedor=document.getElementById("listaPersonas");

  const listaDiv=document.createElement("div");
  listaDiv.className="listaDivExcepciones";

  const titulo=document.createElement("p");
  titulo.textContent="Selecciona excepciones para "+personaActual.nombre;

  const botonBorrar=document.createElement("button");
  botonBorrar.textContent="X";
  botonBorrar.className="botonBorrar";

  botonBorrar.onclick=()=>listaDiv.remove();

  listaDiv.appendChild(titulo);
  listaDiv.appendChild(botonBorrar);

  personas.forEach(persona=>{

    const fila=document.createElement("div");
    

    const nombre=document.createElement("span");
    nombre.textContent=persona.nombre+" ";

    const botonAgregar=document.createElement("button");
    botonAgregar.className="botonAgregar";
    botonAgregar.textContent="Agregar";

    botonAgregar.addEventListener("click",()=>{

      if(persona.nombre===personaActual.nombre){
        alert("No puedes agregarte a ti mismo");
        return;
      }

      if(personaActual.excepciones.includes(persona.nombre)){ 
        alert("Ya está en la lista de excepciones");
        return;
      }

      personaActual.excepciones.push(persona.nombre);

      localStorage.setItem("personas", JSON.stringify(personas));

      console.log("Excepciones actualizadas de",personaActual.nombre);
      console.log(personaActual.excepciones);

      alert("Excepción agregada");

    });

    fila.appendChild(nombre);
    fila.appendChild(botonAgregar);

    listaDiv.appendChild(fila);

  });

  contenedor.appendChild(listaDiv);

}



document.addEventListener("DOMContentLoaded", () => {
  function generarFechas(){
  const btn1 = document.querySelector(".btnPropuesta1");
  const btn2 = document.querySelector(".btnPropuesta2");
  const btn3 = document.querySelector(".btnPropuesta3");
  if(!btn1 || !btn2 || !btn3) return;
  const hoy = new Date();
  const propuestas = [
    new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 7),
    new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 14),
    new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 21)
  ];
  const botones = [btn1, btn2, btn3];
  propuestas.forEach((fecha, i) => {
    const texto = fecha.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    botones[i].textContent = texto;
    botones[i].onclick = () => {
      const fechaSeleccionada = fecha.toISOString().split("T")[0];
      localStorage.setItem("fechaCelebracion", fechaSeleccionada);
      window.location.href = "gasto.html";
    };
  });
}
  generarFechas();
});




const inputFecha = document.getElementById("fecha");
if(inputFecha){
  inputFecha.addEventListener("change", () => {
    const fechaSeleccionada = inputFecha.value;
    if(fechaSeleccionada !== ""){
      localStorage.setItem("fechaCelebracion", fechaSeleccionada);
      window.location.href = "gasto.html";
    }
  });
}






document.addEventListener("DOMContentLoaded", () => {

  const btn100 = document.getElementById("btn100");
  const btn150 = document.getElementById("btn150");
  const btn200 = document.getElementById("btn200");

  if(btn100){
    btn100.addEventListener("click", () => {
      localStorage.setItem("presupuesto", 100);
      window.location.href="opciones.html";
    });
  }

  if(btn150){
    btn150.addEventListener("click", () => {
      localStorage.setItem("presupuesto", 150);
      window.location.href="opciones.html";
    });
  }

  if(btn200){
    btn200.addEventListener("click", () => {
      localStorage.setItem("presupuesto", 200);
      window.location.href="opciones.html";
    });
  }

});

//Opcion para eliminar local storage////////////////////////////////////////////////////////////////

function verificarlocalStorage(event){
  event.preventDefault();

  if(localStorage.length===0){
    window.location.href="index.html";
    return;
  }

  let confirmarLocal=confirm("¿Estas seguro que deseas eliminar los datos del sorteo?");
  if(confirmarLocal){
    localStorage.clear();
    window.location.href="index.html";
  }else{
    window.location.href="index.html";
  }
}






document.addEventListener("DOMContentLoaded", function () {
    const celebracion = localStorage.getItem("celebracion");
    const organizador = localStorage.getItem("organizador");
    const fecha = localStorage.getItem("fechaCelebracion");
    const presupuesto = localStorage.getItem("presupuesto");
    const personas = JSON.parse(localStorage.getItem("personas"));
    document.getElementById("celebracion").textContent = "Nombre de la celebracion: " + celebracion;
    document.getElementById("organizador").textContent = "Nombre del organizador: " + organizador;
    document.getElementById("fechaa").textContent = "Fecha del evento: " + fecha;
    document.getElementById("presupuesto").textContent = "Presupuesto: $" + presupuesto;

    let personasTexto = "";
    personas.forEach(persona => {
    personasTexto += persona.nombre + "  ";
    
});


    let exclusionesTexto = "";
    personas.forEach(persona => {
    let exclusionesReales = persona.excepciones.filter(
        nombre => nombre !== persona.nombre
    );
    if (exclusionesReales.length > 0) {
        exclusionesTexto += persona.nombre + 
        " no puede regalar a " + exclusionesReales.join(", ") + " ";
    }
});
    document.getElementById("personass").textContent = "Participantes: " + personasTexto;
    document.getElementById("exclusiones").textContent = "Relación de exclusiones: " + exclusionesTexto;
});



document.addEventListener("DOMContentLoaded", function () {

    const personas = JSON.parse(localStorage.getItem("personas"));
    const listaSorteo = document.getElementById("listaSorteo");

    personas.forEach(persona => {
        if(persona.nombreSorteado && persona.nombreSorteado !== "") {

            const div = document.createElement("div");
            div.classList.add("itemSorteo");

            const spanNombre = document.createElement("span");
            spanNombre.textContent = persona.nombre;

            const spanFlecha = document.createElement("span");
            spanFlecha.classList.add("flecha");
            spanFlecha.textContent = "→";

            const spanDestino = document.createElement("span");
            spanDestino.textContent = persona.nombreSorteado;

            div.appendChild(spanNombre);
            div.appendChild(spanFlecha);
            div.appendChild(spanDestino);

            listaSorteo.appendChild(div);
        }
    });

});