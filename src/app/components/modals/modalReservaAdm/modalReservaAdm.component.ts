import { Component, OnInit } from '@angular/core';
import { ModalReservaAdmService } from './modalReservaAdm.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-reserva-adm',
  templateUrl: './modalReservaAdm.component.html'
})
export class ModalReservaAdmComponent implements OnInit {

  formaC: FormGroup;

  constructor(public _modalService: ModalReservaAdmService) { }

  ngOnInit() {
    this.formaC = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, null)
    });
  }

}
