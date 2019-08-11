import { Injectable, EventEmitter } from '@angular/core';
import { Hora } from '../../../models/hora.model';
import { Clase } from 'src/app/models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ModalReservaAdmCrearService {

  oculto: string = 'oculto';
  hora: Hora;
  fecha: string;
  clase: Clase;

  notificacion = new EventEmitter<any>();

  constructor() {
    this.clase = new Clase(null, null, null, null, null, null, null, null, null);
    this.fecha = '';
   }

  ocultarModal(){
    this.clase = new Clase(null, null, null, null, null, null, null, null, null);
    this.fecha = '';
    this.oculto = 'oculto';
  }

  mostrarModal(clase: Clase){
    this.clase = clase;
    this.oculto = '';
  }
}
