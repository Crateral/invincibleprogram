import { Injectable, EventEmitter } from '@angular/core';
import { Plan } from '../../../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class ModalPlanService {

  plan: Plan;

  oculto: string = 'oculto';

  notificacion = new EventEmitter<any>();

  constructor() {
    this.plan = new Plan(null, null, null);
   }

  ocultarModal(){
    this.oculto = 'oculto';
    this.plan = new Plan(null, null, null);
  }

  mostrarModal(plan: Plan){
    this.oculto = '';
    this.plan = plan;
  }
}
