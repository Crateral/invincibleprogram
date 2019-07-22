import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalPlanService {

  nombrePlan: string;
  valorPlan: string;

  oculto: string = 'oculto';

  notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal(){
    this.oculto = 'oculto';
    this.nombrePlan = null;
    this.valorPlan = null;
  }

  mostrarModal(nombrePlan: string, valorPlan: string){
    this.oculto = '';
    this.nombrePlan = nombrePlan;
    this.valorPlan = valorPlan;
  }
}
