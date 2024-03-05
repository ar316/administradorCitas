
import { nombrexd } from './funciones.js';
import { UI } from './UI.js';
import { Citas } from './citas.js';
import {inputMascota, inputPropietario, inputTelefono, inputFecha, inputHora
    , inputSintomas, boton, formulario, contenedorCitashtml} from './constatntes.js';
let editando;


const ui = new UI();
const administradorCitas = new Citas();


eventos();
function eventos(){
    inputMascota.addEventListener('blur', datosCita);
    inputPropietario.addEventListener('blur', datosCita);
    inputTelefono.addEventListener('blur', datosCita);
    inputFecha.addEventListener('blur', datosCita);
    inputHora.addEventListener('blur', datosCita);
    inputSintomas.addEventListener('blur', datosCita);
    formulario.addEventListener('submit', ValidarDatos);
    
    console.log(nombrexd);
}

const CitaObj={
   
    mascota: "",
    propietario: "",
    telefono: "",
    hora: "",
    sintomas: ""
}


function datosCita(e){
    const name = e.target.name;
    CitaObj[name] = e.target.value;  
 
}

function ValidarDatos(e){
    e.preventDefault();

    const datosLLenos = Object.values(CitaObj).includes("");
   
    if(datosLLenos){
        ui.imprimirAlerta("todos los datos son obligatorios", "error");
        console.log("todos los datos son necesarios");
        return;
    }

    if(editando){
        ui.imprimirAlerta("editado correctamente");
        //pasasr el objetoCcita) a la edicion
        administradorCitas.editar({...CitaObj});
        boton.textContent = 'Crear cita'
        editando = false;
    }else{
        CitaObj.id = Date.now();
        //generar un id unico
        administradorCitas.agregarCita({...CitaObj});
        ui.imprimirAlerta("Cita agregada correctamente");
    }
 
   
    
    
    
    limpiarObjeto();
    formulario.reset();
     ui.mostrarCita(administradorCitas);


}


function EliminarCita(id){
   
    administradorCitas.eliminar(id);
    ui.imprimirAlerta('cita eliminada correctamente')
    ui.mostrarCita(administradorCitas);
   
}

function EditarCita(id, e,cita){
    const { mascota, propietario, telefono, hora, sintomas, fecha } = cita;
    inputMascota.value =mascota;
    inputPropietario.value = propietario
    inputTelefono.value= telefono;
    inputFecha.value= fecha;
    inputHora.value= hora;
    inputSintomas.value= sintomas;
    

    ///editando el botno de editar 
   
    boton.textContent = 'Editar Cita'
    console.table(cita);
    editando = true;
   
   CitaObj.mascota=  mascota;
   CitaObj.fecha= fecha;
   CitaObj.propietario= propietario;
   CitaObj.telefono=  telefono;
   CitaObj.hora= hora;
   CitaObj.sintomas= sintomas;
   CitaObj.id= id;
   
}

function limpiarObjeto(){
    Object.keys(CitaObj).filter((prop)=> prop !== "id" ).forEach((prop)=>{CitaObj[prop] =""});
}