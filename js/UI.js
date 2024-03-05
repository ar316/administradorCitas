import { contenedorCitashtml } from "./constatntes.js";

export class UI{

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