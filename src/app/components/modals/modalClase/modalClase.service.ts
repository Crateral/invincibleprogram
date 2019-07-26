import { Injectable, EventEmitter } from '@angular/core';
import { Clase } from 'src/app/models/clase.model';
import { Hora } from 'src/app/models/hora.model';

@Injectable({
  providedIn: 'root'
})
export class ModalClaseService {

  oculto: string = 'oculto';

  hora: Hora;
  dia: number;
  fecha: string;
  clases: Clase[];

  notificacion = new EventEmitter<any>();

  constructor() { 
    this.hora = new Hora(null, null);
  }

  ocultarModal(){
    this.hora = new Hora(null, null);
    this.oculto = 'oculto';
  }

  mostrarModal(hora: Hora, fecha: string){
    this.hora = hora;
    this.fecha = fecha;
    this.oculto = '';
  }
}
