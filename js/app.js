const inputMascota = document.querySelector('#mascota'); 
const inputPropietario = document.querySelector('#propietario'); 
const inputTelefono = document.querySelector('#telefono'); 
const inputFecha = document.querySelector('#fecha'); 
const inputHora = document.querySelector('#hora'); 
const inputSintomas = document.querySelector('#sintomas'); 


const formulario = document.querySelector('#nueva-cita')
const contenedorCitashtml = document.querySelector('#citas')


class Citas{
    constructor() {
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas,cita];
        console.log(this.citas);

    }

    getCitas(){
        return this.citas;
    }

}



class UI{

    mostrarCita(admin){
        const {citas} = admin;
        contenedorCitashtml.innerHTML = "";
        citas.forEach(e => {
            const div = document.createElement('div');
            div.innerHTML = `<p> Nombre Mascota: ${e.mascota}</p>`;
            contenedorCitashtml.appendChild(div);
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
    console.log( CitaObj)
}

function ValidarDatos(e){
    e.preventDefault();

    const datosLLenos = Object.values(CitaObj).includes("");
    console.log(datosLLenos);
    if(datosLLenos){
        ui.imprimirAlerta("todos los datos son obligatorios", "error");
        console.log("todos los datos son necesarios");
        return;
    }
    console.log(CitaObj);
    CitaObj.id = Date.now();
    //generar un id unico
    administradorCitas.agregarCita({...CitaObj});
    
    
    
    limpiarObjeto();
    formulario.reset();
     ui.mostrarCita(administradorCitas);


}

function limpiarObjeto(){
    Object.keys(CitaObj).filter((prop)=> prop !== "id" ).forEach((prop)=>{CitaObj[prop] =""});
}