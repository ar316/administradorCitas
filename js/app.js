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
        this.citas = [this.citas,cita];

    }

    getCitas(){
        return this.citas;
    }

}



class UI{

    mostrarCita(citas){
        contenedorCitashtml.innerHTML = "";
        citas.forEach(e => {
            const div = document.createElement('div');
            div.innerHTML = `<p> Paciente: ${e.mascota}</p>`;
            contenedorCitashtml.appendChild(div);
        });
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
    console.log(CitaObj);
   
    
    

}
function ValidarDatos(e){
    e.preventDefault();
    const datosLLenos = Object.values(CitaObj).includes("");
    console.log(datosLLenos);
    if(!datosLLenos){
        administradorCitas.agregarCita(CitaObj);
        const { citas} = administradorCitas;
        ui.mostrarCita(citas);
        formulario.reset();
        return;
    }

}