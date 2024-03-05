export class Citas{
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
