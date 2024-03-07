import Citas from './classes/Citas.js'
import UI from './classes/UI.js'
import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from './selectores.js';

export let DB;
const ui = new UI();
const administrarCitas = new Citas();

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora:'',
    sintomas: ''
}


let editando = false;

export function datosCita(e) {
    //  console.log(e.target.name) // Obtener el Input
     citaObj[e.target.name] = e.target.value;
}


export function nuevaCita(e) {
    e.preventDefault();

    const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if( mascota === '' || propietario === '' || telefono === '' || fecha === ''  || hora === '' || sintomas === '' ) {
        ui.imprimirAlerta('Todos los mensajes son Obligatorios', 'error')

        return;
    }

    if(editando) {
        // Estamos editando
        administrarCitas.editarCita( {...citaObj} );

        EdidatRegistro(citaObj);
       

    } else {
        // Nuevo Registrando

        // Generar un ID único
        citaObj.id = Date.now();

        //insetando cita en la base de datos 
        
        
        // Añade la nueva cita
        administrarCitas.agregarCita({...citaObj});
        agregarRegistro(citaObj);

        // Mostrar mensaje de que todo esta bien...
       
    }


    // Imprimir el HTML de citas
    ui.imprimirCitas();

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();

}

export function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}


export function eliminarCita(id) {
    administrarCitas.eliminarCita(id);

    ui.imprimirCitas()
}

export function cargarEdicion(cita) {

    const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Reiniciar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}

export function createDataBase(){
    let dataBase = window.indexedDB.open('citas', 1);

    dataBase.onerror = () =>{
        console.log('ha habido un error');
    }
    //verificar  si se creó bien la base de datos
    dataBase.onsuccess = () =>{
        console.log('base de datos creada correctamente');
        DB = dataBase.result;
        ui.imprimirCitas();
    }


    dataBase.onupgradeneeded = function(e){
        const db = e.target.result;
        //crea la tabla de la base de datos 
        const objectStore = db.createObjectStore('citas',{
            keyPath: 'id',
            autoIncrement: true
        })

        objectStore.createIndex('nombreMascota', 'nombreMascota', {unique: false});
        objectStore.createIndex('propietario', 'propietario', {unique: false});
        objectStore.createIndex('telefono', 'telefono', {unique: false});
        objectStore.createIndex('sintomas', 'sintomas', {unique: false});
        objectStore.createIndex('hora', 'hora', {unique: false});
        objectStore.createIndex('fecha', 'fecha', {unique: false});


    }

}


function agregarRegistro(cita){
    const transaction = DB.transaction(['citas'],'readwrite');
    transaction.onerror = function(){
        console.log("ha habido un error");
    }

    transaction.oncomplete = function(){
        ui.imprimirAlerta('Se agregó correctamente')
    }
    const objectStore = transaction.objectStore("citas");

    objectStore.add(cita);
}


function EdidatRegistro(cita){
    const transaction = DB.transaction(['citas'],'readwrite');
    const objectStore = transaction.objectStore("citas");
    objectStore.put(cita);

    transaction.oncomplete = function(){
        ui.imprimirAlerta('Guardado Correctamente');

        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        editando = false;
    }
    


}