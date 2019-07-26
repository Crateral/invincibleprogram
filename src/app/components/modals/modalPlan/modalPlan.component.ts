import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlanService } from '../../../services/plan/plan.service';
import { ModalPlanService } from './modalPlan.service';
import { Plan } from 'src/app/models/plan.model';

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
      valor: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, null)
    });
  }

  actualizarPlan(){

    let nuevoNombre: string;
    let nuevoValor: number;
    let nuevaDescripcion: string;

    if (this.formaC.value.nombre){
      nuevoNombre = this.formaC.value.nombre;
    }else{
      nuevoNombre = this._modalService.plan.nombre;
    }
    if (this.formaC.value.valor){
      nuevoValor = this.formaC.value.valor;
    }else{
      nuevoValor = this._modalService.plan.valor;
    }
    if(this.formaC.value.descripcion){
      nuevaDescripcion = this.formaC.value.descripcion;
    }else{
      nuevaDescripcion = this._modalService.plan.descripcion;
    }

    let plan = new Plan(nuevoNombre, nuevoValor, nuevaDescripcion);

    plan._id = this._modalService.plan._id;

    this._planService.actualizarPlan(plan).subscribe(resp =>{
      this._modalService.notificacion.emit(resp);
    });  

    this._modalService.ocultarModal();

  }



}
