import { Injectable, EventEmitter } from '@angular/core';
import { Clase } from 'src/app/models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class ModalClaseUsuarioService {

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
    this.oculto = '';
  }
}
