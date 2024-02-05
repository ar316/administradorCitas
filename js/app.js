const inputMascota = document.querySelector('#mascota'); 
const inputPropietario = document.querySelector('#propietario'); 
const inputTelefono = document.querySelector('#telefono'); 
const inputFecha = document.querySelector('#fecha'); 
const inputHora = document.querySelector('#hora'); 
const inputSintomas = document.querySelector('#sintomas'); 

const boton = document.querySelector('.form-group button');

const formulario = document.querySelector('#nueva-cita')
const contenedorCitashtml = document.querySelector('#citas')
let editando;

class Citas{
    constructor() {
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita];
        

    }

    eliminar(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
        console.log(this.citas);
    }

    getCitas(){
        return this.citas;
    }
    editar(citaActualizada){
        this.citas = this.citas.map(cita=> cita.id === citaActualizada.id ? citaActualizada : cita);
        
    }

}



class UI{

    mostrarCita({citas}){
       
        
        contenedorCitashtml.innerHTML = "";
    
        citas.forEach(cita => {
            const {mascota, propietario,telefono, hora, id} = cita;
            const div = document.createElement('div');
            const btnEliminar = document.createElement('button');
            const btnEditar = document.createElement('button');
          
            btnEliminar.innerHTML =' Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /> </svg>'
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>'
          
          
            btnEditar.style.borderRadius="5px";
            btnEditar.style.backgroundColor = "blue";
            btnEliminar.style.borderRadius="5px";
            btnEliminar.style.color = "white"; //
            btnEditar.style.color = "white";
            btnEliminar.style.backgroundColor = "red";
            btnEliminar.onclick = (e) =>{
                EliminarCita(id);
            }
            btnEditar.onclick = (e) =>{
                EditarCita(id,e, cita);
            }
            div.innerHTML = `<p> Nombre Mascota: ${mascota}</p>
            <p> Nombre Mascota: ${propietario}</p>
            <p> Nombre Mascota: ${telefono}</p>
            <p> Nombre Mascota: ${hora}</p>`;
            div.classList.add('cita');
            div.appendChild(btnEditar);
            div.appendChild(btnEliminar);
            
            contenedorCitashtml.appendChild(div);
            console.log(div);
        });
    }

    imprimirAlerta(mensaje, error){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        if(error){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        divMensaje.textContent = mensaje;
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));


        //quitar la alerta 
        setTimeout(()=>{
            divMensaje.remove();
        }, 2000);
    }

    

}

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