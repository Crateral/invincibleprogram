import { Component, OnInit } from '@angular/core';
import { ModalClaseUsuarioService } from './modalClaseUsuario.service';

@Component({
  selector: 'app-modal-clase-usuario',
  templateUrl: './modalClaseUsuario.component.html',
  styles: []
})
export class ModalClaseUsuarioComponent implements OnInit {

  constructor(public _modalService: ModalClaseUsuarioService) { }

  ngOnInit() {
  }

}
