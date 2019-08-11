import { Component, OnInit } from '@angular/core';
import { ModalReservaAdmService } from './modalReservaAdm.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '../../../services/reserva/reserva.service';
import { Reserva } from 'src/app/models/reserva.model';

@Component({
  selector: 'app-modal-reserva-adm',
  templateUrl: './modalReservaAdm.component.html'
})
export class ModalReservaAdmComponent implements OnInit {

  constructor(public _modalService: ModalReservaAdmService,
              public _reservaService: ReservaService) { }

  ngOnInit() {
  }

  borrarReserva(reserva: Reserva){
    this._reservaService.borrarReserva(reserva).subscribe(resp =>{
      this._modalService.notificacion.emit(resp);
    });
    this._modalService.ocultarModal();
  }

}
