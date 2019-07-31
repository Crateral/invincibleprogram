import { Component, OnInit } from '@angular/core';
import { ModalReservaAdmCrearService } from './modalReservaAdmCrear.service';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { ClaseService } from '../../../services/clase/clase.service';
import { Clase } from 'src/app/models/clase.model';

@Component({
  selector: 'app-modal-reserva-adm-crear',
  templateUrl: './modalReservaAdmCrear.component.html',
  styles: []
})
export class ModalReservaAdmCrearComponent implements OnInit {

  clase: Clase;

  constructor(public _modalService: ModalReservaAdmCrearService,
              public _reservaService: ReservaService,
              public _claseService: ClaseService) { }

  ngOnInit() {
  }

  buscarClasePorFechaYHora(horaInicio: string, fecha: string){

    this._claseService.cargarClasePorFecha(fecha, horaInicio).subscribe((resp: any) =>{
      this.clase = resp.clases;
      console.log(this.clase);
    });
  }

}
