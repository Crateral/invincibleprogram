import { Injectable, EventEmitter } from '@angular/core';
import { Hora } from '../../../models/hora.model';

@Injectable({
  providedIn: 'root'
})
export class ModalReservaAdmCrearService {

  oculto: string = 'oculto';
  hora: Hora;
  fecha: string;

  notificacion = new EventEmitter<any>();

  constructor() {
    this.hora = new Hora(null, null);
    this.fecha = '';
   }

  ocultarModal(){
    this.hora = new Hora(null, null);
    this.fecha = '';
    this.oculto = 'oculto';
  }

  mostrarModal(hora: Hora, fecha: string){
    this.hora = hora;
    this.fecha = fecha;
    this.oculto = '';
  }
}
