import { Injectable, EventEmitter } from '@angular/core';
import { Hora } from 'src/app/models/hora.model';
import { Clase } from 'src/app/models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ModalClaseActualizarService {

  oculto: string = 'oculto';

  clase: Clase;

  notificacion = new EventEmitter<any>();

  constructor() { 
    this.clase = new Clase(null, null, null, null, null, null);
  }

  ocultarModal(){
    this.clase = new Clase(null, null, null, null, null, null);
    this.oculto = 'oculto';
  }

  mostrarModal(clase: Clase){
    this.clase = clase;
    console.log(this.clase);
    this.oculto = '';
  }
}

