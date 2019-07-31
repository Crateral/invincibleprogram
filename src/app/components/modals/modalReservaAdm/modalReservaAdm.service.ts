import { Injectable, EventEmitter } from '@angular/core';
import { Reserva } from '../../../models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ModalReservaAdmService {

  reservas: Reserva[];

  oculto: string = 'oculto';

  notificacion = new EventEmitter<any>();

  constructor() {
    this.reservas = new Array();
   }

  ocultarModal(){
    this.oculto = 'oculto';
    this.reservas = new Array();
  }

  mostrarModal(reservas: Reserva[]){
    this.oculto = '';
    this.reservas = reservas;
    console.log(this.reservas);
  }
}
