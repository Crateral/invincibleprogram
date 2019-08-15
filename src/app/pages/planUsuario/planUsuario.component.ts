import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-plan-usuario',
  templateUrl: './planUsuario.component.html',
  styles: []
})
export class PlanUsuarioComponent implements OnInit {

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this._usuarioService.paginaActual = 'Plan';
  }

}
