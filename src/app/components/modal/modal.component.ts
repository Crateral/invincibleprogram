import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanService } from '../../services/plan/plan.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})

export class ModalComponent implements OnInit {

  formaC: FormGroup;

  constructor(
    public _planService: PlanService,
    public _modalService: ModalService
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
      console.log(nuevoNombre);
      console.log(nuevoValor);


  }



}
