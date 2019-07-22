import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanService } from '../../../services/plan/plan.service';
import { ModalPlanService } from './modalPlan.service';

@Component({
  selector: 'app-modal-plan',
  templateUrl: './modalPlan.component.html',
  styles: []
})

export class ModalPlanComponent implements OnInit {

  formaC: FormGroup;

  constructor(
    public _planService: PlanService,
    public _modalService: ModalPlanService
  ) { }

  ngOnInit() {
    this.formaC = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required)
    });
  }

  actualizarPlan(){

    let nuevoNombre: string;
    let nuevoValor: string;

    if (!this.formaC.value.nombre && !this.formaC.value.valor){
      this._modalService.ocultarModal();
      return;
    }

    if (this.formaC.value.nombre){

      nuevoNombre = this.formaC.value.nombre;

    }
    if (this.formaC.value.valor){
      nuevoValor = this.formaC.value.valor;
    }

  }



}
