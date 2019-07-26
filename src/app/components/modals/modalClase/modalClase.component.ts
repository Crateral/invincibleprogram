import { Component, OnInit } from '@angular/core';
import { ModalClaseService } from './modalClase.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Clase } from 'src/app/models/clase.model';
import { ClaseService } from '../../../services/clase/clase.service';

@Component({
  selector: 'app-modal-clase',
  templateUrl: './modalClase.component.html',
  styles: []
})
export class ModalClaseComponent implements OnInit {

  formaC: FormGroup;

  constructor(public _modalService: ModalClaseService,
              public _claseService: ClaseService) { }

  ngOnInit() {
    this.formaC = new FormGroup({
      descripcion: new FormControl(null, Validators.required),
      coach: new FormControl(null, Validators.required),
      wod: new FormControl(null, null)
    });
  }

  crearClase(){
    let clase = new Clase(this._modalService.hora.horaInicio,
                          this._modalService.hora.horaFin,
                          this._modalService.fecha,
                          this.formaC.value.descripcion,
                          this.formaC.value.coach,
                          this.formaC.value.wod);

    this._claseService.crearClase(clase).subscribe(resp =>{
      this._modalService.notificacion.emit(resp);
      this.formaC.reset();
    });
    this._modalService.oculto = 'oculto';
  }

}
