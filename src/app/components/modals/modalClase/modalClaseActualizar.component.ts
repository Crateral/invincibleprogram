import { Component, OnInit } from '@angular/core';
import { ModalClaseActualizarService } from './modalClaseActualizar.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert';
import { Clase } from 'src/app/models/clase.model';
import { ClaseService } from '../../../services/clase/clase.service';

@Component({
  selector: 'app-modal-clase-actualizar',
  templateUrl: './modalClaseActualizar.component.html',
  styles: []
})
export class ModalClaseActualizarComponent implements OnInit {

  formaC: FormGroup;

  constructor(public _modalService: ModalClaseActualizarService,
              public _claseService: ClaseService) { 
    this.formaC = new FormGroup({
      descripcion: new FormControl(null, Validators.required),
      coach: new FormControl(null, Validators.required),
      cupo: new FormControl(null, Validators.required),
      wod: new FormControl(null, null)
    });
  }

  ngOnInit() {
  }

  actualizarClase()
  {
    let nuevaDescripcion;
    let nuevoCoach;
    let nuevoCupo;
    let nuevoWod;
    
    if (this.formaC.value.descripcion){
      nuevaDescripcion = this.formaC.value.descripcion;
    }else{
      nuevaDescripcion = this._modalService.clase.descripcion;
    }
    if (this.formaC.value.coach){
      nuevoCoach = this.formaC.value.coach;
    }else{
      nuevoCoach = this._modalService.clase.coach;
    }
    if (this.formaC.value.wod){
      nuevoWod = this.formaC.value.wod;
    }else{
      nuevoWod = this._modalService.clase.wod;
    }
    if (this.formaC.value.cupo){
      if(this.formaC.value.cupo >= 16){
        let diferencia = 16 - this._modalService.clase.cupo;
        nuevoCupo = this.formaC.value.cupo - diferencia;
      }else{
        swal('Cupo incorrecto', 'El cupo no puede ser inferior a 16', 'error');
      }
    }else{
      nuevoWod = this._modalService.clase.wod;
    }

    let clase = new Clase(this._modalService.clase.horaInicio,
                          this._modalService.clase.horaFinal,
                          this._modalService.clase.fecha,
                          nuevaDescripcion,
                          nuevoCoach,
                          nuevoWod,
                          nuevoCupo
    );

    clase._id = this._modalService.clase._id;

    this._claseService.actualizarClase(clase).subscribe(resp =>{
      this._modalService.notificacion.emit(resp);
    });

    this._modalService.ocultarModal();

  };

}
